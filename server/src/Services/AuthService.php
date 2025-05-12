<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Repositories\UserRepository;

class AuthService
{
    public function __construct(
        protected Database $database,
        protected UserRepository $userRepository
    ) {}
}
