<?php

function parseDir(string $directory): string
{
    return str_replace("\\", "/", $directory);
}


function logger(string $data)
{
    $logsPath = parseDir(__DIR__) . "/../Logs";

    if (!is_dir($logsPath)) mkdir($logsPath);

    $logFile = $logsPath . "/debug-logs.txt";

    if (!file_exists($logFile)) {
        file_put_contents($logFile, "");
    }

    $content =  file_get_contents($logFile);
    $content .= $data . "\n";

    file_put_contents($logFile, $content);
}
