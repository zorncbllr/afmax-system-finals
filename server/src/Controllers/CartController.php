<?php

namespace Src\Controllers;

use Rakit\Validation\Validator;
use Src\Core\App;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Factories\CartDTOFactory;
use Src\Factories\ProductDTOFactory;
use Src\Repositories\CartItemRepository;
use Src\Services\CartService;
use Src\Repositories\CartRepository;
use Src\Repositories\ProductRepository;
use Src\Repositories\UserRepository;

class CartController
{
    protected CartService $cartService;

    public function __construct()
    {
        $database = App::getDatabase();

        $this->cartService = new CartService(
            database: $database,
            cartItemRepository: new CartItemRepository($database),
            cartRepository: new CartRepository($database),
            userRepository: new UserRepository($database),
            productRepository: new ProductRepository($database),
            cartDTOFactory: new CartDTOFactory(new ProductDTOFactory())
        );
    }

    public function getUserCart(Request $request)
    {
        $userId = $request->authId;

        try {
            $cart = $this->cartService->getUserCart($userId);

            status(200);
            return json($cart);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function addItemToCart(Request $request)
    {
        $userId = $request->authId;
        $productId = $request->body->productId;
        $quantity = $request->body->quantity;

        try {
            $this->cartService->addToCart($productId, $userId, $quantity);

            status(200);
            return json(["message" => "Item has been added to cart."]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }
}
