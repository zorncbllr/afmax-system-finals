<?php

use Src\Controllers\InventoryController;
use Src\Core\Router;

return function (Router $router) {

    $router
        ->route("/inventory")
        ->get([InventoryController::class, "getInventoryData"])
        ->post([InventoryController::class, "createNewInventory"]);
};
