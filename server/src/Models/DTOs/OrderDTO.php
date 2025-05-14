<?php

namespace Src\Models\DTOs;

class OrderDTO
{
    public int $orderId;
    public string $orderList, $user, $email;
    public float $totalAmount;
}
