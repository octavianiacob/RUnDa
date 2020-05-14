<?php

require_once "../../models/Educatie.php";
require_once "../../models/Medii.php";
require_once "../../models/Rata.php";
require_once "../../models/Varste.php";
require_once "../../models/Orase.php";
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
        "route" => "counties/:county",
        "handler" => "getCounty"
    ],
    [
        "method" => "GET",
        "route" => "counties",
        "handler" => "getCounties"
    ]

];
$educatie = new Educatie();
$medii = new Medii();
$rata = new Rata();
$varste = new Varste();
$orase = new Orase();
function getCounties($req)
{
    if ($req['query']['filtered_by']) {
        $array_filtred_by = explode(",", $req['query']['filtered_by']);
        $array_result_educatie = [];
        $array_result_medii = [];
        $array_result_rata = [];
        $array_result_varsta = [];
        for ($i = 0; $i < count($array_filtred_by); $i++)
            switch ($array_filtred_by[$i]) {
                case "educatie":
                    global $educatie;
                    $array_result_educatie = $educatie->selectAllEducatie();
                    break;
                case "medii":
                    global $medii;
                    $array_result_medii = $medii->selectAllMedii();
                    //Response::json($medii->selectAllMedii());
                    break;
                case "rata":
                    global $rata;
                    $array_result_rata = $rata->selectAllRata();
                    break;
                case "varste":
                    global $varste;
                    $array_result_varsta = $varste->SelectAllVarste();
                    break;
                default:
                    Response::status(404);
                    break;
            }
        Response::status(200);

        Response::json(array_merge_recursive($array_result_educatie, $array_result_medii, $array_result_rata, $array_result_varsta));
    }
}

function getCounty($req)
{


    // req['payload']

    // DB GET $req['params']['teamId'];
    global $orase;
    if ($orase->selectOneCounty($req['params']['county']) === 0) {
        Response::status(404);
    } else 
        if (array_key_exists('filtered_by', $req['query']) == false)
        Response::status(404);
    else {
        if ($req['query']['filtered_by']) {
            $array_filtred_by = explode(",", $req['query']['filtered_by']);
            $array_result_educatie = [];
            $array_result_medii = [];
            $array_result_rata = [];
            $array_result_varsta = [];
            for ($i = 0; $i < count($array_filtred_by); $i++)
                switch ($array_filtred_by[$i]) {
                    case "educatie":
                        global $educatie;
                        $array_result_educatie = $educatie->selectOneCounty($req['params']['county'], $req['query']);
                        break;
                    case "medii":
                        global $medii;
                        $array_result_medii = $medii->selectOneCounty($req['params']['county'], $req['query']);

                        break;
                    case "rata":
                        global $rata;
                        $array_result_rata = $rata->selectOneCounty($req['params']['county'], $req['query']);
                        break;
                    case "varste":
                        global $varste;
                        $array_result_varsta = $varste->selectOneCounty($req['params']['county'], $req['query']);
                        break;
                    default:
                        return Response::status(404);
                        break;
                }
            Response::status(200);
            if (empty($array_result_educatie) and empty($array_result_medii) and empty($array_result_rata) and empty($array_result_varsta))
                Response::status(404);
            else
                Response::json(array_merge_recursive($array_result_educatie, $array_result_medii, $array_result_rata, $array_result_varsta));
        } else
            Response::status(404);
    }
}
