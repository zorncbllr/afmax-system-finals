<?php

namespace Src\Controllers;

use Src\Providers\AuthServiceProvider;
use Src\Services\AuthService;

class AuthController
{
    protected AuthService $authService;

    public function __construct()
    {
        $this->authService = AuthServiceProvider::makeAuthService();
    }

    public function attemptSignIn() {}

    public function signUpUser() {}
}
