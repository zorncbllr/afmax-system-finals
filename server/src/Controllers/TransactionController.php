<?php

namespace Src\Controllers;

use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Providers\TransactionServiceProvider;
use Src\Services\TransactionService;

class TransactionController
{
    protected TransactionService $transactionService;

    public function __construct()
    {
        $this->transactionService = TransactionServiceProvider::makeTransactionService();
    }

    public function retrieveSuccessTransaction(Request $request)
    {
        try {
            $transactionId = $request->body->transactionId;
            $orderId = $request->body->orderId;

            $this->transactionService->handleSuccessPayment($transactionId, $orderId);

            status(200);
            return json(["message" => "Payment Transaction status has been updated."]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function retrieveFailedTransaction(Request $request)
    {
        try {
            $orderId = $request->body->orderId;

            $error = $this->transactionService->handleFailedPayment($orderId);

            status(200);
            return json(["message" => $error]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }
}
