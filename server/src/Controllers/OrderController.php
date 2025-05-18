<?php

namespace Src\Controllers;

use Src\Core\Exceptions\ServiceException;
use Src\Core\Exceptions\TransactionException;
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
        $isDeposit = $request->isDeposit ?? true;

        if (!$userId) {
            status(401);
            return json(["message" => "Cannot place order. User unauthenticated"]);
        }

        try {
            $checkout = $this->orderService->placeOrder($userId, $isDeposit);

            status(200);
            return json([
                "checkoutLink" => $checkout["checkoutLink"],
                "transactionId" => $checkout["transactionId"],
                "message" => "User order has been placed."
            ]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        } catch (TransactionException $e) {

            status(400);
            return json(["amount" => $e->getMessage()]);
        }
    }
}
