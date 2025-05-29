<?php
/* Front controller */
error_log('🔥 router reached: ' . $_SERVER['REQUEST_URI']);

require_once __DIR__ . '/config.php';

use Controllers\AuthController;
use Controllers\ProductController;

/* ---- handle CORS & OPTIONS ---- */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    exit;
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization');

/* ---- strip optional /api prefix ---- */
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path   = preg_replace('@^/api@', '', $path);
$method = $_SERVER['REQUEST_METHOD'];

/* ---- routing table ---- */
$routes = [
    // Auth routes must reference Controllers\AuthController
    ['POST',   '/signup',            ['Controllers\AuthController', 'signup']],
    ['POST',   '/login',             ['Controllers\AuthController', 'login']],

    // Product routes
    ['GET',    '/products',          ['Controllers\ProductController', 'index']],
    ['POST',   '/products',          ['Controllers\ProductController', 'store']],
    ['DELETE', '/products/(\d+)',    ['Controllers\ProductController', 'destroy']],
    ['PUT',    '/products/(\d+)',    ['Controllers\ProductController', 'update']],
    ['GET',    '/orders',             ['Controllers\OrderController', 'index']],
];

foreach ($routes as [$verb, $pattern, $handler]) {
    if ($verb !== $method) continue;
    $regex = '@^' . $pattern . '$@';
    if (preg_match($regex, $path, $m)) {
        array_shift($m);
        return call_user_func_array($handler, $m);
    }
}

jsonResponse(['error' => 'Not found'], 404);
