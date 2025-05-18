<?php

use Src\Controllers\InventoryController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;
use Src\Middlewares\Validators\InventoryValidator;

return function (Router $router) {

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->get("/inventory", [InventoryController::class, "getInventoryData"]);

    $router
        ->middleware(AuthMiddleware::class, AuthorizationMiddleware::class)
        ->get("/inventory/{inventoryId}", [InventoryController::class, "getInventoryDataById"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            InventoryValidator::class
        )->post("/inventory", [InventoryController::class, "createNewInventory"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            InventoryValidator::class
        )
        ->patch("/inventory/{inventoryId}", [InventoryController::class, 'updateInventory']);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
        )->delete("/inventory/{inventoryId}", [InventoryController::class, 'deleteInventory']);
};
