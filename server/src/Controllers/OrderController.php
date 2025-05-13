<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Services\OrderService;
use Src\Repositories\OrderRepository;

class OrderController
{
    protected OrderService $orderService;

    public function __construct() 
    {
        $database = App::getDatabase();

        $this->orderService = new OrderService(
            database: $database,
            orderRepository: new OrderRepository($database)
        );
    }

    public function index() {}

}