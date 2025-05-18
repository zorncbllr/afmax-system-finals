<?php

namespace Src\Models;

class Transaction
{
    public string $transactionId;
    public int $paymentId, $orderId;
    public string $createdAt;
}
