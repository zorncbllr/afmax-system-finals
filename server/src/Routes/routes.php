<?php

use Src\Controllers\CategoryController;
use Src\Core\Router;

$router = new Router(base: "/api/v1");

(require("products.php"))($router);
(require("inventory.php"))($router);
(require("featured.php"))($router);

$router->resource("categories", CategoryController::class);

$router->_404(function () {
    status(404);
    return json(["message" => "Requested resource not found."]);
});
