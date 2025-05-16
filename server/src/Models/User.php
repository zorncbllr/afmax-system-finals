<?php

namespace Src\Models;

class User
{
    public int $userId;
    public string $fullName, $phoneNumber, $email, $password;
    public string|null  $userPhoto, $company;
    public bool $isAdmin;
    public string $createdAt, $updatedAt;
}
