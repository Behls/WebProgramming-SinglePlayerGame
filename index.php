<!-- building a url endpoint router -->

<?php

   $uri = $_SERVER['REQUEST_URI'];

   if ($uri === '/'){
        require './controllers/Index.php';
   }else if($uri ==='/about'){
        require './controllers/About.php';
   }else if($uri ==='/login'){
     require './controllers/Login.php';
   }

?>


