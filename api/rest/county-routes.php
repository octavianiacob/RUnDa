<?php

require_once "../../models/Educatie.php";
require_once "../../models/Medii.php";
require_once "../../models/Rata.php";
require_once "../../models/Varste.php";
require_once "../../models/Orase.php";
require_once "../../config/Response.php";

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
                    Response::status(400);
                    break;
            }
        Response::status(200);

        Response::json(array_merge_recursive($array_result_educatie, $array_result_medii, $array_result_rata, $array_result_varsta));
    }
}

function getCounty($req)
{

    global $orase;
    //
    // Daca nu exista valoarea cheii county in baza de date returneaza 400
    if ($orase->selectOneCounty($req['params']['county']) === 0) {
        Response::status(400);
    } else // daca nu exista cheia filtered_by in url voi da 400
        if (array_key_exists('filtered_by', $req['query']) == false)
        Response::status(400);
    else {
        if ($req['query']['filtered_by']) { //daca avem cheia filtered by in query param
            $array_filtred_by = explode(",", $req['query']['filtered_by']); //facem split dupa virgula
            //initializam 4 array-uri cate unul pentru fiecare model
            $array_result_educatie = [];
            $array_result_medii = [];
            $array_result_rata = [];
            $array_result_varsta = [];
            //parcurgem fiecare tabel dat si stocam in array-urile definite mai sus doar  datele din tabelele educatie,medii,rata,varste
            for ($i = 0; $i < count($array_filtred_by); $i++)
                switch ($array_filtred_by[$i]) {
                    case "educatie":
                        global $educatie;
                        $array_result_educatie = $educatie->selectOneCounty($req['params']['county'], $req['query'],"educatie"); //apelam metoda din fiecare clasa cu parametrii dati,respectiv queryparams
                        break;
                    case "medii":
                        global $medii;
                        $array_result_medii = $medii->selectOneCounty($req['params']['county'], $req['query'],"medii");

                        break;
                    case "rata":
                        global $rata;
                        $array_result_rata = $rata->selectOneCounty($req['params']['county'], $req['query'],"rata");
                        break;
                    case "varste":
                        global $varste;
                        $array_result_varsta = $varste->selectOneCounty($req['params']['county'], $req['query'],"varste");
                        break;
                    default: // daca se afla un nume care nu corespunde cu cazurile tratate vom returna 400
                        return Response::status(400);
                        break;
                }
                // daca toate array urile sunt goale vom returna 400
            if (empty($array_result_educatie) and empty($array_result_medii) and empty($array_result_rata) and empty($array_result_varsta))
                Response::status(400);
            else // daca un array are valoarea -1, reprezentand eroare in urma interogarilor facute vom returna 400
            if ($array_result_educatie === -1 || $array_result_medii === -1 || $array_result_rata === -1 || $array_result_varsta === -1)
                Response::status(400);
            else { //altfel dau statusul 200 impreuna cu jsonul rezultat in urma combinarii celor 4 array-uri
                Response::status(200);
                Response::json(array_merge_recursive($array_result_educatie, $array_result_medii, $array_result_rata, $array_result_varsta));
            }
        } else
            Response::status(400); //returnez 400 daca nu avem ca si queryparam filter_by
    }
}
