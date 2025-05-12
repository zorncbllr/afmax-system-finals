<?php

namespace Src\Models;

class User
{
    public int $userId;
    public string $fullName, $company, $phoneNumber, $email, $password;
    public bool $isAdmin;
    public string $createdAt, $updatedAt;
}
