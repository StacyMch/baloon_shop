<?php



final class User extends AbstractClasses\Unit
{

    use Traits\IdTrait;

    const TABLE = 'Users';
    
    public static function check() : array
    {
        
        error_reporting(0);
        
         //заходим в базу смотрим сколько у нас юзеров с таким паролем и логинов
         $pdo = \Connection::getConnection();

         $result = $pdo->query(" SELECT COUNT(*) as num FROM " . static::TABLE . " WHERE user_hash =  '" . $_POST['token'] . "'");

         $person_data = $pdo->query(" SELECT * FROM " . static::TABLE . " WHERE user_hash = '" . $_POST['token'] . "' ");

         $row = $result->fetch();

         $person_row = $person_data->fetch();

            //возвращаем ответ в зависимости от цифры 0 или 1
            if ($row['num'] > 0) {
            $result = 'true';
            } else {
                $result = 'false';
                }

         $name = $person_row['name'];
         $e_mail = $person_row['e_mail'];
         $adress = $person_row['adress'];
         $phone = $person_row['phone'];
 
         $array = array();
 
         array_push($array, $result, $name, $e_mail, $phone, $adress);
 
         //возвращаем token
         return $array;

     }

/*
    public static function getLine() 
    {

        $token = $_POST['token'];

        $pdo = \Connection::getConnection();
        $sql = $pdo->query(" SELECT * FROM " . static::TABLE . " WHERE user_hash = " . $token);

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
    */

    public static function select_phone() 
    {

        $phone = $_POST['phone'];
        $token = $_POST['token'];

        $pdo = \Connection::getConnection();
        $pdo->query(" UPDATE " . static::TABLE . " SET phone = '" . $phone . "' WHERE user_hash = '" . $token . "'");

        $response = [
            'succes' => true,
            'phone' => $phone
        ];

        echo json_encode($response);
    }

    public static function select_adress() {

        $adress = $_POST['adress'];
        $token = $_POST['token'];

        $pdo = \Connection::getConnection();
        $pdo->query(" UPDATE " . static::TABLE . " SET adress = '" . $adress . "' WHERE user_hash = '" . $token . "'");

        $response = [
            'succes' => true,
            'adress' => $adress
        ];

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    
    }

    // final - значит м етод нельзя переопределить в наследниках 
    final public static function logIn() : array
    {

        //получаем логин и смотрим есть ли юзер с таким логином или имейлом
        $login = $_POST['login'];

        $password = $_POST['password'];

        $pdo = \Connection::getConnection();

        $result = $pdo->query(" SELECT * FROM " . static::TABLE . " WHERE login = '$login' ");

        $row = $result->fetch();
        
        //если нет возвращаем null
        if (!isset($row['id'])) {
            return null;
        }

        //если есть то начинаем проверять пароль
        //если пароль неверный возвращаем null
        if (!hash_equals($row['password'], crypt($password, 'shop'))) {
            return null;
        }

        //если пароль верный то
        //генерируем токен 
        $token = crypt($row['id'] . $row['password'] . time(), 'shop');

        //записываем токен в бд
        $pdo->query(" UPDATE " . static::TABLE . " SET user_hash = '$token' WHERE id = " . $row['id'] );

        $name = $row['name'];
        $e_mail = $row['e_mail'];
        $adress = $row['adress'];
        $phone = $row['phone'];

        $array = array();

        array_push($array, $token, $name, $e_mail, $phone, $adress);

        //возвращаем token
        return $array;
    }

    public static function exists()  : bool
    {

        error_reporting(0);
        
        $e_mail = $_POST['e_mail'];

        //заходим в базу смотрим сколько у нас юзеров с таким паролем и логинов
        $pdo = \Connection::getConnection();
        
        $result = $pdo->query(" SELECT COUNT(id) as num FROM " . static::TABLE . " WHERE e_mail = '$e_mail' ");

        $row = $result->fetch();

        //возвращаем ответ в зависимости от цифры 0 или 1
        if ($row['num'] > 0) {
            return true;
        }
        return false;
    }


    final public static function createUser() {

        error_reporting(0);

        $pdo = \Connection::getConnection();

        //запрос на создание пользователя
        $name = $_POST['name'];
        $e_mail = $_POST['e_mail'];
        $login = $_POST['login'];
        $pass = $_POST['password'];
        $password = crypt($pass, 'shop');

        $sql_ins = " INSERT INTO " . static::TABLE . " (`name`, `e_mail`, `login`, `password`) VALUES ('$name', '$e_mail', '$login', '$password') ";
        
        $pdo->query($sql_ins);
    

    }


    public static function deleteUser() {

    //заходим в базу смотрим сколько у нас юзеров с таким паролем и логинов
    $pdo = \Connection::getConnection();
    $result = $pdo->query(" DELETE FROM " . static::TABLE . " WHERE user_hash = '" . $_POST['token'] . "'");

    }
}