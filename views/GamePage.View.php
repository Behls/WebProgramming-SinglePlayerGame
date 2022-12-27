<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <script src="../Box2dWeb-2.1.a.3.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <title>Space Invaders</title>
</head>
<body>
    
<div class="main-game">
    <?php include('./views/partials/Header.php')?>
        <div id="container-game">
            <h1 class="score" id="score">Score: 300</h1>
            <canvas id="game-canvas" height="650" width="1000" class="game-canvas">

            </canvas>
        </div>            
    <?php include('./views/partials/Footer.php')?>
</div>

</body>
<script src="../js/game.js"></script>
<script src="../js/utils.js"></script>
<!-- <script src="../js/test.js"></script> -->
</html>