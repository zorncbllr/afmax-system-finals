<?php

function parseDir(string $directory): string
{
    return str_replace("\\", "/", $directory);
}
