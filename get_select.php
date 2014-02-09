<?php 
// $nomes = array();
// require_once "classes/database.class.php";
// $sql = new Database();
// $get = file_get_contents('php://input');
// $g = json_decode($get, true);
// if($_GET['action'] === "profissional"){
// 	$banco = $sql->select("SELECT id, email, titulo FROM profissionais WHERE id='$_GET[id]'");
// }elseif($_GET['action'] === "tarefa"){
// 	$banco = $sql->select("SELECT * FROM tarefas");
// }

// if($banco){
// 	$ind = 0;
// 	while($row = $sql->fetch_array($banco)){
// 		$nomes['id'] = $row['id'];
// 		$nomes['nome'] = $row['titulo'];
// 		$nomes['email'] = $row['email'];
// 		$ind++;
// 	}
// 	echo json_encode($nomes);
// }

$return = array();
$return['opt'][0]['value'] = "Mateus Avila";
$return['opt'][0]['text'] = "Mateus";
$return['opt'][1]['value'] = "Marcos Avila";
$return['opt'][1]['text'] = "Marcos";
$return['opt'][2]['value'] = "Lucas Avila";
$return['opt'][2]['text'] = "Lucas";
echo json_encode($return);
?>