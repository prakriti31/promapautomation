<?php
namespace Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public static function handle($roleRequired = null) {
        $auth = getallheaders()['Authorization'] ?? '';
        if (!str_starts_with($auth, 'Bearer ')) jsonResponse(['error'=>'Unauthorized'], 401);
        $token = substr($auth, 7);
        try {
            $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        } catch (\Exception $e) {
            jsonResponse(['error'=>'Invalid token'], 401);
        }
        if ($roleRequired && $payload->role !== $roleRequired) {
            jsonResponse(['error' => 'Forbidden'], 403);
        }
        return $payload; // pass to controller
    }
}
