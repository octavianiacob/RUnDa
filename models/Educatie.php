<?php
require_once "../../config/Database.php";
class Educatie{
    private $db;
    
    public function __construct()
    {
        $this->db = new Database();
    }

    
    public function selectAllEducatie(){
      
        $query = "SELECT
        educatie.judet, educatie.id_judet, educatie.month, educatie.year,
        educatie.total_someri,educatie.fara_studii, educatie.primar,
        educatie.gimnazial, educatie.liceal, educatie.postliceal,
        educatie.profesional_arte_meserii, educatie.universitar
        FROM educatie";

        return $this->db->fetchAllCounties($query);
    }
    public function selectOneCounty($parameter) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
        educatie.id, orase.city AS ORASE, educatie.id_judet, educatie.month, educatie.year,
        educatie.total_someri,educatie.fara_studii, educatie.primar,
        educatie.gimnazial, educatie.liceal, educatie.postliceal,
        educatie.profesional_arte_meserii, educatie.universitar
        FROM educatie
        JOIN orase ON educatie.id_judet = orase.id
        WHERE orase.city = ?";
        if($this->db->existCity($query,$parameter)==0)
            return 0;
        return $this->db->fetchOneCounty($query, $parameter);
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