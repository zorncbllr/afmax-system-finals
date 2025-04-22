<?php

namespace Core;

class App
{
    protected static Database $database;

    function __construct(Database $database)
    {
        static::$database = $database;
    }

    function run()
    {
        require parseDir(__DIR__) . '/../routes/routes.php';
    }

    static function getDatabase(): Database
    {
        return static::$database;
    }
}
