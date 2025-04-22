<?php

declare(strict_types=1);

namespace Core;

use PDO;
use PDOException;

class Database extends PDO
{

    function __construct()
    {
        $config = require parseDir(__DIR__) . '/../config/database.conf.php';

        $dsn = "mysql:" . http_build_query($config, "", ";");

        try {
            parent::__construct(
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
