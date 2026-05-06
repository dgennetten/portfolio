<?php
require_once __DIR__ . '/../config.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('Method not allowed', 405);

$body  = json_decode(file_get_contents('php://input'), true) ?? [];
$email = strtolower(trim((string)($body['email'] ?? '')));
$code  = trim((string)($body['code'] ?? ''));

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^\d{6}$/', $code)) {
    json_error('Invalid input', 400);
}

$db   = get_db();
$stmt = $db->prepare(
    'SELECT id FROM otp_codes WHERE email = ? AND code = ? AND used = 0 AND expires_at > NOW() LIMIT 1'
);
$stmt->execute([$email, $code]);
$otp = $stmt->fetch();

if (!$otp) json_error('Invalid or expired code', 401);

$db->prepare('UPDATE otp_codes SET used = 1 WHERE id = ?')->execute([$otp['id']]);

$stmt = $db->prepare('SELECT id, email, role FROM admins WHERE LOWER(email) = ? AND is_active = 1 LIMIT 1');
$stmt->execute([$email]);
$admin = $stmt->fetch();

if (!$admin) json_error('Account not active', 401);

$remember  = !empty($body['remember']);
$token     = bin2hex(random_bytes(32));
$expiresAt = date('Y-m-d H:i:s', strtotime($remember ? '+365 days' : '+1 day'));

$db->prepare('INSERT INTO auth_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)')->execute([$admin['id'], $token, $expiresAt]);

// Periodic cleanup
if (random_int(1, 20) === 1) {
    $db->prepare('DELETE FROM otp_codes WHERE expires_at < NOW() OR used = 1')->execute();
}

$expiresTs = strtotime($expiresAt);
json_response([
    'success'   => true,
    'token'     => $token,
    'email'     => $admin['email'],
    'role'      => $admin['role'],
    'id'        => (int) $admin['id'],
    'expiresAt' => $expiresTs * 1000,
]);
