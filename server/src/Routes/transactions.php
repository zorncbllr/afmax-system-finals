<?php

use Src\Controllers\TransactionController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;
use Src\Middlewares\LoggerMiddleware;
use Src\Middlewares\Validators\TransactionValidator;

return function (Router $router) {

    $router
        ->middleware(AuthMiddleware::class, AuthorizationMiddleware::class)
        ->get("/transactions", [TransactionController::class, "getAllTransactions"]);

    $router
        ->middleware(
            TransactionValidator::class,
            LoggerMiddleware::class
        )
        ->post(
            "/transactions/success",
            [TransactionController::class, "retrieveSuccessTransaction"]
        );

    $router
        ->middleware(
            TransactionValidator::class,
            LoggerMiddleware::class
        )
        ->post(
            "/transactions/error",
            [TransactionController::class, "retrieveFailedTransaction"]
        );
};
