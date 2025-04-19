<?php

declare(strict_types=1);

namespace Core;

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
    function __construct(protected $routes = []) {}

    function __destruct()
    {
        $requestRoute = str_replace("/index.php", "", $_SERVER['PHP_SELF']);

        if (empty($requestRoute)) {
            $requestRoute = "/";
        }

        $requestRoute .= ":" . $_SERVER['REQUEST_METHOD'];

        if (isset($this->routes[$requestRoute])) {
            $this->dispatch($requestRoute);
        }

        $parsed = implode(", ", array_keys($this->routes));

        $matches = null;

        if (preg_match_all("/(\/(\w+|{\w+})*)+:\w+/", $parsed, $matches)) {

            foreach ($matches[0] as $match) {
                $reqTokens = explode("/", $requestRoute);
                $mTokens = explode("/", $match);

                if (sizeof($reqTokens) !== sizeof($mTokens)) continue;

                $tokens = [];
                $params = [];

                for ($i = 0; $i < sizeof($reqTokens); $i++) {
                    if (preg_match("/{\w+}/", $mTokens[$i])) {
                        array_push($tokens, $reqTokens[$i]);
                        array_push(
                            $params,
                            explode(":", $reqTokens[$i])[0]
                        );
                        continue;
                    }

                    array_push($tokens, $mTokens[$i]);
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

        if (is_callable($dispatcher)) {
            call_user_func($dispatcher, ...$params);
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
