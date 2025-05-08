<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Models\Inventory;
use Src\Repositories\InventoryRepository;

class InventoryService
{
    protected InventoryRepository $inventoryRepository;

    public function __construct(protected Database $database)
    {
        $this->inventoryRepository = new InventoryRepository($this->database);
    }

    /** @return array<Inventory> */
    public function getInventoryData(): array
    {
        return $this->inventoryRepository->getInventoryData();
    }
}
