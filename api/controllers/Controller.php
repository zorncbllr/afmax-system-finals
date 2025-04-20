<?php

namespace Controllers;

use Core\Request;
use Core\Resource;

class Controller implements Resource
{
    function getAll(Request $request)
    {
        return json(['msg' => 'hello from resource']);
    }

    function getById(Request $request, string $id) {}

    function create(Request $request) {}

    function update(Request $request, string $id) {}

    function delete(Request $request, string $id) {}
}
