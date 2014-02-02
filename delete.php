<?php 
$get = file_get_contents('php://input');
$g = json_decode($get, true);
$return = array();
$return['status'] = 0;
$return['message'] = $get;
echo json_encode($return);
?>