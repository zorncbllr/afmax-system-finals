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

    /**  @param array<User> $users */
    /** @return array<UserDTO> */
    public function makeUserDTOList(array $users): array
    {
        $userDTOs = [];

        foreach ($users as $user) {
            array_push($userDTOs, $this->makeUserDTO($user));
        }

        return $userDTOs;
    }
}
