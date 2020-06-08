<?php
require_once "../../config/Database.php";
require_once "Util.php";
class Rata
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }


    public function selectAllRata()
    {

        $query = "SELECT
        rata.judet, rata.id_judet, rata.month, rata.year,
        rata.total_someri,rata.someri_femei,rata.someri_barbati,
        rata.someri_indemnizati,rata.someri_neindemnizati,rata.rata_somaj
        ,rata.rata_somaj_femei,rata.rata_somaj_barbati 
        FROM rata";

        return $this->db->fetchAllCounties($query);
    }
    public function selectOneCounty($parameter, $queryArray = null,$indice) //cu fetchOne scot un JSON!
    {

        $query = "SELECT
          orase.city AS ORASE, rata.id_judet, rata.month, rata.year,
        rata.total_someri,rata.someri_femei,rata.someri_barbati,
        rata.someri_indemnizati,rata.someri_neindemnizati,rata.rata_somaj
        ,rata.rata_somaj_femei,rata.rata_somaj_barbati 
        FROM rata
        JOIN orase ON rata.id_judet = orase.id
        WHERE orase.city ='" . $parameter . "'";
        if ($this->db->existCity($query, $parameter) == 0)
            return 0;
            $queryResult=Util::formQuery($query,$queryArray,$indice);



        return $this->db->fetchAllCounties($queryResult);
    }


}
