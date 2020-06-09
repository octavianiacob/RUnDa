<?php
require_once "./config/Database.php";
	// Message Vars
	$msg = '';
	$msgClass = '';
$connectDB=new Database();
	// Check For Submit
	if(filter_has_var(INPUT_POST, 'submit')){
		// Get Form Data
        $firstname = htmlspecialchars($_POST['firstName']);
        $lastname=htmlspecialchars($_POST['lastName']);
        $email = htmlspecialchars($_POST['email']);
        $phone=htmlspecialchars($_POST['phone']);
		$message = htmlspecialchars($_POST['message']);

		// Check Required Fields
		if(!empty($email) && !empty($firstname) && !empty($lastname) && !empty($phone) && !empty($message)){
			// Passed
			// Check Email
			if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
				// Failed
				$msg = 'Please use a valid email';
				$msgClass = 'alert-danger';
			} else {
                // Passed
                $msg='Nice';
                $query="INSERT INTO contact (firstname,lastname,email,phone,message) VALUES (:firstname,:lastname,:email,:phone,:message)";
                $statement=$connectDB->getPDO()->prepare($query);
                $statement->execute(
                    array(
                        'firstname' => $firstname,
                        'lastname' =>$lastname,
                        'email'=>$email,
                        'phone'=>$phone,
                        'message'=> $message
                    )
                );
               
			}
		} else {
			// Failed
			$msg = 'Please fill in all fields';
			$msgClass = 'alert-danger';
		}
	}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles/reset.css">
    <link rel="stylesheet" type="text/css" href="styles/contact.css">
    <link rel="stylesheet" type="text/css" href="styles/navbar.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">
    <title>Contact page</title>
</head>

<body>
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
    if($msg!=='')   
    echo " <div style=text-align:center;display: block;> <img id=message width=240px src=/RUnDa/images/sent.jpg>  </div>"; 
    ?>
    <div class="contact-form">
        <h1> Contact us!</h1>
        <h2> We are always ready to serve you </h2>
        <form action="contact.php" method="post">
            <div class="label-input">
                <label class="label-class"> First name:</label>
                <input class="input-form" name="firstName" type="text" pattern="[A-Z]{1}[a-z]+" required>
            </div>
            <div class="label-input">
                <label class="label-class"> Last name:</label>
                <input class="input-form" name="lastName" type="text" pattern="[A-Z]{1}[a-z]+" required >
            </div>

            <div class="label-input">
                <label class=" label-class"> Email:</label>
                <input class="input-form" type="email" name="email" pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2, 4}$" required >
            </div>
            <div class="label-input">
                <label class=" label-class"> Phone:</label>
                <input class="input-form" type="text" name="phone" pattern="^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$" required >
            </div>
            <div class="label-input">
                <label class=" label-class"> Message:</label>
                <textarea name="message" class="input-form"  required ></textarea>
            </div>
            <div class="btn-submit">
                <button name="submit" type="submit" id="contact-submit">Submit</button>
            </div>
        </form>
    </div>
</body>

</html>