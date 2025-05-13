<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;

class OrderDetailRepository
{

    public function __construct(
        protected Database $database
    ) {}

    public function getAllOrderDetail() 
    {
        $stmt = $this->database->prepare("");

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}