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

    public function getInventoryDataById(int $inventoryId)
    {
        try {
            $inventoryData = $this
                ->inventoryService
                ->getInventoryById($inventoryId);

            status(200);
            return json($inventoryData);
        } catch (ServiceException $e) {

            status(404);
            return json(["message" => $e->getMessage()]);
        }
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

    public function deleteInventory(Request $request)
    {
        try {
            $this
                ->inventoryService
                ->deleteInventory(
                    inventoryId: (int) $request->params->inventoryId
                );

            status(200);
            return json(["message" => "Inventory item has been deleted."]);
        } catch (ServiceException $e) {

            status(400);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function updateInventory(Request $request)
    {
        return json($request);
    }
}
