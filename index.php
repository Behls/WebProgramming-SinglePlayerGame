
<!-- building a url endpoint router -->

<?php
   $uri = $_SERVER['REQUEST_URI'];
   if ($uri === '/'){
        require './controllers/Index.php';
   }else if($uri ==='/about'){
        require './controllers/About.php';
   }else if($uri ==='/login'){
     require './controllers/Login.php';
   }else if($uri ==='/leaderboard'){
     require './controllers/Leaderboard.php';
   }else if($uri ==='/game'){
    require './controllers/Game.php';
    // this will be moved when auth added
  }else if($uri ==='/menu'){
    require './controllers/MainMenu.php';
  }
?>


