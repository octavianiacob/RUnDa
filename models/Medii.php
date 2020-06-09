<?php
require_once "../../config/Database.php";
require_once "Util.php";
class Medii
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function selectAllMedii()
    {
        $query = "SELECT
        medii.judet, medii.id_judet, medii.month, medii.year,
        medii.total_someri, medii.someri_femei, medii.someri_barbati,
        medii.someri_urban, medii.femei_urban, medii.barbati_urban,
        medii.someri_rural, medii.femei_rural, medii.barbati_rural
        FROM medii";

        return $this->db->fetchAllCounties($query);
    }
    public function selectOneCounty($parameter, $queryArray = null,$indice) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
        orase.city AS ORASE, medii.id_judet, medii.month, medii.year,
        medii.total_someri, medii.someri_femei, medii.someri_barbati,
        medii.someri_urban, medii.femei_urban, medii.barbati_urban,
        medii.someri_rural, medii.femei_rural, medii.barbati_rural
        FROM medii
        JOIN orase ON medii.id_judet = orase.id
        WHERE orase.city ='" . $parameter . "'";
        if ($this->db->existCity($query, $parameter) == 0)
            return 0;
            $queryResult=Util::formQuery($query,$queryArray,$indice);


        return $this->db->fetchAllCounties($queryResult);
    }
}
