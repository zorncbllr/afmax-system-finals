<?php

namespace Src\Models\DTOs;

class CartItemDTO
{
    public int $cartItemId, $quantity;
    public ProductDTO $product;
}
