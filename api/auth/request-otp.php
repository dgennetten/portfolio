<?php
require_once __DIR__ . '/../config.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('Method not allowed', 405);

$body  = json_decode(file_get_contents('php://input'), true) ?? [];
$email = strtolower(trim((string)($body['email'] ?? '')));

// Always return 200 — never reveal whether the email exists
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['ok' => true]);
}

$db   = get_db();
$stmt = $db->prepare('SELECT id FROM admins WHERE LOWER(email) = ? AND is_active = 1 LIMIT 1');
$stmt->execute([$email]);

if (!$stmt->fetch()) {
    json_response(['ok' => true]);
}

$code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
try {
    $db->beginTransaction();
    $db->prepare('UPDATE otp_codes SET used = 1 WHERE email = ? AND used = 0')->execute([$email]);
    $expiresAt = date('Y-m-d H:i:s', strtotime('+' . OTP_TTL_MINUTES . ' minutes'));
    $db->prepare('INSERT INTO otp_codes (email, code, expires_at) VALUES (?, ?, ?)')->execute([$email, $code, $expiresAt]);
    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
    error_log('kdg_portfolio request-otp error: ' . $e->getMessage());
    json_response(['ok' => true]);
}

$subject = 'Your KDG Portfolio sign-in code';
$message = "Your one-time sign-in code is:\n\n    {$code}\n\nIt expires in " . OTP_TTL_MINUTES . " minutes.\n\nIf you didn't request this, ignore this email.";
$headers = "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM . ">\r\n"
         . "Bcc: " . MAIL_BCC . "\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

mail($email, $subject, $message, $headers);
json_response(['ok' => true]);
