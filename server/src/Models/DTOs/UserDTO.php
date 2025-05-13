<?php

namespace Src\Models\DTOs;

class UserDTO
{
    public int $userId;
    public string $name, $email, $company, $role;
    public string|null $profile;
}
