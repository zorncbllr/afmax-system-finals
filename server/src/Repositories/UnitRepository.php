<?php

namespace Src\Repositories;

use Src\Core\Database;

class UnitRepository
{

    public function __construct(protected Database $database) {}
}
