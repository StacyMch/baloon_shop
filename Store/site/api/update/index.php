<?php

//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');


require_once('../../classes/autoload.php');

if (isset($_POST['popularity']) ) {
    Good::updateLine();
}

if (isset($_POST['rating'])) {
    Good::updateLine();
}

/*

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

if (isset($_POST['popularity'])) {

            //обновление данных о выбранном товаре из таблицы goods
            $id =  $_POST['id'];

            //переменная для ключей (названий полей таблицы)
            $keys = '';

            //переменная для значений (содержимого каждого из обновляемых полей)
            $values = '';

            //перебираем все ключи и значения, переданные через POST, и собираем их в две соответствующие переменные
            foreach($_POST as $key => $value) {

                //кроме пары "таблица" - "название таблицы", т.к. в sql запросе она стоит обособленно
                if($key !== 'table' && $key !== 'id') {
                    $keys = $keys . ", `$key`";
                    $values = $values . ", '$value'"; 
                }
                
            }

            //избавляемся от пробела с запятой в начале каждой из строк, собранной из перечисления ключей/значений
            $keys = substr($keys, 2);
            $values = substr($values, 2);

            //преобразование из строки в массив
            $keys = explode(', ', $keys);
            $values = explode(', ', $values);

            // var_dump($keys) . '<br>';
            // var_dump($values) . '<br>';

            //в цикле
            for ($i = 0; $i < count($keys); $i++) {

                //подставляем в sql запрос все переданные через POST пары "ключ-значение"
                $sqlText = "UPDATE `goods` SET $keys[$i] = $values[$i] WHERE id = :id";

                //и сразу передаем на обработку и выполнение каждый получившийся sql запрос
                $result = $pdo->prepare($sqlText);

                $result = $result->execute(['id' => $id]);

            }
 
            return $result;

         }

         if (isset($_POST['rating'])) {

            //обновление данных о выбранном товаре из таблицы goods
            $id =  $_POST['id'];

            //переменная для ключей (названий полей таблицы)
            $keys = '';

            //переменная для значений (содержимого каждого из обновляемых полей)
            $values = '';

            //перебираем все ключи и значения, переданные через POST, и собираем их в две соответствующие переменные
            foreach($_POST as $key => $value) {

                //кроме пары "таблица" - "название таблицы", т.к. в sql запросе она стоит обособленно
                if($key !== 'table' && $key !== 'id') {
                    $keys = $keys . ", `$key`";
                    $values = $values . ", '$value'"; 
                }
                
            }

            //избавляемся от пробела с запятой в начале каждой из строк, собранной из перечисления ключей/значений
            $keys = substr($keys, 2);
            $values = substr($values, 2);

            //преобразование из строки в массив
            $keys = explode(', ', $keys);
            $values = explode(', ', $values);

            // var_dump($keys) . '<br>';
            // var_dump($values) . '<br>';

            //в цикле
            for ($i = 0; $i < count($keys); $i++) {

                //подставляем в sql запрос все переданные через POST пары "ключ-значение"
                $sqlText = "UPDATE `goods` SET $keys[$i] = $values[$i] WHERE id = :id";

                //и сразу передаем на обработку и выполнение каждый получившийся sql запрос
                $result = $pdo->prepare($sqlText);

                $result = $result->execute(['id' => $id]);

            }
 
            return $result;

         }

         */