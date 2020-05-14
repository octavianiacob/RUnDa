<?php
require_once "../../config/Database.php";
class Orase{
    private $db;
    
    public function __construct()
    {
        $this->db = new Database();
    }

    
    
    public function selectOneCounty($parameter) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
        orase.id
        FROM orase
        WHERE orase.city = ?";
        if($this->db->existCity($query,$parameter)==0)
            return 0;
       return 1;
    }
   


}