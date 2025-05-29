<?php
namespace Controllers;
use PDO;

class OrderController {
    public static function index() {
        $q = db()->prepare(
            "SELECT o.id AS order_id, o.created_at, oi.qty, oi.price,
                    p.id AS product_id, p.name
             FROM orders o
             JOIN order_items oi ON oi.order_id = o.id
             JOIN products p ON p.id = oi.product_id
             ORDER BY o.created_at DESC"
        );
        $q->execute();
        $rows = $q->fetchAll(PDO::FETCH_OBJ);
        $orders = [];
        foreach ($rows as $r) {
            $oid = $r->order_id;
            if (!isset($orders[$oid])) {
                $orders[$oid] = ['order_id'=>$oid,'created_at'=>$r->created_at,'items'=>[]];
            }
            $orders[$oid]['items'][] = [
                'product_id'=>$r->product_id,
                'name'=>$r->name,
                'qty'=>$r->qty,
                'price'=>$r->price
            ];
        }
        jsonResponse(array_values($orders));
    }
}