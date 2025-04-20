<?php

namespace Middlewares;

use Core\Middleware;
use Core\Request;

class AuthMiddleware extends Middleware
{
    function runnable(Request $request, callable $next)
    {
        echo "auth middleware...";

        $next();
    }
}
