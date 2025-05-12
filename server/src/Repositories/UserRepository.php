<?php

namespace Src\Repositories;

use Src\Core\Database;
use Src\Models\User;

class UserRepository
{
    public function __construct(protected Database $database) {}

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
