<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class CartValidator extends Middleware
{

    public function runnable(Request $request, callable $next)
    {
        $validator = new Validator();

        $rules = [
            "userId" => "required|numeric|min:1",
            "productId" => "required|numeric|min:1",
            "quantity" => "required|numeric|min:1"
        ];

        $validation = $validator->validate([
            "userId" => $request->authId ?? null,
            "productId" => $request->body->productId ?? null,
            "quantity" => $request->body->quantity ?? null
        ], $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
