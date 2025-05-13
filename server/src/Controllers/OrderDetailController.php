<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Services\OrderDetailService;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;

class OrderDetailController
{
    protected OrderDetailService $orderDetailService;

    public function __construct()
    {
        $database = App::getDatabase();

        $this->orderDetailService = new OrderDetailService(
            database: $database,
            orderRepository: new OrderRepository($database),
            orderDetailRepository: new OrderDetailRepository($database)
        );
    }

    public function addProductOrder() {}
}
