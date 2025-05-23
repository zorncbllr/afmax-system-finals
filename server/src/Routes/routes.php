<?php

use Src\Controllers\CategoryController;
use Src\Core\Router;

$router = new Router(base: "/api/v1");

(require("auth.php"))($router);
(require("products.php"))($router);
(require("inventory.php"))($router);
(require("featured.php"))($router);
(require("cart.php"))($router);
(require("orders.php"))($router);
(require("users.php"))($router);
(require("transactions.php"))($router);

$router->resource("categories", CategoryController::class);

$router->_404(function () {
    status(404);
    return json(["message" => "Requested resource not found."]);
});
