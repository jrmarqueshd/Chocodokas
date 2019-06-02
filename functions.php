<?php     
    $to_email = 'jrmarqueshd@gmail.com';
    $subject = 'Testing PHP Mail';
    $message = 'This mail is sent using the PHP mail function';
    $headers = 'site@chocodokas.com.br';
    mail($to_email,$subject,$message,$headers);