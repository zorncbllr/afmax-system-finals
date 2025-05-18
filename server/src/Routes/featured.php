<?php

use Src\Controllers\FeaturedController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;
use Src\Middlewares\Validators\FeaturedValidator;

return function (Router $router) {

    $router
        ->get("/featured", [FeaturedController::class, "getAllFeatured"]);

    $router
        ->middleware(
            AuthMiddleware::class,
            AuthorizationMiddleware::class,
            FeaturedValidator::class
        )
        ->post("/featured", [FeaturedController::class, "setFeatured"]);
};
