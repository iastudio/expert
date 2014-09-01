<?php
  // Скрипт посвещается Роману, который уехал в Турцию.
  $json = $_POST[data];
  $arr = (array)(json_decode($json));
  if($arr["secret"] == "2f7d9f0d0acf89a8f6a57d79f0f7d475")
  {
    $email = "ivan@iastudio.ru";
    $subject = "Сообщение с сайта Центр Экспертизы";
    $header = "Content-type: text/html; charset=utf-8; \r\n";

    $message = "Новое сообщение с сайта Центр Экспертизы<br>" .
    "<b>Имя: </b>" . $arr["name"] . "<br>" .
    "<b>Телефон: </b>" . $arr["tel"];

    $send = mail($email, $subject, $message, $header);
    echo ( $send ? "All ok" : "Error" );
  }
?>
