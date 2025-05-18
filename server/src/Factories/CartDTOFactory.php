<?php

namespace Src\Factories;

use Src\Models\DTOs\CartDTO;
use Src\Models\DTOs\CartItemDTO;

class CartDTOFactory
{
    public function __construct(
        protected ProductDTOFactory $productDTOFactory
    ) {}

    public function makeCartDTO(array $rows): CartDTO
    {
        $cart = new CartDTO();
        $cart->cartId = $rows[0]["cartId"];
        $cart->cartItems = [];

        $sum = 0;

        foreach ($rows as $row) {
            $cartItem = new CartItemDTO();
            $cartItem->cartItemId = $row["cartItemId"];
            $cartItem->product = $this->productDTOFactory->makeProductDTO($row);
            $cartItem->quantity = $row["quantity"];
            $cartItem->unit = $row["unit"];

            $sum = $sum + ($cartItem->product->price * $cartItem->quantity);

            array_push($cart->cartItems, $cartItem);
        }

        $cart->totalPrice = $sum;

        return $cart;
    }
}
