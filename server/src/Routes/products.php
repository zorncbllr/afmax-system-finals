<?php

use Src\Controllers\ProductController;
use Src\Core\Router;
use Src\Middlewares\Validators\ProductValidator;

return function (Router $router) {

    $router->get("/products", [ProductController::class, "getAll"]);
    $router->get("/products/{id}", [ProductController::class, "getById"]);

    $router
        ->middleware(ProductValidator::class)
        ->post("/products", [ProductController::class, 'create']);

    $router
        ->middleware(ProductValidator::class)
        ->post("/products/update/{id}", [ProductController::class, 'update']);

    $router->delete("/products/{id}", [ProductController::class, 'delete']);
};
