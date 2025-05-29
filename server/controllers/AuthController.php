<?php
namespace Controllers;
use Models\User;

class AuthController {
    public static function login() {
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $user = User::findByEmail($email);
        if (!$user || !password_verify($password, $user->password_hash)) {
            jsonResponse(['error' => 'Invalid credentials'], 401);
            return;
        }

        $token = User::token($user);
        // Return role and token
        jsonResponse([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }

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

}
