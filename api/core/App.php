<?php

namespace Core;

class App
{
    function run()
    {
        $database = new Database();

        require parseDir(__DIR__) . '/../routes/routes.php';
    }
}
