<?php

namespace Src\Controllers;

use Rakit\Validation\Validator;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Providers\CartServiceProvider;
use Src\Services\CartService;


class CartController
{
    protected CartService $cartService;

    public function __construct()
    {
        $this->cartService = CartServiceProvider::makeCartService();
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
        $unit = $request->body->unit;

        try {
            $this->cartService->addToCart($productId, $userId, $quantity, $unit);

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
