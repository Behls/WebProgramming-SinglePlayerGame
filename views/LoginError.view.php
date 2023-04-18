<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <title>Error</title>
</head>
<body>
<div class="main-error">
    <?php include('./views/partials/Header.php')?>
        <div id="container-about">
            <h2 class="error-title">Login Error</h2>
            <hr>
            <p class="error-text"> Cant view this page, unable to login return to login page.</p>
            <a href="/login" class="error-button">Back to Login</a>
        </div>
        <?php include('./views/partials/Footer.php')?>
    </div>
</body>
</html>