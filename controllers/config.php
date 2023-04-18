<?php
    $discord_redirect = "https://discord.com/api/oauth2/authorize?client_id=1097336512095453214&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcontrollers%2FAuth.php&response_type=code&scope=identify";
    header("Location: $discord_redirect");
    exit();
?>
