<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;
use Src\Models\Cart;

class CartRepository
{

    public function __construct(
        protected Database $database
    ) {}

    public function getAllCart()
    {
        $stmt = $this->database->prepare("");

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function findByUserId(int $userId): Cart|false
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM carts WHERE userId = userId"
        );

        $stmt->execute(["userId" => $userId]);

        return $stmt->fetchObject(Cart::class);
    }

    public function createCart(int $userId): Cart
    {
        $stmt = $this->database->prepare(
            "INSERT INTO carts (userId)
            VALUES (:userId)"
        );

        $stmt->execute(["userId" => $userId]);

        $cart = new Cart();
        $cart->cartId = $this->database->lastInsertId();
        $cart->userId = $userId;

        return $cart;
    }
}
