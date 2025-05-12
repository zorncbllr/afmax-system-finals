<?php

use Src\Controllers\UserController;
use Src\Core\Router;

return function (Router $router) {

    $router->post("/users", [UserController::class, "createUser"]);
};
