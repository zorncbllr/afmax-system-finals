<?php

namespace Src\Models;

class Payment
{
    public int $paymentId, $paymentMethodId;
    public float $amount;
}
