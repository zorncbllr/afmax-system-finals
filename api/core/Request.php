<?php

namespace Core;

class Request
{
    public $body, $params;
    public string $method, $uri, $baseUrl;
    public array $query;

    function __construct()
    {
        $this->body = new Body;
        $this->query = $_GET;
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->baseUrl = 'http://' . $_SERVER['HTTP_HOST'];
    }

    function setParams(array $params)
    {
        $this->params = json_decode(json_encode($params), associative: false);
    }
}
