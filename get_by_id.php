<?php 
$nomes['nome'] = array();
$nomes['nome'][1] = "Mateus Avila Isidoro";
$nomes['nome'][2] = "Carolina Fontoura Cartana";
$nomes['nome'][5] = "José da Silva";

echo json_encode(array("nome" => $_GET['id']));
?>