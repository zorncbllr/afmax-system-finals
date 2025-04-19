<?php

declare(strict_types=1);

namespace Core;

use PDO;
use PDOException;

class Database
{
    protected PDO $pdo;

    function __construct()
    {
        $config = require parseDir(__DIR__) . '/../config/database.conf.php';

        $dsn = "mysql:" . http_build_query($config, "", ";");

        try {
            $this->pdo = new PDO(
                $dsn,
                $config['user'],
                $config['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ]
            );
        } catch (PDOException $e) {

            http_response_code(500);
            return json_encode([
                'error' => $e->getMessage()
            ]);
            exit;
        }
    }
}
