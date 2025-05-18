<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\Payment;

class PaymentRepository
{
    public function __construct(
        protected Database $database
    ) {}

    public function createPayment(float $amount, int $paymentMethodId): Payment
    {
        $stmt = $this->database->prepare(
            "INSERT INTO payments (amount, paymentMethodId) 
            VALUES (:amount, :paymentMethodId)"
        );

        $stmt->execute([
            "amount" => $amount,
            "paymentMethodId" => $paymentMethodId
        ]);

        $payment = new Payment();
        $payment->paymentId = $this->database->lastInsertId();
        $payment->amount = $amount;
        $payment->paymentMethodId = $paymentMethodId;

        return $payment;
    }
}
