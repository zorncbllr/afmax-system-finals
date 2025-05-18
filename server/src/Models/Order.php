<?php

namespace Src\Models;

class Order
{
    public int $orderId, $cartId;
    public float $amountDue;
    public string $createdAt, $updatedAt;
}
