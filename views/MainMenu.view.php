<?php
session_start();
if(!$_SESSION['logged_in']){
  header('Location: /error');
  exit();
}
extract($_SESSION['userData']);
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
    <div class="main-splash">
    <?php include('./views/partials/Header.php')?>
        <div id="container-splash">
            <div class="menu">
                <h2 class="menu-title">Main Menu</h2> 
                <a href="/game" class="menu-item">Start Game</a>
                <a href="/leaderboard" class="menu-item">Leaderboard</a>
                <a href="/logout" class="menu-item">Logout</a>
            </div>
        </div>
        <?php include('./views/partials/Footer.php')?>
    </div>
</body>
<script src="../js/utils.js"></script>
</html>