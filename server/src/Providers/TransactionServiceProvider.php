<?php

namespace Src\Providers;

use GuzzleHttp\Client;
use Src\Core\App;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;
use Src\Repositories\TransactionRepository;
use Src\Services\TransactionService;

class TransactionServiceProvider
{
    public static function makeTransactionService(): TransactionService
    {
        $database = App::getDatabase();

        return new TransactionService(
            database: $database,
            transactionRepository: new TransactionRepository($database),
            orderRepository: new OrderRepository($database),
            orderDetailRepository: new OrderDetailRepository($database),
            cartRepository: new CartRepository($database),
            cartItemRepository: new CartItemRepository($database),
            client: new Client()
        );
    }
}
