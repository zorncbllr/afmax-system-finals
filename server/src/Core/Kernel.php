<?php

declare(strict_types=1);

namespace Src\Core;

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
            case "clear":
                $logs = parseDir(__DIR__) . "/../Logs/logs.txt";
                unlink($logs);
                break;
            case "-g":
                if ($this->argv[2] === "resource") {
                    $name = $this->argv[3];

                    $this->generateController($name);
                    $this->generateService($name);
                    $this->generateRepository($name);
                    $this->generateModel($name);
                }
        }
    }

    function generateController(string $name)
    {
        $capital = ucfirst($name);
        $camel = lcfirst($name);

        $path = parseDir(__DIR__) . "/../Controllers/{$capital}Controller.php";

        file_put_contents($path, "<?php

namespace Src\Controllers;

use Src\Core\App;
use Src\Services\\{$capital}Service;
use Src\Repositories\\{$capital}Repository;

class {$capital}Controller
{
    protected {$capital}Service \${$camel}Service;

    public function __construct() 
    {
        \$database = App::getDatabase();

        \$this->{$camel}Service = new {$capital}Service(
            database: \$database,
            {$camel}Repository: new {$capital}Repository(\$database)
        );
    }

    public function index() {}

}");
    }

    function generateService(string $name)
    {
        $capital = ucfirst($name);
        $camel = lcfirst($name);

        $path = parseDir(__DIR__) . "/../Services/{$capital}Service.php";

        file_put_contents($path, "<?php

namespace Src\Services;

use Src\Core\Database;
use Src\Repositories\\{$capital}Repository;

class {$capital}Service
{

    public function __construct(
        protected Database \$database,
        protected {$capital}Repository \${$camel}Repository
    ) {}

    public function index() {}

}");
    }

    function generateRepository(string $name)
    {
        $capital = ucfirst($name);

        $path = parseDir(__DIR__) . "/../Repositories/{$capital}Repository.php";

        file_put_contents($path, "<?php

namespace Src\Repositories;

use PDO;
use Src\Core\Database;

class {$capital}Repository
{

    public function __construct(
        protected Database \$database
    ) {}

    public function getAll{$capital}() 
    {
        \$stmt = \$this->database->prepare(\"\");

        \$stmt->execute();

        return \$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}");
    }

    function generateModel(string $name)
    {
        $capital = ucfirst($name);
        $camel = lcfirst($name);

        $path = parseDir(__DIR__) . "/../Models/{$capital}.php";

        file_put_contents($path, "<?php

namespace Src\Models;

class {$capital}
{
    public int \${$camel}Id;
}");
    }
}
