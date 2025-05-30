<?php
namespace Controllers;
use PDO;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class OrderController
{
    /* ---------- create new order & send emails ---------- */
    public static function store()
    {
        $json = json_decode(file_get_contents('php://input'), true);
        $userId   = $json['user_id'];
        $items    = $json['items'];          // [{product_id, qty, price, name}]
        $total    = $json['total'];

        /* 1 — insert into orders */
        $db = db();
        $db->prepare("INSERT INTO orders (user_id,total) VALUES (?,?)")
            ->execute([$userId, $total]);
        $orderId = $db->lastInsertId();

        /* 2 — insert order_items */
        $stmt = $db->prepare(
            "INSERT INTO order_items (order_id,product_id,qty,price)
             VALUES (?,?,?,?)"
        );
        foreach ($items as $it) {
            $stmt->execute([$orderId, $it['product_id'], $it['qty'], $it['price']]);
        }

        /* 3 — email both admin & customer */
        self::sendMail($json['customer_email'], $orderId, $items, $total);

        jsonResponse(['success'=>true,'order_id'=>$orderId]);
    }

    private static function sendMail($customerEmail, $orderId, $items, $total)
    {
        $body = "<h3>Order #{$orderId}</h3><ul>";
        foreach ($items as $it) {
            $body .= "<li>{$it['name']} × {$it['qty']} – ₹{$it['price']}</li>";
        }
        $body .= "</ul><p><strong>Total: ₹{$total}</strong></p>";

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->Port       = $_ENV['SMTP_PORT'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'];
        $mail->Password   = $_ENV['SMTP_PASS'];

        $mail->setFrom('no-reply@promap.com','PROMAP');
        $mail->addAddress('prakritimksharma@gmail.com');   // admin copy
        $mail->addAddress($customerEmail);                 // customer

        $mail->isHTML(true);
        $mail->Subject = "New Order #{$orderId}";
        $mail->Body    = $body;
        $mail->send();
    }
}
