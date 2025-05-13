<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Repositories\InvoiceRepository;

class InvoiceService
{

    public function __construct(
        protected Database $database,
        protected InvoiceRepository $invoiceRepository
    ) {}

    public function index() {}

}