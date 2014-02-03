<?php 
$nomes['nome'] = "Mateus Avila Isidoro";
$nomes['email'] = "mavisidoro@gmail.com";

echo json_encode(array("nome" => $nomes['nome'], "email"=>$nomes['email']));
?>