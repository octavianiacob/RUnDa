<?php

class Educatie{
    private $db;
    
    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function selectTotalSomeri(){
        $query = "SELECT
        educatie.id, educatie.judet, educatie.id_judet, educatie.month, educatie.year,
        educatie.total_someri,educatie.fara_studii, educatie.primar,
        educatie.gimnazial, educatie.liceal, educatie.postliceal,
        educatie.profesional_arte_meserii, educatie.universitar
        FROM educatie";

        return $this->db->fetchAll($query);
    }
}