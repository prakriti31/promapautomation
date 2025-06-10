<?php
namespace Controllers;
use PDO;

class ProductController {
    public static function index() {
        $q = db()->query("SELECT * FROM products ORDER BY created_at DESC");
        jsonResponse($q->fetchAll(PDO::FETCH_OBJ));
    }

    public static function store() {
        $name        = $_POST['name']        ?? '';
        $category    = $_POST['category']    ?? '';
        $subcategory = $_POST['subcategory'] ?? '';
        $description = $_POST['description'] ?? '';
        $price       = $_POST['price']       ?? '';

        // Validation:
        if (!$name || !$category || !$price) {
            jsonResponse(['error' => 'Missing required fields'], 422);
            return;
        }

        // Allow subcategory empty for Sensors and Cables
        if (!in_array($category, ['Sensors', 'Cables']) && !$subcategory) {
            jsonResponse(['error' => 'Subcategory is required for this category'], 422);
            return;
        }

        $dir = __DIR__ . '/../../uploads';
        if (!is_dir($dir)) mkdir($dir, 0755, true);

        $photoUrl = null;
        if (!empty($_FILES['photo1']['tmp_name'])) {
            $file = uniqid() . '-' . basename($_FILES['photo1']['name']);
            move_uploaded_file($_FILES['photo1']['tmp_name'], "$dir/$file");
            $photoUrl = "/uploads/$file";
        }

        // Insert into DB — note only one photo_url column now
        db()->prepare("INSERT INTO products(category, subcategory, name, description, price, photo_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([$category, $subcategory, $name, $description, $price, $photoUrl]);

        jsonResponse(['success' => true, 'id' => db()->lastInsertId()]);
    }


    public static function update($id){
        $data=json_decode(file_get_contents('php://input'),true)??[];
        db()->prepare("UPDATE products SET name=?,category=?,subcategory=?,description=?,price=? WHERE id=?")
            ->execute([$data['name']??'', $data['category']??'', $data['subcategory']??'', $data['description']??'', $data['price']??0, $id]);
        jsonResponse(['success'=>true]);
    }

    public static function destroy($id){
        db()->prepare("DELETE FROM products WHERE id=?")->execute([$id]);
        jsonResponse(['success'=>true]);
    }
}