<?php
require_once "../../config/Database.php";
require_once "Util.php";
class Educatie
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }


    public function selectAllEducatie()
    {

        $query = "SELECT
        educatie.judet, educatie.id_judet, educatie.month, educatie.year,
        educatie.total_someri,educatie.fara_studii, educatie.primar,
        educatie.gimnazial, educatie.liceal, educatie.postliceal,
        educatie.profesional_arte_meserii, educatie.universitar
        FROM educatie";

        return $this->db->fetchAllCounties($query);
    }
    public function selectOneCounty($parameter, $queryArray = null,$indice) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
        educatie.id, orase.city AS ORASE, educatie.id_judet, educatie.month, educatie.year,
        educatie.total_someri,educatie.fara_studii, educatie.primar,
        educatie.gimnazial, educatie.liceal, educatie.postliceal,
        educatie.profesional_arte_meserii, educatie.universitar
        FROM educatie
        JOIN orase ON educatie.id_judet = orase.id
        WHERE orase.city ='" . $parameter . "'";
        // daca dat orasul dat ca parametru nu exista in baza de date returnez 0
        if ($this->db->existCity($query, $parameter) == 0)
            return 0;
        //pun intr-un array coloanele dupa care se face sortarea
        $queryResult=Util::formQuery($query,$queryArray,$indice);



        return $this->db->fetchAllCounties($queryResult);
    }

}
