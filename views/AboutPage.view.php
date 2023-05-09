<?php
session_start();
$username = "samuel1234";
$_SESSION['username'] = 'samuel111';
$user = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Css/main.css">
    <title>About</title>
</head>
<body>
    <div class="main-about">
    <?php include('./views/partials/Header.php')?>
        <div id="container-about">
            <h2 class="about-title">About us</h2>
            <h1><?php echo $user; ?></h1>
            <hr>
            
            <p class="about-text">
                This protype game was built in line with the web-programming module at Perth College UHI. It's an interpretation of
                space invaders with little physics thrown into the mix. All information in regards to code base, running the application can be found 
                here on <a href="https://github.com/Behls/WebProgramming-SinglePlayerGame" target="_blank" class="github-link"><strong>Github</Strong></a> 
            </p>
        </div>
        <?php include('./views/partials/Footer.php')?>
    </div>
</body>
</html>