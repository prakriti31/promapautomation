<?php
namespace Controllers;

use Models\Product;
use Middleware\AuthMiddleware;

class ProductController {
    public static function index() {
        jsonResponse(Product::all());
    }
    public static function store() {
        AuthMiddleware::handle('ADMIN');
        $in = json_decode(file_get_contents('php://input'), true);
        Product::create($in);
        jsonResponse(['message'=>'Created'],201);
    }
    public static function update($id) {
        AuthMiddleware::handle('ADMIN');
        $in = json_decode(file_get_contents('php://input'), true);
        Product::update($id,$in);
        jsonResponse(['message'=>'Updated']);
    }
    public static function destroy($id) {
        AuthMiddleware::handle('ADMIN');
        Product::delete($id);
        jsonResponse(['message'=>'Deleted']);
    }
}
