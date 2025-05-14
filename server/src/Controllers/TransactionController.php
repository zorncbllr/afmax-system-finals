<?php

namespace Src\Controllers;

use GuzzleHttp\Client;
use Src\Core\App;
use Src\Services\TransactionService;
use Src\Repositories\TransactionRepository;

class TransactionController
{
    protected TransactionService $transactionService;

    public function __construct()
    {
        $database = App::getDatabase();

        $this->transactionService = new TransactionService(
            database: $database,
            transactionRepository: new TransactionRepository($database),
            client: new Client()
        );
    }

    public function index() {}
}
