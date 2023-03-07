<?php

//разрешаю запросы из браузера
header('Access-Control-Allow-Origin: *');

$host = 'mysql';
$db   = 'inordic';
$user = 'root';
$pass = 'test123';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

//создание объекта для подключения к БД
$pdo = new PDO($dsn, $user, $pass, $opt);



//Строка фильтрации
// защили поиск по любому столбцу таблицы с поиском LIKE, вынесли WHERE id > 0 
$filter = '';

if (isset($_GET['name'])) {
    $firstName = $_GET['name'];
    $filter = $filter . " AND `name` LIKE '%$firstName%' ";
}

if (isset($_GET['decription'])) {
    $username = $_GET['decription'];
    $filter = $filter . " AND `decription` LIKE '%$username%' ";
}


//считываем данные достаем из БД
$sqlText = 'SELECT * FROM goods AS g
                LEFT JOIN categories AS c
                ON g.category = c.category
                WHERE id > 0 '.$filter;
$result = $pdo->query($sqlText);
//отрезаем по одной строчке из результата и показываем в виде массива
$goods = [];
while ($row = $result->fetch()) {

    $goods[] = $row;
}

// //закодируем полученные данные в JSON
echo json_encode($goods, JSON_UNESCAPED_UNICODE);