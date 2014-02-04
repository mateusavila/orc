<?php 
$nomes = array();
$nomes['tarefas'] = array();
require_once "classes/database.class.php";
$sql = new Database();
$get = file_get_contents('php://input');
$g = json_decode($get, true);
if($_GET['action'] === "profissional"){
	$banco = $sql->select("SELECT id, email, titulo FROM profissionais");
	$totalPages = $sql->count("SELECT id FROM profissionais");
}elseif($_GET['action'] === "tarefa"){
	$banco = $sql->select("SELECT * FROM tarefas");
}


if($banco){
	$ind = 0;
	while($row = $sql->fetch_array($banco)){
		$nomes['tarefas'][$ind]['id'] = $row['id'];
		$nomes['tarefas'][$ind]['nome'] = $row['titulo'];
		$nomes['tarefas'][$ind]['email'] = $row['email'];
		$ind++;
	} 
	$nomes['totalPages'] = $totalPages;
	echo json_encode($nomes);
}
?>