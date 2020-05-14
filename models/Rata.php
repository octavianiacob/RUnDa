<?php
require_once "../../config/Database.php";
class Rata{
    private $db;
    
    public function __construct()
    {
        $this->db = new Database();
    }

    
    public function selectAllRata(){
      
        $query = "SELECT
        rata.judet, rata.id_judet, rata.month, rata.year,
        rata.total_someri,rata.someri_femei,rata.someri_barbati,
        rata.someri_indemnizati,rata.someri_neindemnizati,rata.rata_somaj
        ,rata.rata_somaj_femei,rata.rata_somaj_barbati 
        FROM rata";

        return $this->db->fetchAll($query);
    }
    public function selectOneCounty($parameter) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
        rata.judet, rata.id_judet, rata.month, rata.year,
        rata.total_someri,rata.someri_femei,rata.someri_barbati,
        rata.someri_indemnizati,rata.someri_neindemnizati,rata.rata_somaj
        ,rata.rata_somaj_femei,rata.rata_somaj_barbati 
        FROM rata
        LEFT JOIN orase ON rata.id_judet = orase.id
        WHERE rata.judet = ?";
        
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