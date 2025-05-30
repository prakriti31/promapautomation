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
        if (!$name || !$category || !$subcategory || !$price) {
            jsonResponse(['error'=>'Missing required fields'],422); return;
        }
        $photos = [];
        $dir = __DIR__.'/../../uploads';
        if(!is_dir($dir)) mkdir($dir,0755,true);
        foreach(['photo1','photo2','photo3'] as $key){
            if(!empty($_FILES[$key]['tmp_name'])){
                $file = uniqid().'-'.basename($_FILES[$key]['name']);
                move_uploaded_file($_FILES[$key]['tmp_name'],"$dir/$file");
                $photos[]="/uploads/$file";
            } else $photos[] = null;
        }
        db()->prepare("INSERT INTO products(category,subcategory,name,description,price,photo_url,photo_url2,photo_url3) VALUES(?,?,?,?,?,?,?,?)")
            ->execute([$category,$subcategory,$name,$description,$price,$photos[0],$photos[1],$photos[2]]);
        jsonResponse(['success'=>true,'id'=>db()->lastInsertId()]);
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