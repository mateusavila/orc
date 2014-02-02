<?php 
$nomes = array();
$nomes['tarefas'][0]['id'] = 1;
$nomes['tarefas'][0]['nome'] = "Mateus Avila Isidoro";
$nomes['tarefas'][1]['id'] = 2;
$nomes['tarefas'][1]['nome'] = "Carolina Fontoura Cartana";
$nomes['tarefas'][2]['id'] = 5;
$nomes['tarefas'][2]['nome'] = "José da Silva";
$nomes['action'] = $_GET['action'];
echo json_encode($nomes);
?>