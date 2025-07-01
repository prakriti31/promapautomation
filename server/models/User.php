<?php
namespace Models;

use Firebase\JWT\JWT;
use PDO;

class User
{
    /* ---------- basics ---------- */

    public static function create($name, $email, $phone, $password, $role = 'USER')
    {
        $q = db()->prepare(
            "INSERT INTO users (name,email,phone,password_hash,role,verified)
             VALUES(?,?,?,?,?,1)"
        );
        $q->execute([
            $name,
            $email,
            $phone,
            password_hash($password, PASSWORD_BCRYPT),
            $role
        ]);
        return db()->lastInsertId();
    }

    public static function findByEmail($email)
    {
        $q = db()->prepare("SELECT * FROM users WHERE email = ?");
        $q->execute([$email]);
        return $q->fetch(PDO::FETCH_OBJ);
    }

    /* ---------- token ---------- */

    public static function token($user)
    {
        $jwtSecret = $_ENV['JWT_SECRET'] ?? 'SuperSecretKey123!'; // fallback for safety

        $payload = [
            'sub'   => $user->id,
            'email' => $user->email,
            'role'  => $user->role,
            'iat'   => time(),
            'exp'   => time() + 60 * 60 * 24, // 24 hours
        ];

        return JWT::encode($payload, $jwtSecret, 'HS256');
    }

    /* ---------- otp helpers ---------- */

    public static function storeOtp(string $email, string $code, int $ttl = 300): void
    {
        db()->prepare("DELETE FROM email_otps WHERE email = ?")->execute([$email]);
        db()->prepare(
            "INSERT INTO email_otps (email, code_hash, expires_at)
             VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? SECOND))"
        )->execute([$email, password_hash($code, PASSWORD_BCRYPT), $ttl]);
    }

    public static function verifyOtp(string $email, string $code): bool
    {
        $row = db()->prepare(
            "SELECT code_hash, expires_at FROM email_otps
             WHERE email = ? AND expires_at > NOW() LIMIT 1"
        );
        $row->execute([$email]);
        $otp = $row->fetch(PDO::FETCH_OBJ);
        if (!$otp) return false;
        return password_verify($code, $otp->code_hash);
    }

    public static function consumeOtp(string $email): void
    {
        db()->prepare("DELETE FROM email_otps WHERE email = ?")->execute([$email]);
    }
}
