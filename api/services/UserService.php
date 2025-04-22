<?php

namespace Services;

use Core\App;
use Models\User;
use PDO;

class UserService
{
    /** @return array<User> */
    static function getAllUsers(): array
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("select * from users");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, User::class);
    }

    static function getUserById(int $userId): User|false
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("select * from users where userId = :userId");

        $stmt->execute([
            'userId' => $userId
        ]);

        return $stmt->fetchObject(User::class);
    }

    static function createUser(string $name, string $email): User
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("insert into users (name, email) values (:name, :email)");

        $stmt->execute([
            'name' => $name,
            'email' => $email
        ]);

        $id = $db->lastInsertId();

        $user = new User;

        $user->userId = $id;
        $user->name = $name;
        $user->email = $email;

        return $user;
    }
}
