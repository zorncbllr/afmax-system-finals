<?php

use Src\Controllers\CategoryController;
use Src\Controllers\FeaturedController;
use Src\Controllers\InventoryController;
use Src\Core\Router;

$router = new Router(base: "/api/v1");

(require("products.php"))($router);

$router->route("/featured")
    ->get([FeaturedController::class, "getAllFeatured"])
    ->post([FeaturedController::class, "setFeatured"]);

$router->resource("categories", CategoryController::class);

$router->resource("inventory", InventoryController::class);

$router->_404(function () {
    status(404);
    return json(["message" => "Requested resource not found."]);
});
