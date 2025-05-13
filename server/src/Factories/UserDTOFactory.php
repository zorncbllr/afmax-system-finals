<?php

namespace Src\Factories;

use Src\Models\DTOs\UserDTO;
use Src\Models\User;

class UserDTOFactory
{

    public function makeUserDTO(User $user): UserDTO
    {
        $userDTO = new UserDTO();

        $userDTO->userId = $user->userId;
        $userDTO->name = $user->fullName;
        $userDTO->email = $user->email;
        $userDTO->company = $user->company;
        $userDTO->profile = $user->userPhoto;
        $userDTO->role = $user->isAdmin ? "Admin" : "User";

        return $userDTO;
    }
}
