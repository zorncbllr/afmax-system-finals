<?php

namespace Controllers;

use Core\Request;

class Controller
{
    function index(Request $request)
    {

        return json([
            'message' => 'damn shawty so fine, shyt',
            'request' => $request
        ]);
    }
}
