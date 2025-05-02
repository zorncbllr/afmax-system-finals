<?php

namespace Src\Core;

use PDOException;

class App
{
    protected static Database $database;

    function __construct(Database $database)
    {
        static::$database = $database;
    }

    function run()
    {
        require parseDir(__DIR__) . '/../Routes/routes.php';
    }

    static function getDatabase(): Database
    {
        return static::$database;
    }
}
