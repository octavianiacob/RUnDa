<?php

class Medii{
    private $db;
    
    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function selectAllMedii(){
        $query = "SELECT
        medii.id, medii.judet, medii.id_judet, medii.month, medii.year,
        medii.total_someri, medii.someri_femei, medii.someri_barbati,
        medii.someri_urban, medii.femei_urban, medii.barbati_urban,
        medii.someri_rural, medii.femei_rural, medii.barbati_rural
        FROM medii";

        return $this->db->fetchAll($query);
    }
}