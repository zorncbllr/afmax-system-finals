<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\CartDTOFactory;
use Src\Factories\ProductDTOFactory;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\ProductRepository;
use Src\Repositories\UserRepository;
use Src\Services\CartService;

class CartServiceProvider
{
    public static function makeCartService()
    {
        $database =  App::getDatabase();

        return new CartService(
            database: $database,
            cartItemRepository: new CartItemRepository($database),
            cartRepository: new CartRepository($database),
            userRepository: new UserRepository($database),
            productRepository: new ProductRepository($database),
            cartDTOFactory: new CartDTOFactory(new ProductDTOFactory())
        );
    }
}
