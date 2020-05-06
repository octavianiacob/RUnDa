<?php

class Educatie{
    private $db;
    
    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function selectTotalSomeri(){
        $query = "SELECT * from educatie";

        return $this->db->fetchAll($query);
    }
}