<?php

namespace Src\Controllers;

use Exception;
use PDOException;
use Src\Services\UserService;
use TypeError;

class UserController
{
    public function getUsers()
    {
        $users = UserService::getAllUsers();

        status(200);
        return json($users);
    }
    /**
     * @param mixed $userId
     * @return void
     */
    public function getUserById($userId)
    {
        try {
            $user = UserService::getUserById($userId);

            if (!$user) {
                throw new Exception("User does not exists.");
            }

            status(200);
            return json($user);
        } catch (Exception $e) {

            status(404);
            return json(['msg' => $e->getMessage()]);
        } catch (TypeError $e) {

            status(400);
            return json(['msg' => 'Invalid userId.']);
        }
    }

    /** @param User $body */
    public function createUser(object $body)
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

            if ($e->getCode() == 23000) {
                status(409);
                return json(['msg' => 'Email already exists.']);
            }

            status(500);
            return json(['msg' => 'Unable to create user.']);
        }
    }
}
