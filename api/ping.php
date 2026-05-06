<?php
require_once __DIR__ . '/config.php';
cors();

$result = ['php' => PHP_VERSION, 'env_loaded' => file_exists(__DIR__ . '/.env')];

try {
    $db = get_db();
    $db->query('SELECT 1');
    $result['db'] = 'ok';
} catch (Throwable $e) {
    $result['db'] = $e->getMessage();
}

json_response($result);
