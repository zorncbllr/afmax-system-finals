<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Transaction;

class TransactionRepository
{

    public function __construct(
        protected Database $database
    ) {}

    public function getAllTransaction()
    {
        $stmt = $this->database->prepare("");

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTransactionById(string $transactionId): Transaction|false
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM transactions WHERE transactionId = :transactionId"
        );

        $stmt->execute(["transactionId" => $transactionId]);

        return $stmt->fetchObject(Transaction::class);
    }

    public function createTransaction(string $transactionId, int $paymentId, int $orderId): Transaction
    {
        $stmt = $this->database->prepare(
            "INSERT INTO transactions (transactionId, paymentId, orderId) 
            VALUES (:transactionId, :paymentId, :orderId)"
        );

        $stmt->execute([
            "transactionId" => $transactionId,
            "orderId" => $orderId,
            "paymentId" => $paymentId,
        ]);

        $transaction = new Transaction();
        $transaction->orderId = $orderId;
        $transaction->paymentId = $paymentId;
        $transaction->transactionId = $transactionId;

        return $transaction;
    }
}
