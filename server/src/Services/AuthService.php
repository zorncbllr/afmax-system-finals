<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Request;
use Src\Models\User;
use Src\Repositories\UserRepository;

class AuthService
{
    public function __construct(
        protected Database $database,
        protected UserRepository $userRepository
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
}
