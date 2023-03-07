<?php

include "config_db.php";

// считываем токен из куки и смотрем есть ли такой токен в б.д.
// $token_user = '' ;
// if ($token_user == $_COOKIE['token_user']) {
//     exit;
// }


//Удаление продукта


/*
 * Получаем ID продукта из адресной строки
 */

$id = intval($_GET['id']);

/*
 * Делаем запрос на удаление строки из таблицы goods
 */



mysqli_query($db, "DELETE FROM `goods` WHERE `goods`.`id` = '$id'");

/*
 * Переадресация на страницу c продуктами
 */

// echo $id;

header('Location: /magaz/products.php');