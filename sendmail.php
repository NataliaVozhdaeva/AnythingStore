<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail -> charset = 'UTF-8';
$mail -> setLanguage ('ru', 'phpmailer/language/');
$mail -> isHTML(true);

$mail -> setFrom('store', 'order');
$mail -> addAddress ('elf_19@mail.ru');
$mail -> Subject('You have a new order');

$good = $_POST['goodsName'];

$body = '<h1>New order</h1>';

if(trim(!empty($_POST['name']))){
  $body = '<p> Name:'.$_Post['name'].'<p>'
};

if(trim(!empty($_POST['tel']))){
  $body = '<p> Tel:'.$_Post['tel'].'<p>'
};

$mail -> Body = $body;

if(!$mail -> send()){
  $message = 'error';
} else {
  $message = 'we call you soon!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response)


?>