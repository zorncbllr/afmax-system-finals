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

    public function updateStatus(string $status, string $transactionId)
    {
        $stmt = $this->database->prepare(
            "UPDATE transactions SET status = :status 
            WHERE transactionId = :transactionId"
        );

        $stmt->execute([
            'transactionId' => $transactionId,
            "status" => $status
        ]);
    }

    public function createTransaction(Transaction $transaction)
    {
        $stmt = $this->database->prepare(
            "INSERT INTO transactions (
                transactionId,
                userId,
                checkOutUrl,
                amount,
                description,
                status,
                remarks,
                referenceNumber
            ) VALUES (
                :transactionId,
                :userId,
                :checkOutUrl,
                :amount,
                :description,
                :status,
                :remarks,
                :referenceNumber
            )"
        );

        $stmt->execute([
            "transactionId" => $transaction->transactionId,
            "userId" => $transaction->userId,
            "checkOutUrl" => $transaction->checkOutUrl,
            "amount" => $transaction->amount,
            "description" => $transaction->description,
            "status" => $transaction->status,
            "remarks" => $transaction->remarks,
            "referenceNumber" => $transaction->referenceNumber
        ]);

        return $transaction;
    }
}
