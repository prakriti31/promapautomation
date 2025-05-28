<?php
namespace Controllers;

use Models\User;

class AuthController
{
    /* ---------- sign-up (no OTP) ---------- */
    public static function signup()
    {
        $in = json_decode(file_get_contents('php://input'), true);

        // simple validation – every field must be present & non-empty
        foreach (['name', 'email', 'phone', 'password'] as $f) {
            if (empty($in[$f])) {
                jsonResponse(['error' => "$f is required"], 422);
            }
        }

        if (!filter_var($in['email'], FILTER_VALIDATE_EMAIL)) {
            jsonResponse(['error' => 'Invalid e-mail'], 422);
        }
        if (User::findByEmail($in['email'])) {
            jsonResponse(['error' => 'Email exists'], 409);
        }

        $id   = User::create(
            $in['name'],
            $in['email'],
            $in['phone'],
            $in['password']
        );
        $user = User::findByEmail($in['email']);

        jsonResponse(['token' => User::token($user), 'user' => $user], 201);
    }

    /* ---------- login ---------- */
    public static function login()
    {
        $in   = json_decode(file_get_contents('php://input'), true);
        $user = User::findByEmail($in['email']);

        if (!$user || !password_verify($in['password'], $user->password_hash)) {
            jsonResponse(['error' => 'Invalid credentials'], 401);
        }

        jsonResponse(['token' => User::token($user), 'user' => $user]);
    }
}
