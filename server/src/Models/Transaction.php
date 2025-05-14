<?php

namespace Src\Models;

class Transaction
{
    public string $transactionId;
    public int $orderId;
    public string $checkOutUrl;
    public float $amount;
    public string $description;
    public string $status;
    public string $remarks;
    public string|null $referenceNumber;
    public string $createdAt;
    public string $updatedAt;
}
