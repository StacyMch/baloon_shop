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

//получение данных о всех goods
if (isset($_GET['goods_in_basket'])) {

   //достаём данные из бд
   $sql = "SELECT * FROM basket;";

   $result = $pdo->query($sql);

   //создаём пустой массив
   $arrGoods = [];

   //с помощью цикла перебираем каждую строчку массива с данными из бд
   while($row = $result->fetch()){

       //записываем строчки в пустой массив
       $arrGoods[] = $row;
   }

   //print_r($arrGoods);

   //кодируем в виде джейсона все необходимые данные по товару
   $json = json_encode($arrGoods, JSON_UNESCAPED_UNICODE);

   print_r($json);

}

//получение данных о выбранном товаре из таблицы goods
if (isset($_GET['id'])) {
     $id =  $_GET['id'];
    //достаём данные из бд
    $sql = "SELECT id, name, price, photo, sale FROM goods
                WHERE id = $id;";

    $result = $pdo->query($sql);

    //создаём пустой массив
    $arrGoods = [];

    //с помощью цикла перебираем каждую строчку массива с данными из бд
    while($row = $result->fetch()){

        //записываем строчки в пустой массив
        $arrGoods[] = $row;
    }

    //print_r($arrGoods);

    //кодируем в виде джейсона все необходимые данные по товару
    $json = json_encode($arrGoods, JSON_UNESCAPED_UNICODE);

    print_r($json);


        
    /* //!!!!! КОД ПРИГОДИТСЯ ДЛЯ БД С ЗАКАЗАМИ

    $arrValues = array_values($arrGoods[0]);

    //ВРЕМЕННО исключаем 1 последний элемент - sale ?????
    array_pop($arrValues);

    print_r($arrValues);

    //собираем из значений получившегося массива строку с названиями полей в кавычках
    $values = implode("', '", $arrValues);

    //оборачиваем недостающими кавычками в начале и конце строки
    $values = "'" . $values . "'";

    echo $values;



    //теперь нужно извлечь остальные данные для составления запроса по добавлению товара в БД basket

    //извлекаем из БД basket названия полей
    $sql = "SHOW COLUMNS FROM basket";

    $result = $pdo->query($sql);

    $fields = [];
    //с помощью цикла перебираем каждую строчку массива с данными из бд
    while($row = $result->fetch()){

        //print_r([$row]);

        //получаем массив из названий полей basket
        $fields[] = $row['Field'];
    }
    //ВРЕМЕННО исключаем 2 последних элемента - sale и quantity ?????
    array_pop($fields);
    array_pop($fields);

    print_r($fields);

    //собираем из значений получившегося массива строку с названиями полей в косых кавычках
    $fieldsStr = implode('`, `', $fields);

    //оборачиваем недостающими кавычками в начале и конце строки
    $fieldsStr = '`' . $fieldsStr . '`';

    echo $fieldsStr;




    //print_r($arrGoods);

    //$arrValues = array_values($arrGoods);






    //print_r($arrValues);
    //var_dump($arrValues);

    /* // !!!!! АЛЬТЕРНАТИВНЫЙ КУСОК, НЕ СНИМАТЬ КОММЕНТИРОВАНИЕ
    //извлекаем все значения в отдельный массив
    $arrValues = array_values($arrGoods);
    print_r($arrValues);

    //превращаем в строку из закавыченных элементов
    $values = implode('", "', $arrValues[0]);

    print_r($values);
    


    //массив для ключей (названий полей таблицы)
    $keys = '';

    //массив для значений (содержимого каждого из полей)
    $values = '';

    //перебираем все ключи и значения, переданные в посте, и кладем их в переменную в виде искусственно собранной строки
    foreach($arrGoods[0] as $key => $value) {
        //кроме пары "таблица" - "название таблицы", т.к. в запросе она стоит обособленно
            //$keys = $keys . ", `$key`";
            $values = $values . ", '$value'"; 
    }

    //убираем пробел и запятую в начале получившейся строки
    //$keys = substr($keys, 2);
    $values = substr($values, 2);


    //echo $keys . '<br>';
    //echo $values;
    */ // !!!!!!!!!!! КОНЕЦ АЛЬТЕРНАТИВНОГО КУСКА, НЕ СНИМАТЬ КОММЕНТИРОВАНИЕ

    /*

    $table = 'basket';

    
    //отправляем запрос на создание записи
    $sqlText = "INSERT INTO $table($fieldsStr) VALUES($values);";
    echo $sqlText . '<br>';
    $result = $pdo->query($sqlText);
    //var_dump($result);
    echo 'добавлено';


    //отправляем запрос на просмотр всего, что лежит в корзине
    $sql = "SELECT * FROM basket;";

    $result = $pdo->query($sql);

    //создаём пустой массив
    $arrGoodsInBsk = [];

    //с помощью цикла перебираем каждую строчку массива с данными из бд
    while($row = $result->fetch()){

        //записываем строчки в пустой массив
        $arrGoodsInBsk[] = $row;
    }

    //print_r($arrGoodsInBsk);

    $data = json_encode($arrGoodsInBsk, JSON_UNESCAPED_UNICODE);

    print_r($data);

    */ //!!!!!!!!!!!!!!!!!!!!!!!!! ОКОНЧАНИЕ КОДА, КОТОРЫЙ ПРИГОДИТСЯ ПОЗЖЕ
        

} 
