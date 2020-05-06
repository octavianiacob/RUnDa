<?php

class Database{
    
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
                );
                $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                echo "Connected successfully"; 
            } catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
            }
        }

        public function fetchAll($query)
    {
        $stmt = $this->pdo->prepare($query); //to avoid sql injection
        $stmt->execute();
        $rowCount = $stmt->rowCount();

        if ($rowCount <= 0) {
            return 0;
        } else {
            return $stmt->fetchAll();
        }
    }
    public function fetchOne($query, $parameter)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$parameter]);
        $rowCount = $stmt->rowCount();

        if ($rowCount <= 0) {
            return 0;
        } else {
            return $stmt->fetch();
        }
    } 

    
}