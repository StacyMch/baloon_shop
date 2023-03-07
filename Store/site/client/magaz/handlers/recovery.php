<?php

if( $_SERVER['REQUEST_METHOD'] == 'POST' ){
  $email = filter_input(
    INPUT_POST,
    'email',
    FILTER_VALIDATE_EMAIL 
  );

  $query = "SELECT idusers, email, pass, verified FROM users WHERE email=?";
  if ($stmt = mysqli_prepare($db, $query)) {
  
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $idusers, $emailDB, $passDB, $verifiedDB);
    mysqli_stmt_fetch($stmt);
 
    if( !$emailDB ){
      $_SESSION['message'][] = 'Неверная почта';
      header('Location: /client/magaz/?recovery'); //не уверена
      exit;
    }

    if( $verifiedDB == 'N' ){
      $_SESSION['message'][] = 'До входа подтвердите регистрацию - нажмите на ссылку в электронной почте';
      header('Location: /client/magaz');
      exit;
    }
    // генерация токена
    $recovery_token = bin2hex(random_bytes(40));
    $_SESSION['recovery_token'] = $recovery_token;
    $_SESSION['email'] = $emailDB;

    $subject = "Восстановление пароля {$_SERVER['SERVER_NAME']}";
    $msg = "Если эта не Ваша попытка восстановить пароль, проигнорируйте это сообщение. Если Вы пытаетесь восстановить пароль, нажмите на <a href=\"http://{$_SERVER['SERVER_NAME']}?recovery_token=" . $recovery_token . "\">ссылку</a> для установки нового пароля";  
    $headers = "From: no-reply@{$_SERVER['SERVER_NAME']}";
    mail($to, $subject, $msg, $headers);

    $_SESSION['message'][] = 'На почту отправлена ссылка для восстановления пароля';
    header('Location: /client/magaz/?login');
    exit; 
  }
}