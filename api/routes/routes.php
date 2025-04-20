<?php

use Core\Request;
use Core\Router;

$router = new Router();

$router->get('/', function () {
    return view('home');
});

$router->post('/', function (Request $request) {
    return json([
        'request' => $request
    ]);
});

$router->_404(function () {
    status(404);
    return json(['msg' => '404 resource not found.']);
});
