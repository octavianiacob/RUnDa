<?php
require_once "../../config/Database.php";
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
    public function selectOneCounty($parameter, $queryArray = null) //cu fetchOne scot un JSON!
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
        $array_sorted_by = [];
        //puneam ASC sau DESC in functie de tipul ales
        $order_by = "";
        $array_param = [];
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
                    $query = $query . " AND educatie." . $key . "='" . $value . "'";
                    array_push($array_param, $value);
            }
        if ($valuesSort != null)
            $array_sorted_by = explode(",", $valuesSort);
            // daca exista elemente dupa care se face sortarea
        if (count($array_sorted_by) > 0) {
            //imi concatenez query-ul cu order by si elementul dupa care se face sortarea
            $query = $query . " ORDER BY ";
            for ($i = 0; $i < count($array_sorted_by); $i++) { //daca am mai multe elemente concatenez cu element si virgula daca nu doar cu element
                if ($i + 1 == count($array_sorted_by))
                    $query = $query . "educatie." . $array_sorted_by[$i];
                else
                    $query = $query . "educatie." . $array_sorted_by[$i] . ",";
            }
        }
        //daca utilizatorul da order_by=ASC voi concatena query-ul cu order by asc
        if (empty($order_by) == false)
            $query = $query . " " . $order_by;



        return $this->db->fetchAllCounties($query);
    }

}
