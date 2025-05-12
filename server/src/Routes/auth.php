<?php

use Src\Controllers\AuthController;
use Src\Core\Router;

return function (Router $router) {

    $router->post(
        "/auth/sign-in",
        [AuthController::class, "attemptSignIn"]
    );

    $router->post(
        "/auth/sign-up",
        [AuthController::class, "signUpUser"]
    );
};
