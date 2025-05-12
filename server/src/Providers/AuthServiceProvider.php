<?php

namespace Src\Providers;

use Src\Core\App;
use Src\Repositories\UserRepository;
use Src\Services\AuthService;

class AuthServiceProvider
{
    public static function makeAuthService(): AuthService
    {
        $database = App::getDatabase();

        return new AuthService(
            database: $database,
            userRepository: new UserRepository($database)
        );
    }
}
