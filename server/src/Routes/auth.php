<?php

use Src\Controllers\AuthController;
use Src\Core\Router;
use Src\Middlewares\Validators\UserValidator;

return function (Router $router) {

    $router->post(
        "/auth/sign-in",
        [AuthController::class, "attemptSignIn"]
    );

    $router
        ->middleware(UserValidator::class)
        ->post("/auth/sign-up", [AuthController::class, "signUpUser"]);
};
