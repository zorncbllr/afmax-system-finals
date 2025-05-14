<?php

use Src\Controllers\TransactionController;
use Src\Core\Router;

return function (Router $router) {

    $router->post(
        "/transactions/success",
        [TransactionController::class, "retrieveSuccessTransaction"]
    );

    $router->post(
        "/transactions/error",
        [TransactionController::class, "retrieveFailedTransaction"]
    );
};
