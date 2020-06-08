<?php

class Util
{
    static function formQuery($query, $queryArray, $indice)
    {
        $nume_tabel = $indice;
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
                    $query = $query . " AND " .$nume_tabel ."." . $key . "='" . $value . "'";
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
                    $query = $query . $nume_tabel ."." . $array_sorted_by[$i];
                else
                    $query = $query . $nume_tabel ."." . $array_sorted_by[$i] . ",";
            }
        }
        //daca utilizatorul da order_by=ASC voi concatena query-ul cu order by asc
        if (empty($order_by) == false)
            $query = $query . " " . $order_by;
        return $query;
    }
}
