<?php

class Util
{
    static function formQuery($query, $queryArray, $indice)
    {   //iau ca parametru query-ul initial fara queryparam, array-ul de queryparams si $indicele care reprezinta numele tabelelor
        $nume_tabel = $indice;
        $array_sorted_by = [];
        //puneam ASC sau DESC in functie de tipul ales
        $order_by = "";
        $array_param = [];
        $valuesSort = "";
        foreach ($queryArray as $key => $value) //parcurg array-ul de queryparams si mi formez query-ul
            switch ($key) {
                case "filtered_by": //daca gasesc in array cheia filter_by nu fac nimic
                    break;
                case "sorted_by": //daca gasesc cheia sorted_by salvez intr-o variabila valorile din acea cheie
                    $valuesSort = $value;
                    break;
                case "order_by": //daca gasesc ccheia order_by voi stoca intr-o variabila daca sortarea este ascendenta sau descendenta
                    $order_by = $value;
                    break;
                default:
                    $query = $query . " AND " .$nume_tabel ."." . $key . "='" . $value . "'"; //filtrare bazata pe coloane
                    array_push($array_param, $value);
            }
        if ($valuesSort != null) //daca exista sortare dupa anumite campuri
            $array_sorted_by = explode(",", $valuesSort); //fac split dupa , si-mi salvez rezultatul intr-un array
        // daca exista elemente dupa care se face sortarea
        if (count($array_sorted_by) > 0) { //daca am elemente in array
           
            $query = $query . " ORDER BY ";  //imi concatenez query-ul cu order by si elementul dupa care se face sortarea
            for ($i = 0; $i < count($array_sorted_by); $i++) { //daca am mai multe elemente concatenez cu element si virgula daca nu doar cu element
                if ($i + 1 == count($array_sorted_by))
                    $query = $query . $nume_tabel ."." . $array_sorted_by[$i];
                else
                    $query = $query . $nume_tabel ."." . $array_sorted_by[$i] . ",";
            }
        }
       
        if (empty($order_by) == false)  //daca utilizatorul da order_by=ASC voi concatena query-ul cu order by asc
            $query = $query . " " . $order_by;
        return $query;
    }
}
