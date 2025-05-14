<?php

namespace Src\Controllers;

use PDOException;
use Src\Core\Request;
use Src\Providers\OrderServiceProvider;
use Src\Services\OrderService;

class OrderController
{
    protected OrderService $orderService;

    public function __construct()
    {
        $this->orderService = OrderServiceProvider::makeOrderService();
    }

    public function getAllOrders()
    {
        $orders = $this->orderService->getAllOrders();

        status(200);
        return json($orders);
    }

    public function placeOrder(Request $request)
    {
        $userId = $request->authId ?? null;

        if (!$userId) {
            status(401);
            return json(["message" => "Cannot place order. User unauthenticated"]);
        }

        try {
            $checkOutLink = $this->orderService->placeOrder($userId);

            status(200);
            return json(["checkOutLink" => $checkOutLink, "message" => "User order has been placed."]);
        } catch (PDOException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }
}
