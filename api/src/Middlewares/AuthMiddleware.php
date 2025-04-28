<?php

namespace Src\Middlewares;

use Src\Core\Middleware;
use Src\Core\Request;

class AuthMiddleware extends Middleware
{
    function runnable(Request $request, callable $next)
    {
        echo "auth middleware...";

        $next();
    }
}
