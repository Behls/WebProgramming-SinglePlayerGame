<!-- world -->
[x] - space background image
[ ] - find enemy sprite
[ ] - find hero sprite

<!-- player -->
[x] - move left using a or <
[x] - move right using d or >
[x] - don't allow jumping

<!-- score -->
[] - destroy an enemy gain points
[x] - add it to the html page

<!-- win / lose -->
[] - if enemy reaches ground > game over
[] - clear enemy spawn

<!-- bullet -->
[x] - set up space command for shooting
[x] - define shape for building bullet
[ ] - generate bullet to shoot from center of body upwards to enemy once space button entered
[ ] - if bullet collids with enemy destroy and add a point to the score board
[x] - make sure bullets track position of the user

<!-- enemy -->
[x] - define body for enemy
[ ] - randomly generate enemy's who will spawn faster as the game goes on
[ ] - if enemy hits ground, game over and score is saved to local storage along with username


<!-- server -->
[x] - build login page for discord
[ ] - logic for auth

<!-- kinda working -->
[x] - get local storage information for that user 

<!-- other -->
[x] - text animation for main screen - youtube
[x] - update containers for 100% height for all pages
[x] - finish about page
[x] - add github link to about page
[x] - add styling to main menu




<!-- reserved code -->
 <!-- <?php echo '<h3 class="username-title"> Welcome Back: ' .$username. '</h3>'?>     -->

<!-- $db = "";
$username ="";
$password = "";
$url = "";

var_export($db, true);
var_export($username, true);
 var_export($password, true);
 var_export($url, true); -->

 <!-- check curl isntallaitoin -->
 <!-- <?php
// Script to test if the CURL extension is installed on this server
// checking curl
// Define function to test
function _is_curl_installed() {
    if  (in_array  ('curl', get_loaded_extensions())) {
        return true;
    }
    else {
        return false;
    }
}

// Ouput text to user based on test
if (_is_curl_installed()) {
  echo "cURL is <span style=\"color:blue\">installed</span> on this server";
} else {
  echo "cURL is NOT <span style=\"color:red\">installed</span> on this server";
}
?> -->
