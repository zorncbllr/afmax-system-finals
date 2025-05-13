<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Repositories\OrderDetailRepository;

class OrderDetailService
{

    public function __construct(
        protected Database $database,
        protected OrderDetailRepository $orderDetailRepository
    ) {}

    public function index() {}

}