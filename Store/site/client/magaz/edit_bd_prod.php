<?php
//Обновление информации о продукте

/*
 * Подключаем файл для получения соединения к базе данных (PhpMyAdmin, MySQL)
 */

 include "config_db.php";

 var_dump($_FILES['picture']);

/*
* Создаем переменные со значениями, которые были получены с $_POST
*/
$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$sale = $_POST['sale'];
$consist = $_POST['consist'];
$category = $_POST['category']; 
 
if (isset($_FILES['picture'])){
    // временное имя файла во временной диретории
    $tmpName = $_FILES['picture']['tmp_name'];
    // формируем имя файла
    $fileName = $_FILES['picture']['name'];
    $fileNameParts = explode('.', $fileName);
    $hash = md5($fileName . time());
    $fileNameNew = $fileNameParts[0] . '_' . $hash . '.' . $fileNameParts[1];
    // директория для загрузки файлов
    $uploadDir = __DIR__ ."\uploads";
    // сохраняем файл
    move_uploaded_file($tmpName, $uploadDir.'/'.$fileNameNew);

    $photo = $fileNameNew;

    mysqli_query($db,"UPDATE `goods` SET `photo` = '$photo' WHERE `goods`.`id` = '$id'");

 }


 
 /*
  * Делаем запрос на изменение строки в таблицу goods
  */
 
 mysqli_query($db,"UPDATE `goods` SET `name` = '$name', `description` = '$description', `category` = '$category', `price`= '$price', `consist` = '$consist', `sale` = '$sale' WHERE `goods`.`id` = '$id'");


//   echo $name . "<br>";
//   echo $id . "<br>";
//   echo $description . "<br>";
//   echo $price . "<br>";
//   echo $sale . "<br>";
//   echo $consist . "<br>";
//   echo $category . "<br>";

header('Location: /magaz/products.php');