<!-- building a url endpoint router -->

<?php

   $uri = $_SERVER['REQUEST_URI'];

   if ($uri === '/'){
        require './controllers/index.php';
   }else if($uri ==='/about'){
        require './controllers/About.php';
   }

?>


