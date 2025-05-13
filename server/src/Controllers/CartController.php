<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Factories\CartDTOFactory;
use Src\Factories\ProductDTOFactory;
use Src\Repositories\CartItemRepository;
use Src\Services\CartService;
use Src\Repositories\CartRepository;

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
            cartDTOFactory: new CartDTOFactory(new ProductDTOFactory())
        );
    }

    public function index() {}
}
