<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class InventoryValidator extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $validator = new Validator();

        $data = [
            "inventoryId" => $request->params->inventoryId ?? null,
            "productId" => $request->body->productId ?? null,
            "quantity" => $request->body->quantity ?? null,
        ];

        $rules = [
            "inventoryId" => "required|numeric|min:1",
            "productId" => "required|numeric|min:1",
            "quantity" => "required|numeric|min:0"
        ];

        if ($request->uri === "/api/v1/inventory") {
            unset($rules["inventoryId"]);
        }

        $validation = $validator->validate($data, $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
