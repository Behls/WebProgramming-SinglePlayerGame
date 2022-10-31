<?php
         $username=$_POST['username'];
         $pass=$_POST['password'];
     
        //  echo '<p> '.$username.'</p>';

        //  session_start();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Menu</title>
    <link rel="stylesheet" href="../css/main.css">
</head>
<body>
<?php include('./partials/Header.php')?>
    <div class="menu">
        <h2 class="menu-title">Main Menu</h2>
        <?php echo '<h3 class="username-title"> Welcome Back: ' .$username. '</h3>'?>      
        <button class="menu-item">Start Game</button>
        <button class="menu-item">Scoreboard</button>
        <button class="menu-item">Logout</button>
    </div>
    <?php include('./partials/Footer.php')?>
</body>
</html>