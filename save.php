<?php 
require_once "classes/database.class.php";
$sql = new Database();
$get = file_get_contents('php://input');
$g = json_decode($get, true);
$banco = $sql->select("INSERT INTO profissionais (titulo, email) VALUES ('".$g['nome']."', '".$g['email']."')");
if($banco){
	$return = array();
	$return['status'] = 0;
	$return['message'] = "Registro foi salvo com sucesso!";
	$return['message_save'] = "Registro foi salvo com sucesso!";
	echo json_encode($return);
}
?>