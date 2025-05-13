<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;

class OrderDetailService
{

    public function __construct(
        protected Database $database,
        protected OrderRepository $orderRepository,
        protected OrderDetailRepository $orderDetailRepository
    ) {}

    public function addProductOrder(int $productId, int $quantity) {}
}
