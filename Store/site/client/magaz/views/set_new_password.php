<h1>Восстановление пароля: шаг 2 из 2</h1>
<form method="POST" >
  <div class="row">
    <label for="pass1">Пароль:</label>
    <input type="password" name="pass1" id="pass1" />
  </div>
  <div class="row">
    <label for="pass2">Повтор пароля:</label>
    <input type="password" name="pass2" id="pass2" />
  </div>
  <div class="row">
    <a href="/">Вход</a>
  </div>
  <div class="row">
    <input type="submit" />
  </div>  
</form>

<head>
        <meta charset="utf-8" />
        <title>Сброс и задание пароля </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
        <meta content="Coderthemes" name="author" />

        <!-- App favicon -->
        <link rel="shortcut icon" href="assets/images/favicon.ico">

        <!-- Theme Config Js -->
        <script src="assets/js/hyper-config.js"></script>

        <!-- App css -->
        <link href="assets/css/app-saas.min.css" rel="stylesheet" type="text/css" id="app-style" />

        <!-- Icons css -->
        <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    </head>

    <body class="authentication-bg">

        <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xxl-4 col-lg-5">
                        <div class="card">
                            <!-- Logo -->
                            <div class="card-header py-4 text-center bg-primary">
                                <a href="index.html">
                                  <span><img src="assets/images/logo2.png" alt="logo" height="100"></span>
                                </a>
                            </div>
                            
                            <div class="card-body p-4">
                                
                                <div class="text-center w-75 m-auto">
                                    <h4 class="text-dark-50 text-center mt-0 fw-bold">Задайте новый пароль</h4>
                                    <p class="text-muted mb-4">Введите новый пароль дважды для восстановления.</p>
                                </div>

                                <form method="POST">

                                <div class="mb-3">
                                        <label for="password" class="form-label">Пароль</label>
                                        <div class="input-group input-group-merge">
                                            <input type="password" name="pass1" id="password" class="form-control" placeholder="Введит ваш пароль">
                                            <div class="input-group-text" data-password="false">
                                                <span class="password-eye"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="password2" class="form-label">Повторите пароль</label>
                                        <div class="input-group input-group-merge">
                                            <input type="password" name="pass2" id="password" class="form-control" placeholder="Введит ваш пароль еще раз">
                                            <div class="input-group-text" data-password="false">
                                                <span class="password-eye"></span>
                                            </div>
                                        </div>
                                    </div>                             

                                    <div class="mb-0 text-center">
                                        <button class="btn btn-primary" type="submit">Задать пароль</button>
                                    </div>
                                </form>
                            </div> <!-- end card-body-->
                        </div>
                        <!-- end card -->

                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <p class="text-muted">Перейти на страницу <a href="/" class="text-muted ms-1"><b>Авторизация</b></a></p>
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->

                    </div> <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end page -->

        <footer class="footer footer-alt">
            <script>document.write(new Date().getFullYear())</script> админка
        </footer>
        <!-- Vendor js -->
        <script src="assets/js/vendor.min.js"></script>
        
        <!-- App js -->
        <script src="assets/js/app.min.js"></script>

    </body>
</html>

