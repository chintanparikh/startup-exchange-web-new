<?php


function died($error) {
    echo "{'result':'error', 'error_msg': '".$error."'}";
    die();
}

function clean_string($string) {
  $bad = array("content-type","bcc:","to:","cc:","href");
  return str_replace($bad,"",$string);
}

//http://www.freecontactform.com/email_form.php
if($_POST['email'] === null) {
    died("Missing return address");
}
if( $_POST['comments'] === null) {
        died('Empty message');
}

$email_to = "midjtxc@gmail.com"; //TODO
$email_subject = "Startup Exchange Contact Form";
$email_from = $_POST['email'];
$comments = $_POST['comments'];

$error_message = "";
$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
if(!preg_match($email_exp,$email_from)) {
    died('Invaild address');
}

$email_message = "Form details below.\n\n";
$email_message .= "From: ".clean_string($email_from)."\n";
$email_message .= "Message: ".clean_string($comments)."\n";
 
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
$result = mail($email_to, $email_subject, $email_message, $headers);  

if($result){
    echo "{'result': 'success'}";
}else{
    echo "{'result':'error', 'error_msg': 'failed to send'}";
}
