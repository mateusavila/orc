<?php 
$return = array();
require_once "classes/database.class.php";
$sql = new Database();
$get = file_get_contents('php://input');
$g = json_decode($get, true);
// verifica se tem usccuário
$usuario = $sql->count("SELECT * FROM usuarios WHERE login='$g[login]'");
if($usuario === 1){
	$senha = hash('sha512', $g['password']);
	$senhaCorreta = $sql->count("SELECT * FROM usuarios WHERE login='$g[login]' AND senha='$senha'");
	if($senhaCorreta === 1){
		$return['status'] = 0;
		$return['message'] = "Login realizado com sucesso!";
	}else{
		$return['status'] = 2;
		$return['message'] = "Usuário Encontrado, mas senha inválida. Favor tentar novamente.";
		// $return['message'] = $senha;
	}
}else{
	$return['status'] = 1;
	$return['message'] = "Usuário não encontrado. Favor contactar o administrador do sistema.";
}
echo json_encode($return);
?>