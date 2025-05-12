<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\User;

class UserRepository
{
    public function __construct(protected Database $database) {}

    public function getUserById(int $userId): User|bool
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM users WHERE userId = :userId"
        );

        $stmt->execute(["userId" => $userId]);

        return $stmt->fetchObject(User::class);
    }

    public function getUserByEmail(string $email): User|bool
    {
        $stmt = $this->database->prepare(
            "SELECT * FROM users WHERE email = :email"
        );

        $stmt->execute(["email" => $email]);

        return $stmt->fetchObject(User::class);
    }

    public function createUser(User $user)
    {
        $stmt = $this->database->prepare(
            "INSERT INTO users (fullName, email, company, phoneNumber, password) 
            VALUES (:fullName, :email, :company, :phoneNumber, :password)"
        );

        $stmt->execute([
            "fullName" => $user->fullName,
            "email" => $user->email,
            "company" => $user->company,
            "phoneNumber" => $user->phoneNumber,
            "password" => $user->password
        ]);
    }
}
