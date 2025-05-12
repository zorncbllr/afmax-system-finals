<?php

namespace Src\Middlewares\Validators;

use Rakit\Validation\Validator;
use Src\Core\Middleware;
use Src\Core\Request;

class UserValidator extends Middleware
{
    public function runnable(Request $request, callable $next)
    {
        $validator = new Validator();

        $data = [
            'fullName' => $request->body->fullName,
            'phoneNumber' => $request->body->phoneNumber,
            'email' => $request->body->email,
            'password' => $request->body->password,
            'passwordConfirmation' => $request->body->passwordConfirmation,
        ];

        $rules = [
            'fullName' => 'required|min:3|max:100|regex:/^[a-zA-Z\s\'.-]+$/',
            'phoneNumber' => 'required|regex:/^\+?[0-9]{7,15}$/',
            'email' => 'required|email',
            'password' => 'required|min:8|max:100',
            'passwordConfirmation' => 'required|same:password',
        ];

        $validation = $validator->validate($data, $rules);

        if ($validation->fails()) {
            status(400);
            return json($validation->errors()->firstOfAll());
        }

        return $next();
    }
}
