<?php

namespace Core;

use AllowDynamicProperties;

#[AllowDynamicProperties]
class Body
{
    function __construct()
    {
        $body = json_decode(
            file_get_contents("php://input")
        );

        foreach ($body as $key => $value) {
            $this->$key = $value;
        }
    }
}
