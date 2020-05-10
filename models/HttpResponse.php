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

    public function badRequest($message)
    {
        http_response_code(400);

        echo json_encode([
            "date" => date("d/m/Y h:i:s:a"),
            "version" => "1.0.0",
            "error_type" => "Invalid parameter",
            "message" => $message,
        ]);
    }
}