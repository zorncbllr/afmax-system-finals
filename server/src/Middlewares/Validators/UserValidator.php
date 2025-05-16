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
            'fullName' => $request->body->fullName ?? null,
            'phoneNumber' => $request->body->phoneNumber ?? null,
            'email' => $request->body->email ?? null,
            'password' => $request->body->password ?? null,
            'passwordConfirmation' => $request->body->passwordConfirmation ?? null,
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
