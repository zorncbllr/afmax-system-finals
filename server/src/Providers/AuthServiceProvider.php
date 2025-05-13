<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Factories\UserDTOFactory;
use Src\Repositories\UserRepository;
use Src\Services\AuthService;
use Src\Services\JwtService;

class AuthServiceProvider
{
    public static function makeAuthService(): AuthService
    {
        $database = App::getDatabase();

        return new AuthService(
            database: $database,
            userRepository: new UserRepository($database),
            userDTOFactory: new UserDTOFactory(),
            jwtService: new JwtService()
        );
    }
}
