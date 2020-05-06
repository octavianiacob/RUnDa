<?php

$mydir = 'C:/Users/ichim/Desktop/somaj';
$myfiles = scandir($mydir);

array_shift($myfiles);
array_shift($myfiles);

if (!function_exists('mysqli_result')) {
    function mysqli_result($res, $row, $field = 0)
    {
        $res->data_seek($row);
        $datarow = $res->fetch_array();
        return $datarow[$field];
    }
}
$connect = mysqli_connect("localhost", "root", "", "nivel_somaj");

//for ca sa parcurg array-ul de fisiere din director
//fac split 
//salvez luna si anul in 2 variabile
// luna=2; in

foreach ($myfiles as $value) {

    //if pt nume fisier

    $query = "SELECT count(*)  from fisiere
                WHERE filename = '$value'    ";
    $result = mysqli_query($connect, $query);

    if (mysqli_result($result, 0) === '0') {
        echo mysqli_result($result, 0);

        $query = " INSERT INTO fisiere (filename) VALUES ('$value')";
        mysqli_query($connect, $query);
        //echo nl2br($value . "\n"); //PENTRU NEW LINE

        $route = $mydir . '/' .  $value;
        echo nl2br($route . "\n");

        $file_name_and_extenstions = explode("_", $value);
        echo $file_name_and_extenstions[0] . " " . $file_name_and_extenstions[1] . " " . $file_name_and_extenstions[2];

        $handle = fopen($route, "r");
        $contor = 0;

        while ($data = fgetcsv($handle)) {
            $contor++;
            $item0 = mysqli_real_escape_string($connect, $data[0]);
            $item1 = mysqli_real_escape_string($connect, $data[1]);
            $item2 = mysqli_real_escape_string($connect, $data[2]);
            $item3 = mysqli_real_escape_string($connect, $data[3]);
            $item4 = mysqli_real_escape_string($connect, $data[4]);
            $item5 = mysqli_real_escape_string($connect, $data[5]);
            $item6 = mysqli_real_escape_string($connect, $data[6]);
            $item7 = mysqli_real_escape_string($connect, $data[7]);
            $item8 = mysqli_real_escape_string($connect, $data[8]);
            $item9 = mysqli_real_escape_string($connect, $data[9]);
            

            if ($contor == 44)
                break;

                //if pentru varste
            if ($file_name_and_extenstions[2] === "varste.csv") {
                $query = "INSERT into varste (judet, id_judet, month, year, total_someri, sub_25_ani, 25_29_ani, 30_39_ani, 40_49_ani, 50_55_ani, peste_55_ani) 
                values('$item0',$contor-1, '$file_name_and_extenstions[0]',$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6, $item7)";
                mysqli_query($connect, $query);
            }

            //if pt medii

            if ($file_name_and_extenstions[2] === "medii.csv") {
                $query = "INSERT into medii (judet, id_judet, month, year, total_someri, someri_femei, someri_barbati, someri_urban,
                 femei_urban, barbati_urban, someri_rural, femei_rural, barbati_rural) 
                values('$item0',$contor-1, '$file_name_and_extenstions[0]',$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6, $item7
                ,$item8, $item9)";
                mysqli_query($connect, $query);
            }
            //if pt educatie
            if ($file_name_and_extenstions[2] === "educatie.csv") {
                $query = "INSERT into educatie (judet, id_judet, month, year, total_someri, fara_studii, primar, gimnazial, liceal, postliceal,
                profesional_arte_meserii, universitar) 
                values('$item0',$contor-1, '$file_name_and_extenstions[0]',$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6,
                 $item7, $item8)";
                mysqli_query($connect, $query);
            }
            
           // if pt rata

            if ($file_name_and_extenstions[2] === "rata.csv") {
                $query = "INSERT into rata (judet, id_judet, month, year, total_someri, someri_femei, someri_barbati, someri_indemnizati, someri_neindemnizati,
                rata_somaj, rata_somaj_femei, rata_somaj_barbati ) 
                values('$item0',$contor-1, '$file_name_and_extenstions[0]',$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6,
                 $item7, $item8)";
                mysqli_query($connect, $query);
            }
            
        }
        fclose($handle);
    }
}
