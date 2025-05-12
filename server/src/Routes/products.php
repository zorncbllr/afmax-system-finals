<?php

use Src\Controllers\ProductController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;
use Src\Middlewares\Validators\ProductValidator;

return function (Router $router) {

    $router->get("/products", [ProductController::class, "getProductDTOs"]);
    $router->get("/products/{productId}", [ProductController::class, "getProductDetails"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->get("/admin/products", [ProductController::class, "getProductTableDTOs"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            ProductValidator::class
        )
        ->post("/products", [ProductController::class, 'createProduct']);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            ProductValidator::class
        )
        ->post("/products/update/{productId}", [ProductController::class, 'updateProduct']);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->delete("/products/{productId}", [ProductController::class, 'deleteProduct']);
};
