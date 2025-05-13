<?php

namespace Src\Middlewares;

use Src\Core\App;
use Src\Core\Middleware;
use Src\Core\Request;
use Src\Repositories\UserRepository;
use Src\Services\JwtService;
use UnexpectedValueException;

class AuthMiddleware extends Middleware
{
    protected JwtService $jwtService;
    protected UserRepository $userRepository;

    public function __construct()
    {
        $this->jwtService = new JwtService();
        $this->userRepository = new UserRepository(App::getDatabase());
    }

    public function runnable(Request $request, callable $next)
    {
        $authorizationHeader = $request->headers->Authorization ?? null;

        if (!$authorizationHeader) $this->throwUnauthorized();

        $accessToken = str_replace("Bearer ", "", $authorizationHeader);

        if (empty($accessToken) || !$accessToken) {
            $this->throwUnauthorized();
        }

        try {
            $payload = $this->jwtService->verify($accessToken);

            $user = $this->userRepository->getUserById($payload["sub"]);

            if (!$user) {
                status(404);
                return json(["message" => "User does not exists."]);
            }

            $request->authId = $user->userId;

            return $next();
        } catch (UnexpectedValueException $e) {

            return json($e->getMessage());
            $this->throwUnauthorized();
        }
    }

    protected function throwUnauthorized()
    {
        status(401);
        return json(["message" => "Unauthorized access. Please log in."]);
    }
}
