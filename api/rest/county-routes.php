<?php

require_once "../../models/Educatie.php";
class Response {
    static function status($code) {
        http_response_code($code);
    }

    static function json($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

$countyRoutes=[
    [
        "method" => "GET",
        "route" => "counties",
        "handler" => "getCounties"
    ],   
    [
        "method" => "GET",
        "route" => "counties/:county",
        "handler" => "getCounty"
    ]
];

function getCounties($req)
{
    Response::status(200);
    $educatie=new Educatie();
    if($req['query']['filtered_by']==="educatie")
    {
        Response::json($educatie->selectTotalSomeri());
    }

}

function getCounty($req) {


    // req['payload']

    // DB GET $req['params']['teamId'];

    Response::status(200);
    Response::json($req['params']);
    
    
    
    // echo "Get team {$req['params']['teamId']}";
    // $req['params']['teamId'];


    /// procesare din DB

    // $res -> status(200); 
        // http_response_code(200)
    
    // $res -> json($payload);
        // header("Content-Type: application/json");
        // echo json_encode($payload);
}