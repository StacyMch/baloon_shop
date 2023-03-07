<!DOCTYPE html>
<html lang="ru">

    <head>
        <meta charset="utf-8" />
        <title>Страница регистрации</title>
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
                            <!-- Logo-->
                            <div class="card-header py-4 text-center bg-primary">
                                <a href="index.html">
                                    <span><img src="assets/images/logo2.png" alt="logo" height="100"></span>
                                </a>
                            </div>

                            <div class="card-body p-4">
                                
                                <div class="text-center w-75 m-auto">
                                    <h4 class="text-dark-50 text-center mt-0 fw-bold">Зарегистрировать аккаунт</h4>
                                    <p class="text-muted mb-4">Получите доступ к сайту, создав себе аккаунт.</p>
                                </div>

                                <form method="POST" action="?signup">

                                    <!-- имя если нужно
                                      <div class="mb-3">
                                        <label for="fullname" class="form-label">Имя</label>
                                        <input class="form-control" type="text" id="fullname" placeholder="Enter your name" required>
                                    </div> -->

                                    <div class="mb-3">
                                        <label for="emailaddress" class="form-label">Ваша почта</label>
                                        <input class="form-control" type="email" name="email" autocomplete="on" id="emailaddress" required placeholder="Введите почту">
                                    </div>

                                    <div class="mb-3">
                                        <label for="password" class="form-label">Пароль</label>
                                        <div class="input-group input-group-merge">
                                            <input type="password" name="pass1" id="password" class="form-control" placeholder="Введите пароль">
                                            <div class="input-group-text" data-password="false">
                                                <span class="password-eye"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="password2" class="form-label">Повторите пароль</label>
                                        <div class="input-group input-group-merge">
                                            <input type="password" name="pass2" id="password" class="form-control" placeholder="Введите пароль еще раз">
                                            <div class="input-group-text" data-password="false">
                                                <span class="password-eye"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- <div class="mb-3">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="checkbox-signup">
                                            <label class="form-check-label" for="checkbox-signup">I accept <a href="#" class="text-muted">Terms and Conditions</a></label>
                                        </div>
                                    </div> -->

                                    <div class="mb-3 text-center">
                                        <button class="btn btn-primary" type="submit"> Отправить </button>
                                    </div>

                                </form>
                            </div> <!-- end card-body -->
                        </div>
                        <!-- end card -->

                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <p class="text-muted">Уже есть аккаунт? <a href="/client/magaz/?login" class="text-muted ms-1"><b>Войти</b></a></p>
                            </div> <!-- end col-->
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
