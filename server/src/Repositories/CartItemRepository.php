<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\CartItem;

class CartItemRepository
{

    public function __construct(
        protected Database $database
    ) {}

    /** @return array<CartItem> */
    public function getAllCartItem(int $cartId): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM cartItems 
            WHERE cartId = :cartId"
        );

        $stmt->execute(["cartId" => $cartId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, CartItem::class);
    }

    public function getAllJoined(int $cartId)
    {
        $stmt = $this->database->prepare(
            "SELECT 
            c.cartId,"
        );
    }

    public function createItem(int $cartId, int $productId): CartItem
    {
        $stmt = $this->database->prepare(
            "INSERT INTO cartItems (cartId, productId)
            VALUES (:cartId, :productId)"
        );

        $stmt->execute([
            "cartId" => $cartId,
            "productId" => $productId
        ]);

        $cartItem = new CartItem();
        $cartItem->cartItemId = $this->database->lastInsertId();
        $cartItem->cartId = $cartId;
        $cartItem->productId = $productId;

        return $cartItem;
    }

    public function clearItems(int $cartId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM cartItems WHERE cartId = :cartId"
        );

        $stmt->execute(["cartId" => $cartId]);
    }
}
