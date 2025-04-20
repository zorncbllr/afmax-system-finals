<?php

namespace Core;

use AllowDynamicProperties;

#[AllowDynamicProperties]
class Request
{
    public $body, $params;
    public string $method, $uri, $baseUrl;
    public array $query;

    function __construct()
    {
        $this->body = json_decode(file_get_contents("php://input"), associative: false);
        $this->query = $_GET;
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->baseUrl = 'http://' . $_SERVER['HTTP_HOST'];

        foreach ($_REQUEST as $key => $value) {
            $this->$key = htmlspecialchars($value);
        }
    }

    function setParams(array $params)
    {
        $this->params = json_decode(json_encode($params), associative: false);
    }
}
