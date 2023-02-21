<?php



final class User extends AbstractClasses\Unit
{

    use Traits\IdTrait;

    const TABLE = 'users';

    public function username() : string
    {
        return $this->getField('username');
    }

    public static function check() {
        
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT COUNT(*) as num FROM users WHERE user_hash = " . $_POST(['token']));
        $row = $result->fetch();

        //возвращаем ответ в зависимости от цифры, 0 или 1
        if ($row['num'] > 0) {
            return true;
        }
            return false;
    }

    public static function logOut()
    {
        $pdo = \Connection::getConnection();
        $result = $pdo->query("UPDATE users SET user_hash = '' WHERE user_hash = " . $_POST(['token']));
        $row = $result->fetch();
    }

    //final значит, что метод нельзя переопределить в наследниках
    final public static function logIn() : ?string
    {
        //получаем логин и смотрим, есть ли юзер с таким логином или эмейлом
        $login = $_POST['user_name'];
        $password = $_POST['password'];
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT * FROM users WHERE user_name = '$login' OR user_mail = '$login'");
        $row = $result->fetch();

        //если нет, то возвращаем токен
        if (!isset($row['id'])) {
            return null;
        }

        //если есть, то начинаем проверять пароль


        //если пароль неверный, то возвращаем false
        if (!hash_equals($row['password'], crypt($password, 'inordic'))) {
            return null;
        }

        //если пароль верный, то 

        //генерируем токен
        $token = crypt($row['id'] . $row['password'] . time(), 'inordic');

        //записываем токен в базу
        $pdo->query("UPDATE users SET user_hash = '$token' WHERE id = " . $row(['id']));

        //возвращаем токен
        return $token;
    }

    public static function exists() 
    {
        $username = $_POST['user_name'];
        $email = $_POST['user_mail'];

        //заходим в базу и считаем, сколько у нас юзеров с таким логином и паролем
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT COUNT(*) as num FROM users WHERE user_name = '$username' OR user_mail = '$email' ");
        $row = $result->fetch();

        //возвращаем ответ в зависимости от цифры, 0 или 1
        if ($row['num'] > 0) {
            return true;
        }
            return false;
        
        //return boolval($row['num']);

        //return (bool)$row['num'];

        //return $row['num'] > 0 ? true : false;
    }


}