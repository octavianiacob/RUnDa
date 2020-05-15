<?php

class Response
{
    static function status($code)
    {
        http_response_code($code);
    }

    static function json($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
