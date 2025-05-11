<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\InventoryDTOFactory;
use Src\Repositories\InventoryRepository;
use Src\Services\InventoryService;

class InventoryServiceProvider
{
    public static function makeInventoryService(): InventoryService
    {
        $database = App::getDatabase();

        return new InventoryService(
            database: $database,
            inventoryRepository: new InventoryRepository($database),
            inventoryDTOFactory: new InventoryDTOFactory()
        );
    }
}
