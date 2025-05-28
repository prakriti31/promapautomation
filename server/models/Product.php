<?php
namespace Models;

class Product {
    public static function all() {
        return db()->query("SELECT * FROM products ORDER BY created_at DESC")->fetchAll(\PDO::FETCH_OBJ);
    }
    public static function create($data) {
        $sql = "INSERT INTO products (category,name,description,price,photo_url) VALUES (?,?,?,?,?)";
        db()->prepare($sql)->execute([
            $data['category'],$data['name'],$data['description'],$data['price'],$data['photo_url']
        ]);
    }
    public static function update($id,$data) {
        $sql = "UPDATE products SET category=?,name=?,description=?,price=?,photo_url=? WHERE id=?";
        db()->prepare($sql)->execute([
            $data['category'],$data['name'],$data['description'],$data['price'],$data['photo_url'],$id
        ]);
    }
    public static function delete($id) {
        db()->prepare("DELETE FROM products WHERE id=?")->execute([$id]);
    }
}
