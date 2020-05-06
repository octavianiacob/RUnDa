<?php
class HttpResponse{

    public function OK($resultsData)
    {
        http_response_code(200);
        echo json_encode([
            "data" => $resultsData,
        ]);
    }
}