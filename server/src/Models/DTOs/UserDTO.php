<?php

namespace Src\Models\DTOs;

class UserDTO
{
    public int $userId;
    public string $name, $email, $role;
    public string|null $profile, $company;
}
