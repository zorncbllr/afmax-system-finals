<?php

use Core\App;
use Dotenv\Dotenv;

require_once  str_replace("\\", "/", __DIR__) . "/../vendor/autoload.php";

Dotenv::createImmutable(parseDir(__DIR__) . '/../')->load();

(new App)->run();
