<?php

namespace AbstractClasses;

abstract class Unit 
{
    public static function getGoods() {

        $pdo = \Connection::getConnection();

        //получение всех данных из таблицы goods

        $rangeOfIds = '';
        if (isset($_GET['ids'])) {
            $ids = $_GET['ids'];
            $rangeOfIds = " AND id IN ($ids)";
        }

            //достаём данные из бд
            $sql = "SELECT * FROM " . static::TABLE . " WHERE 1" . $rangeOfIds;
            $result = $pdo->query($sql);
            
            //создаём пустой массив
            $array = array();
            
            //с помощью цикла перебираем каждую строчку массива с данными из бд
            while($row = $result->fetch()){
            
                //записываем строчки в пустой массив
                array_push($array, $row);
            }
            
            //кодируем данные в json
            $data = json_encode($array, JSON_UNESCAPED_UNICODE);
            
            print_r($data);
        
        
    }

    public static function getGoodsWithCategories() {

        $pdo = \Connection::getConnection();

        //получение всех данных из таблицы goods

        $rangeOfIds = '';
        if (isset($_GET['ids'])) {
            $ids = $_GET['ids'];
            $rangeOfIds = " AND id IN ($ids)";
        }

            //достаём данные из бд
            $sql = "SELECT * FROM " . static::TABLE . " AS g
                    LEFT JOIN " . static::TABLE2 . " AS c
                    ON g.category = c.category
                    WHERE 1" . $rangeOfIds;
            
            $result = $pdo->query($sql);
            
            //создаём пустой массив
            $array = array();
            
            //с помощью цикла перебираем каждую строчку массива с данными из бд
            while($row = $result->fetch()){
            
                //записываем строчки в пустой массив
                array_push($array, $row);
            }
            
            //кодируем данные в json
            $data = json_encode($array, JSON_UNESCAPED_UNICODE);
            
            print_r($data);
        
        
    }




    public static function getAllCategories() {

    $pdo = \Connection::getConnection();

    //получение всех данных из таблицы categories

        //достаём данные из бд
        $sql = "SELECT * FROM " . static::TABLE2 . ";";
        $result = $pdo->query($sql);

        //создаём пустой массив
        $array = array();
        
        //с помощью цикла перебираем каждую строчку массива с данными из бд
        while($row = $result->fetch()){
        
            //записываем строчки в пустой массив
            array_push($array, $row);

        }

         
        //кодируем данные в json
        $data = json_encode($array, JSON_UNESCAPED_UNICODE);
        
        print_r($data);
        
        

    }




    public static function getAllCategoriesId() {

    $pdo = \Connection::getConnection();

    //получение данных по отдельным категориям из сджойненных таблиц goods и categories

        $andId = '';
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $andId = "AND id = $id";
        }

        $catId = $_GET['category_id'];
        //достаём данные из бд
        $sql = "SELECT * FROM " . static::TABLE . " AS g
                    LEFT JOIN " . static::TABLE2 . " AS c
                    ON g.category = c.category
                    WHERE category_id = $catId " . $andId;

        $result = $pdo->query($sql);
        
        //создаём пустой массив
        $array = array();
        
        //с помощью цикла перебираем каждую строчку массива с данными из бд
        while($row = $result->fetch()){
        
            //записываем строчки в пустой массив
            array_push($array, $row);
        }
        
        //кодируем данные в json
        $data = json_encode($array, JSON_UNESCAPED_UNICODE);
        
        print_r($data);
        
        

    }

   

    public static function getSale() {

        $pdo = \Connection::getConnection();
        //получение данных для акций ПОКА НЕ РАБОТАЕТ

    
            //достаём данные из бд
            $sql = "SELECT * FROM " . static::TABLE . " AS g
                        LEFT JOIN " . static::TABLE2 . " AS c
                        ON g.category = c.category
                        WHERE sale  IS NOT NULL";

            $result = $pdo->query($sql);
            
            //создаём пустой массив
            $array = array();

            
            //с помощью цикла перебираем каждую строчку массива с данными из бд
            while($row = $result->fetch()){
            
                //записываем строчки в пустой массив
                array_push($array, $row);
            }

            //кодируем данные в json
            $data = json_encode($array, JSON_UNESCAPED_UNICODE);
            
            print_r($data);
            
        
    }

    public static function reviews() {

        $json = file_get_contents('php://input');

        print_r ($json);

        $pdo = \Connection::getConnection();
    
        //запрос на создание пользователя
        $username = $_POST['username'];
        $review = $_POST['review'];
    
        $sql_ins = " INSERT INTO " . static::TABLE . " (`username`, `review`) VALUES('$username', '$review') ";
        
        $pdo->query($sql_ins);

    }

    public static function reviewsGet() {

        $pdo = \Connection::getConnection();

        //достаём данные из бд
        $sql = "SELECT * FROM " . static::TABLE;
        $result = $pdo->query($sql);

        //создаём пустой массив
        $array = array();

        //с помощью цикла перебираем каждую строчку массива с данными из бд
        while($row = $result->fetch()){

            //записываем строчки в пустой массив
            array_push($array, $row);
        }

        //кодируем данные в json
        $data = json_encode($array, JSON_UNESCAPED_UNICODE);

        print_r($data);

    }


    //сделать запись в любую таблицу
    public static function createLine() : bool
    {
        //echo 'entered createLine func';
        $strFields = '';
        $strValues = '';

        foreach ($_POST as $key => $value) {
                $strFields .= "$key,"; 
                $strValues .= "'$value',";

        }

        $strFields = trim($strFields, ',');
        $strValues = trim($strValues, ',');


        $sqlText = "INSERT INTO ". static::TABLE ."($strFields) VALUES($strValues)";

        $pdo = \Connection::getConnection();
        echo $sqlText;
        return $pdo->query($sqlText);
        
    }

    public static function updateLine() : bool
    {
        //обновление данных о выбранном товаре из таблицы goods
        $id =  $_POST['id'];

        $pdo = \Connection::getConnection();

        //переменная для ключей (названий полей таблицы)
        $keys = '';

        //переменная для значений (содержимого каждого из обновляемых полей)
        $values = '';

        //перебираем все ключи и значения, переданные через POST, и собираем их в две соответствующие переменные
        foreach($_POST as $key => $value) {

            //кроме пары "таблица" - "название таблицы", т.к. в sql запросе она стоит обособленно
            if($key !== 'table' && $key !== 'id') {
                $keys = $keys . ", $key";
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
            $sqlText = "UPDATE " . static::TABLE . " SET $keys[$i] = $values[$i] WHERE id = :id";

            //и сразу передаем на обработку и выполнение каждый получившийся sql запрос
            $result = $pdo->prepare($sqlText);

            $result = $result->execute(['id' => $id]);

        }

        return $result;

    }


    public static function createOrder() {

        $token = $_POST['token'];

        $good_id = $_POST['good_id'];

        $pdo = \Connection::getConnection();

        $sql = " SELECT * FROM " . static::TABLE . " WHERE user_hash = '" . $token . "'";

        $result = $pdo->query($sql);

        $row = $result->fetch();

        $name = $row['name'];

        $sql_ins = " INSERT INTO " . static::TABLE2 . " (`name`, `good`) VALUES('$name', '$good_id') ";
    
        $pdo->query($sql_ins);

    }

    public static function getOrder() {

        $token = $_POST['token'];

        $pdo = \Connection::getConnection();

        $sql_name = " SELECT * FROM " . static::TABLE . " WHERE user_hash = '" . $token . "'";

        $result_name = $pdo->query($sql_name);

        $row_name = $result_name->fetch();

        $name = $row_name['name'];




        $sql_get = " SELECT good FROM " . static::TABLE2 . " WHERE name = '" . $name . "'";

        $result_get = $pdo->query($sql_get);

        $array = array();

        //с помощью цикла перебираем каждую строчку массива с данными из бд
        while($row1 = $result_get->fetch()){

            for ($i = 0; $i < count($row1); $i++) {

                $id = $row1['good'];

                $sql = " SELECT * FROM " . static::TABLE3 . " WHERE id = '" . $id . "'";

                $result = $pdo->query($sql);
    
                $row = $result->fetch();
    
                array_push($array, $row);

            }

        }

        //кодируем данные в json
        $data = json_encode($array, JSON_UNESCAPED_UNICODE);

        print_r($data);

    }

}