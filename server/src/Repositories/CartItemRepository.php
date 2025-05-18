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
    public function getAllCartItems(int $cartId): array
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM cartItems 
            WHERE cartId = :cartId"
        );

        $stmt->execute(["cartId" => $cartId]);

        return $stmt->fetchAll(PDO::FETCH_CLASS, CartItem::class);
    }

    public function getExistingItem(int $productId, int $cartId): CartItem|false
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM cartItems 
            WHERE cartId = :cartId 
            AND productId = :productId"
        );

        $stmt->execute([
            "cartId" => $cartId,
            "productId" => $productId
        ]);

        return $stmt->fetchObject(CartItem::class);
    }

    public function getAllJoined(int $cartId): array
    {
        $stmt = $this->database->prepare(
            "SELECT 
                ci.cartItemId,
                ci.quantity,
                ci.cartId,
                p.productId,
                p.productName,
                p.brand,
                p.price,
                p.isFeatured,
                p.image,
                p.categories,
                unitName as unit
            FROM `cartItems` ci
            JOIN (
                SELECT 
                    p.productId,
                    p.productName,
                    b.brandName AS brand,
                    p.price,
                    p.isFeatured,
                    pi.imagePath AS image,
                    GROUP_CONCAT(DISTINCT c.categoryName) AS categories
                FROM products p
                JOIN brands b ON b.brandId = p.brandId
                LEFT JOIN (
                    SELECT productId, MIN(productImageId) AS firstImageId
                    FROM productImages
                    GROUP BY productId
                ) firstImages ON firstImages.productId = p.productId
                LEFT JOIN productImages pi ON pi.productImageId = firstImages.firstImageId
                LEFT JOIN productCategories pc ON p.productId = pc.productId
                LEFT JOIN categories c ON pc.categoryId = c.categoryId
                GROUP BY p.`productId`
            ) p ON p.`productId` =  ci.`productId`
            LEFT JOIN units u ON u.`unitId` = ci.`unitId`
            WHERE ci.`cartId` = :cartId"
        );

        $stmt->execute(["cartId" => $cartId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createItem(int $cartId, int $productId, int $quantity, int $unitId): CartItem
    {
        $stmt = $this->database->prepare(
            "INSERT INTO cartItems (cartId, productId, quantity, unitId)
            VALUES (:cartId, :productId, :quantity, :unitId)"
        );

        $stmt->execute([
            "unitId" => $unitId,
            "cartId" => $cartId,
            "productId" => $productId,
            "quantity" => $quantity
        ]);

        $cartItem = new CartItem();
        $cartItem->cartItemId = $this->database->lastInsertId();
        $cartItem->cartId = $cartId;
        $cartItem->unitId = $unitId;
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

    public function updateItem(int $cartItemId, int $quantity)
    {
        $stmt = $this->database->prepare(
            "UPDATE cartItems 
            SET quantity = :quantity
            WHERE cartItemId = :cartItemId"
        );

        $stmt->execute([
            "cartItemId" => $cartItemId,
            "quantity" => $quantity
        ]);
    }

    public function removeItem(int $cartItemId)
    {
        $stmt = $this->database->prepare(
            "DELETE FROM cartItems WHERE cartItemId = :cartItemId"
        );

        $stmt->execute(["cartItemId" => $cartItemId]);
    }
}
