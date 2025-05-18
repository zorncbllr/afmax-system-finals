<?php

namespace Src\Models;

class Invoice
{
    public int $invoiceId, $orderId, $transactionId;
    public string $description, $remarks;
}
