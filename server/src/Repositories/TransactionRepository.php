<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\DTOs\TransactionDTO;
use Src\Models\Transaction;

class TransactionRepository
{

    public function __construct(
        protected Database $database
    ) {}

    /** @return array<TransactionDTO> */
    public function getAllTransactions(): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
                t.`transactionId`,  
                `fullName` as user, 
                email, 
                amount, 
                methodName as payment,
                description,
                t.`createdAt` as date
            FROM transactions t
            JOIN orders o ON t.`orderId` = o.`orderId`
            JOIN carts c ON c.`cartId` = o.`cartId`
            JOIN users u ON u.`userId` = c.`userId`
            JOIN payments p ON p.`paymentId` = t.`paymentId`
            JOIN invoices i ON i.`orderId` = o.`orderId`
            JOIN `paymentMethods` pm ON pm.`paymentMethodId` = p.`paymentMethodId`"
        );

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, TransactionDTO::class);
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
