<?php
require_once __DIR__ . '/../config.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('Method not allowed', 405);

$body  = json_decode(file_get_contents('php://input'), true) ?? [];
$token = trim((string)($body['token'] ?? ''));

if ($token === '' || strlen($token) !== 64 || !ctype_xdigit($token)) {
    json_error('Invalid token', 401);
}

$db   = get_db();
$stmt = $db->prepare(
    'SELECT s.expires_at, a.id, a.email, a.role
     FROM auth_sessions s
     JOIN admins a ON a.id = s.admin_id
     WHERE s.token = ? AND a.is_active = 1 LIMIT 1'
);
$stmt->execute([$token]);
$row = $stmt->fetch();

if (!$row) json_error('Unknown session', 401);

$expiresTs = strtotime($row['expires_at']);
if (!$expiresTs || $expiresTs < time()) {
    $db->prepare('DELETE FROM auth_sessions WHERE token = ?')->execute([$token]);
    json_error('Session expired', 401);
}

json_response([
    'success'   => true,
    'token'     => $token,
    'email'     => $row['email'],
    'role'      => $row['role'],
    'id'        => (int) $row['id'],
    'expiresAt' => $expiresTs * 1000,
]);
