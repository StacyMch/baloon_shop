<?php

require_once('/var/www/classes/autoload.php');

if (isset($_GET['all'])) {

Good::getGoods();

}

if (isset($_GET['ids'])) {

    Category::getGoodsWithCategories();
    
}

if (isset($_GET['allcategories'])) {

Category::getAllCategories();

}

if (isset($_GET['category_id'])) {

Category::getAllCategoriesId();

} 

if (isset($_GET['category'])) {

Category_filter::getCategory();

}

if (isset($_GET['sale'])) {

Category::getSale();

}


if (isset($_GET['review'])) {

Review::reviews();

}


if (isset($_GET['reviewGet'])) {

Review::reviewsGet();

}

if (isset($_GET['login'])) {

include_once 'auth/login/index.php';

}

if (isset($_GET['createUser'])) {

include_once 'auth/signup/index.php';
    
}

if (isset($_GET['check'])) {

include_once 'auth/check/index.php';
        
}

if (isset($_GET['deleteUser'])) {

User::deleteUser();
            
}

/*
if (isset($GET['userGetLine'])) {
    User::getLine();
}
*/


if (isset($_GET['select_phone'])) {

User::select_phone();
                
}

if (isset($_GET['select_adress'])) {

    User::select_adress();
                    
}

if (isset($_GET['order'])) {

    Order::createOrder();
                    
}

if (isset($_GET['getOrder'])) {

    Order::getOrder();
                    
}