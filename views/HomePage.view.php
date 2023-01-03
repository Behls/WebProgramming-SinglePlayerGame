<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <title>SPACE INVADERS </title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap" rel="stylesheet"> 
    <script src="../Box"></script>
</head>
<body>

    <div class="main-splash">
    <?php include('./views/partials/Header.php')?>
        <div id="container-splash">

            <div class="text-space">
                <h1 class="space">Space</h1>
            </div>  
            
            <div class="text-invaders">
                <h1 class="invaders">Invaders</h1>
            </div>  

            <!-- button
            <Button class="btn-begin">LOGIN</Button> -->

            <!-- link -->
            <a href="/login" class="btn-begin" id="btn-begin">Login</a>
        </div>
            
            
            <?php include('./views/partials/Footer.php')?>
    </div>

</body>
<script src="../js/animation.js"></script>
<script src="../js/utils.js"></script>
</html>