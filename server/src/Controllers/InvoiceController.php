<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Services\InvoiceService;
use Src\Repositories\InvoiceRepository;

class InvoiceController
{
    protected InvoiceService $invoiceService;

    public function __construct() 
    {
        $database = App::getDatabase();

        $this->invoiceService = new InvoiceService(
            database: $database,
            invoiceRepository: new InvoiceRepository($database)
        );
    }

    public function index() {}

}