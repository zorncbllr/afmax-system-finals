<?php

namespace Src\Models\DTOs;

class CartDTO
{
    public int $cartId;

    /** @var array<CartItemDTO> */
    public array $cartItems;
}
