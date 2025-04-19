<?php

namespace Controllers;

class Controller
{
    function index($id, $imageId)
    {
        header('Content-Type: application/json');

        echo json_encode([
            'msg' => 'this is get method',
            'id' => $id,
            'imageID' => $imageId
        ]);
    }

    function create()
    {
        header('Content-Type: application/json');

        echo json_encode(['msg' => 'this is post method']);
    }
}
