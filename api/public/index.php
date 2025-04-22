<?php

use Core\App;
use Core\Database;
use Dotenv\Dotenv;

require_once  str_replace("\\", "/", __DIR__) . "/../vendor/autoload.php";

Dotenv::createImmutable(parseDir(__DIR__) . '/../')->load();

$database = new Database();
$app = new App($database);

$app->run();
