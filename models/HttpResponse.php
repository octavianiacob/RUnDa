<?php
class HttpResponse{

    public function OK($resultsData)
    {
        http_response_code(200);
        echo json_encode([
            "data_time"=> date("d/m/Y h:i:s:a"),
            "data" => $resultsData,
        ]);
    }
}