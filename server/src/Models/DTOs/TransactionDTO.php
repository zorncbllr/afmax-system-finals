<?php

namespace Src\Models\DTOs;

class TransactionDTO
{
    public string $transactionId, $date, $user, $email, $description, $payment;
    public float $amount;
}
