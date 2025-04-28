<?php

use Src\Controllers\ProductController;
use Src\Core\Router;

$router = new Router(base: "/api/v1");

$router->resource("products", ProductController::class);

$router->_404(function () {
    status(404);
    return json(["message" => "Requested resource not found."]);
});
