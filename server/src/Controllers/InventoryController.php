<?php

namespace Src\Controllers;

use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Providers\InventoryServiceProvider;
use Src\Services\InventoryService;

class InventoryController
{
    protected InventoryService $inventoryService;

    public function __construct()
    {
        $this->inventoryService = InventoryServiceProvider::makeInventoryService();
    }


    public function getInventoryData()
    {
        $inventoryData = $this->inventoryService->getInventoryData();

        status(200);
        return json($inventoryData);
    }

    public function createNewInventory(Request $request)
    {
        try {
            $this->inventoryService->createNewInventory($request);

            status(200);
            return json(["message" => "Created new inventory item."]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }
}
