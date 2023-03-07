<?php

//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('/var/www/classes/autoload.php');

$result = User::logIn();

$token = $result[0];
$name = $result[1];
$e_mail = $result[2];
$phone = $result[3];
$adress = $result[4];

if ($result !== null) {
    $response = [
        'success' => true,
        'token' => $token,
        'name' => $name,
        'e-mail' => $e_mail,
        'phone' => $phone,
        'adress' => $adress
    ];
} else {
    $response = [
        'success' => false,
        'error' => 'неверный логин или пароль'
    ];
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);