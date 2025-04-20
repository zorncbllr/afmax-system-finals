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
    protected $middlewares;

    function __construct(array $middlewares = [])
    {
        $this->request = new Request([]);
        $this->routes = [];
        $this->middlewares = $middlewares;
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

    protected function dispatch(string $requestRoute, array $params = [], int $index = 0)
    {
        $this->request->setParams($params);

        $args = [
            ...$params,
            'request' => $this->request,
            'body' => $this->request->body,
            'params' => $this->request->params,
            'query' => $this->request->query
        ];

        $dispatcher = $this->routes[$requestRoute];

        if (!empty($this->middlewares) && $index < sizeof($this->middlewares)) {
            $middleware = $this->middlewares[$index];
            $reflection = new ReflectionMethod($middleware, 'runnable');

            $reflection->invokeArgs(new $middleware, [
                'request' => $this->request,
                'next' => function () use ($index, $requestRoute, $params) {
                    $this->dispatch($requestRoute, $params, $index + 1);
                }
            ]);

            exit;
        }

        is_callable($dispatcher) ?
            $reflection = new ReflectionFunction($dispatcher) :
            $reflection = new ReflectionMethod($dispatcher[0], $dispatcher[1]);

        $params = array_map(fn($param) => $param->name, $reflection->getParameters());

        $args = array_filter(
            $args,
            fn($val, $key) => in_array($key, $params),
            ARRAY_FILTER_USE_BOTH
        );

        is_callable($dispatcher) ?
            $reflection->invokeArgs($args) :
            $reflection->invokeArgs(new $dispatcher[0], $args);

        exit;
    }

    protected function register(string $method, string $route, callable|array $dispatcher)
    {
        $this->routes["$route:$method"] = $dispatcher;
    }

    static function middleware(string ...$middleware)
    {
        return new Router([...$middleware]);
    }

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
