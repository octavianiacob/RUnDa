<?php
session_start();
require_once "./config/Database.php";

$connectDB = new Database();

try {
    if (isset($_POST["login"])) {
        if (empty($_POST["username"]) || empty($_POST["password"])) {
            $message = '<label>All fields are required</label>';
        } else {
            $query = "SELECT password FROM users WHERE username = :username ";
            $statement = $connectDB->getPDO()->prepare($query);
            $statement->execute(
                array(
                    'username'     =>     $_POST["username"]
                )
            );
            $count = $statement->rowCount();
            if ($count > 0) {
                $result = $statement->fetch(PDO::FETCH_ASSOC);
                if (password_verify($_POST['password'], $result['password'])) {

                    $_SESSION["username"] = $_POST["username"];
                    header("location:login_success.php");  //aici tre sa vad
                } else {
                    $message = '<label>Wrong Data</label>';
                }
            } else {
                $message = '<label>Wrong Data</label>';
            }
        }
    }
} catch (PDOException $error) {
    $message = $error->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RUnDa</title>
    <link rel="stylesheet" type="text/css" href="styles/reset.css">
    <link rel="stylesheet" type="text/css" href="styles/navbar.css">
    <link rel="stylesheet" type="text/css" href="styles/admin.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
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
                        <a href="https://github.com/Octavzz/RUnDa"><img src="/RUnDa/images/githubicon.png"
                                alt="GitHub link"></a>
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
    <?php
    if (isset($message)) {
        echo '<label class="text-danger">' . $message, '</label>';
    }
    ?>

    <section class="banner">
        <div class="background-card">
            <section class="login">
                <div class="login-container">
                    <form class="login-form" method="post">

                        <div class="input-container">
                            <label>Username</label>
                            <input class="form-control" type="text" name="username" placeholder="Username">
                        </div>

                        <div class="input-container">
                            <label >Password</label>
                            <input class="form-control" name="password" type="password"
                                placeholder="******************">
                        </div>

                        <div class="flex items-center justify-between">
                            <input class="btn-info" type="submit" name="login" value="Sign In" />
                        </div>

                    </form>
                </div>
            </section>
        </div>
    </section>



</body>

</html>