<?php

include "config_db.php";

 // директория для загрузки файлов
 var_dump($_FILES);

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
 

 /*
  * Создаем переменные со значениями, которые были получены с $_POST
  */
 
 $name = $_POST['name'];
 $description = $_POST['description'];
 $price = $_POST['price'];
 $sale = $_POST['sale'];
 $consist = $_POST['consist'];
 $category = $_POST['category'];
 $photo = $fileNameNew;
 
 /*
  * Делаем запрос на добавление новой строки в таблицу goods
  */
 
 mysqli_query($db,"INSERT INTO `goods` (`id`, `name`, `description`, `category`, `price`, `consist`, `photo`, `sale`) VALUES (NULL, '$name', '$description', '$category', '$price', '$consist', '$photo', '$sale')");


//  var_dump($_FILES);

 // Оработка полей
 
 
 

 /*
  * Переадресация на страницу c товарами
  */

  // echo $name . "<br>";
  // echo $description . "<br>";
  // echo $price . "<br>";
  // echo $sale . "<br>";
  // echo $consist . "<br>";
  // echo $category . "<br>";
 
header('Location: /magaz/products.php');