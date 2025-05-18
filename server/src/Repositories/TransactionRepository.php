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

    public function createTransaction(int $paymentId): Transaction
    {
        $stmt = $this->database->prepare(
            "INSERT INTO transactions (paymentId) VALUES (:paymentId)"
        );

        $stmt->execute([
            "transactionId" => $paymentId,
        ]);

        $transaction = new Transaction();
        $transaction->paymentId = $paymentId;
        $transaction->transactionId = $this->database->lastInsertId();

        return $transaction;
    }
}
