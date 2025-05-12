<?php

namespace Src\Middlewares;

use Src\Core\Middleware;
use Src\Core\Request;
use Src\Services\JwtService;
use UnexpectedValueException;

class AuthMiddleware extends Middleware
{
    protected JwtService $jwtService;

    public function __construct()
    {
        $this->jwtService = new JwtService();
    }

    public function runnable(Request $request, callable $next)
    {
        $authorizationHeader = $request->headers->Authorization;

        if (!$authorizationHeader) $this->throwUnauthorized();

        $token = explode(" ", $authorizationHeader)[1];

        if (empty($token) || !$token) $this->throwUnauthorized();

        try {
            $payload = $this->jwtService->verify($token);

            $request->authUser = $payload["sub"];

            return $next();
        } catch (UnexpectedValueException $e) {

            $this->throwUnauthorized();
        }
    }

    protected function throwUnauthorized()
    {
        status(401);
        return json(["message" => "Unauthorized access. Please log in."]);
    }
}
