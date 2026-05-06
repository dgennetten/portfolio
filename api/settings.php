<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

cors();

$method = $_SERVER['REQUEST_METHOD'];

// ── GET (public) ──────────────────────────────────────────────────────────────
if ($method === 'GET') {
    $db   = get_db();
    $stmt = $db->query('SELECT `key`, `value` FROM site_settings');
    $rows = $stmt->fetchAll();
    $out  = [];
    foreach ($rows as $row) {
        $out[$row['key']] = $row['value'];
    }
    json_response($out);
}

// ── PUT (admin only) ──────────────────────────────────────────────────────────
if ($method === 'PUT') {
    require_admin();
    $body = json_decode(file_get_contents('php://input'), true);
    if (empty($body['key']) || !isset($body['value'])) {
        json_error('Missing key or value');
    }
    $db   = get_db();
    $stmt = $db->prepare(
        'INSERT INTO site_settings (`key`, `value`) VALUES (:k, :v)
         ON DUPLICATE KEY UPDATE `value` = :v2'
    );
    $stmt->execute([':k' => $body['key'], ':v' => $body['value'], ':v2' => $body['value']]);
    json_response(['key' => $body['key'], 'value' => $body['value']]);
}

json_error('Method not allowed', 405);
