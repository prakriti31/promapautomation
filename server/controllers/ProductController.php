<?php
namespace Controllers;
use PDO;

class ProductController {
    public static function index() {
        $q = db()->prepare("SELECT * FROM products");
        $q->execute();
        jsonResponse($q->fetchAll(PDO::FETCH_OBJ));
    }

    public static function store() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES)) {
            jsonResponse(['error'=>'Invalid request'],400);
            return;
        }
        $name        = $_POST['name'];
        $category    = $_POST['category'];
        $description = $_POST['description'];
        $price       = $_POST['price'];

        $uploads_dir = __DIR__ . '/../../uploads';
        if (!is_dir($uploads_dir)) mkdir($uploads_dir, 0755, true);
        $photos = [];
        for ($i = 1; $i <= 3; $i++) {
            $key = 'photo'.$i;
            if (!isset($_FILES[$key])) {
                jsonResponse(['error"=>"Photo {$i} required'],400);
                return;
            }
            $tmp = $_FILES[$key]['tmp_name'];
            $filename = uniqid() . '-' . basename($_FILES[$key]['name']);
            move_uploaded_file($tmp, "$uploads_dir/$filename");
            $photos[] = "/uploads/$filename";
        }

        $q = db()->prepare(
            "INSERT INTO products (category,name,description,price,photo_url,photo_url2,photo_url3)
             VALUES(?,?,?,?,?,?,?)"
        );
        $q->execute([$category,$name,$description,$price,$photos[0],$photos[1],$photos[2]]);
        jsonResponse(['success'=>true]);
    }

    public static function update($id) {
        // Basic update without photos
        parse_str(file_get_contents('php://input'), $_PUT);
        $name        = $_PUT['name'];
        $category    = $_PUT['category'];
        $description = $_PUT['description'];
        $price       = $_PUT['price'];
        db()->prepare(
            "UPDATE products SET name=?,category=?,description=?,price=? WHERE id=?"
        )->execute([$name,$category,$description,$price,$id]);
        jsonResponse(['success'=>true]);
    }

    public static function destroy($id) {
        db()->prepare("DELETE FROM products WHERE id=?")->execute([$id]);
        jsonResponse(['success'=>true]);
    }
}