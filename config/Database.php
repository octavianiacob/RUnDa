<?php

class Database
{

    //DB parameteres

    private $hostName = "localhost";
    private $dbname = "nivel_somaj";
    private $username = "root";
    private $password = "";
    private $pdo;

    
    //Start Connection

    public function __construct()
    {
        $this->pdo = null;

        try {

            $this->pdo = new PDO(
                "mysql:host=$this->hostName; dbname=$this->dbname;",
                $this->username,
                $this->password
            );//fac conexiunea cu baza de date folosindu-ma de variabilele de mai sus

            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            //attr_default..=selecteaza fetch mode(Fetches the next row from a result set)
            //FETCH_ASSOC= returneaza rezultatul ca un array asociativ
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//pt erori
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }



    public function getPDO(){
        return $this->pdo;
    }
    public function fetchAllCounties($query) //fetch everytihing (adica interpreteaza sql statement.)
    {
        try {
            $stmt = $this->pdo->prepare($query); //to avoid sql injection
            $stmt->execute();//execut instructiunea
            $rowCount = $stmt->rowCount();//vad cate randuri s-au returnat

            if ($rowCount <= 0) {
                return 0;
            } else {//daca am mai mult de 0 randuri
                return $stmt->fetchAll();//;e fac pe toate
            }
        } catch (Exception $e) {
            return -1;
        }
    }
    public function fetchOneCounty($query, $parameter) //cu fetchOne scot un JSON!
    {
        try {
            $stmt = $this->pdo->prepare($query);

            $stmt->execute([$parameter]);
            $rowCount = $stmt->rowCount();

            if ($rowCount <= 0) {
                return 0;
            } else {
                return $stmt->fetchAll();
            }
        } catch (Exception $e) {
            return -1;
        }
    }
    public function existCity($query, $parameter)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$parameter]);
        $rowCount = $stmt->rowCount();

        if ($rowCount <= 0) {
            return 0;
        } else {
            return 1;
        }
    }
}
