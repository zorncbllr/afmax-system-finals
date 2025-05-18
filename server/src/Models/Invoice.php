<?php

namespace Src\Models;

class Invoice
{
    public int $invoiceId, $orderId;
    public string $transactionId;
    public string $description, $remarks;
}
