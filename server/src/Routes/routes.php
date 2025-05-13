<?php

use Src\Controllers\CategoryController;
use Src\Core\Router;
use Src\Middlewares\LoggerMiddleware;

$router = new Router(
    base: "/api/v1",
    middlewares: [LoggerMiddleware::class]
);

(require("auth.php"))($router);
(require("products.php"))($router);
(require("inventory.php"))($router);
(require("featured.php"))($router);

$router->resource("categories", CategoryController::class);

$router->_404(function () {
    status(404);
    return json(["message" => "Requested resource not found."]);
});
