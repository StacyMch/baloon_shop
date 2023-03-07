<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('/var/www/classes/autoload.php');

$result = User::check();

if ($result[0] == 'true') {
    $response = [
        'success' => true,
        'name' => $result[1],
        'e-mail' => $e_mail = $result[2],
        'phone' => $result[3],
        'adress' => $result[4]
    ];
} else {
    $response = [
        'success' => false,
        'error' => 'юзер не авторизован'
    ];
}

print(json_encode($response, JSON_UNESCAPED_UNICODE));

