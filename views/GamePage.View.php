<?php
session_start();
$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <script src="../Box2dWeb-2.1.a.3.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="../easel.min.js" crossorigin="anonymous" defer></script>
    <script src="../preload.min.js" crossorigin="anonymous" defer></script>
    <script src="../js/game.js" defer></script>
    <script src="../js/utils.js" defer></script>
    <script src="../js/modal.js" defer></script>
    <title>Space Invaders</title>
</head>
<body>
    
<div class="modal-container" id="modal-container">
    <div class="modal" id="modal">
            <p class="modal-text" id="modal-text">Game over! Return to the Main Menu</p>
            <a href="/menu" class="modal-button" id="modal-button">Return to Menu</a>
    </div>
</div>

<div class="main-game">
    <?php include('./views/partials/Header.php')?>
        <div id="container-game">
            <div id="container-score container-username" class="container-score container-username">
                <h1 class="text-score" id="title-score">Score: </h1>
                <h1 class="score" id="score"></h1>
                <h1 class="text-username" id="text-username">Username: </h1>
                <h1 class="username" id="username"><?php echo $username; ?></h1>
            </div>
            
            <h1 class="score" id="score"></h1>
            <canvas id="easelcan" height="500" width="1000" class="easelcan"></canvas>
            <canvas id="game-canvas" height="500" width="1000" class="game-canvas"></canvas>
        </div>            
    <?php include('./views/partials/Footer.php')?>
</div>

</body>
</html>