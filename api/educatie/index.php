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

    $resultsData =$educatie->selectTotalSomeri();//aici setez datele

    if ($resultsData !== isset($_GET['id'])) {
        $educatie->selectTotalSomeri();
    }


    

    if ($resultsData === 0) {
        $message = "No quote ";
    } else {
        $http->OK($resultsData);
    }
}
