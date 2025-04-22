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
            UserService::createUser(
                name: $body->name,
                email: $body->email
            );

            status(200);
            return json(['msg' => 'New user has been created.']);
        } catch (PDOException $e) {
            status(400);

            return json(['msg' => $e->getMessage()]);
        }
    }
}
