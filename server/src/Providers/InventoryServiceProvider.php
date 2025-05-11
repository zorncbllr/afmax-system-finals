<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\InventoryDTOFactory;
use Src\Repositories\InventoryRepository;
use Src\Repositories\UnitRepository;
use Src\Services\InventoryService;

class InventoryServiceProvider
{
    public static function makeInventoryService(): InventoryService
    {
        $database = App::getDatabase();

        return new InventoryService(
            database: $database,
            inventoryRepository: new InventoryRepository($database),
            unitRepository: new UnitRepository($database),
            inventoryDTOFactory: new InventoryDTOFactory()
        );
    }
}
