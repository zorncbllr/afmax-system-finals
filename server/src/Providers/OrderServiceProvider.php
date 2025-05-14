<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;
use Src\Repositories\UserRepository;
use Src\Services\OrderService;

class OrderServiceProvider
{
    public static function makeOrderService()
    {
        $database = App::getDatabase();

        return new OrderService(
            database: $database,
            orderRepository: new OrderRepository($database),
            orderDetailRepository: new OrderDetailRepository($database),
            userRepository: new UserRepository($database),
            cartRepository: new CartRepository($database),
            cartItemRepository: new CartItemRepository(($database))
        );
    }
}
