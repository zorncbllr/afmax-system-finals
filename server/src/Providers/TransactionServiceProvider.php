<?php

namespace Src\Providers;

use GuzzleHttp\Client;
use Src\Core\App;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\InventoryRepository;
use Src\Repositories\InvoiceRepository;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;
use Src\Repositories\PaymentMethodRepository;
use Src\Repositories\PaymentRepository;
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
            paymentRepository: new PaymentRepository($database),
            paymentMethodRepository: new PaymentMethodRepository($database),
            invoiceRepository: new InvoiceRepository($database),
            inventoryRepository: new InventoryRepository($database),
            cartItemRepository: new CartItemRepository($database),
            client: new Client()
        );
    }
}
