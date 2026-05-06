<?php
/**
 * Auth middleware — require_once at the top of every protected endpoint.
 * Validates the Bearer token against the local auth_sessions table.
 *
 * Usage:
 *   require_once __DIR__ . '/auth.php';
 *   $admin = require_admin();               // any admin role
 *   $admin = require_admin(['superadmin']); // superadmin only
 */

require_once __DIR__ . '/config.php';

function require_admin(array $roles = ['admin', 'superadmin']): array {
    $authHeader = '';
    if (function_exists('apache_request_headers')) {
        foreach (apache_request_headers() as $k => $v) {
            if (strtolower($k) === 'authorization') { $authHeader = $v; break; }
        }
    }
    if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    $token = null;
    if (preg_match('/^Bearer\s+(.+)$/i', trim($authHeader), $m)) {
        $token = $m[1];
    }

    if (empty($token)) json_error('Unauthorized', 401);

    $db   = get_db();
    $stmt = $db->prepare(
        'SELECT a.id, a.email, a.role
         FROM auth_sessions s
         JOIN admins a ON a.id = s.admin_id
         WHERE s.token = ? AND s.expires_at > NOW() AND a.is_active = 1
         LIMIT 1'
    );
    $stmt->execute([$token]);
    $admin = $stmt->fetch();

    if (!$admin) json_error('Unauthorized', 401);
    if (!in_array($admin['role'], $roles, true)) json_error('Forbidden', 403);

    return $admin;
}
