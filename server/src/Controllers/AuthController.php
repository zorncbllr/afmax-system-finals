<?php

namespace Src\Controllers;

use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Models\User;
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

    public function signUpUser(Request $request)
    {
        try {
            $this->authService->signUpUser($request);

            status(200);
            return json(["message" => "User signed up successfully."]);
        } catch (ServiceException $e) {

            if ($e->getCode() === 409) {
                status(409);
                return json(["email" => $e->getMessage()]);
            }

            status(400);
            return json(["message" => "Unable to sign up user."]);
        }
    }
}
