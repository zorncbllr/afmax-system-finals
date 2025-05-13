<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Order;

class OrderRepository
{

    public function __construct(
        protected Database $database
    ) {}

    public function getOrderById(int $orderId) {}

    public function createOrder(int $userId): Order
    {
        $stmt = $this->database->prepare(
            "INSERT INTO orders (userId)
            VALUES (:userId)"
        );

        $stmt->execute(["userId" => $userId]);

        $order = new Order();

        $order->orderId = $this->database->lastInsertId();

        return $order;
    }
}
