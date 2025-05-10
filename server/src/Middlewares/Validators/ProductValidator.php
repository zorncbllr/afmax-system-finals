<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class ProductValidator extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $validator = new Validator();

        $data = [
            'productName' => $request->productName,
            'brand' => $request->brand,
            'description' => $request->description,
            'price' => $request->price,
            'categories' => $request->categories,
            'images' => $request->files->images->name,
        ];

        $rules = [
            'productName' => 'required|min:3|max:100',
            'brand'       => 'required|min:2|max:50',
            'description' => 'required|min:10|max:10000',
            'price'       => 'required|numeric|min:0.01',
            'categories'  => 'required|array|min:1',
            'categories.*' => 'required|regex:/^[a-zA-Z0-9\s]+$/|min:2|max:30',
            'images'      => 'required|array|min:1|max:5',
            'images.*'    => 'uploaded_file|max:2M|mimes:jpeg,png,gif'
        ];

        $validation = $validator->validate($data, $rules);

        if ($validation->fails() && !key_exists("images", $validation->errors()->firstOfAll())) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
