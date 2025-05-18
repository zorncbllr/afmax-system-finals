<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class FeaturedValidator extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $validator = new Validator();

        $data = [
            "productId" => $request->body->productId ?? null,
            "value" => $request->body->value ?? null
        ];

        $rules = [
            "productId" => "required|numeric|min:1",
            "value" => "required|boolean"
        ];

        $validation = $validator->validate($data, $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
