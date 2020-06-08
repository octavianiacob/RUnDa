<?php

require_once "./county-routes.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$allHeaders = getallheaders();

$allRoutes = [
    ...$countyRoutes,

];

foreach ($allRoutes as $routeConfig) {
    if (parseRequest($routeConfig)) {
        exit;
    }
}





function parseRequest($routeConfig)
{
    // regexp match 
    $url = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method !== $routeConfig['method']) {
        return false;
    }

    $regExpString = routeExpToRegExp($routeConfig['route']);


    if (preg_match("/$regExpString/", $url, $matches)) {

        $params = getParams($routeConfig, $matches);
        $query = getQueryParams($url);

        call_user_func($routeConfig['handler'], [
            "params" => $params,
            "query" => $query,
            
        ]);

        return true;
    }

    return false;
}



function routeExpToRegExp($route)
{
    $regExpString = "";
    $parts = explode('/', $route);

    foreach ($parts as $p) {
        $regExpString .= '\/';

        if ($p[0] === ':') {
            $regExpString .= '([a-zA-Z0-9-]+)';
        } else {
            $regExpString .= $p;
        }
    }
    $regExpString .= '?';

    return $regExpString;
}

function getQueryParams($url)
{
    $query = [];
    if (strpos($url, '?')) {
        $queryString = explode('?', $url)[1];
        $queryParts = explode('&', $queryString);

        foreach ($queryParts as $part) {
            if (strpos($part, '=')) {
                $query[explode('=', $part)[0]] = explode('=', $part)[1];
            }
        }
    }
    return $query;
}
function getParams($routeConfig, $matches)
{
    $params = [];
    $parts = explode('/', $routeConfig['route']);

    // Params
    $index = 1;
    foreach ($parts as $p) {
        if ($p[0] === ':') {
            $params[substr($p, 1)] = $matches[$index];
            $index++;
        }
    }
    return $params;
}

