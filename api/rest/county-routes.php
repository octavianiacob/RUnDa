<?php

require_once "../../models/Educatie.php";
require_once "../../models/Medii.php";
require_once "../../models/Rata.php";
require_once "../../models/Varste.php";
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

$countyRoutes = [
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
    $array_filtred_by = explode(",", $req['query']['filtered_by']);
    $array_result_educatie=[];
    $array_result_medii=[];
    $array_result_rata=[];
    $array_result_varsta=[];
    for ($i = 0; $i < count($array_filtred_by); $i++)
        switch ($array_filtred_by[$i]) {
            case "educatie":
                $educatie = new Educatie();
                $array_result_educatie = $educatie->selectAllEducatie();
                break;
            case "medii":
                $medii = new Medii();
                $array_result_medii = $medii->selectAllMedii();
                //Response::json($medii->selectAllMedii());
                break;
            case "rata":
                $rata = new Rata();
                $array_result_rata = $rata->selectAllRata();
                break;
            case "varste":
                $varste = new Varste();
                $array_result_varsta = $varste->SelectAllVarste();
                break;
            default:Response::status(404);
        }
        /*$merge=array_merge_recursive($array_result_educatie, $array_result_medii);
        print_r($merge);*/
    Response::json(array_merge_recursive($array_result_educatie, $array_result_medii,$array_result_rata,$array_result_varsta));
   
}

function getCounty($req)
{


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
