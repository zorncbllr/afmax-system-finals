<?php

namespace Src\Controllers;

use Src\Providers\UserServiceProvider;
use Src\Services\UserService;

class UserController
{
    protected UserService $userService;

    public function __construct()
    {
        $this->userService = UserServiceProvider::makeUserService();
    }

    public function getAllUsers()
    {
        $users = $this->userService->getAllUsers();

        status(200);
        return json($users);
    }

    public function createUser() {}
}
