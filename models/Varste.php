<?php
require_once "../../config/Database.php";
require_once "Util.php";
class Varste
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }


    public function selectAllVarste()
    {

        $query = "SELECT
        varste.judet, varste.id_judet, varste.month, varste.year,
        varste.total_someri,varste.sub_25_ani,varste.25_29_ani,
        varste.30_39_ani,varste.40_49_ani,varste.50_55_ani,varste.peste_55_ani
        FROM varste";

        return $this->db->fetchAllCounties($query);
    }
    public function selectOneCounty($parameter, $queryArray = null,$indice) //cu fetchOne scot un JSON!
    {
        $query = "SELECT
       orase.city AS ORASE, varste.id_judet, varste.month, varste.year,
        varste.total_someri,varste.sub_25_ani,varste.25_29_ani,
        varste.30_39_ani,varste.40_49_ani,varste.50_55_ani,varste.peste_55_ani
        FROM varste
        JOIN orase ON varste.id_judet = orase.id
        WHERE orase.city ='" . $parameter . "'";
        if ($this->db->existCity($query, $parameter) == 0)
            return 0;
            $queryResult=Util::formQuery($query,$queryArray,$indice);

        return $this->db->fetchAllCounties($queryResult);
    }

 
}
