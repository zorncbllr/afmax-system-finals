<?php

namespace Src\Controllers;

use Rakit\Validation\Validator;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Providers\AuthServiceProvider;
use Src\Services\AuthService;

class AuthController
{
    protected AuthService $authService;

    public function __construct()
    {
        $this->authService = AuthServiceProvider::makeAuthService();
    }

    public function refreshSession(Request $request)
    {
        try {
            $newPayload = $this->authService->refreshSession($request);

            status(200);
            return json([
                "message" => "Token successfully refresh.",
                ...$newPayload
            ]);
        } catch (ServiceException $e) {

            status(401);
            return json(["message" => $e->getMessage()]);
        }
    }

    public function attemptSignIn(Request $request)
    {
        $validator = new Validator();

        $rules = [
            "email" => "required|email",
            "password" => "required"
        ];

        $validation = $validator->validate([
            "email" => $request->body->email,
            "password" => $request->body->password
        ], $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        try {
            $payload = $this->authService->attemptSignIn(
                email: $request->body->email,
                password: $request->body->password
            );

            status(200);
            return json([
                "message" => "User successfully signed in.",
                ...$payload
            ]);
        } catch (ServiceException $e) {

            if ($e->getCode() == 404) {
                status(404);
                return json(["email" => $e->getMessage()]);
            }

            if ($e->getCode() == 400) {
                status(400);
                return json(["password" => $e->getMessage()]);
            }

            status(400);
            return json(["message" => "Unable to sign in user."]);
        }
    }

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
