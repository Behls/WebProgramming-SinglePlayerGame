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
  }else if($uri ==='/menu'){
    require './controllers/MainMenu.php';
  }else if($uri ==='/error'){
    // this is purely for seeing the error route
    require './controllers/LoginError.php';
  }else if($uri ==='/logout'){
    // this is purely for seeing the logout route
    require './controllers/Logout.php';
  }else if($uri ==='/auth'){
      require './controllers/Auth.php';
  }
?>


