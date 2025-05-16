<?php

use Src\Controllers\TransactionController;
use Src\Core\Router;
use Src\Middlewares\LoggerMiddleware;

return function (Router $router) {

    $router
        ->middleware(LoggerMiddleware::class)
        ->post(
            "/transactions/success",
            [TransactionController::class, "retrieveSuccessTransaction"]
        );

    $router
        ->middleware(LoggerMiddleware::class)
        ->post(
            "/transactions/error",
            [TransactionController::class, "retrieveFailedTransaction"]
        );
};
