<?php
require_once "../../config/Database.php";
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
    public function selectOneCounty($parameter, $queryArray = null) //cu fetchOne scot un JSON!
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
        $array_sorted_by = [];
        $array_param = [];
        $valuesSort = "";
        foreach ($queryArray as $key => $value)
            switch ($key) {
                case "filtered_by":
                    break;
                case "sorted_by":
                    $valuesSort = $value;
                    break;
                default:
                    $query = $query . " AND medii." . $key . "='" . $value . "'";
                    array_push($array_param, $value);
            }
        if ($valuesSort != null)
            $array_sorted_by = explode(",", $valuesSort);
        if (count($array_sorted_by) > 0) {
            $query = $query . " ORDER BY ";
            for ($i = 0; $i < count($array_sorted_by); $i++) {
                if ($i + 1 == count($array_sorted_by))
                    $query = $query . "medii." . $array_sorted_by[$i];
                else
                    $query = $query . "medii." . $array_sorted_by[$i] . ",";
            }
        }


        return $this->db->fetchAllCounties($query);
    }
}
