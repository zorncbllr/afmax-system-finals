<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class TransactionValidator extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $validator = new Validator();

        $data = [
            "transactionId" => $request->body->transactionId ?? null,
            "orderId" => $request->body->orderId ?? null,
        ];

        $rules = [
            "transactionId" => "required",
            "orderId" => "required|numeric|min:1"
        ];

        $validation = $validator->validate($data, $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
