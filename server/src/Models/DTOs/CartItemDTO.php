<?php

namespace Src\Models\DTOs;

class CartItemDTO
{
    public int $cartItemId, $quantity;
    public string $unit;
    public ProductDTO $product;
}
