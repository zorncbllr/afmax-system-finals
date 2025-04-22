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
        $user->id = $id;
        $user->name = $name;
        $user->email = $email;

        return $user;
    }
}
