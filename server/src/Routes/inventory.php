<?php

use Src\Controllers\InventoryController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;

return function (Router $router) {

    $router
        ->route("/inventory")
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->get([InventoryController::class, "getInventoryData"])
        ->post([InventoryController::class, "createNewInventory"]);

    $router
        ->route("/inventory/{inventoryId}")
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->get([InventoryController::class, "getInventoryDataById"])
        ->delete([InventoryController::class, 'deleteInventory'])
        ->patch([InventoryController::class, 'updateInventory']);
};
