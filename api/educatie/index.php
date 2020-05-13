<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");


require_once "../../config/Database.php";
require_once "../../models/Educatie.php";
require_once "../../models/HttpResponse.php";



$db = new Database();
$educatie = new Educatie($db);
$http = new HttpResponse();


$url = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id_judet']) && !filter_var($_GET['id_judet'], FILTER_VALIDATE_INT)) {
        // ERROR ONLY INTEGER IS ALLOWED
        $http->badRequest("Only a valid integer is allowed to fetch a single quote");
        die();
    }
   
    $resultsData = isset($_GET['city']) ? $educatie->selectOneCounty($_GET['city']) : $educatie->selectAllEducatie();
    

    if ($resultsData === 0) {
        $message = "No quote ";
    } else {
        $http->OK($resultsData);
    }
}


 // $resultsData =$educatie->selectAllEducatie();//aici setez datele

    // if ($resultsData !== isset($_GET['id'])) {
    //     $educatie->selectAllEducatie();
    // }
