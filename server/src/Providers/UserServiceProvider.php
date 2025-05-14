<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\UserDTOFactory;
use Src\Repositories\UserRepository;
use Src\Services\UserService;

class UserServiceProvider
{
    public static function makeUserService(): UserService
    {
        $database = App::getDatabase();

        return new UserService(
            database: $database,
            userRepository: new UserRepository($database),
            userDTOFactory: new UserDTOFactory()
        );
    }
}
