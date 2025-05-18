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
            $transactionId = $request->body->transactionId ?? null;

            if (!$transactionId) {
                status(400);
                return json(["message" => "TransactionId is required to verify transaction."]);
            }

            $this->transactionService->handleSuccessPayment($transactionId);

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
            $transactionId = $request->body->transactionId ?? null;

            if (!$transactionId) {
                status(400);
                return json(["message" => "TransactionId is required to verify transaction."]);
            }

            $error = $this->transactionService->handleFailedPayment($transactionId);

            status(200);
            return json(["message" => $error["message"]]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }
}
