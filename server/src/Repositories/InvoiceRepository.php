<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Invoice;

class InvoiceRepository
{

    public function __construct(
        protected Database $database
    ) {}

    public function getAllInvoice()
    {
        $stmt = $this->database->prepare("");

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function createInvoice(int $orderId, int $transactionId, string $description, string $remarks)
    {
        $stmt = $this->database->prepare(
            "INSERT INTO invoices(
                orderId,
                transactionId,
                description,
                remarks
            ) VALUES (
                :orderId,
                :transactionId,
                :description,
                :remarks
            )"
        );

        $stmt->execute([
            "orderId" => $orderId,
            "transactionId" => $transactionId,
            "description" => $description,
            "remarks" => $remarks
        ]);
    }
}
