<?php

use Src\Controllers\FeaturedController;
use Src\Core\Router;

return function (Router $router) {

    $router->route("/featured")
        ->get([FeaturedController::class, "getAllFeatured"])
        ->post([FeaturedController::class, "setFeatured"]);
};
