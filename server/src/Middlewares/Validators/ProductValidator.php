<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class ProductValidator extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $existingImages = $request->existingImages ?? null;
        $validator = new Validator();

        $data = [
            'productName' => $request->productName ?? null,
            'brand' => $request->brand ?? null,
            'description' => $request->description ?? null,
            'price' => $request->price ?? null,
            'categories' => $request->categories ?? null,
            'images' => $request->files->images->name ?? null,
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


        if ($validation->fails() && $existingImages == null) {

            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
