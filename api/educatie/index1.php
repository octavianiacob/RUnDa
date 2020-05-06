<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");


require_once "../config/Database.php";


$db = new Database();
$educatie = new Educatie($db);
$http = new HttpResponse();

$url = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// if($method === 'GET'){

// }
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($resultsData !== isset($_GET['id'])) {
        $educatie->selectTotalSomeri();
    }

    if ($resultsData === 0) {
        $message = "No quote ";
    } else {
        $http->OK($results);
    }
}
