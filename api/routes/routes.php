<?php

use Core\Request;
use Core\Router;

$router = new Router();

$router->get('/', function () {
    return redirect()->patch('/update');
});

$router->post('/', function () {
    return json(['msg' => 'post requested']);
});


$router->patch('/update', function (Request $request) {
    return json([
        'msg' => 'on update patch request',
        'request' => $request
    ]);
});
