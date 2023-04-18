<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

if(!isset($_GET['code'])){
    echo 'no code';
    exit();
}

$code = $_GET['code'];


$pl = [
    'code'=>$code,
    'client_id'=>'1097336512095453214',
    'client_secret'=>'moj3EE8RdBguccMc-NVukLAriLz1tbOe',
    'grant_type'=>'authorization_code',
    'redirect_uri'=>'http://localhost/controllers/Auth.php',
    'scope'=>'identify',
];

print_r($pl);

$pl_string = http_build_query($pl);
$token_url = "https://discordapp.com/api/oauth2/token";

$crl = curl_init();

curl_setopt($crl, CURLOPT_URL, $token_url);
curl_setopt($crl, CURLOPT_POST, true);
curl_setopt($crl, CURLOPT_POSTFIELDS, $pl_string);
curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);

curl_setopt($crl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, 0);

$result = curl_exec($crl);

if(!$result){
    echo curl_error($crl);
}

$result = json_decode($result,true);
echo var_dump($result);
$access_token = $result['access_token'];
echo var_dump($var_dump);

$discord_users_url = "https://discordapp.com/api/users/@me";
$header = array("Authorization: Bearer $access_token", "Content-Type: application/x-www-form-urlencoded");

$ccrlh = curl_init();
curl_setopt($crl, CURLOPT_HTTPHEADER, $header);
curl_setopt($crl, CURLOPT_URL, $discord_users_url);
curl_setopt($crl, CURLOPT_POST, false);
curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);

curl_setopt($crl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, 0);

$result = curl_exec($ch);

$result = json_decode($result, true);

session_start();

$_SESSION['logged_in'] = true;
$_SESSION['userData'] = [
    'name'=>$result['username'],
    'discord_id'=>$result['id'],
    'avatar'=>$result['avatar'],
];

header("location: MainMenu.php");
exit();