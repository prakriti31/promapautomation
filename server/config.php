<?php
require_once __DIR__ . '/vendor/autoload.php';

/* ---------- env ---------- */
Dotenv\Dotenv::createImmutable(__DIR__)->safeLoad();

/* ---------- PDO helper ---------- */
function db(): PDO
{
    static $pdo = null;
    if ($pdo) return $pdo;

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $_ENV['DB_HOST'] ?? '127.0.0.1',
        $_ENV['DB_PORT'] ?? '3306',              //  ← reads .env
        $_ENV['DB_NAME'] ?? 'promapautomation'
    );

    $pdo = new PDO($dsn,
        $_ENV['DB_USER'] ?? 'root',
        $_ENV['DB_PASS'] ?? 'root',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        ]
    );
    return $pdo;
}

/* ---------- JSON helper ---------- */
function jsonResponse(array $data, int $code = 200): void
{
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit;
}
