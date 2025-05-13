<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Repositories\OrderRepository;

class OrderService
{

    public function __construct(
        protected Database $database,
        protected OrderRepository $orderRepository
    ) {}

    public function index() {}

}