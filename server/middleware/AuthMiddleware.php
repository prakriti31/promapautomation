<?php
namespace Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    /* helper – robust-fetch Authorization header */
    private static function header(): string
    {
        // 1. getallheaders() (works on built-in PHP server & some Apache setups)
        $h = array_change_key_case(getallheaders(), CASE_LOWER);
        if (!empty($h['authorization'])) return $h['authorization'];

        // 2. Apache / nginx often move it into $_SERVER
        if (!empty($_SERVER['HTTP_AUTHORIZATION']))          return $_SERVER['HTTP_AUTHORIZATION'];
        if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];

        return '';
    }

    public static function handle(string $roleRequired = null)
    {
        $auth = self::header();
        if (!str_starts_with($auth, 'Bearer ')) {
            jsonResponse(['error' => 'Unauthorized'], 401);
        }

        $token = substr($auth, 7);
        try {
            $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        } catch (\Throwable $e) {
            jsonResponse(['error' => 'Invalid token'], 401);
        }

        if ($roleRequired && $payload->role !== $roleRequired) {
            jsonResponse(['error' => 'Forbidden'], 403);
        }

        return $payload;
    }
}
