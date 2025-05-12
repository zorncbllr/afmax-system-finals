<?php

namespace Src\Middlewares;

use Src\Core\App;
use Src\Core\Middleware;
use Src\Core\Request;
use Src\Repositories\UserRepository;

class AuthorizationMiddleware extends Middleware
{
    protected UserRepository $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository(App::getDatabase());
    }

    public function runnable(Request $request, callable $next)
    {
        $userId = $request->authId;

        if (!$userId) $this->throwForbidden();

        $user = $this->userRepository->getUserById($userId);

        if (!$user) $this->throwForbidden();

        if (!$user->isAdmin) $this->throwForbidden();

        return $next();
    }

    protected function throwForbidden()
    {
        status(403);
        return json(["message" => "Forbidden. You do not have permission to perform this action."]);
    }
}
