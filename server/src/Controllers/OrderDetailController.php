<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Services\OrderDetailService;
use Src\Repositories\OrderDetailRepository;

class OrderDetailController
{
    protected OrderDetailService $orderDetailService;

    public function __construct() 
    {
        $database = App::getDatabase();

        $this->orderDetailService = new OrderDetailService(
            database: $database,
            orderDetailRepository: new OrderDetailRepository($database)
        );
    }

    public function index() {}

}