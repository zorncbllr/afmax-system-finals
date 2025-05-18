<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\DTOs\OrderDTO;
use Src\Models\Order;

class OrderRepository
{

    public function __construct(
        protected Database $database
    ) {}

    /** @return array<OrderDTO> */
    public function getAllOrders(): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
                u.`fullName` AS user,
                u.`email`,
                o.`orderId`,
                GROUP_CONCAT(
                    CONCAT(od.quantity, 'x ', p.`productName`) 
                    ORDER BY p.`productName` 
                    SEPARATOR ', '
                ) AS orderList,
                SUM(od.quantity * p.price) AS totalAmount
            FROM `orderDetails` od 
            JOIN products p ON p.`productId` = od.`productId`
            JOIN orders o ON od.`orderId` = o.`orderId`
            JOIN carts c ON c.`cartId` = o.`cartId`
            JOIN users u ON u.`userId` = c.`userId`
            GROUP BY u.`userId`, o.`orderId`"
        );

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, OrderDTO::class);
    }

    public function getOrderById(int $orderId): Order|false
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM orders WHERE orderId = :orderId"
        );

        $stmt->execute(["orderId" => $orderId]);

        return $stmt->fetchObject(Order::class);
    }

    public function getOrderDTOById(int $orderId): OrderDTO|false
    {
        $stmt = $this->database->prepare(
            "SELECT 
                u.`fullName` AS user,
                u.`email`,
                o.`orderId`,
                GROUP_CONCAT(
                    CONCAT(od.quantity, 'x ', p.`productName`) 
                    ORDER BY p.`productName` 
                    SEPARATOR ', '
                ) AS orderList,
                SUM(od.quantity * p.price) AS totalAmount
            FROM `orderDetails` od 
            JOIN products p ON p.`productId` = od.`productId`
            JOIN orders o ON od.`orderId` = o.`orderId`
            JOIN carts c ON c.`cartId` = o.`cartId`
            JOIN users u ON u.`userId` = c.`userId`
            WHERE o.`orderId` = :orderId 
            GROUP BY u.`userId`, o.`orderId`"
        );

        $stmt->execute(["orderId" => $orderId]);

        return $stmt->fetchObject(OrderDTO::class);
    }

    public function createOrder(int $cartId, float $amountDue): Order
    {
        $stmt = $this->database->prepare(
            "INSERT INTO orders (cartId, amountDue)
            VALUES (:cartId, :amountDue)"
        );

        $stmt->execute([
            "cartId" => $cartId,
            "amountDue" => $amountDue
        ]);

        $order = new Order();
        $order->amountDue = $amountDue;
        $order->cartId = $cartId;
        $order->orderId = $this->database->lastInsertId();

        return $order;
    }

    public function updateOrder(int $orderId, float $amountDue)
    {
        $stmt = $this->database->prepare(
            "UPDATE orders SET amountdue = :amountDue WHERE orderId = :orderId"
        );

        $stmt->execute([
            "orderId" => $orderId,
            "amountDue" => $amountDue
        ]);
    }

    public function deleteOrder(int $orderId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM orders WHERE orderId = :orderId"
        );

        $stmt->execute(["orderId" => $orderId]);
    }
}
