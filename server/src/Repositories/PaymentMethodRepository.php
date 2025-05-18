<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\PaymentMethod;

class PaymentMethodRepository
{
    public function __construct(
        protected Database $database
    ) {}

    public function getMethodByName(string $methodName): PaymentMethod|false
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM paymentMethods WHERE methodName = :methodName"
        );

        $stmt->execute(["methodName" => $methodName]);

        return $stmt->fetchObject(PaymentMethod::class);
    }


    public function createPaymentMethod(string $methodName): PaymentMethod
    {
        $stmt = $this->database->prepare(
            "INSERT INTO paymentMethods (methodName) VALUES (:methodName)"
        );

        $stmt->execute(["methodName" => $methodName]);

        $paymentMethod = new PaymentMethod();
        $paymentMethod->paymentMethodId = $this->database->lastInsertId();
        $paymentMethod->methodName = $methodName;

        return $paymentMethod;
    }
}
