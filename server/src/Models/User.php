<?php

namespace Src\Models;

class User
{
    public int $userId;
    public string $fullName, $company, $phoneNumber, $email, $password;
    public string|null  $userPhoto;
    public bool $isAdmin;
    public string $createdAt, $updatedAt;
}
