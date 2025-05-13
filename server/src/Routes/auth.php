<?php

use Src\Controllers\AuthController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\Validators\UserValidator;

return function (Router $router) {

    $router->post(
        "/auth/sign-in",
        [AuthController::class, "attemptSignIn"]
    );

    $router
        ->post(
            "/auth/refresh",
            [AuthController::class, "refreshSession"]
        );

    $router
        ->middleware(AuthMiddleware::class)
        ->post(
            "/auth/sign-off",
            [AuthController::class, "signOffUser"]
        );

    $router
        ->middleware(UserValidator::class)
        ->post("/auth/sign-up", [AuthController::class, "signUpUser"]);
};
