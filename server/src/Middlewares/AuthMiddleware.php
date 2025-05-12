<?php

namespace Src\Middlewares;

use Src\Core\Middleware;
use Src\Core\Request;
use Src\Services\JwtService;
use UnexpectedValueException;

class AuthMiddleware extends Middleware
{
    function runnable(Request $request, callable $next)
    {
        $authorizationHeader = getallheaders()["Authorization"];

        if (!$authorizationHeader) {
            status(401);
            return json(["message" => "Unauthorized access."]);
        }

        $token = explode(" ", $authorizationHeader)[1];

        if (empty($token) || !$token) {
            status(401);
            return json(["message" => "Unauthorized access."]);
        }

        $jwtService = new JwtService();

        try {
            $payload = $jwtService->verify($token);

            $request->authUser = $payload["sub"];

            return $next();
        } catch (UnexpectedValueException $e) {

            status(401);
            return json(["message" => "Unauthorized access."]);
        }
    }
}
