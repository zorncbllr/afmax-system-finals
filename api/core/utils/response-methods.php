<?php

function json(mixed $data)
{
    header('Content-Type: application/json');

    echo json_encode($data);
    exit;
}
