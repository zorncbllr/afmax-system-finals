<?php

use Src\Controllers\InventoryController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;
use Src\Middlewares\Validators\InventoryValidator;

return function (Router $router) {

    $router
        ->route("/inventory")
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->get([InventoryController::class, "getInventoryData"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            InventoryValidator::class
        )->post("/inventory", [InventoryController::class, "createNewInventory"]);

    $router
        ->route("/inventory/{inventoryId}")
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            InventoryValidator::class
        )
        ->get([InventoryController::class, "getInventoryDataById"])
        ->patch([InventoryController::class, 'updateInventory']);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
        )->delete("/inventory/{inventoryId}", [InventoryController::class, 'deleteInventory']);
};
