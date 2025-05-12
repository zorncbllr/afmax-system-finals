<?php

namespace Src\Middlewares;

use Src\Core\App;
use Src\Core\Middleware;
use Src\Core\Request;
use Src\Repositories\UserRepository;

class AuthorizationMiddleware extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $userId = $request->authId;

        if (!$userId) {
            status(401);
            return json(["message" => "Unauthorized access."]);
        }

        $userRepository = new UserRepository(App::getDatabase());

        $user = $userRepository->getUserById($userId);

        if (!$user) {
            status(401);
            return json(["message" => "Unauthorized access."]);
        }

        if (!$user->isAdmin) {
            status(403);
            return json(["message" => "Forbidden access."]);
        }

        return $next();
    }
}
