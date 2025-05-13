<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Factories\CartDTOFactory;
use Src\Models\DTOs\CartDTO;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;

class CartService
{

    public function __construct(
        protected Database $database,
        protected CartRepository $cartRepository,
        protected CartItemRepository $cartItemRepository,
        protected CartDTOFactory $cartDTOFactory
    ) {}

    // public function getAllCartItems(): CartDTO {}

    public function addToCart(int $productId, int $userId)
    {
        try {
            $this->database->beginTransaction();

            $cart = $this->cartRepository->findByUserId($userId);

            if (!$cart) {
                $cart = $this->cartRepository->createCart($userId);
            }

            $this->cartItemRepository->createItem($cart->cartId, $productId);

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();

            throw new ServiceException("Unable to add item to cart.", 500);
        }
    }

    public function createCart(int $userId)
    {
        try {
            $this->cartRepository->createCart($userId);
        } catch (PDOException $e) {

            throw new ServiceException("Unable to create cart for user with id = $userId.", 500);
        }
    }
}
