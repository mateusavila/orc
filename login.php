<?php 
$get = file_get_contents('php://input');
$g = json_decode($get, true);
$return = array();
$return['status'] = 0;
$return['message'] = "Login realizado com sucesso";
$return['login'] = $g['login'];
$return['senha'] = $g['password'];
echo json_encode($return);
?>