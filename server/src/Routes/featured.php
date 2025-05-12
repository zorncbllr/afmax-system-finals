<?php

use Src\Controllers\FeaturedController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;

return function (Router $router) {

    $router
        ->get("/featured", [FeaturedController::class, "getAllFeatured"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class
        )
        ->post("featured", [FeaturedController::class, "setFeatured"]);
};
