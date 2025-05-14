<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\OrderDetail;

class OrderDetailRepository
{

    public function __construct(
        protected Database $database
    ) {}

    /** @return array<OrderDetail> */
    public function getOrderDetails(int $orderId): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM orderDetails WHERE orderId = :orderId"
        );

        $stmt->execute(["orderId" => $orderId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, OrderDetail::class);
    }

    public function addProductOrder(OrderDetail $orderDetail)
    {
        $stmt = $this->database->prepare(
            "INSERT INTO orderDetails (orderId, productId, quantity)
            VALUES (:orderId, :productId, :quantity)"
        );

        $stmt->execute([
            "orderId" => $orderDetail->orderId,
            "productId" => $orderDetail->productId,
            "quantity" => $orderDetail->quantity
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function clearOrderDetails(int $orderId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM orderDetails WHERE orderId = :orderId"
        );

        $stmt->execute(["orderId" => $orderId]);
    }
}
