<?php

use Src\Controllers\ProductController;
use Src\Core\Router;
use Src\Middlewares\Validators\ProductValidator;

return function (Router $router) {

    $router->get("/products", [ProductController::class, "getProductDTOs"]);
    $router->get("/products/{productId}", [ProductController::class, "getProductDetails"]);

    $router->get("/admin/products", [ProductController::class, "getProductTableDTOs"]);

    $router
        ->middleware(ProductValidator::class)
        ->post("/products", [ProductController::class, 'createProduct']);

    $router
        ->middleware(ProductValidator::class)
        ->post("/products/update/{productId}", [ProductController::class, 'updateProduct']);

    $router->delete("/products/{productId}", [ProductController::class, 'deleteProduct']);
};
