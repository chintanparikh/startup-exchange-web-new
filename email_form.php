<?php
//http://www.freecontactform.com/email_form.php
if(isset($_POST['email'])) {

    $email_to = "midjtxc@gmail.com";
    $email_subject = $_POST['subject']." - Startup Exchange Contact Form";
 

    function died($error) {
        echo "{'result':'error', 'error_msg': '".$error."'}";
        die();
 
    }

    // validation expected data exists
    if(
        //!isset($_POST['first_name']) ||
        //!isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['comments'])) {
        died('Empty fields');       
    }
 
    //$first_name = $_POST['first_name']; // required
    //$last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    //$telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'Invaild address';
  }
  
#    $string_exp = "/^[A-Za-z .'-]+$/";
#  if(!preg_match($string_exp,$first_name)) {
#    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
#  }
# 
#  if(!preg_match($string_exp,$last_name)) {
#    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
#  }
# 
#  if(strlen($comments) < 2) {
#    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
#  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Form details below.\n\n";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    //$email_message .= "First Name: ".clean_string($first_name)."\n";
    //$email_message .= "Last Name: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    //$email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";
     
     
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
?>
