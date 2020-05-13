<?php
require_once "../../config/Database.php";
class Varste{
    private $db;
    
    public function __construct()
    {
        $this->db = new Database();
    }

    
    public function selectAllVarste(){
      
        $query = "SELECT
        varste.judet, varste.id_judet, varste.month, varste.year,
        varste.total_someri,varste.sub_25_ani,varste.25_29_ani,
        varste.30_39_ani,varste.40_49_ani,varste.50_55_ani,varste.peste_55_ani
        FROM varste";

        return $this->db->fetchAll($query);
    }
    public function selectOneCounty($parameter) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
        varste.judet, varste.id_judet, varste.month, varste.year,
        varste.total_someri,varste.sub_25_ani,varste.25_29_ani,
        varste.30_39_ani,varste.40_49_ani,varste.50_55_ani,varste.peste_55_ani
        FROM varste
        LEFT JOIN orase ON varste.id_judet = orase.id
        WHERE varste.judet = ?";
        
        return $this->db->fetchOne($query, $parameter);
    }

//daca parametrul este CLUJ, atunci selectez toate id-urile unice si afisez JSON

      // public function selectOneCounty($parameter)
    // {
    //     $query = "SELECT
    //     educatie.id, educatie.judet, educatie.id_judet, educatie.month, educatie.year,
    //     educatie.total_someri,educatie.fara_studii, educatie.primar,
    //     educatie.gimnazial, educatie.liceal, educatie.postliceal,
    //     educatie.profesional_arte_meserii, educatie.universitar
    //     FROM educatie
    //     WHERE educatie.id_judet = ?";
    //     return $this->db->fetchOne($query, $parameter);
    // }
}