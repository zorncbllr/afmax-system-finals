<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Core\Interfaces\IResource;
use Src\Core\Request;
use Src\Services\InventoryService;

class InventoryController implements IResource
{
    protected InventoryService $inventoryService;

    public function __construct()
    {
        $this->inventoryService = new InventoryService(App::getDatabase());
    }


    public function getAll(Request $request)
    {
        $inventoryData = $this->inventoryService->getInventoryData();

        status(200);
        return json($inventoryData);
    }

    public function getById(Request $request, string $id) {}

    public function create(Request $request) {}

    public function update(Request $request, string $id) {}

    public function delete(Request $request, string $id) {}
}
