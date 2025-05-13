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

    public function deleteCartItem(Request $request)
    {
        $validator = new Validator();

        $rules = [
            "userId" => "required|numeric|min:1",
            "cartItemId" => "required|numeric|min:1",
        ];

        $validation = $validator->validate([
            "userId" => $request->authId,
            "cartItemId" => $request->params->cartItemId,
        ], $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        try {
            $this->cartService->deleteCartItem(
                cartItemId: $request->params->cartItemId,
                userId: $request->authId
            );

            status(200);
            return json(["message" => "Item has been removed from cart."]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function updateCartItem(Request $request)
    {
        $userId = $request->authId;
        $productId = $request->body->productId;
        $quantity = $request->body->quantity;

        try {
            $this->cartService->updateItem($productId, $userId, $quantity);

            status(200);
            return json(["message" => "Item quantity has been updated."]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }
}
