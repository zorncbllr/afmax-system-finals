<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Factories\CartDTOFactory;
use Src\Models\DTOs\CartDTO;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\ProductRepository;
use Src\Repositories\UserRepository;

class CartService
{

    public function __construct(
        protected Database $database,
        protected CartRepository $cartRepository,
        protected CartItemRepository $cartItemRepository,
        protected ProductRepository $productRepository,
        protected UserRepository $userRepository,
        protected CartDTOFactory $cartDTOFactory
    ) {}

    public function getUserCart(int $userId): CartDTO
    {
        $user = $this->userRepository->getUserById($userId);

        if (!$user) {
            throw new ServiceException("User does not exists.");
        }

        $cart = $this->cartRepository->findByUserId($user->userId);

        if (!$cart) {
            $cart = $this->cartRepository->createCart($user->userId);
        }

        $items = $this->cartItemRepository->getAllJoined($cart->cartId);

        if (empty($items)) {
            $cartDTO = new CartDTO();
            $cartDTO->cartId = $cart->cartId;
            $cartDTO->cartItems = [];

            return $cartDTO;
        }

        $cartDTO = $this->cartDTOFactory->makeCartDTO($items);

        return $cartDTO;
    }

    public function addToCart(int $productId, int $userId)
    {
        try {
            $this->database->beginTransaction();

            $cart = $this->cartRepository->findByUserId($userId);

            if (!$cart) {
                $cart = $this->cartRepository->createCart($userId);
            }

            $product = $this->productRepository->getProductById($productId);

            if (!$product) {
                throw new ServiceException("Product does not exist.");
            }

            $this->cartItemRepository->createItem($cart->cartId, $product->productId);

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
