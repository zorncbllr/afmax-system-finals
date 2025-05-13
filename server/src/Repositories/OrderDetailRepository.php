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
}
