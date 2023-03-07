    //находим коробку под карточки (под данные шаблона)
    let main = document.getElementById('container');

    //получем данные шаблона Главной страницы
    let templateHomePage = document.getElementById('tmpl-home-page').innerHTML;

    //получаем данные шаблона шапки Каталога
    let templateCatalogNav = document.getElementById('tmpl-catalog-nav').innerHTML;

    //получем данные шаблона Каталога
    let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;

    //получаем данные шаблона шапки Категории
    let templateCategoryNav = document.getElementById('tmpl-category-nav').innerHTML;

    //получем данные шаблона Категории
    let templateCategory = document.getElementById('tmpl-category').innerHTML;

    //получем данные шаблона Карточки
    let templateCard = document.getElementById('tmpl-card').innerHTML;

    //получаем данные шаблона с карточками товаров внутри Избранного
    let templateFavourites = document.getElementById('tmpl-favourites').innerHTML;

    //получем данные шаблона Корзины
    let templateBasket = document.getElementById('tmpl-basket').innerHTML;

    //получем данные шаблона товаров внутри Корзины
    let templateGoodsInBasket = document.getElementById('tmpl_goods-in-basket').innerHTML;

    //получем данные шаблона личного кабинета
    //let templatePerson1 = document.getElementById('tmpl-person1').innerHTML;
    //let templatePerson = document.getElementById('tmpl-person').innerHTML;

    //получем данные шаблона отзывов
    let templateReviews = document.getElementById('tmpl_reviews').innerHTML;

    //получем данные шаблона карточки отзывов
    let templateCardReview = document.getElementById('tmpl_card_review').innerHTML;

    //полупрозрачная подложка формы логина и регистрации
    let screenDimmer = document.getElementById('screen-dimmer');

    //форма loginа
    let loginForm = document.getElementById('tmpl-request2');

    //форма регистрации
    let signupForm = document.getElementById('tmpl-request');

    //очищение хранилища для тестов
    //localStorage.clear();

    //не теряем значение счетчика Корзины при обновлении страницы
    if (localStorage.getItem('total_quantity') != null) {

        let json = localStorage.getItem('total_quantity');
        console.log(json);
        
        //достаем из хранилища сохраненное значение
        document.getElementById('counter').innerHTML = localStorage.getItem('total_quantity');
        
        //и делаем счетчик видимым
        document.getElementById('counter').classList.remove('hidden');

    } else {

        //снова скрываем счетчик
        document.getElementById('counter').classList.add('hidden');
    }

    //не теряем значение счетчика Избранного при обновлении страницы
    if (localStorage.getItem('favourites_quantity') != null) {

        let json = localStorage.getItem('favourites_quantity');
        console.log(json);
        
        //достаем из хранилища сохраненное значение
        document.getElementById('counter').innerHTML = localStorage.getItem('favourites_quantity');
        
        //и делаем счетчик видимым
        document.getElementById('counter2').classList.remove('hidden');

    } else {

        //снова скрываем счетчик
        document.getElementById('counter2').classList.add('hidden');
    }

    let hash = localStorage.getItem('token');


    if(document.querySelectorAll('.rating')) {
        const ratings = document.querySelectorAll('.rating');
        //console.log(document.querySelectorAll('.rating'));

        showRatings();
    }
        

    //основная функция по рейтингам
    function showRatings(ind_goods_id) {
        let id = ind_goods_id;
        let ratingActive;
        let ratingValue;
        const ratings = document.querySelectorAll('.rating');
        //console.log(document.querySelectorAll('.rating'));

        //бегаем по всем рейтингам на странице
        for (let i = 0; i < ratings.length; i++) {
            const rating = ratings[i];
            //console.log(rating);
    
            //запускаем функцию для каждого из рейтингов
            showRating(rating);
        }
        
        //функция для конкретного рейтинга
        function showRating(rating) {
            initRatingInfo(rating);
            setRatingActiveWidth();

            if (rating.classList.contains('rating_set')) {
                setRating(rating);
            }
        }
        
        //функция присваивания рейтингу переменных с данными самого рейтинга (из активной полосы и из value)
        function initRatingInfo(rating) {
            ratingActive = rating.querySelector('.rating-active');
            ratingValue = rating.querySelector('.rating-value');
            //console.log(ratingActive);
            //console.log(ratingValue);
    
        }
    
        //функция изменения ширины активных звезд
        function setRatingActiveWidth(i = ratingValue.innerHTML) {
            const ratingActiveWidth = i / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
        }

        //функция, дающая возможность указывать оценку
        function setRating(rating) {

            //собираем все рейтинги на странице
            const ratingItems = rating.querySelectorAll('.rating-item');
            console.log(ratingItems);

            //собираем все звездные рейтинги
            for (let i = 0; i < ratingItems.length; i++) {

                //получаем каждый из рейтингов на странице
                const ratingItem = ratingItems[i];
                //console.log(ratingItem);

                //событие при хождении мыши по звездам
                ratingItem.addEventListener('mouseenter', function (e) {
                    //обновление переменных
                    initRatingInfo(rating);
                    //обновление активной полосы путем передачи в нее value того объекта, на который наведена мышь
                    setRatingActiveWidth(ratingItem.value);
                });

                //сообытие при уходе мыши со звезд
                ratingItem.addEventListener('mouseleave', function (e) {
                    //активная полоса пеерсчитывается и остается на последнем установленном значении, которое берется из цифры, указанной в value
                    setRatingActiveWidth();
                });
                //сообытие при клике на звезду
                ratingItem.addEventListener('click', function (e) {
                    //обновление переменных
                    initRatingInfo(rating);

                    if (rating.dataset.ajax) {

                        console.log(id);
                        console.log(ratingValue.innerHTML);
                        console.log(rating);

                        //отправить на сервер
                        let data = "id=" + encodeURIComponent(id) + "&rating=" + encodeURIComponent(ratingValue);

                        // создаём объкт который умеет отправлять запросы
                        let requestObj = new XMLHttpRequest();

                        // собираем ссылку для запроса
                        let link = 'http://localhost/api/update/index.php';
                            
                        //конфигурируем объект
                        requestObj.open('POST', link, false);
                    
                        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    
                        // отправляем запрос
                        requestObj.send(data);

                    //просто отобразить на фронте указанную оценку
                    } else {
                        ratingValue.innerHTML = i + 1;
                        setRatingActiveWidth();
                    }
                });
            }
        }
    
    }

    /*
    document.addEventListener('click', (e)=>{
        if(e.target == screenDimmer) {
            alert(1);
            loginForm.classList.add('hidden');
            signupForm.classList.add('hidden');
        }
    }); */

    //вызываем функцию при загрузке страницы
    renderHomePage();

    //если юзер залогинен, добавляем иконке ЛК свое меню, появляющееся и скрывающееся по клику
    function persAccountSubmenuCheck() {
        if (document.querySelector('.logged-in-icon')) {
            //console.log(document.querySelector('.logged-in-icon'));
            //console.log(document.querySelector('.logged-in-icon').classList);
            document.getElementById('log-in').setAttribute('onClick', 'showOptions()');
            
        } else {
            document.getElementById('log-in').setAttribute('onClick', 'authorization()');
            document.querySelector('.pers').classList.add('hidden');
        }
    }

    //показ/скрытие нижнего меню под иконкой ЛК
    function showOptions() {
        document.querySelector('.pers').classList.toggle('hidden');
    }

    //функция проверки токена
    function tokenChecked() {

        if (hash != null) {

            let hash = localStorage.getItem('token');
            console.log(hash);

            let data = "token=" + encodeURIComponent(hash);

            // создаём объект, который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();

            requestObj.onreadystatechange = function() {
                if (requestObj.readyState == XMLHttpRequest.DONE) {
                    let date = JSON.parse(requestObj.responseText);

                    if (date['success'] == true) {

                        console.log('true');

                        //если да, то отрисовываем дальше страницу кабинета
                        //personalaccount();
                        // renderInfo();

                        // document.getElementById('pers_name').value = date['name'];
                        // document.getElementById('pers_mail').value = date['e-mail'];
                        // document.getElementById('pers_phone').value = date['phone'];
                        // document.getElementById('pers_adress').value = date['adress'];

                    }

                }
            }

            //собираем ссылку для запроса
            let link = 'http://localhost/?check';
            
            //конфигурируем объект
            requestObj.open('POST', link, false);
                                    
            requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                    
            // отправляем запрос
            requestObj.send(data);

            console.log('token has been checked');

        } else {

            console.log('something is wrong with hash');
            console.log('hash: ' + hash);

            return false;
        }

        
    }

    //функция отрисовки личного кабинета
    // function renderPerson() {

    //функция вызова формы авторизации (логина)
    function authorization() {

        let hash = localStorage.getItem('token');

        if (hash == null) {

            //очищаем страницу
            // clearPage();
    
            //отрисовываем в main шаблон личного кабинета
            //main.innerHTML += templatePerson1;

            //делаем форму loginа видимой
            document.getElementById('screen-dimmer').style.opacity = '1';
            document.getElementById('tmpl-request2').classList.remove('hidden');

            // document.addEventListener('click', (e)=>{
            //     if (e.target !== loginForm) {
            //         document.getElementById('screen-dimmer').style.opacity = '0';
            //         loginForm.classList.add('hidden');
            //     }  
            // })
    
        } 
        
        // else if (hash != null) {
        //     console.log(hash);

        // let data = "token=" + encodeURIComponent(hash);

        // // создаём объкт который умеет отправлять запросы
        // let requestObj = new XMLHttpRequest();

        // requestObj.onreadystatechange = function() {
        //     if (requestObj.readyState == XMLHttpRequest.DONE) {
        //         let date = JSON.parse(requestObj.responseText);

        //         if (date['success'] == true) {

        //             //если да, то отрисовываем дальше страницу кабинета
        //             //personalaccount();
        //             renderInfo();

        //             document.getElementById('pers_name').value = date['name'];
        //             document.getElementById('pers_mail').value = date['e-mail'];
        //             document.getElementById('pers_phone').value = date['phone'];
        //             document.getElementById('pers_adress').value = date['adress'];

        //         }

        //      }
        // }

        // //собираем ссылку для запроса
        // let link = 'http://localhost/?check';
        
        // //конфигурируем объект
        // requestObj.open('POST', link, false);
                                
        // requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                
        // // отправляем запрос
        // requestObj.send(data);

        // console.log('hash is not null, request sent');

        //} 

}

    //функция вызова формы регистрации
    function registration() {
        //очищаем страницу
        // clearPage();

        //main.innerHTML += templatePerson;

        //скрываем форму loginа
        document.getElementById('tmpl-request2').classList.add('hidden');

        //делаем форму регистрации видимой
        document.getElementById('tmpl-request').classList.remove('hidden');
    }

    //вся завязка на айдишнике товара

    function order() {

        let element =  document.querySelectorAll('.bsk-goods-title');

        let array = [];

        array = element;

        for (i = 0; i < array.length; i++) {

            let row = array[i].getAttribute("data-ind_id");

            // goods_id = row;

            let data = "token=" + encodeURIComponent(hash) + "&good_id=" + encodeURIComponent(row);

            // создаём объкт который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();
   
           // собираем ссылку для запроса
           let link = 'http://localhost/?order';
                   
           //конфигурируем объект
           requestObj.open('POST', link, false);
       
           requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       
           // отправляем запрос
           requestObj.send(data);

        }

    }

    //функция захода в ЛК после авторизации
    function entrance() {

        let login = document.getElementById('login_entrance').value;
        let password = document.getElementById('password_entrance').value;

        if (login !='' || password !='') {

            let data = "login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password);
    
                // создаём объкт который умеет отправлять запросы
                let requestObj = new XMLHttpRequest();


                requestObj.onreadystatechange = function() {
                    if (requestObj.readyState == XMLHttpRequest.DONE) {
                        let date = JSON.parse(requestObj.responseText);
                        console.log(date);

                        if (date['success'] == false) {

                            alert('Такого пользователя нет');
                        }
            
            
                        if (date['success'] == true) {

                            let token = date['token'];

                            localStorage.setItem('token', token);
                            console.log(token);

                            tokenChecked();

                            //console.log(login);
                            //кладем логин в хранилище
                            //localStorage.setItem('login', login);
                
                            //если да, то отрисовываем дальше страницу кабинета
                            //сначала скрываем форму loginа и полупрозрачную подложку
                            document.getElementById('screen-dimmer').style.opacity = '0';
                            document.getElementById('tmpl-request2').classList.add('hidden');
                
                            //document.getElementById('lk').classList.add('butpers1');

                            //меняем иконку в хедере
                            document.getElementById('log-in').classList.remove('log-in-icon');
                            document.getElementById('log-in').classList.add('logged-in-icon');

                            //меняем онклик у иконки входа в ЛК
                            persAccountSubmenuCheck();

                            // document.getElementById('pers_name').value = date['name'];
                            // document.getElementById('pers_mail').value = date['e-mail'];
                            // document.getElementById('pers_phone').value = date['phone'];
                            // document.getElementById('pers_adress').value = date['adress'];

                            let persInfoArr = {};

                            persInfoArr['name'] = date['name'];
                            persInfoArr['e-mail'] = date['e-mail'];

                            if (date['phone']) {
                                persInfoArr['phone'] = date['phone'];
                            } else {
                                persInfoArr['phone'] = '';
                            }

                            if (date['adress']) {
                                persInfoArr['adress'] = date['adress'];
                            } else {
                                persInfoArr['adress'] = '';
                            }

                            console.log(persInfoArr);

                            localStorage.setItem('personal_info', JSON.stringify(persInfoArr));

                            //очищаем страницу
                            clearPage();

                            renderInfo();
                        }
                    }
                }
            
                // собираем ссылку для запроса
                let link = 'http://localhost/?login';
                
                //конфигурируем объект
                requestObj.open('POST', link, false);
            
                requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            
                // отправляем запрос
                requestObj.send(data);
          }
    }

    function exit() {

        localStorage.removeItem('token');
        //console.log(localStorage.getItem('token'));

        //отрисовываем в main шаблон личного кабинета
        //main.innerHTML = templatePerson1;

        //меняем иконку в хедере
        document.getElementById('log-in').classList.remove('logged-in-icon');
        document.getElementById('log-in').classList.add('log-in-icon');

        //возвращаем Главную страницу
        renderHomePage();
        
        //делаем форму loginа невидимой
        document.getElementById('screen-dimmer').style.opacity = '0';
        document.getElementById('tmpl-request2').classList.add('hidden');

    }

    function deleteAccount(){

        let result = confirm('Вы уверены,что хотите удалить аккаунт?');

        if (result == true) {

            let data = "token=" + encodeURIComponent(hash);

            // создаём объкт который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();

            // собираем ссылку для запроса
            let link = 'http://localhost/?deleteUser';
                
            //конфигурируем объект
            requestObj.open('POST', link, false);
        
            requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
            // отправляем запрос
            requestObj.send(data);

            localStorage.removeItem('token');

            //отрисовываем в main шаблон личного кабинета
            //main.innerHTML = templatePerson1;

            //меняем иконку в хедере
            document.getElementById('log-in').classList.remove('logged-in-icon');
            document.getElementById('log-in').classList.add('log-in-icon');
      
            renderHomePage();

        } 
    }

    function select_phone() {

        let phone = document.getElementById('pers_phone').value;

        //1. записать в бд те данные, которые пользователь записал в первый раз или изменил адрес и телефон
        let data = "phone=" + encodeURIComponent(phone) + "&token=" + encodeURIComponent(hash);
    
            // создаём объкт который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();

            requestObj.onreadystatechange = function() {
                if (requestObj.readyState == XMLHttpRequest.DONE) {
                    let date = JSON.parse(requestObj.responseText);

                    let response = date['phone'];

                    phone = response;

                    let arrLC = JSON.parse(localStorage.getItem('personal_info'));
                    arrLC['phone'] = response;
                    localStorage.setItem('personal_info', JSON.stringify(arrLC));

            }
        }

        // собираем ссылку для запроса
        let link = 'http://localhost/?select_phone';
                
        //конфигурируем объект
        requestObj.open('POST', link, false);
             
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
             
        // отправляем запрос
        requestObj.send(data);

    }

    function select_adress() {

        let adress = document.getElementById('pers_adress').value;

        //1. записать в бд те данные, которые пользователь записал в первый раз или изменил адрес и телефон
        let data = "adress=" + encodeURIComponent(adress) + "&token=" + encodeURIComponent(hash);
    
            // создаём объкт который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();

            requestObj.onreadystatechange = function() {
                if (requestObj.readyState == XMLHttpRequest.DONE) {
                    let date = JSON.parse(requestObj.responseText);

                    let response = date['adress'];

                    adress = response;

                    let arrLC = JSON.parse(localStorage.getItem('personal_info'));
                    arrLC['adress'] = response;
                    localStorage.setItem('personal_info', JSON.stringify(arrLC));
            }
        }

        // собираем ссылку для запроса
        let link = 'http://localhost/?select_adress';
                
        //конфигурируем объект
        requestObj.open('POST', link, false);
             
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
             
        // отправляем запрос
        requestObj.send(data);

    }

    function personalaccount(){
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('personalaccount').innerHTML;
        main.style.padding = '40px';
        document.getElementById('lk').classList.add('butpers1');

    }

    function renderInfo() {

        clearPage();

        main.innerHTML += document.getElementById('tmpl-personalinfo').innerHTML;
        main.style.padding = '40px';

        //сделать через БД, а не хранилище

        if (localStorage.getItem('personal_info')) {
            
            let persInfoArr = JSON.parse(localStorage.getItem('personal_info'));
            
            document.getElementById('pers_name').value = persInfoArr['name'];
            document.getElementById('pers_mail').value = persInfoArr['e-mail'];

            if (JSON.parse(localStorage.getItem('personal_info'))['phone']) {
                document.getElementById('pers_phone').value = persInfoArr['phone'];
            }

            if (JSON.parse(localStorage.getItem('personal_info'))['adress']) {
                document.getElementById('pers_adress').value = persInfoArr['adress'];
            }
            
        }

    }

    function renderOrders() {

        let hash = localStorage.getItem('token');

        //1. записать в бд те данные, которые пользователь записал в первый раз или изменил адрес и телефон
        let data = "token=" + encodeURIComponent(hash);
    
            // создаём объкт который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();

            requestObj.onreadystatechange = function() {
                if (requestObj.readyState == XMLHttpRequest.DONE) {
                    let date = JSON.parse(requestObj.responseText);

                    console.log(date);
            }
        }

        // собираем ссылку для запроса
        let link = 'http://localhost/?getOrder';
                
        //конфигурируем объект
        requestObj.open('POST', link, false);
             
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
             
        // отправляем запрос
        requestObj.send(data);


        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('personalorders').innerHTML;
        main.style.padding = '40px';
        document.getElementById('zak').classList.add('butpers1');
    }

    function closeLogin() {
        screenDimmer.style.opacity = '0';
        loginForm.classList.add('hidden');
    }

    function closeSignup () {
        screenDimmer.style.opacity = '0';
        signupForm.classList.add('hidden');
    }

    //функция отрисовки Главной страницы
    function renderHomePage() {

    //проверяем, зарегистрирован ли юзер
    //let userLogin = localStorage.getItem('login');
    //console.log(hash);

    let hash = localStorage.getItem('token');

    if (hash) {
        //меняем дефолтную иконку в хедере на залогиненную
        document.getElementById('log-in').classList.remove('log-in-icon');
        document.getElementById('log-in').classList.add('logged-in-icon');
    }

    persAccountSubmenuCheck();

        //очищаем страницу
        clearPage();

        //чтобы слайдер не ломался
        $(function(){
            $('.slider').slick({
                arrows: true, //отображение стрелок
                dots: true, //отображение точек
                adaptiveHeight: false, //слайдер подстраивается по высоте под высоту активного слайда
                slidesToShow: 2, //сколько слайдов будет показано в одном ряду
                slidesToScroll: 1, //сколько слайдов пролистывается по одному нажатию на стрелку
                speed: 2000, //скорость прокрутки (в мс)
                easing: 'linear', //тип анимации
                infinite: true, //будет ли слайдер пролистываться бесконечно
                autoplay: true, //автоматическое пролистывание
                autoplaySpeed: 1000, //интервал автопролистывания
                pauseOnFocus: true, //прекращение автопролистывания при focus
                pauseOnHover: true, //прекращение автопролистывания при hover
                pauseOnDotsHover: true, //прекращение автопролистывания при hover на точках
                draggable: false, //возможность перетаскивать слайды мышью на ПК
                swipe: true, //возможность свайпать слайды через тачскрин
                touchThreshold: 2, //необходимый размах свайпа для активации пролистывания
                touchMove: true, //возможность двигать слайды туда-сюда пальцем
                waitForAnimate: true, //будет ли скорость пролистывания быстрее, чем заданная в анимации, при более быстрых кликах/свайпах
                centerMode: false, //будет ли главный слайд показываться в центре, а не в начале
                variableWidth: false, //будет ли вся ширина видимой части заполнена слайдерами до предела без промежутков между ними
                rows: 1, //количество этажей слайдера
                slidesPerRow: 1, //количество колонок при rows > 1
                vertical: false, //вертикальное направление слайдера
                verticalSwiping: false, //переключение горизонтального свайпа на вертикальный
                responsive: [
                    {
                        breakpoint: 1020,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        });

        //рисуем постоянную базу домашней страницы
        main.innerHTML += templateHomePage;

        main.style.padding = '0';

        

    }

    //функция отрисовки Каталога
    function renderCatalog() {

        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost/?allcategories");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateCatalogNav;

        //создаем флекс-контейнер ВНУТРИ main, куда будет отрисовываться содержимое (если отрисовывать сразу в main, верстка слетит)
        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);
        main.style.padding = '40px';

        //рисуем данные на экран
        for (let i = 0; i < data.length; i++) {
            //выводим данные шаблона
            flexFrameContainer.innerHTML += templateCatalog.replace('${category_id}', data[i]['category_id']) //СЕЙЧАС ВМЕСТО id КАТЕГОРИИ отрисовывается  id КАРТОЧКИ
                                                           .replace('${category_img}', data[i]['category_img'])
                                                           .replace('${category_id}', data[i]['category_id']) //СЕЙЧАС ВМЕСТО id КАТЕГОРИИ отрисовывается  id КАРТОЧКИ
                                                           .replace('${category_title}', data[i]['category']);
        
        }
    }

    //функция отрисовки набора товаров внутри Категории
    function renderCardsInCategory(category_id) { //id в БД начинается с 1

        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost/?allcategories");

        //раскодируем данные
        let data = JSON.parse(json);    

        //отрисовываем в main шаблон шапки ОТДЕЛЬНО
        main.innerHTML += templateCategoryNav.replace('${category_title}', data[category_id -1]['category']) // сдвиг на единицу, т.к в ДБ отсчет id с 1, а в массиве  - с 0
                                             .replace('${category_title}', data[category_id -1]['category']);

        //console.log(category_id);
        //console.log(data[category_id - 1]['category']);

        //отправляем отдельный запрос для получения данных из сджойненных таблиц goods и categories, выстроенных по category id
        let json2 = sendRequestGET("http://localhost/?category_id=" + category_id);

        //раскодируем данные
        let data2 = JSON.parse(json2);  
        console.log(data2);

        localStorage.setItem('goods_on_page', json2);
        
        //создаем флекс-контейнер ВНУТРИ main, куда будет отрисовываться содержимое (если отрисовывать сразу в main, верстка слетит)
        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);
        main.style.padding = '40px';

        //рисуем данные на экран
        for (let i = 0; i < data2.length; i++) {
            //выводим данные шаблона
            flexFrameContainer.innerHTML += templateCategory.replace('${goods_img}', data2[i]['photo'])
                                                            .replace('${ind_goods_id}', data2[i]['id'])
                                                            .replace('${ind_goods_id}', data2[i]['id'])
                                                            .replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${bsk_goods_id}', data2[i]['id'])
                                                            .replace('${price}', Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100))))
                                                            .replace('${crssd}', data2[i]['price'])
                                                            .replace('${sale}', (data2[i]['sale']) ? data2[i]['sale'] : '0')
                                                            .replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${ind_goods_id}', data2[i]['id'])
                                                            .replace('${category_id}', data2[i]['category_id'])
                                                            .replace('${ind_goods_id}', data2[i]['id'])
                                                            .replace('${goods_title}', data2[i]['name'])
                                                            .replace('${rating}', data2[i]['rating'] ? data2[i]['rating'] : '0')
                                                            .replace('${popularity}', data2[i]['popularity'] ? data2[i]['popularity'] : '0');
            
            //если на странице есть товар, добавленный в Избранное, отображать его сердечко
            if (localStorage.getItem('favourites')) {
                let faves = JSON.parse(localStorage.getItem('favourites'));
                if (faves === data2[i]['id'] || contains(faves, data2[i]['id'])) {
                    flexFrameContainer.getElementsByClassName('favourite-on-goods')[i].classList.toggle('visibility-important'); //НЕ РАБОТАЕТ
                }
            }

            //проверяем товар на наличие
            if (data2[i]['quantity'] == null || parseInt(data2[i]['quantity']) < 1 ) {
                document.getElementsByClassName('card-in-category')[i].style.opacity = '50%';
                document.getElementsByClassName('price-line')[i].innerHTML = 'Нет в наличии';
                document.getElementsByClassName('btn-add-to-basket')[i].classList.toggle('hidden-important');    
            }

            //в отдельном цикле делаем проверку на наличие скидки (т.к. в результате манипуляций в предыдущем if некоторые строки с ценами были скрыты)
            for (let j = 0; j < main.getElementsByClassName('sale-num').length; j++) {
                //скрываем зачеркнутую цену и скидку, если нулевая
                if (main.getElementsByClassName('sale-num')[j].innerHTML === '-0%') {
                    document.getElementsByClassName('crossed-out-price')[j].style.display = 'none';
                    document.getElementsByClassName('sale-num')[j].style.display = 'none';
                }
            }
                
        }

        //РЕЙТИНГ
        if(document.querySelectorAll('.rating')) {
            const ratings = document.querySelectorAll('.rating');
            //console.log(document.querySelectorAll('.rating'));
    
            showRatings();
        }

    }

    //функция отрисовки Карточки
    function renderCard(category_id,ind_goods_id) {
        //очищаем страницу
        clearPage();

        //если пришли сюда через поиск, очищаем его
        if (document.getElementById('input-search-top').value != '') {
            document.getElementById('input-search-top').value = '';
        }

        let json = sendRequestGET("http://localhost/?category_id=" + category_id + '&&id=' + ind_goods_id);

        //раскодируем данные
        let data = JSON.parse(json)[0];

        console.log(category_id,ind_goods_id);
        console.log(data);

        //отрисовываем в main шаблон Карточки
        main.innerHTML += templateCard.replace('${category_id}', category_id)
                                      .replace('${category_title}', data['category'])
                                      .replace('${goods_title}', data['name'])
                                      .replace('${ind_goods_id}', data['id'])
                                      .replace('${rating}', data['rating'])
                                      .replace('${popularity}', data['popularity'])
                                      .replace('${category_id}', category_id)
                                      .replace('${ind_goods_id}', data['id'])
                                      .replace('${goods_title}', data['name'])
                                      .replace('${goods_img_big}', data['photo'])
                                      .replace('${price}', Math.round(parseInt(data['price']) - (parseInt(data['price']) * (data['sale'] ? (parseInt(data['sale']) / 100) : 0 / 100))))
                                      .replace('${crssd}', data['price'])
                                      .replace('${sale}', (data['sale']) ? data['sale'] : '0')
                                      .replace('${category_id}', data['category_id'])
                                      .replace('${bsk_goods_id}', data['id'])
                                      .replace('${goods_title}', data['name'])
                                      .replace('${goods_description}', data['consist']);
                                     
            //если скидки нет
            if (main.getElementsByClassName('sale-num bigger')[0].innerHTML === '-0%') {
                document.getElementsByClassName('crossed-out-price')[0].style.display = 'none';
                document.getElementsByClassName('sale-num')[0].style.display = 'none';
            }

            //проверяем товар на наличие
            if (data['quantity'] == null || parseInt(data['quantity']) < 1 ) {
                document.querySelector('.price-line').innerHTML = 'Нет в наличии';
                document.querySelector('.btn-to-basket').classList.add('hidden');
            }
            
        
        main.style.padding = '40px';

        //РЕЙТИНГ
        
        if(document.querySelectorAll('.rating')) {
            const ratings = document.querySelectorAll('.rating');
            //console.log(document.querySelectorAll('.rating'));
    
            showRatings();
        }
        
    }

    //функция фильтрации цены ОТ и ДО
    function filterByPrice() {

        //достаем введенное значение ОТ
        let priceFrom = document.getElementById('price-from').value;
        console.log("Введенная цена ОТ: " + priceFrom);

        //достаем введенное значение ДО
        let priceTo = document.getElementById('price-to').value;
        console.log("Введенная цена ДО: " + priceTo);

        //если есть хотя бы одно введенное значение ДО или ПОСЛЕ
        if (priceFrom > 0 || priceTo > 0) {

            //если значение ДО не введено, 0 или отрицательное, присвоить ему 1
            if (!priceFrom || priceFrom <= 0) {
                priceFrom = 1;

            //если значение ПОСЛЕ не введено или отрицательное, присвоить ему 1 000 000 000
            } else if (!priceTo || priceTo < 0) {
                priceTo = 1000000000;
            }

            //достаем из хранилища массив со всей инфой обо всех карточках на данной странице
            let data2 = JSON.parse(localStorage.getItem('goods_on_page'));

            console.log(data2);

            //находим флекс-контейнер ВНУТРИ main, где отрисовываются карточки
            let flexFrameContainer = document.querySelector('.frame__flex-wrap');

            flexFrameContainer.innerHTML = '';

            for (let i = 0; i < data2.length; i++) {

                //если цена товара вписывается в выбранный диапазон
                if ((Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100)))) >= priceFrom && (Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100)))) <= priceTo) {
                    
                    //заново отрисовываем этот товар
                    flexFrameContainer.innerHTML += templateCategory.replace('${goods_img}', data2[i]['photo'])
                                                                    .replace('${ind_goods_id}', data2[i]['id'])
                                                                    .replace('${ind_goods_id}', data2[i]['id'])
                                                                    .replace('${bsk_goods_id}', data2[i]['id'])
                                                                    .replace('${price}', Math.round(parseInt(data2[i]['price']) - (parseInt(data2[i]['price']) * (data2[i]['sale'] ? (parseInt(data2[i]['sale']) / 100) : 0 / 100))))
                                                                    .replace('${crssd}', data2[i]['price'])
                                                                    .replace('${sale}', (data2[i]['sale']) ? data2[i]['sale'] : '0')
                                                                    .replace('${category_id}', data2[i]['category_id'])
                                                                    .replace('${ind_goods_id}', data2[i]['id'])
                                                                    .replace('${category_id}', data2[i]['category_id'])
                                                                    .replace('${ind_goods_id}', data2[i]['id'])
                                                                    .replace('${goods_title}', data2[i]['name'])
                                                                    .replace('${rating}', data2[i]['rating'] ? data2[i]['rating'] : '0')
                                                                    .replace('${popularity}', data2[i]['popularity'] ? data2[i]['popularity'] : '0');
                    
                    for (let j = 0; j < flexFrameContainer.children.length; j++) {
                        //если нет скидки, не показываем ее                              
                        if (document.getElementsByClassName('sale-num')[j].innerHTML === '-0%') {
                            document.getElementsByClassName('crossed-out-price')[j].style.display = 'none';
                            document.getElementsByClassName('sale-num')[j].style.display = 'none';
                        }

                    }
                    
                    
                }
                
            }

            /*
            //находим флекс-контейнер ВНУТРИ main, где отрисовываются карточки
            let flexFrameContainer = document.querySelector('.frame__flex-wrap');
            //console.log(flexFrameContainer);
            //flexFrameContainer.innerHTML = '';
            //console.log(flexFrameContainer);

            //собираем в массив все товары из данной категории
            let allTheseGoods = flexFrameContainer.getElementsByClassName('card-in-category');
            console.log(allTheseGoods);

            for (let i = 0; i < allTheseGoods.length; i++) {
                let actualPrice = allTheseGoods[i].querySelector('.actual-price').innerHTML.replace('/\D/g', '');
                console.log(i);
                console.log(actualPrice);
                data['goods'][i]['price'] = actualPrice;
                console.log(data);
            }
            */

            //let data = flexFrameContainer.getElementsByClassName('actual-price');

            /*
            //отправляем отдельный запрос для получения данных из сджойненных таблиц goods и categories, выстроенных по category id
            let json = sendRequestGET("http://localhost:8091/?category_id=" + category_id + "&&price_from=" + priceFrom + "&&price_to=" + priceTo);

            //раскодируем данные
            let data = JSON.parse(json);  
            */

            
            //если по результатам запроса ничего не найдено, вывести соответствующую надпись
            if (flexFrameContainer.children.length === 0) {
                console.log(flexFrameContainer.children.length);

                flexFrameContainer.innerHTML = 'По Вашему запросу ничего не найдено';
                // flexFrameContainer.style.display = "inline";
                // flexFrameContainer.style.textAlign = "left";
            }
            
            
            //else {

                //рисуем данные на экран
                //for (let i = 0; i < data.length; i++) {
                    // let actualPrice = parseInt(data[i].innerHTML.replace('/\D/g', ''));

                    // if (!(actualPrice >= priceFrom && actualPrice <= priceTo)) {
                    //     console.log('Товар ' + i + ' с ' + actualPrice + ' должен быть скрыт');
                    //     console.log(flexFrameContainer.getElementsByClassName('card-in-category')[i].innerHTML);
                    //     flexFrameContainer.getElementsByClassName('card-in-category')[i].style.display = 'none';
                        
                    // }

                    
                    /*
                    //выводим данные шаблона
                    flexFrameContainer.innerHTML += templateCategory.replace('${category_id}', data[i]['category_id'])
                                                                    .replace('${goods_id}', i)
                                                                    .replace('${bsk_goods_id}', data[i]['id'])
                                                                    .replace('${goods_img}', data[i]['photo'])
                                                                    .replace('${goods_title}', data[i]['name'])
                                                                    .replace('${price}', Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                                    .replace('${crssd}', data[i]['price'])
                                                                    .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                                    .replace('${category_id}', data[i]['category_id'])
                                                                    .replace('${goods_id}', i)
                                                                    .replace('${goods_title}', data[i]['name']);
                
                    if (main.getElementsByClassName('sale-num')[i].innerHTML === '-0%') {
                        document.getElementsByClassName('crossed-out-price')[i].style.display = 'none';
                        document.getElementsByClassName('sale-num')[i].style.display = 'none';
                    }
                    */
                //}

                //если активен также фильтр select, применяем его
                if (document.getElementById('sort-by').value !== 'default') {
                    sortBySelect();
                }  


        }

    }


    //функция фильтрации по скидке
    function filterWithDiscount() {

         //достаем из хранилища массив со скидками, содержащимися в карточках на данной странице
         //let allPricesInCards = JSON.parse(localStorage.getItem('goods_info'));
         //console.log(allPricesInCards);

        //находим флекс-контейнер ВНУТРИ main, где отрисовываются карточки
        let flexFrameContainer = document.querySelector('.frame__flex-wrap');

        //если галочка поставлена
        if (document.getElementById('checkbox-sale').checked) {

            for (let i = 0; i < flexFrameContainer.children.length; i++) {
                
                //если у товара нет скидки
                if (flexFrameContainer.getElementsByClassName('sale-num')[i].innerHTML === '-0%') {
                    //скрываем этот товар
                    //console.log('Товар ' + i + ' с ' + allPricesInCards[i]['sale'] + ' должен быть скрыт');
                    flexFrameContainer.getElementsByClassName('card-in-category')[i].style.display = 'none'; 
                }
            }

        //если галочка снята
        } else {

            for (let i = 0; i < flexFrameContainer.children.length; i++) {
                //возвращаем видимость всем товарам
                flexFrameContainer.getElementsByClassName('card-in-category')[i].style.display = 'block';
            }

        }

    }

    //функция сортировки по select
    function sortBySelect() {

        //находим флекс-контейнер ВНУТРИ main, где отрисовываются карточки (это РОДИТЕЛЬ)
        let flexFrameContainer = document.querySelector('.frame__flex-wrap');

        //если выбрана опция "ПО УМОЛЧАНИЮ"
        if (document.getElementById('sort-by').value === 'default') {

            //нужно вытащить id элемента, но он только в хранилище
            //достаем из хранилища массив со всей инфой обо всех карточках на данной странице
            let data = JSON.parse(localStorage.getItem('goods_on_page'));
            console.log(data);
            console.log(flexFrameContainer.children);

            //для удобства назначаем товарам атрибут, содержащий их id из хранилища (= из БД)
            for (let j = 0; j < flexFrameContainer.children.length; j++) {
                for (let k = 0; k < data.length; k++)
                if (flexFrameContainer.children[j].querySelector('h4').innerHTML === data[k]['name']) {
                    console.log(flexFrameContainer.children[j].querySelector('h4').innerHTML + ' = ' + data[k]['name']);
                    flexFrameContainer.children[j].setAttribute('form-id', data[k]['id']);
                    console.log(flexFrameContainer.children[j].getAttribute('form-id'));
                }
            }

            //возвращаем товарам исходную сортировку (взяв за основу ту же функцию, что и в сортировке по убыванию/возрастанию цены)
            for (let i = 0; i < flexFrameContainer.children.length; i++) {
                for (let m = i; m < flexFrameContainer.children.length; m++) {
                    if (parseInt(flexFrameContainer.children[i].getAttribute('form-id')) > parseInt(flexFrameContainer.children[m].getAttribute('form-id'))) {
                        replacedNode = flexFrameContainer.replaceChild(flexFrameContainer.children[m], flexFrameContainer.children[i]);
                        insertAfter(replacedNode, flexFrameContainer.children[i]);
                    } 
                }
            }

            function insertAfter(elem, refElem) {
                return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
            } 
        //если выбрана опция "ПО ВОЗРАСТАНИЮ ЦЕНЫ"
        } else if (document.getElementById('sort-by').value === 'price-up') {

            console.log(flexFrameContainer.children.length);

        for (let i = 0; i < flexFrameContainer.children.length; i++) {
            for (let j = i; j < flexFrameContainer.children.length; j++) {
        
                //сравниваем между собой цены внутри карточек товаров
                if (parseInt(flexFrameContainer.children[i].querySelector('.actual-price').innerHTML.replace('/\D/g', '')) > parseInt(flexFrameContainer.children[j].querySelector('.actual-price').innerHTML.replace('/\D/g', ''))) {
                    //console.log(flexFrameContainer.children[j]);
                    //console.log(flexFrameContainer.children[i]);
                    //заменяем бОльший элемент (i) меньшим (j) и записываем вытесненный (i) в переменную
                    replacedNode = flexFrameContainer.replaceChild(flexFrameContainer.children[j], flexFrameContainer.children[i]);
                    //console.log(replacedNode);
                    //console.log(flexFrameContainer);
                    //console.log(flexFrameContainer.children[i]);
                    //console.log(flexFrameContainer.children[i].parentNode);
                    //с помощью доп. функции встраиваем вытесненный элемент перед следующим за ним в дефолтной иерархии айдишников
                    insertAfter(replacedNode, flexFrameContainer.children[i]);
                    //flexFrameContainer.insertBefore(replacedNode, flexFrameContainer.children[i].nextSibling);
                }
            }
        }

        //функция для встраивания вытесненного элемента в нужное место
        function insertAfter(elem, refElem) {
            return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
        }

        /*
            //replaceNode = parentNode.replaceChild(newChild, oldChild);
            replaceNode = flexFrameContainer.replaceChild(flexFrameContainer.children[1], flexFrameContainer.children[0]);
            console.log(replaceNode);
            flexFrameContainer.appendChild(replaceNode);
        */

        //если выбрана опция "ПО УБЫВАНИЮ ЦЕНЫ"  
        } else if (document.getElementById('sort-by').value === 'price-down') {

            for (let i = 0; i < flexFrameContainer.children.length; i++) {
                for (let j = i; j < flexFrameContainer.children.length; j++) {
                    //сравниваем между собой рейтинг внутри карточек товаров
                    if (parseInt(flexFrameContainer.children[i].querySelector('.actual-price').innerHTML.replace('/\D/g', '')) < parseInt(flexFrameContainer.children[j].querySelector('.actual-price').innerHTML.replace('/\D/g', ''))) {

                        //заменяем меньший элемент (i) бОльшим (j) и записываем вытесненный (i) в переменную
                        replacedNode = flexFrameContainer.replaceChild(flexFrameContainer.children[j], flexFrameContainer.children[i]);

                        //с помощью доп. функции встраиваем вытесненный элемент перед следующим за ним в дефолтной иерархии айдишников
                        insertAfter(replacedNode, flexFrameContainer.children[i]);
                        //flexFrameContainer.insertBefore(replacedNode, flexFrameContainer.children[i].nextSibling);
                    }
                }
            }
    
            //функция для встраивания вытесненного элемента в нужное место
            function insertAfter(elem, refElem) {
                return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
            }

        //если выбрана опция "ПО РЕЙТИНГУ"
        }  else if (document.getElementById('sort-by').value === 'rating') {

            console.log(flexFrameContainer.children.length);

            for (let i = 0; i < flexFrameContainer.children.length; i++) {
                for (let j = i; j < flexFrameContainer.children.length; j++) {
            
                    //сравниваем между собой рейтинг внутри карточек товаров
                    if (parseInt(flexFrameContainer.children[i].querySelector('.rating-value').innerHTML) < parseInt(flexFrameContainer.children[j].querySelector('.rating-value').innerHTML)) {
                        console.log(flexFrameContainer.children[i].querySelector('.rating-value').innerHTML);
                        console.log(flexFrameContainer.children[j].querySelector('.rating-value').innerHTML);
                        //заменяем бОльший элемент (i) меньшим (j) и записываем вытесненный (i) в переменную
                        replacedNode = flexFrameContainer.replaceChild(flexFrameContainer.children[j], flexFrameContainer.children[i]);

                        //с помощью доп. функции встраиваем вытесненный элемент перед следующим за ним в дефолтной иерархии айдишников
                        insertAfter(replacedNode, flexFrameContainer.children[i]);
                        //flexFrameContainer.insertBefore(replacedNode, flexFrameContainer.children[i].nextSibling);
                    }
                }
            }

            //функция для встраивания вытесненного элемента в нужное место
            function insertAfter(elem, refElem) {
                return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
            }
        
        //если выбрана сортировка "ПО ПОПУЛЯРНОСТИ"
        } else {

            console.log(flexFrameContainer.children.length);

            for (let i = 0; i < flexFrameContainer.children.length; i++) {
                for (let j = i; j < flexFrameContainer.children.length; j++) {
            
                    //сравниваем между собой популярность внутри карточек товаров
                    if (parseInt(flexFrameContainer.children[i].querySelector('.popularity-value').innerHTML) < parseInt(flexFrameContainer.children[j].querySelector('.popularity-value').innerHTML)) {
                        console.log(parseInt(flexFrameContainer.children[i].querySelector('.popularity-value').innerHTML));
                        console.log(parseInt(flexFrameContainer.children[j].querySelector('.popularity-value').innerHTML));
                        //заменяем бОльший элемент (i) меньшим (j) и записываем вытесненный (i) в переменную
                        replacedNode = flexFrameContainer.replaceChild(flexFrameContainer.children[j], flexFrameContainer.children[i]);

                        //с помощью доп. функции встраиваем вытесненный элемент перед следующим за ним в дефолтной иерархии айдишников
                        insertAfter(replacedNode, flexFrameContainer.children[i]);
                        //flexFrameContainer.insertBefore(replacedNode, flexFrameContainer.children[i].nextSibling);
                    }
                }
            }

            //функция для встраивания вытесненного элемента в нужное место
            function insertAfter(elem, refElem) {
                return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
            }

        //если выбрана опция "ПО РЕЙТИНГУ"
        }
    }

    //функция счетчика популярности товара (по количеству кликов на "добавить в корзину")
    function popularityCounter() {

        //console.log(goods_id);
  
        updateCounter();

        function updateCounter() {
            
            let currentPopularity = event.target.closest('.card-in-category').querySelector(".popularity-value").innerHTML;
            let newPopularity = 0;

            //если популярность пустая, меняем на 1
           if (currentPopularity === 'null' || currentPopularity == 0) {
                event.target.closest('.card-in-category').querySelector(".popularity-value").innerHTML = newPopularity + 1;
                console.log('популярность ' + event.target.closest('.card-in-category').querySelector(".popularity-value").innerHTML);
            
            //если уже есть числовое значение, достаем его и перезаписываем
            } else {
                
                newPopularity = parseInt(currentPopularity) + 1;
                event.target.closest('.card-in-category').querySelector(".popularity-value").innerHTML = newPopularity;
                console.log('популярность ' + event.target.closest('.card-in-category').querySelector(".popularity-value").innerHTML);
            }
            
            //находим индивидуальный id товара из дата-атрибута
            let indGoodsId = event.target.closest('.card-in-category').querySelector(".goods-title").getAttribute('data-ind_id');
            //console.log(goods_id + ' ' + indGoodsId + ' ' + document.getElementsByClassName("popularity-value")[goods_id].innerHTML);

            //обновляем в БД его популярность
            let data = "id=" + encodeURIComponent(indGoodsId) + "&popularity=" + encodeURIComponent(newPopularity);

            // создаём объект, который умеет отправлять запросы
            let requestObj = new XMLHttpRequest();
        
            // собираем ссылку для запроса
            let link = 'http://localhost/api/update/index.php';
            
            //конфигурируем объект
            requestObj.open('POST', link, false);
        
            requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
            //отправляем запрос
            requestObj.send(data);
        } 
    }

    

    //функция прибавления значения к total_quantity в хранилище
    function plusOne(l_c_cell, class_name) {
        //console.log(l_c_cell);
        //console.log(class_name);
        let newValue = 0;

        //достаем сохраненное значение из хранилища
        let currentValue = parseInt(localStorage.getItem(l_c_cell));
        //console.log(localStorage.getItem(l_c_cell));
        console.log(currentValue);

        //и прибавляем 1 уже к нему, записывая в переменную
        newValue += parseInt(currentValue) + 1;
        console.log("Добавлено: " + newValue);
    
        //выводим в верстке новое значение счетчика
        document.getElementById(class_name).innerHTML = newValue;
    
        //записываем новое значение счетчика в local storage
        localStorage.setItem(l_c_cell, newValue);
    }


    //вспомогательная функция на проверку во всем массиве какого-то элемента
    function contains(arr, elem) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    }

    //localStorage.setItem('favourites', '');
    //функция добавления в Избранное
    function addToFavourites(ind_goods_id) {

        //console.log(ind_goods_id);
        /*
        //для ОБЩЕГО СЧЕТЧИКА НА ИКОНКЕ ИЗБРАННОГО проверяем, не было ли что-то уже добавлено в Избранное
        //если в хранилище пусто
        
        if (localStorage.getItem('favourites_quantity') == null ) {

            //начинаем с 0 и добавляем +1 визуально к счетчику Избранного и делаем его видимым
            let newValue = 0;
            newValue += 1;
            console.log("Товаров в Избранном: " + newValue);
            document.getElementById('counter2').innerHTML = newValue;

            //записываем новое значение счетчика в local storage
            localStorage.setItem('favourites_quantity', newValue);

            //и делаем счетчик видимым
            document.getElementById('counter2').classList.remove('hidden');
        
        //если в хранилище уже что-то лежит
        } else {
            console.log(localStorage.getItem('favourites_quantity'));
            //прибавляем +1 к значению в total_quantity хранилище
            let l_c_cell = "'favourites_quantity'";
            let class_name = "'counter2'";
            plusOne(l_c_cell, class_name);
        }
        */

        //console.log(ind_goods_id);
        //добавляем товары, по которым кликнули на сердечко, в local storage
        //добавление в localStorage
        if (!localStorage.getItem('favourites')) {
            localStorage.setItem('favourites', ind_goods_id);
            console.log('+1 в Избранном');
            //console.log(localStorage.getItem('favourites'));
        } else {

            let favArr = JSON.parse(localStorage.getItem('favourites'));
            console.log(favArr);

            //если в хранилище всего 1 id, преобразуем его в массив из 1 элемента
            if (typeof(favArr) === 'number') {
                let arr = [];
                arr[0] = favArr;
                favArr = arr;
            }

            //если в хранилище еще нет такого id, добавляем его
            if (!contains(favArr, ind_goods_id)) {
                let favouritesArr = [];
                let currentFavourites = favouritesArr.concat(favArr);
                //console.log(currentFavourites);
                currentFavourites.push(ind_goods_id);
                //console.log(currentFavourites);
                let favourites = JSON.stringify(currentFavourites);
                localStorage.setItem('favourites', favourites);
                //console.log(localStorage.getItem('favourites'));
                console.log('+1 в Избранном');
            }
            
        }

        //console.log(localStorage.getItem('favourites'));
        //меняем пустые сердечки на розовые
        event.target.closest('.card-in-category_img').querySelector('.favourite-on-goods').classList.toggle('visibility-important');
        // event.target.closest('.card-in-category_img').querySelector('.favourite-on-goods').style.display = 'inline';

    }

    //функция добавления товаров в Корзину
    function addToBasket(category_id, ind_goods_id) {
        console.log(ind_goods_id);

        //для ОБЩЕГО СЧЕТЧИКА НА ИКОНКЕ КОРЗИНЫ проверяем, не было ли что-то уже добавлено в Корзину
        //если в хранилище пусто
        localStorage.getItem('total_quantity');
        if (localStorage.getItem('total_quantity') == null ) {

            //начинаем с 0 и добавляем +1 визуально к счетчику Корзины и делаем его видимым
            let newValue = 0;
            newValue += 1;
            console.log("Товаров в корзине: " + newValue);
            document.getElementById('counter').innerHTML = newValue;

            //записываем новое значение счетчика в local storage
            localStorage.setItem('total_quantity', newValue);

            //и делаем счетчик видимым
            document.getElementById('counter').classList.remove('hidden');
        
        //если в хранилище уже что-то лежит
        } else {
            
            //прибавляем +1 к значению в total_quantity хранилище
            //let l_c_cell = "'total_quantity'";
            //let class_name = "'counter'";
            plusOne('total_quantity', 'counter');
        }


        //делаем проверку на наличие повторяющихся товаров среди выбранных юзером
        //если это первый товар, добавляемый в Корзину
        if (localStorage.getItem('basket') == null) {

            //передаем на сервер id выбранного товара, чтобы получить о нем нужные данные в виде jsona и положить в local storage
            let jsonGoodsInBasket = sendRequestGET('http://localhost/?category_id=' + category_id + '&&id=' + ind_goods_id);
            //console.log(jsonGoodsInBasket);

            //помещаем данный товар в хранилище
            //но сначала превращаем в массив, чтобы добавить ему ключ quantity со значением 1
            let arr = JSON.parse(jsonGoodsInBasket);
            arr[0]['quantity'] = 1;
            //console.log(arr);

            //кодируем обратно в json и кладем в хранилище
            let json = JSON.stringify(arr);
            
            localStorage.setItem('basket', json);
            console.log('Первый товар в корзине, занесенный в хранилище: ' + localStorage.getItem('basket'));

        //если в хранилище уже что-то лежит
        } else {
            //перебираем массив хранилища, чтобы проверить, не был ли уже добавлен товар с этим id
            let arr = JSON.parse(localStorage.getItem('basket'));
            //console.log(arr);

            //вспомогательная функция проверки, содержит ли массив с товарами товар с контретным id
            function containsSpecific(arr, id) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['id'] === id) {
                        return true;
                    }
                }
                return false;
            }

            //вспомогательная функция, показывающая порядковый id повторяющегося товара
            function showArrId(arr, id) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['id'] === id) {
                        return i;
                    }
                }
                return false;
            }

            //если это не первый товар с таким id
            if (containsSpecific(arr, ind_goods_id)) { //после выполнения этого условия по всей длине цикла отберутся все повторяющиеся товары. Но как быть с остальными? Нужно также собрать все те, которые не прошли это условие, но нужны

                //console.log('В следующей строке массив с повторяющимся товаром');
                //console.log(arr);
                console.log('повторяется товар с id' + ind_goods_id);

                //мы прибаляем ему +1 в quantity 
                arr[showArrId(arr, ind_goods_id)]['quantity'] += 1;        
                //console.log(showArrId(arr, ind_goods_id));

                //кодируем массив в json
                let json = JSON.stringify(arr);

                //и перезаписываем local storage
                localStorage.setItem('basket', json);

                let currentBasket = localStorage.getItem('basket');

                console.log(currentBasket);

                //console.log(localStorage.getItem('basket').includes(arr[i]['name']));
             
            //если это ПЕРВЫЙ товар с таким id (доп. проверка на отсутствие вхождения в хранилище товара с таким названием) - else if (localStorage.getItem('basket').includes(goods_name) == false)
            } else if (!containsSpecific(arr, ind_goods_id)) {

                //передаем на сервер id выбранного товара, чтобы получить о нем нужные данные в виде jsona и положить в local storage
                let jsonGoodsInBasket = sendRequestGET('http://localhost/?category_id=' + category_id + '&&id=' + ind_goods_id);

                //превращаем в массив, чтобы добавить ему ключ quantity со значением 1
                let uniqueGoods = JSON.parse(jsonGoodsInBasket);

                uniqueGoods[0]['quantity'] = 1;
                //console.log(uniqueGoods);

                //вносим его в хранилище, добавив к уже лежащим там товарам
                //для сложения преобразуем json в массив, т.к. простая склейка нескольких jsonов делает их нечитабельными
                let currentGoods = JSON.parse(localStorage.getItem('basket'));

                //console.log(currentGoods);

                //теперь в currentGoods лежит общий массив из всех добавленных в Корзину товаров
                currentGoods.push.apply(currentGoods, uniqueGoods);

                console.log(currentGoods);

                //кодируем его обратно в json, чтобы положить в хранилище
                let currentGoodsJson = JSON.stringify(currentGoods);

                //console.log(currentGoodsJson);

                //кладем закодированный массив в хранилище
                localStorage.setItem('basket', currentGoodsJson);
               
            }

        }
        


        /*
        //отправляем на сервер id выбранного товара, чтобы получить о нем нужные данные для заполнения шаблона карточки товара в Корзине
        let data = "id=" + encodeURIComponent(goods_id);
    
        // создаём объкт, который умеет отправлять запросы
        let requestObj = new XMLHttpRequest();
    
        // собираем ссылку для запроса
        let link = 'http://localhost:8091/basket/post/';
        
        //конфигурируем объект
        requestObj.open('POST', link, false);
    
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        // отправляем запрос
        requestObj.send(data);
        */
        
        //отправляем на сервер id выбранного товара, чтобы получить о нем нужные данные для заполнения шаблона карточки товара в Корзине
        //let json = sendRequestGET('http://localhost:8091/basket/get/?id=' + goods_id);

        //раскодируем данные
        //let chosenGoodsData = JSON.parse(json);

        // if(chosenGoodsData) {
        //     sendRequestPOST('http://localhost:8091/basket/post', )
        // }

        //return chosenGoodsData;
        
    }

    //функция уменьшения количества товара по клику на -
    function lessGoods(goods_id) {

        //достаем из карточки количество отрисованного товара
        let individualQuantity = document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML;

        //переменная для обновленного значения
        let newQuantity = 0;

        console.log('Товара было: ' + parseInt(individualQuantity));

        if (parseInt(individualQuantity) > 1) {

            //уменьшаем значение на единицу и записываем в новую переменную
            newQuantity = parseInt(individualQuantity) - 1;
            console.log('После убавления : ' + newQuantity);

            //передаем новое значение в верстку
            document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML = newQuantity;
            console.log('В карточке после убавления: ' + document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML);
            
            if (newQuantity == 1) {

                //если новое значение уменьшилось до единицы, делаем кнопку неактивной
                document.getElementsByClassName('less-goods')[goods_id].classList.add('disabled');

            }

            //и в хранилище
            let currentGoods = JSON.parse(localStorage.getItem('basket'));

            //переписываем значение quantity у данного товара
            currentGoods[goods_id]['quantity'] = newQuantity;

            //кодируем обратно в json, чтобы положить в хранилище
            let currentGoodsJson = JSON.stringify(currentGoods);

            //кладем перезаписанный массив в хранилище
            localStorage.setItem('basket', currentGoodsJson);
            console.log('В хранилище после убавления: ' + currentGoodsJson);
        
            //и отражаем это в верстке на счетчике
            let oldCounter = document.getElementById('counter').innerHTML;
            let currentCounter = 0;
            currentCounter = parseInt(oldCounter) - 1;
            document.getElementById('counter').innerHTML = currentCounter;
            //console.log('Счетчик после убавления: ' + document.getElementById('counter').innerHTML);
         
            //записываем новое значение счетчика в local storage
            localStorage.setItem('total_quantity', currentCounter);

            //обновляем в верстке общее количество товара в блоке "Детали заказа"
            let totalQuantity = document.getElementById('quantity-in-order').innerHTML.replace(' шт.', '');
            let newTotal = parseInt(totalQuantity) - 1;
            document.getElementById('quantity-in-order').innerHTML = String(newTotal) + ' шт.';

            //для пересчета цены умножаем изначальную цену в карточке товара на его количество
            //ЗДЕСЬ НАДО ДОСТАВАТЬ ИЗНАЧАЛЬНОЕ ЗНАЧЕНИЕ, КАК В БД
            let crossedPrice = document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML.replace(' p.', '');

            //без БД пока что вычисляем изначальную цену, разделив цену товара до скидки (в верстке зачеркнута или единственная) на кол-во товара В МОМЕНТ ДОБАВЛЕНИЯ в корзину
            let actualPrice = parseInt(crossedPrice) / parseInt(individualQuantity);
            //console.log('Зачеркнутая цена: ' + parseInt(crossedPrice));
            //console.log('Значение при добавлении в корзину: ' + parseInt(individualQuantity));
            //console.log('Обновленное значение: ' + parseInt(newQuantity));
            //console.log('Стоимость 1 шт без скидки: ' + actualPrice);

            //переменная для обновляемой цены
            let newCrossedPrice = 0;
            //теперь умножаем вычисленную изначальную цену (т.к. не кидали запрос в БД) на ОБНОВЛЕННОЕ количество
            newCrossedPrice = parseInt(newQuantity) * parseInt(actualPrice);
            //console.log('Обновленная изначальная (зачеркнутая или единственная) цена после убавления: ' + newCrossedPrice);
            document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML = newCrossedPrice + ' р.';
            //console.log('Зачеркнутая после убавления: ' + document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML);

            //обновляем цену после скидки
            let finalPrice = document.getElementsByClassName('actual-price')[goods_id].innerHTML.replace(' p.', '');
            let actualFinalPrice = parseInt(finalPrice) / parseInt(individualQuantity);
            //console.log('Стоимость 1 шт со скидкой (при наличии): ' + actualFinalPrice);
            let newFinalPrice = 0;
            newFinalPrice = parseInt(newQuantity) * parseInt(actualFinalPrice);
            document.getElementsByClassName('actual-price')[goods_id].innerHTML = newFinalPrice + ' р.';

            
           //обновляем в верстке общую сумму товаров в блоке "Детали заказа"
           let sum = document.getElementById('sum').innerHTML.replace(' p.', '');
           console.log(sum);
           //let oneGoodsSum = document.querySelectorAll('.actual-price')[goods_id].innerHTML.replace(' p.', '');
           //console.log(oneGoodsSum);

           let newSum = parseInt(sum) - actualPrice;
           //console.log(actualPrice);
           //console.log(newSum);

           document.getElementById('sum').innerHTML = newSum + ' р.';

        }
        
    }

    //функция увеличения количества товара по клику на +
    function moreGoods(goods_id) {

        //достаем из карточки количество отрисованного товара
        let individualQuantity = document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML;

        //переменная для обновленного значения
        let newQuantity = 0;

        console.log('Товара было: ' + parseInt(individualQuantity));

        if (parseInt(individualQuantity) == 1) {

            //делаем кнопку уменьшения снова активной
            document.getElementsByClassName('less-goods')[goods_id].classList.remove('disabled');
        }

        //увеличиваем значение на единицу и записываем в новую переменную
        newQuantity = parseInt(individualQuantity) + 1;
        console.log('После прибавления : ' + newQuantity);

        //передаем новое значение в верстку
        document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML = newQuantity;
        //console.log('В карточке после прибавления: ' + document.getElementsByClassName('quantity-in-card')[goods_id].innerHTML);
        
        //и в хранилище
        let currentGoods = JSON.parse(localStorage.getItem('basket'));

        //переписываем значение quantity у данного товара
        currentGoods[goods_id]['quantity'] = newQuantity;

        //кодируем обратно в json, чтобы положить в хранилище
        let currentGoodsJson = JSON.stringify(currentGoods);

        //кладем перезаписанный массив в хранилище
        localStorage.setItem('basket', currentGoodsJson);
        //console.log('В хранилище после прибавления: ' + currentGoodsJson);
    
        //и отражаем это в верстке на счетчике
        let oldCounter = document.getElementById('counter').innerHTML;
        let currentCounter = 0;
        currentCounter = parseInt(oldCounter) + 1;
        document.getElementById('counter').innerHTML = currentCounter;
        //console.log('Счетчик после прибавления: ' + document.getElementById('counter').innerHTML);
        
        //записываем новое значение счетчика в local storage
        localStorage.setItem('total_quantity', currentCounter);

        //обновляем в верстке общее количество товара в блоке "Детали заказа"
        let totalQuantity = document.getElementById('quantity-in-order').innerHTML.replace(' шт.', '');
        document.getElementById('quantity-in-order').innerHTML = String(parseInt(totalQuantity) + 1) + ' шт.';
         

        //для пересчета цены умножаем изначальную цену в карточке товара на его количество
        //ЗДЕСЬ НАДО ДОСТАВАТЬ ИЗНАЧАЛЬНОЕ ЗНАЧЕНИЕ, КАК В БД
        let crossedPrice = document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML.replace(' p.', '');

        //без БД пока что вычисляем изначальную цену, разделив цену товара до скидки (в верстке зачеркнута или единственная) на кол-во товара В МОМЕНТ ДОБАВЛЕНИЯ в корзину
        let actualPrice = parseInt(crossedPrice) / parseInt(individualQuantity);
        //console.log('Зачеркнутая цена: ' + parseInt(crossedPrice));
        //console.log('Значение при добавлении в корзину: ' + parseInt(individualQuantity));
        //console.log('Обновленное значение: ' + parseInt(newQuantity));
        //console.log('Стоимость 1 шт без скидки: ' + actualPrice);

        //переменная для обновляемой цены
        let newCrossedPrice = 0;
        //теперь умножаем вычисленную изначальную цену (т.к. не кидали запрос в БД) на ОБНОВЛЕННОЕ количество
        newCrossedPrice = parseInt(newQuantity) * parseInt(actualPrice);
        //console.log('Обновленная изначальная (зачеркнутая или единственная) цена после убавления: ' + newCrossedPrice);
        document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML = newCrossedPrice + ' р.';
        //console.log('Зачеркнутая после убавления: ' + document.getElementsByClassName('crossed-out-price')[goods_id].innerHTML);

        //обновляем цену после скидки
        let finalPrice = document.getElementsByClassName('actual-price')[goods_id].innerHTML.replace(' p.', '');
        let actualFinalPrice = parseInt(finalPrice) / parseInt(individualQuantity);
        //console.log('Стоимость 1 шт со скидкой (при наличии): ' + actualFinalPrice);
        let newFinalPrice = 0;
        newFinalPrice = parseInt(newQuantity) * parseInt(actualFinalPrice);
        document.getElementsByClassName('actual-price')[goods_id].innerHTML = newFinalPrice + ' р.';

        //обновляем в верстке общую сумму товаров в блоке "Детали заказа"
        let sum = document.getElementById('sum').innerHTML.replace(' p.', '');
        //console.log(sum);
        //let oneGoodsSum = document.querySelectorAll('.actual-price')[goods_id].innerHTML.replace(' p.', '');
        //console.log(oneGoodsSum);

        let newSum = parseInt(sum) + actualPrice;
        //console.log(actualPrice);
        //console.log(newSum);

        document.getElementById('sum').innerHTML = newSum + ' р.';

    }


    //функция удаления товара из Корзины
    function delFromBasket(ind_goods_id) {

        //достаем данные из хранилища и превращаем в массив
        let arrGoods = JSON.parse(localStorage.getItem('basket'));
        //console.log(arrGoods);

        //готовим переменную, чтобы записать в нее количество удаленного товара
        let quantity = 0;

        //удаляем карточку с нужным названием (если делать через БД, нужно будет брать id вместо названия)
        for (let i = 0; i < arrGoods.length; i++) {
            if(arrGoods[i]['id'] === ind_goods_id) {

                //записываем в переменную количество удаляемого товара
                quantity = arrGoods[i]['quantity'];

                //удаляем товар из массива
                arrGoods.splice(i, 1);
                //console.log(arrGoods);
            }
        }

        //если удалены все товары из Корзины
        if (arrGoods.length === 0) {

            //чистим хранилище
            localStorage.removeItem('basket');
            localStorage.removeItem('total_quantity');

            //скрываем счетчик с нулем на иконке Корзины
            document.getElementById('counter').classList.add('hidden');

            //перерисовываем Корзину
            renderBasket();

        //если после удаления в Корзине еще остались товары
        } else {

            //кодируем массив в json 
            let json = JSON.stringify(arrGoods);
            //console.log(json);

            //и перезаписываем хранилище
            localStorage.setItem('basket', json);
            //console.log(localStorage.getItem('basket'));

            //также уменьшаем счетчик на иконке Корзины, в зависимости от значения quantity удаляемого товара
            let counter = localStorage.getItem('total_quantity');
            let intCounter = parseInt(counter);
            //console.log(counter);

            //отнимаем количество удаленного товара quantity (именно через переменную, т.к. значение одного удаленного товара может быть больше 1)
            intCounter -= quantity;
            //console.log(intCounter);

            //и отражаем это в верстке на счетчике
            document.getElementById('counter').innerHTML = intCounter;

            //записываем новое значение счетчика в local storage
            localStorage.setItem('total_quantity', intCounter);

            //кодируем обратно в виде строки и перезаписываем хранилище
            localStorage.setItem('total_quantity', String(intCounter));
            //console.log(localStorage.getItem('total_quantity'));

            //перерисовываем содержимое Корзины
            renderBasket();

        }
    }

    //функция отрисовки Избранного
    function showMyFavourites() {

        clearPage();

        //отрисовываем шапку
        main.innerHTML += document.getElementById('tmpl-favourites_frame').innerHTML;

        //создаем внутри отдельный контейнер для отрисовки карточек В НАЛИЧИИ
        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);
        main.style.padding = '40px';

        //создаем внутри отдельный контейнер для отрисовки карточек НЕ В НАЛИЧИИ
        let h3 = document.createElement('h3');
        main.appendChild(h3);
        h3.innerHTML = "Временно нет в наличии:";
        h3.style.margin = "0 30px 30px 30px";
        let flexFrameContainer2 = document.createElement('div');
        flexFrameContainer2.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer2);

        //для незарегистрированных пользователей отрисовка карточек товаров через хранилище
        //если в Избранное что-то добавлено
        if (localStorage.getItem('favourites')) {

            //выстроим айдишники элементов в виде перечисления
            let arr = JSON.parse(localStorage.getItem('favourites'));
            //console.log(arr);

            let ids = '';
            if (arr.length > 1) {
                for (let j = 0; j < arr.length; j++) {
                    ids += arr[j] + ', ';
                }
                //console.log(ids);
                //console.log(ids.length);
                ids = ids.slice(0, ids.length - 2);
                //console.log(ids);
            } else {
                ids = String(arr);
            }


            let json = sendRequestGET("http://localhost/?ids=" + ids);

            let data = JSON.parse(json);
            console.log(data);
            
            flexFrameContainer.innerHTML = '';
            flexFrameContainer2.innerHTML = '';

            //рисуем данные на экран
            for (let i = 0; i < data.length; i++) {

                //товары в наличии отрисовываем в верхний блок
                if (data[i]['quantity'] > 0 ) {
                    //выводим данные шаблона
                    flexFrameContainer.innerHTML += templateCategory.replace('${goods_img}', data[i]['photo'])
                                                                    .replace('${ind_goods_id}', data[i]['id'])
                                                                    .replace('${ind_goods_id}', data[i]['id'])
                                                                    .replace('${bsk_goods_id}', data[i]['id'])
                                                                    .replace('${price}', Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                                    .replace('${crssd}', data[i]['price'])
                                                                    .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                                    .replace('${category_id}', data[i]['category_id'])
                                                                    .replace('${ind_goods_id}', data[i]['id'])
                                                                    .replace('${category_id}', data[i]['category_id'])
                                                                    .replace('${ind_goods_id}', data[i]['id'])
                                                                    .replace('${goods_title}', data[i]['name'])
                                                                    .replace('${rating}', data[i]['rating'] ? data[i]['rating'] : '0')
                                                                    .replace('${popularity}', data[i]['popularity'] ? data[i]['popularity'] : '0');
                //а закончившиеся товары в нижний
                } else {
                    //выводим данные шаблона
                    flexFrameContainer2.innerHTML += templateCategory.replace('${goods_img}', data[i]['photo'])
                                                                     .replace('${ind_goods_id}', data[i]['id'])
                                                                     .replace('${ind_goods_id}', data[i]['id'])
                                                                     .replace('${bsk_goods_id}', data[i]['id'])
                                                                     .replace('${price}', Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                                     .replace('${crssd}', data[i]['price'])
                                                                     .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                                     .replace('${category_id}', data[i]['category_id'])
                                                                     .replace('${ind_goods_id}', data[i]['id'])
                                                                     .replace('${category_id}', data[i]['category_id'])
                                                                     .replace('${ind_goods_id}', data[i]['id'])
                                                                     .replace('${goods_title}', data[i]['name'])
                                                                     .replace('${rating}', data[i]['rating'] ? data[i]['rating'] : '0')
                                                                     .replace('${popularity}', data[i]['popularity'] ? data[i]['popularity'] : '0');

                    document.getElementsByClassName('card-in-category')[i].style.opacity = '50%';
                    document.getElementsByClassName('price-line')[i].innerHTML = 'Нет в наличии';
                    document.getElementsByClassName('btn-add-to-basket')[i].classList.toggle('hidden-important');

                }
                
            }

            //делаем в отдельном цикле, раз при размещении в конце цикла выше работает избирательно
            for (let k = 0; k < document.getElementsByClassName('card-in-category').length; k++) {
                //скрываем иконки избранного на товарах и рейтинги на этой странице
                document.getElementsByClassName('favourite-on-goods')[k].style.display = 'none';
                document.getElementsByClassName('rating')[k].style.display = 'none';

                //добавляем крестик удаления из Избранного к карточке товара
                document.getElementsByClassName('delete-from-favs')[k].classList.remove('hidden');
            }

            //в отдельном цикле делаем проверку на наличие скидки, т.к. в результате манипуляций в 1м if некоторые строки были скрыты
            for (let j = 0; j < main.getElementsByClassName('sale-num').length; j++) {
    
                //скрываем зачеркнутую цену и скидку, если нулевая
                if (main.getElementsByClassName('sale-num')[j].innerHTML === '-0%') {
                    document.getElementsByClassName('crossed-out-price')[j].style.display = 'none';
                    document.getElementsByClassName('sale-num')[j].style.display = 'none';
                }
                
            }

            if (flexFrameContainer2.children.length == 0) {
                h3.innerHTML = '';
            }
            
        } else {

            //выводим надпись
            flexFrameContainer.innerHTML = "Нажимайте на иконку сердечка ваших любимых товаров, и они появятся здесь";
            //и скрываем надпись "Временно нет в наличии у второго блока"
            h3.innerHTML = '';

            //document.getElementById('bsk-goods-container').style.color = '#B566B6';
            //document.getElementById('bsk-goods-container').style.fontWeight = 'bold';

            //выделяем жирным предложение вернуться в магазин
            //document.querySelector('.back-to-store').style.fontWeight = 'bold';

        }

        
    }

    //функция удаления из Избранного
    function delFromFavourites(ind_goods_id) {
        console.log(ind_goods_id);

        //достаем данные из хранилища и превращаем в массив
        let arrFaves = JSON.parse(localStorage.getItem('favourites'));
        //console.log(arrFaves);

        console.log(arrFaves);

        if (typeof(arrFaves) === 'number') {
            let arr = [];
            arr[0] = arrFaves;
            arrFaves = arr;
        }

        //удаляем карточку с нужным id
        for (let i = 0; i < arrFaves.length; i++) {
            if(arrFaves[i] == ind_goods_id) {

                //удаляем товар из массива
                arrFaves.splice(i, 1);
                console.log('-1 в Избранном');
            }
        }

        //если удалены все товары, которых нет в наличии
        if (main.getElementsByClassName('frame__flex-wrap')[1].innerHTML = '') {
            main.querySelector('h3').style.display = 'none';
        }

        //если удалены вообще все товары из Избранного
        if (arrFaves.length === 0) {

            //чистим все хранилище
            localStorage.removeItem('favourites');
            console.log(localStorage.getItem('favourites'));

            //перерисовываем Избранное
            showMyFavourites();

        //если после удаления в Избранном еще остались товары
        } else {

            //кодируем массив в json 
            let json = JSON.stringify(arrFaves);
            //console.log(json);

            //и перезаписываем хранилище
            localStorage.setItem('favourites', json);
            //console.log(localStorage.getItem('favourites'));

            //перерисовываем содержимое Избранного
            showMyFavourites();

        }
    }

    //функция отрисовки Корзины
    function renderBasket() {

        //очищаем страницу
        clearPage();

        //сначала отрисовываем общий шаблон Корзины (без карточек выбранных товаров)
        main.innerHTML += templateBasket;
    
        main.style.padding = '40px';

        //достаем общую сумму количества товаров из хранилища
        let totalQuantity = localStorage.getItem('total_quantity');

        //если Корзина не пуста
        if (totalQuantity > 0) {

            //открываем блок с деталями заказа
            document.getElementById('order-container').classList.remove('hidden');

           //достаем из хранилища добавленные в Корзину товары в виде jsonа и сразу превращаем в массив
           let data = JSON.parse(localStorage.getItem('basket'));

           console.log(data);

           //делаем запрос в БД и сразу превращаем в массив, чтобы убедиться в наличии товара
           //let db = JSON.parse(sendRequestGET("http://localhost:80/basket/get/?goods_in_basket"));

           //console.log(db);

           //находим контейнер для отрисовки товаров внутри Корзины
           let bskContainer = document.getElementById('bsk-goods-container');

           //очищаем его
           bskContainer.innerHTML = '';

           //отрисовываем товары внутри Корзины по массиву из хранилища
           for (let i = 0; i < data.length; i++) {

            

               bskContainer.innerHTML += templateGoodsInBasket.replace('${goods_img_mini}', data[i]['photo'])
                                                              .replace('${category_id}', data[i]['category_id'])
                                                              .replace('${ind_goods_id}', data[i]['id'])
                                                              .replace('${ind_goods_id}', data[i]['id'])
                                                              .replace('${category_id}', data[i]['category_id'])
                                                              .replace('${ind_goods_id}', data[i]['id'])
                                                              .replace('${bsk_goods_title}', data[i]['name'])
                                                              .replace('${bsk_goods_id}', i)
                                                              .replace('${N}', data[i]['quantity'])
                                                              .replace('${bsk_goods_id}', i)
                                                              .replace('${price}', data[i]['quantity'] == 1 ? Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))) : data[i]['quantity'] * Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                              .replace('${crssd}', data[i]['quantity'] == 1 ? data[i]['price'] : data[i]['quantity'] * data[i]['price'])
                                                              .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                              .replace('${ind_goods_id}', data[i]['id']);
               //если скидки нет
               if (bskContainer.getElementsByClassName('actual-price')[i].innerHTML === bskContainer.getElementsByClassName('crossed-out-price')[i].innerHTML) {

                    //не показываем перечеркнутое число
                    bskContainer.getElementsByClassName('crossed-out-price')[i].style.display = 'none';
                   
               }

               //если количество товара равно единице
               if (bskContainer.getElementsByClassName('quantity-in-card')[i].innerHTML == 1) {
                    
                    //делаем неактивной кнопку "-"
                    bskContainer.getElementsByClassName('less-goods')[i].classList.add('disabled');
               }

           }

           //отрисовываем в верстке количество товара в блоке "Детали заказа"
           let quantity = document.getElementById('quantity-in-order').innerHTML;
           document.getElementById('quantity-in-order').innerHTML = String(parseInt(quantity) + parseInt(totalQuantity)) + ' шт.';

           //отрисовываем в верстке сумму товаров в блоке "Детали заказа"
           let sum = document.getElementById('sum').innerHTML;
           let allPricesArr = document.querySelectorAll('.actual-price');

           //суммируем в переменную сумму всех товаров по карточкам в Корзине
           let price = 0;
           for (let j = 0; j < allPricesArr.length; j++) {
                let innerHTML = allPricesArr[j].innerHTML;
                let value = innerHTML.replace(' p.', '');
                let intValue = parseInt(value);
                price += intValue;
           }

           document.getElementById('sum').innerHTML = String(parseInt(sum) + price) + ' р.';

        //если в Корзине ничего нет
        } else {

            //выводим надпись
            document.getElementById('bsk-goods-container').innerHTML = "Ваша корзина пуста";
            //document.getElementById('bsk-goods-container').style.color = '#B566B6';
            //document.getElementById('bsk-goods-container').style.fontWeight = 'bold';

            //выделяем жирным предложение вернуться в магазин
            document.querySelector('.back-to-store').style.fontWeight = 'bold';

            //и прячем блок с деталями заказа
            document.getElementById('order-container').classList.add('hidden');

            
        }
        
    }


    //функция очистки страницы
    function clearPage() {
        main.innerHTML = '';
    }

    //функция для отправки гет-запросов
    function sendRequestGET(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();

        //отдает данные(результат)
        return xhr.responseText;
    }

    //функция захода в ЛК после регистрации
    function signUp() {

        let name = document.getElementById('name').value;
        let e_mail = document.getElementById('e-mail').value;
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        let password2 = document.getElementById('password2').value;

        if (password != password2) {
            alert('Пароли не совпадают');
            document.getElementById('password').value = '';
            document.getElementById('password2').value = '';
        } else {

            if (name !='' || e_mail !='' || login !='' || password !='') {

                let data = "name=" + encodeURIComponent(name) + "&e_mail=" + encodeURIComponent(e_mail) + "&login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password);
    
                // создаём объкт который умеет отправлять запросы
                let requestObj = new XMLHttpRequest();

                requestObj.onreadystatechange = function() {
                    if (requestObj.readyState == XMLHttpRequest.DONE) {
                        let date = JSON.parse(requestObj.responseText);
                        console.log(date);

                        if (date["success"]) {

                            //console.log('success');

                            //скрываем форму регистрации и полупрозрачную подложку
                            document.getElementById('screen-dimmer').style.opacity = '0';
                            document.getElementById('tmpl-request').classList.add('hidden');

                            //меняем иконку в хедере
                            document.getElementById('log-in').classList.remove('log-in-icon');
                            document.getElementById('log-in').classList.add('logged-in-icon');
        
                            //main.innerHTML = templatePerson1;
                            
                            //personalaccount();
                            //меняем онклик у иконки входа в ЛК
                            persAccountSubmenuCheck();

                            //document.getElementById('pers_name').value = name;
                            //document.getElementById('pers_mail').value = e-mail;

                            let persInfoArr = {};

                            persInfoArr['name'] = name;
                            persInfoArr['e-mail'] = e_mail;

                            //console.log(persInfoArr);

                            localStorage.setItem('personal_info', JSON.stringify(persInfoArr));
                            //console.log(localStorage.getItem('personal_info'));

                            //очищаем страницу
                            clearPage();

                            renderInfo();

                        }
                        else if (date["reason"] == "already exist") {

                            alert('Уже есть пользователь с данной почтой');
        
                        }
                        else {
                            console.log(date);
                        }
                    }
                }
            
                // собираем ссылку для запроса
                let link = 'http://localhost/?createUser';
                
                //конфигурируем объект
                requestObj.open('POST', link, false);
            
                requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            
                // отправляем запрос
                requestObj.send(data);
            }
            
        }
    
    }

    
    function sendTelegram() {

        let discount = document.getElementById('discount').value;

        console.log(discount);

        // создаём объкт который умеет отправлять запросы
        let requestObj = new XMLHttpRequest();

        // собираем ссылку для запроса
        let link = 'https://api.telegram.org/bot5521315588:AAHgmnzbi4_ZoHfiMiEi19zHWXAvcd_dmS4/sendMessage?chat_id=892205925&text=' + discount;

        console.log(link);

        //конфигурируем объект
        requestObj.open('GET', link, false);
            
        // отправляем запрос
       requestObj.send();

       document.getElementById('sended').innerHTML = `<div class='title'>Ваша заявка отправлена.</div>`;

    }
    

    function renderAkc() {
        //очищаем страницу
        clearPage();

        let json = sendRequestGET("http://localhost/?sale");

        //делаем копию в хранилище для фильтрации
        localStorage.setItem('goods_on_page', json);

        //раскодируем данные
        let data = JSON.parse(json);

        main.innerHTML += document.getElementById('akc').innerHTML;

        let flexFrameContainer = document.createElement('div');
        flexFrameContainer.classList.add('frame__flex-wrap');
        main.appendChild(flexFrameContainer);
        main.style.padding = '40px';

        //создаем пустой массив, чтобы собрать данные для фильтрации
        //let goodsInfoArr = [];

        //рисуем данные на экран
        for (let i = 0; i < data.length; i++) {
            //выводим данные шаблона
            flexFrameContainer.innerHTML += templateCategory.replace('${goods_img}', data[i]['photo'])
                                                            .replace('${ind_goods_id}', data[i]['id'])
                                                            .replace('${ind_goods_id}', data[i]['id'])
                                                            .replace('${bsk_goods_id}', data[i]['id'])
                                                            .replace('${price}', Math.round(parseInt(data[i]['price']) - (parseInt(data[i]['price']) * (data[i]['sale'] ? (parseInt(data[i]['sale']) / 100) : 0 / 100))))
                                                            .replace('${crssd}', data[i]['price'])
                                                            .replace('${sale}', (data[i]['sale']) ? data[i]['sale'] : '0')
                                                            .replace('${category_id}', data[i]['category_id'])
                                                            .replace('${ind_goods_id}', data[i]['id'])
                                                            .replace('${category_id}', data[i]['category_id'])
                                                            .replace('${ind_goods_id}', data[i]['id'])
                                                            .replace('${goods_title}', data[i]['name'])
                                                            .replace('${rating}', data[i]['rating'] ? data[i]['rating'] : '0')
                                                            .replace('${popularity}', data[i]['popularity'] ? data[i]['popularity'] : '0');
        
            
        }

    }


    
    //Функция для поиска 

        function searchGoods() {

           

            //Находим поиск в html и его значение 
            let textSearch = document.getElementById('input-search-top').value;

            //Находим контейнер для поиска 
            let containerSearch = document.getElementById('container-search');

            //Находим шаблон результата поиска
            let resultSearch = document.getElementById('search-tmpl').innerHTML;

            
            if (textSearch == '') {
                //очищаем контейнер
                containerSearch.innerHTML = '';
                //убрать класс block если есть 
                document.getElementById('container-search').classList.remove('container-search-block');

                return;
                
            } else {

                //добавить класс block если нет 
                document.getElementById('container-search').classList.add('container-search-block');

                //очистить контейнер 
                
                containerSearch.innerHTML = '';
        
                //Отправляем GET заспрос на поиск товара 
                let json = sendRequestGET("http://localhost/search.php?name=" + textSearch);

                //Раскодируем JSON
                let data = JSON.parse(json);
                  
                console.log(data);

                //рисуем данные на экран
                for (let i = 0; i < 5; i++) {
                    //console.log(document.getElementsByClassName[i].getAttribute('data-ind_id'));
                    containerSearch.innerHTML += resultSearch.replace('${category_id}', data[i]["category_id"])
                                                            .replace('${ind_goods_id}', data[i]['id'])
                                                            .replace('${category_search}', data[i]["category"])
                                                            .replace('${photo_search}', data[i]['photo'])
                                                            .replace('${name_search}', data[i]['name'])
                                                            .replace('${price_search}', data[i]['price']);
                                                            
                }
          
                //убираем блок с подсказками при скликивании
                document.addEventListener('click', (e)=>{
                    if (e.target !== containerSearch && e.target !== textSearch) {
                        containerSearch.classList.remove('container-search-block');
                    }  
                })
    
            }


        }

        

    function renderDelivery() {
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('delivery').innerHTML;
    }

    function renderCont() {
        //очищаем страницу
        clearPage();

        main.innerHTML += document.getElementById('contacts').innerHTML;
    }



//script для отзывов


function sendReview() {

    let review = document.getElementById('msg').value;

    if (review !== '') {
        let tmpl_card_review = document.getElementById('tmpl_card_review');
        
        container_review+= tmpl_card_review.innerHTML.replace('${message}', review)
                                       .replace('${name}', 'Гость');
            
        document.getElementById('box__body').innerHTML = container_review;    
    
        let name = document.getElementById('name');
    
        let username = name.innerText;
    
        let data = "username=" + encodeURIComponent(username) + "&review=" + encodeURIComponent(review);
        
        // создаём объкт который умеет отправлять запросы
        let requestObj = new XMLHttpRequest();
        
        // собираем ссылку для запроса
        let link = 'http://localhost/?review';
            
        //конфигурируем объект
        requestObj.open('POST', link, false);
        
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        // отправляем запрос
        requestObj.send(data);
                
        document.getElementById('msg').value = '';
    }

}


let container_review = '';

function renderReviews() {

    //очищаем страницу
    clearPage();

    main.innerHTML += document.getElementById('tmpl_reviews').innerHTML;

    let json = sendRequestGET("http://localhost/?reviewGet");

    let data = JSON.parse(json); 

    container_review = '';

    for (let i = 0; i < data.length; i++) {

    container_review += tmpl_card_review.innerHTML.replace('${message}', data[i]['review'])
                                            .replace('${name}', data[i]['username']);
            
    document.getElementById('box__body').innerHTML = container_review;
    }

}

$(document).ready(function() {
    $('.menu-burger__header').click(function() {
        $('.menu-burger__header').toggleClass('open-menu');
        $('.catalog').toggleClass('open-menu');
        $('.nav2').toggleClass('open-menu');
        $('.category-items').toggleClass('open-menu');
    });
});

$(document).ready(function() {
    $('.catalog').click(function(event) {
        $('.menu-burger__header').removeClass('open-menu');
        $('.catalog').removeClass('open-menu');
        $('.nav2').removeClass('open-menu');
        $('.category-items').removeClass('open-menu');
    });
});
$(document).ready(()=> {
    $(document).on('click', '.nav2 div a', e => { 
        $('.menu-burger__header').removeClass('open-menu');
        $('.catalog').removeClass('open-menu');
        $('.nav2').removeClass('open-menu');
        $('.category-items').removeClass('open-menu');
    });
});
$(document).ready(()=> {
    $(document).on('click', '.category-items div', e => { 
        $('.menu-burger__header').removeClass('open-menu');
        $('.catalog').removeClass('open-menu');
        $('.nav2').removeClass('open-menu');
        $('.category-items').removeClass('open-menu');
    });
});