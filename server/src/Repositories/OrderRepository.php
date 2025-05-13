<?php

namespace Src\Repositories;

use Src\Core\Database;

class OrderRepository
{

    public function __construct(
        protected Database $database
    ) {}

    public function index() {}

}