<?php
namespace Controllers;

use PDO;

class ProductController
{
    /* ---------- list all products ---------- */
    public static function index()
    {
        $q = db()->query("SELECT * FROM products ORDER BY created_at DESC");
        jsonResponse($q->fetchAll(PDO::FETCH_OBJ));
    }

    /* ---------- create product (photos optional) ---------- */
    public static function store()
    {
        $name        = $_POST['name']        ?? '';
        $category    = $_POST['category']    ?? '';
        $description = $_POST['description'] ?? '';
        $price       = $_POST['price']       ?? '';

        if (!$name || !$category || !$price) {
            jsonResponse(['error' => 'Missing required fields'], 422);
            return;
        }

        /* ---- handle up to 3 photos ---- */
        $photos = [];
        $uploadsDir = __DIR__ . '/../../uploads';
        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0755, true);
        }

        foreach (['photo1', 'photo2', 'photo3'] as $key) {
            if (!empty($_FILES[$key]['tmp_name'])) {
                $tmp      = $_FILES[$key]['tmp_name'];
                $filename = uniqid() . '-' . basename($_FILES[$key]['name']);
                move_uploaded_file($tmp, "$uploadsDir/$filename");
                $photos[] = "/uploads/$filename";
            } else {
                $photos[] = null;             // keep array length 3
            }
        }

        $stmt = db()->prepare(
            "INSERT INTO products
             (category, name, description, price, photo_url, photo_url2, photo_url3)
             VALUES (?,?,?,?,?,?,?)"
        );
        $stmt->execute([
            $category,
            $name,
            $description,
            $price,
            $photos[0],
            $photos[1],
            $photos[2],
        ]);

        jsonResponse(['success' => true, 'id' => db()->lastInsertId()]);
    }

    /* ---------- update basic details (no photo change) ---------- */
    public static function update($id)
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $stmt = db()->prepare(
            "UPDATE products
             SET name = ?, category = ?, description = ?, price = ?
             WHERE id = ?"
        );
        $stmt->execute([
            $data['name']        ?? '',
            $data['category']    ?? '',
            $data['description'] ?? '',
            $data['price']       ?? 0,
            $id,
        ]);
        jsonResponse(['success' => true]);
    }

    /* ---------- delete ---------- */
    public static function destroy($id)
    {
        db()->prepare("DELETE FROM products WHERE id = ?")->execute([$id]);
        jsonResponse(['success' => true]);
    }
}
