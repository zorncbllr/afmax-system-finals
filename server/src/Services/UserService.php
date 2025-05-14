<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Factories\UserDTOFactory;
use Src\Models\DTOs\UserDTO;
use Src\Repositories\UserRepository;

class UserService
{
    public function __construct(
        protected Database $database,
        protected UserRepository $userRepository,
        protected UserDTOFactory $userDTOFactory
    ) {}

    /** @return array<UserDTO> */
    public function getAllUsers(): array
    {
        $users = $this->userRepository->getAllUsers();

        return $this->userDTOFactory->makeUserDTOList($users);
    }
}
