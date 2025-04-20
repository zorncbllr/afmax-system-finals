<?php

use Controllers\Controller;
use Core\Middleware;
use Core\Request;
use Core\Router;

$router = new Router();

class Auth extends Middleware
{
    function runnable(Request $request, callable $next)
    {
        $next();
    }
}

$router::middleware(Auth::class)->get('/api', [Controller::class, 'index']);
