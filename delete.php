<?php 
require_once "classes/database.class.php";
$sql = new Database();
$get = file_get_contents('php://input');
$g = json_decode($get, true);
print_r($g);
for ($i=0; $i < sizeof($g); $i++) { 
	$banco = $sql->select("DELETE FROM profissionais WHERE id='".$g[$i]."'");
}
if($banco){
	$return = array();
	$return['status'] = 0;
	$return['message'] = "Exclusão funcionou";
	echo json_encode($return);
}
?>