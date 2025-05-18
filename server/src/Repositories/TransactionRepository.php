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

    public function createTransaction(int $paymentId, int $orderId): Transaction
    {
        $stmt = $this->database->prepare(
            "INSERT INTO transactions (paymentId, orderId) VALUES (:paymentId, :orderId)"
        );

        $stmt->execute([
            "orderId" => $orderId,
            "transactionId" => $paymentId,
        ]);

        $transaction = new Transaction();
        $transaction->orderId = $orderId;
        $transaction->paymentId = $paymentId;
        $transaction->transactionId = $this->database->lastInsertId();

        return $transaction;
    }
}
