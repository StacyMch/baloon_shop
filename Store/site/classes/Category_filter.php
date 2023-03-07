<?php

class Category extends \AbstractClasses\Unit
{
    public static function getCategory() {

        $pdo = \Connection::getConnection();
        
    
        //строка фильтрации
        
    
            //строка фильтрации
            $filterStr = '';
    
            //получаем название таблицы из GET параметра
            $table = $_GET['table'];
            $category = $_GET['category'];
            $filterStr = $filterStr . " AND category LIKE '%$category%' ";
    
    
            //СЧИТЫВАНИЕ ДАННЫХ
    
            //достаём данные из БД
            $sqltext_category = "SELECT * FROM " . $table . ' WHERE id > 0 ' . $filterStr;
    
            $result_category = $pdo->query($sqltext_category);
    
            //отрезаем по одной строчке из результата и показываем каждую в виде ассоц массива
            $category = [];
            while($row = $result_category->fetch()) {
    
                $category[] = $row;
    
            }
    
    
            //кодируем и выводим на экран
            $data_category = json_encode($category, JSON_UNESCAPED_UNICODE);
    
            print_r($data_category); 
            
    
        }

}