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
    protected string $base;
    protected $middlewares;
    protected $_404;

    function __construct(string $base = "", array $middlewares = [])
    {
        $this->request = new Request([]);
        $this->routes = [];
        $this->base = $base;
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

        if ($this->_404) {
            $this->use($this->_404);
        }
    }

    protected function dispatch(string $requestRoute, array $params = [], int $index = 0)
    {
        $this->request->setParams($params);

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

            return exit;
        }

        $this->use($dispatcher);

        return exit;
    }

    protected function register(string $method, string $route, callable|array $dispatcher)
    {
        $this->routes["{$this->base}$route:$method"] = $dispatcher;
    }

    function middleware(string ...$middleware)
    {
        return new Router(
            base: $this->base,
            middlewares: [...$this->middlewares, ...$middleware]
        );
    }

    function resource(string $resource, string $controller)
    {
        $this->get("/$resource", [$controller, 'getAll']);
        $this->get("/$resource/{id}", [$controller, 'getById']);
        $this->post("/$resource", [$controller, 'create']);
        $this->patch("/$resource/{id}", [$controller, 'update']);
        $this->delete("/$resource/{id}", [$controller, 'delete']);
    }

    function use(callable|array $dispatcher)
    {
        is_callable($dispatcher) ?
            $reflection = new ReflectionFunction($dispatcher) :
            $reflection = new ReflectionMethod($dispatcher[0], $dispatcher[1]);

        $args = [
            ...(array) $this->request->params,
            'request' => $this->request,
            'body' => $this->request->body,
            'params' => $this->request->params,
            'query' => $this->request->query
        ];

        $params = array_map(fn($param) => $param->name, $reflection->getParameters());

        $args = array_filter(
            $args,
            fn($val, $key) => in_array($key, $params),
            ARRAY_FILTER_USE_BOTH
        );

        is_callable($dispatcher) ?
            $reflection->invokeArgs($args) :
            $reflection->invokeArgs(new $dispatcher[0], $args);
    }

    function _404(callable|array $dispatcher)
    {
        $this->_404 = $dispatcher;
    }

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
