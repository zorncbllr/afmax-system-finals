<?php

declare(strict_types=1);

namespace Core;

class Kernel
{
    function __construct(private int $argc, private array $argv) {}

    function run()
    {
        switch ($this->argv[1]) {
            case 'serve':
                $port = $_ENV['SERVER_PORT'] ?? 3000;
                shell_exec("php -S localhost:$port -t public -f index.php");
                break;

            default:
                # code...
                break;
        }
    }
}
