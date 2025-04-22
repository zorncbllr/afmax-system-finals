<?php

namespace Controllers;

use Models\User;
use PDOException;
use Services\UserService;

class UserController
{
    function getAll()
    {
        $users = UserService::getAllUsers();

        status(200);
        return json($users);
    }

    /** @param User $body */
    function createUser(object $body)
    {
        try {
            $user = UserService::createUser(
                name: $body->name,
                email: $body->email
            );

            status(200);
            return json([
                'msg' => 'New user has been created.',
                'user' => $user
            ]);
        } catch (PDOException $e) {

            if ($e->getCode() === 23000) {
                status(409);
                return json(['msg' => 'Email already exists.']);
            }

            status(500);
            return json(['msg' => 'Unable to create user.']);
        }
    }
}
