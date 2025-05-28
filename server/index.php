<?php
/* Front controller */

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
$path   = preg_replace('@^/api@', '', $path);     //  /api/signup -> /signup
$method = $_SERVER['REQUEST_METHOD'];

/* ---- very small router ---- */
$routes = [
    /* auth */
    ['POST','/signup',  [AuthController::class,'signup']],
    ['POST','/login',   [AuthController::class,'login']],

    /* products */
    ['GET', '/products',           [ProductController::class,'index']],
    ['POST','/products',           [ProductController::class,'store']],
    ['DELETE','/products/(\d+)',   [ProductController::class,'destroy']],
];

foreach ($routes as [$verb, $pattern, $handler]) {
    if ($verb !== $method) continue;
    $regex = '@^' . $pattern . '$@';
    if (preg_match($regex, $path, $m)) {
        array_shift($m);                    // drop full match
        return call_user_func_array($handler, $m);
    }
}

jsonResponse(['error' => 'Not found'], 404);
