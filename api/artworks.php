<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

cors();
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────────────────────────────────────
if ($method === 'GET') {
    $db = get_db();

    // Single artwork
    if (!empty($_GET['id'])) {
        $stmt = $db->prepare('SELECT * FROM artworks WHERE id = ?');
        $stmt->execute([(int)$_GET['id']]);
        $row = $stmt->fetch();
        if (!$row) json_error('Not found', 404);
        json_response($row);
    }

    // Featured artworks
    if (!empty($_GET['featured'])) {
        $stmt = $db->query(
            'SELECT * FROM artworks WHERE is_featured = 1 ORDER BY featured_order ASC, id ASC'
        );
        json_response($stmt->fetchAll());
    }

    // By category
    if (!empty($_GET['category'])) {
        $stmt = $db->prepare(
            'SELECT * FROM artworks WHERE category = ? ORDER BY display_order ASC, id ASC'
        );
        $stmt->execute([$_GET['category']]);
        json_response($stmt->fetchAll());
    }

    // All artworks (admin use)
    $stmt = $db->query('SELECT * FROM artworks ORDER BY category, display_order ASC, id ASC');
    json_response($stmt->fetchAll());
}

// ── POST (create) ─────────────────────────────────────────────────────────────
if ($method === 'POST') {
    require_admin();
    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) json_error('Invalid JSON');

    $required = ['title', 'image_src', 'category'];
    foreach ($required as $f) {
        if (empty($body[$f])) json_error("Missing field: $f");
    }

    $db = get_db();
    $stmt = $db->prepare(
        'INSERT INTO artworks (title, media, description, image_src, category, display_order, is_featured, featured_order)
         VALUES (:title, :media, :description, :image_src, :category, :display_order, :is_featured, :featured_order)'
    );
    $stmt->execute([
        ':title'         => $body['title'],
        ':media'         => $body['media'] ?? null,
        ':description'   => $body['description'] ?? null,
        ':image_src'     => $body['image_src'],
        ':category'      => $body['category'],
        ':display_order' => (int)($body['display_order'] ?? 0),
        ':is_featured'   => (int)($body['is_featured'] ?? 0),
        ':featured_order' => isset($body['featured_order']) ? (int)$body['featured_order'] : null,
    ]);

    $id = (int)$db->lastInsertId();
    $stmt2 = $db->prepare('SELECT * FROM artworks WHERE id = ?');
    $stmt2->execute([$id]);
    json_response($stmt2->fetch(), 201);
}

// ── PUT (update) ──────────────────────────────────────────────────────────────
if ($method === 'PUT') {
    require_admin();
    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body || empty($body['id'])) json_error('Missing id');

    $db = get_db();
    $stmt = $db->prepare(
        'UPDATE artworks SET
            title          = :title,
            media          = :media,
            description    = :description,
            image_src      = :image_src,
            category       = :category,
            display_order  = :display_order,
            is_featured    = :is_featured,
            featured_order = :featured_order
         WHERE id = :id'
    );
    $stmt->execute([
        ':title'          => $body['title'],
        ':media'          => $body['media'] ?? null,
        ':description'    => $body['description'] ?? null,
        ':image_src'      => $body['image_src'],
        ':category'       => $body['category'],
        ':display_order'  => (int)($body['display_order'] ?? 0),
        ':is_featured'    => (int)($body['is_featured'] ?? 0),
        ':featured_order' => isset($body['featured_order']) ? (int)$body['featured_order'] : null,
        ':id'             => (int)$body['id'],
    ]);

    if ($stmt->rowCount() === 0) json_error('Not found or no changes', 404);

    $stmt2 = $db->prepare('SELECT * FROM artworks WHERE id = ?');
    $stmt2->execute([(int)$body['id']]);
    json_response($stmt2->fetch());
}

// ── DELETE ────────────────────────────────────────────────────────────────────
if ($method === 'DELETE') {
    require_admin();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) json_error('Missing id');

    $db = get_db();
    $stmt = $db->prepare('DELETE FROM artworks WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) json_error('Not found', 404);
    json_response(['deleted' => $id]);
}

// ── BULK REORDER ──────────────────────────────────────────────────────────────
if ($method === 'PATCH') {
    require_admin();
    $body = json_decode(file_get_contents('php://input'), true);
    // Expects: { "order": [{ "id": 1, "display_order": 0 }, ...] }
    if (empty($body['order']) || !is_array($body['order'])) json_error('Missing order array');

    $db = get_db();
    $stmt = $db->prepare('UPDATE artworks SET display_order = :o WHERE id = :id');
    foreach ($body['order'] as $item) {
        $stmt->execute([':o' => (int)$item['display_order'], ':id' => (int)$item['id']]);
    }
    json_response(['updated' => count($body['order'])]);
}

json_error('Method not allowed', 405);
