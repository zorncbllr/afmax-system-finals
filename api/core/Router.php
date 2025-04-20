<?php

declare(strict_types=1);

namespace Core;

use ReflectionFunction;
use ReflectionMethod;

interface HTTPMethodInterface
{
    function get(string $route, callable | array $dispatcher);
    function post(string $route, callable | array $dispatcher);
    function patch(string $route, callable | array $dispatcher);
    function put(string $route, callable | array $dispatcher);
    function delete(string $route, callable | array $dispatcher);
}

class Router implements HTTPMethodInterface
{
    protected Request $request;
    protected array $routes;

    function __construct()
    {
        $this->request = new Request([]);
        $this->routes = [];
    }

    function __destruct()
    {
        $this->request->uri = $_SERVER['PATH_INFO'] ?? "/";
        $requestRoute = $this->request->uri . ":" . $_SERVER['REQUEST_METHOD'];

        if (isset($this->routes[$requestRoute])) {
            $this->dispatch($requestRoute);
        }

        $parsed = implode(", ", array_keys($this->routes));

        $matches = null;

        if (preg_match_all("/(\/(\w+|{\w+})*)+:\w+/", $parsed, $matches)) {

            foreach ($matches[0] as $match) {
                $reqTokens = explode("/", $requestRoute);
                $mTokens = explode("/", $match);

                $reqMethod = explode(":", $requestRoute)[1];

                if (sizeof($reqTokens) !== sizeof($mTokens) || !preg_match("/:$reqMethod/", $match)) continue;

                $tokens = [];
                $params = [];

                for ($i = 0; $i < sizeof($reqTokens); $i++) {
                    $key = null;

                    if (preg_match("/{\w+}/", $mTokens[$i])) {
                        array_push($tokens, $reqTokens[$i]);

                        preg_match("/\w+/", $mTokens[$i], $key);

                        $params[$key[0]] = explode(":", $reqTokens[$i])[0];
                    } else {
                        array_push($tokens, $mTokens[$i]);
                    }
                }

                if (implode("/", $tokens) === $requestRoute) {
                    $this->dispatch($match, $params);
                }
            }
        }
    }

    protected function dispatch(string $requestRoute, array $params = [])
    {
        $dispatcher = $this->routes[$requestRoute];

        $this->request->setParams($params);

        $args = [
            ...$params,
            'request' => $this->request,
            'body' => $this->request->body,
            'params' => $this->request->params,
            'query' => $this->request->query
        ];

        if (is_callable($dispatcher)) {
            $reflection = new ReflectionFunction($dispatcher);

            $params = array_map(fn($param) => $param->name, $reflection->getParameters());

            $args = array_filter(
                $args,
                fn($val, $key) => in_array($key, $params),
                ARRAY_FILTER_USE_BOTH
            );

            $reflection->invokeArgs($args);
            exit;
        }

        call_user_func_array([new $dispatcher[0], $dispatcher[1]], [...$params]);
        exit;
    }

    protected function register(string $method, string $route, callable|array $dispatcher)
    {
        $this->routes["$route:$method"] = $dispatcher;
    }

    function middleware(string $middleware) {}

    function resource(string $controller) {}

    function get(string $route, callable|array $dispatcher)
    {
        $this->register('GET', $route, $dispatcher);
    }

    function post(string $route, callable|array $dispatcher)
    {
        $this->register('POST', $route, $dispatcher);
    }

    function patch(string $route, callable|array $dispatcher)
    {
        $this->register('PATCH', $route, $dispatcher);
    }

    function put(string $route, callable|array $dispatcher)
    {
        $this->register('PUT', $route, $dispatcher);
    }

    function delete(string $route, callable|array $dispatcher)
    {
        $this->register('DELETE', $route, $dispatcher);
    }
}
