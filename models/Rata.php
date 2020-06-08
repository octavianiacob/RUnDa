<?php
require_once "../../config/Database.php";
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
    public function selectOneCounty($parameter, $queryArray = null) //cu fetchOne scot un JSON!
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
        $array_sorted_by = [];
        $array_param = [];
        $order_by = "";
        $valuesSort = "";
        foreach ($queryArray as $key => $value)
            switch ($key) {
                case "filtered_by":
                    break;
                case "sorted_by":
                    $valuesSort = $value;
                    break;
                case "order_by":
                    $order_by = $value;
                    break;
                default:
                    $query = $query . " AND rata." . $key . "='" . $value . "'";
                    array_push($array_param, $value);
            }
        if ($valuesSort != null)
            $array_sorted_by = explode(",", $valuesSort);
        if (count($array_sorted_by) > 0) {
            $query = $query . " ORDER BY ";
            for ($i = 0; $i < count($array_sorted_by); $i++) {
                if ($i + 1 == count($array_sorted_by))
                    $query = $query . "rata." . $array_sorted_by[$i];
                else
                    $query = $query . "rata." . $array_sorted_by[$i] . ",";
            }
        }
        if (empty($order_by) == false)
            $query = $query . " " . $order_by;


        return $this->db->fetchAllCounties($query);
    }


}
