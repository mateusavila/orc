<?php 
require_once "classes/database.class.php";
$sql = new Database();
$get = file_get_contents('php://input');
$g = json_decode($get, true);
// $banco = $sql->select("INSERT INTO profissionais (titulo, email) VALUES ('".$g['nome']."', '".$g['email']."')");
$banco = $sql->select("UPDATE profissionais SET titulo='".$g['nome']."', email='".$g['email']."' WHERE id='".$_GET['id']."'");
if($banco){
	$return = array();
	$return['status'] = 0;
	$return['message'] = "Registro foi salvo com sucesso!";
	echo json_encode($return);
}
?>