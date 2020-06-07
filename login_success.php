<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RUnDa</title>
    <link rel="stylesheet" type="text/css" href="styles/reset.css">
    <link rel="stylesheet" type="text/css" href="styles/navbar.css">
    <link rel="stylesheet" type="text/css" href="styles/index.css">
    <link rel="stylesheet" type="text/css" href="styles/loginsuccess.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <!--<script src="/scripts/main.js"></script> -->
</head>

<body class="body">

    <header>
        <div class="navbar">
            <div class="pagina-home">
                <a id="logo" href="." rel="home"><span class="full-text">Romanian Unemployment Data Visualizer</span>
                    <span class="short-text">RUnDa</span></a>
            </div>
            <div class="nav-links">
                <ul class="nav-list">
                    <li>
                        <a href="https://github.com/Octavzz/RUnDa"><img src="/RUnDa/images/githubicon.png" alt="GitHub link"></a>
                    </li>
                    <li>
                        <a href="./about.html"><img src="/RUnDa/images/circleicon.png" alt="About page"></a>
                    </li>
                    <li>
                        <a href="./contact.php"><img src="/RUnDa/images/squareicon.png" alt="Contact Page"></a>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <form method="post" enctype="multipart/form-data">

        <label>Select CSV File:</label>
        <input type="file" name="file" />
        <br />
        <input type="submit" name="submit" value="Import" class="btn btn-info" />

    </form>

    <?php
    //login_success.php  
    session_start();
    if (!function_exists('mysqli_result')) {
        function mysqli_result($res, $row, $field = 0)
        {
            $res->data_seek($row);
            $datarow = $res->fetch_array();
            return $datarow[$field];
        }
    }
    $connect = mysqli_connect("localhost", "root", "", "nivel_somaj");
    if (isset($_SESSION["username"])) {
        if (isset($_POST["submit"])) {
            if ($_FILES['file']['name']) {
                $value = $_FILES['file']['name'];
                $query = "SELECT count(*)  from fisiere
                WHERE filename = '$value'    ";
                $result = mysqli_query($connect, $query);
                if (mysqli_result($result, 0) === '0') {
                    echo mysqli_result($result, 0);

                    $query = " INSERT INTO fisiere (filename) VALUES ('$value')";
                    mysqli_query($connect, $query);

                    $filename = explode(".", $_FILES['file']['name']);
                    if ($filename[1] == 'csv') {
                        $handle = fopen($_FILES['file']['tmp_name'], "r");
                        $file_name_and_extenstions = explode("_", $filename[0]);

                        echo $file_name_and_extenstions[0] . " " . $file_name_and_extenstions[1] . " " . $file_name_and_extenstions[2];
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
                            if($file_name_and_extenstions[2]==="educatie" || $file_name_and_extenstions[2]==="medii" || $file_name_and_extenstions[2]==="rata" )
                            $item8 = mysqli_real_escape_string($connect, $data[8]);
                            if($file_name_and_extenstions[2]==="medii")
                            $item9 = mysqli_real_escape_string($connect, $data[9]);



                            if ($contor == 44)
                                break;
                            $month = "";
                            switch ($file_name_and_extenstions[0]) {
                                case "ianuarie":
                                    $month = 1;
                                    break;
                                case "februarie":
                                    $month = 2;
                                    break;
                                case "martie":
                                    $month = 3;
                                    break;
                                case "aprilie":
                                    $month = 4;
                                    break;
                                case "mai":
                                    $month = 5;
                                    break;
                                case "iunie":
                                    $month = 6;
                                    break;
                                case "iulie":
                                    $month = 7;
                                    break;
                                case "august":
                                    $month = 8;
                                    break;
                                case "septembrie":
                                    $month = 9;
                                    break;
                                case "octombrie":
                                    $month = 10;
                                    break;
                                case "noiembrie":
                                    $month = 11;
                                    break;
                                case "decembrie":
                                    $month = 12;
                                    break;
                            }
                            //if pentru varste
                            if ($file_name_and_extenstions[2] === "varste") {
                                $query = "INSERT into varste (judet, id_judet, month, year, total_someri, sub_25_ani, 25_29_ani, 30_39_ani, 40_49_ani, 50_55_ani, peste_55_ani) 
                            values('$item0',$contor-1, $month,$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6, $item7)";
                                mysqli_query($connect, $query);
                            }

                            //if pt medii

                            if ($file_name_and_extenstions[2] === "medii") {
                                $query = "INSERT into medii (judet, id_judet, month, year, total_someri, someri_femei, someri_barbati, someri_urban,
                             femei_urban, barbati_urban, someri_rural, femei_rural, barbati_rural) 
                            values('$item0',$contor-1, $month,$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6, $item7
                            ,$item8, $item9)";
                                mysqli_query($connect, $query);
                            }
                            //if pt educatie
                            if ($file_name_and_extenstions[2] === "educatie") {
                                $query = "INSERT into educatie (judet, id_judet, month, year, total_someri, fara_studii, primar, gimnazial, liceal, postliceal,
                            profesional_arte_meserii, universitar) 
                            values('$item0',$contor-1, $month,$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6,
                             $item7, $item8)";
                                mysqli_query($connect, $query);
                            }

                            // if pt rata

                            if ($file_name_and_extenstions[2] === "rata") {
                                $query = "INSERT into rata (judet, id_judet, month, year, total_someri, someri_femei, someri_barbati, someri_indemnizati, someri_neindemnizati,
                            rata_somaj, rata_somaj_femei, rata_somaj_barbati ) 
                            values('$item0',$contor-1, $month,$file_name_and_extenstions[1], $item1, $item2, $item3, $item4, $item5, $item6,
                             $item7, $item8)";
                                mysqli_query($connect, $query);
                            }
                        }
                        fclose($handle);
                    }
                    echo "<script>alert('Import done');</script>";


                    //  echo $filename[0];
                    // $file_name_and_extenstions = explode("_", $filename[0]);
                    // echo '<br>';
                    // echo $file_name_and_extenstions[0] . '<br>' . $file_name_and_extenstions[1] . '<br>' . $file_name_and_extenstions[2];
                    // echo '<br>';
                    // echo $filename[1];
                }
            }
        }
          } else {
        header("location:admin.php");
    }
    ?>
<form action="login_success.php" method="post" style="text-align:center;">
    <input  type='submit' value="Logout" name='logout' style="background-color:blue" />
</form>
<?php
if (isset($_POST['logout'])){ 
    session_start();
    session_destroy();  
    header("location:admin.php");
}
?>

<?php
require_once "./config/Database.php";

$db = new Database();
$query="select contact.firstname,contact.lastname,contact.email,contact.phone,contact.message from contact";
$statament=$db->getPDO()->query($query);
$statament->setFetchMode(PDO::FETCH_ASSOC);
echo "<br>";
echo "<br>";
echo "<br>";
echo "<br>";
echo "<table border='1' align=center >\n";
$array_names=["FIRSTNAME","LASTNAME","EMAIL","PHONE","MESSAGE"];
$ncols=count($array_names);
echo "<tr>\n";
for ($i = 0; $i < $ncols; ++$i) {
    echo "  <th><b>". $array_names[$i]."</b></th>\n";
}
echo "</tr>\n";
while ($row = $statament->fetch()) { //returneaza urmatoarea linie din interogare
    echo "<tr style=text-align:center;>\n"; //imi mai face o celula
    foreach ($row as $item) { //pentru fiecare element din rand
        echo "    <td style=text-align:center;>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
        //daca exista valoare intr-o celula
        // afiseaza valoarea
        //altfel lasa spatiu gol
    }
    echo "</tr>\n";
}
echo "</table>\n";
?>

</body>

</html>