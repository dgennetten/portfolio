<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

cors();
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

if (empty($_FILES['image'])) {
    json_error('No file uploaded');
}

$file    = $_FILES['image'];
$categorySlug = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['category'] ?? 'misc');
// Server image folders are capitalized (e.g. Drawings, not drawings)
$folderMap = [
    'drawings' => 'Drawings', 'paintings' => 'Paintings', 'sculptures' => 'Sculptures',
    'prints' => 'Prints', 'geometric' => 'Geometric', 'design' => 'Design',
    'photography' => 'Photography', 'code' => 'Code',
    'WIPdrawings' => 'WIPdrawings', 'WIPsculptures' => 'WIPsculptures',
    'WIPkinetics' => 'Kinetics', 'WIPprints' => 'WIPprints',
    'hero' => 'Hero',
];
$category = $folderMap[$categorySlug] ?? ucfirst($categorySlug);

if ($file['error'] !== UPLOAD_ERR_OK) {
    json_error('Upload error: ' . $file['error']);
}

$allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
$mime    = mime_content_type($file['tmp_name']);
if (!in_array($mime, $allowed)) {
    json_error('File type not allowed: ' . $mime);
}

// Resolve the images directory relative to the web root (one level above api/)
$ext       = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$basename  = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
$filename  = $basename . '_' . time() . '.' . $ext;
$uploadDir = dirname(__DIR__) . '/images/' . $category . '/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$dest = $uploadDir . $filename;
if (!move_uploaded_file($file['tmp_name'], $dest)) {
    json_error('Failed to save file', 500);
}

json_response(['path' => '/images/' . $category . '/' . $filename]);
