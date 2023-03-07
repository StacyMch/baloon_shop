<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

 if (User::exists()) {
   $response = [
      'success' => false,
      'reason' => 'already exist'
  ];
  print_r(json_encode($response));
    exit(0);
    
 }

User::createUser();

$response = [
   'success' => true,
   'reason' => 'created'
];

print_r(json_encode($response));