<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Models\User;
use Src\Repositories\UserRepository;
use UnexpectedValueException;

class AuthService
{
    public function __construct(
        protected Database $database,
        protected UserRepository $userRepository,
        protected JwtService $jwtService
    ) {}

    public function signUpUser(Request $request)
    {
        try {
            $user = new User();

            $user->fullName = $request->body->fullName;
            $user->email = $request->body->email;
            $user->phoneNumber = $request->body->phoneNumber;
            $user->company = $request->body->company;
            $user->password = password_hash($request->body->password, PASSWORD_DEFAULT);
            $user->isAdmin = false;

            $this->userRepository->createUser($user);
        } catch (PDOException $e) {

            if ($e->getCode() == 23000) {
                throw new ServiceException("User email already exists.", 409);
            }

            throw new ServiceException("Unable to sign up user.");
        }
    }

    public function attemptSignIn(string $email, string $password): array
    {
        $user = $this->userRepository->getUserByEmail($email);

        if (!$user) {
            throw new ServiceException("User not found.", 404);
        }

        if (!password_verify($password, $user->password)) {
            throw new ServiceException("Incorrect user credentials.", 400);
        }

        $accessToken = $this->jwtService->generate([
            'sub' => $user->userId,
            'type' => 'access',
            'exp' => time() + 900,
        ]);

        $refreshToken = $this->jwtService->generate([
            'sub' => $user->userId,
            'type' => 'refresh',
            'exp' => time() + 604800,
        ]);

        setcookie(
            'refreshToken',
            $refreshToken,
            [
                'expires' => time() + 604800,
                'path' => '/api/v1/',
                'domain' => $_ENV["JWT_ISSUER"],
                'secure' => true,
                'httponly' => true,
                'samesite' => 'Strict'
            ]
        );

        return [
            "accessToken" => $accessToken,
            "role" => $user->isAdmin ? "Admin" : "User"
        ];
    }

    public function refreshSession(string|null $refreshToken): array
    {
        if (!$refreshToken) {
            throw new ServiceException("Refresh token missing", 401);
        }

        try {
            $payload = $this->jwtService->verify($refreshToken);

            if ($payload['type'] !== 'refresh') {
                throw new ServiceException('Invalid token type', 401);
            }

            $user = $this->userRepository->getUserById($payload["sub"]);

            if (!$user) {
                throw new ServiceException("Subject user does not exists", 404);
            }

            $accessToken = $this->jwtService->generate([
                'sub'  => $payload['sub'],
                'type' => 'access',
                'exp'  => time() + 900,
            ]);

            $newRefreshToken = $this->jwtService->generate([
                'sub'  => $payload['sub'],
                'type' => 'refresh',
                'exp'  => time() + 604800,
            ]);

            setcookie(
                'refreshToken',
                $newRefreshToken,
                [
                    'expires' => time() + 604800,
                    'path' => '/api/v1/',
                    'domain' => $_ENV["JWT_ISSUER"],
                    'secure' => true,
                    'httponly' => true,
                    'samesite' => 'Strict'
                ]
            );

            return [
                "accessToken" => $accessToken,
                "role" => $user->isAdmin ? "Admin" : "User"
            ];
        } catch (UnexpectedValueException $e) {

            throw new ServiceException('Invalid token segments', 401);
        }
    }

    public function revokeSession(string|null $refreshToken)
    {
        if (!$refreshToken) {
            throw new ServiceException("Unauthorized action. User not authenticated.", 401);
        }

        try {
            $payload = $this->jwtService->verify($refreshToken);

            if ($payload['type'] !== 'refresh') {
                throw new ServiceException('Invalid token type', 401);
            }

            $user = $this->userRepository->getUserById($payload["sub"]);

            if (!$user) {
                throw new ServiceException("Subject user does not exists", 404);
            }

            setcookie(
                'refreshToken',
                $refreshToken,
                [
                    'expires' => time() - 99999999,
                    'path' => '/api/v1/',
                    'domain' => $_ENV["JWT_ISSUER"],
                    'secure' => true,
                    'httponly' => true,
                    'samesite' => 'Strict'
                ]
            );
        } catch (UnexpectedValueException $e) {

            throw new ServiceException('Invalid token segments', 401);
        }
    }
}
