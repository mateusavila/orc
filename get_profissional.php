<?php 
$nomes = array();
$nomes['nomes'][0]['id'] = 1;
$nomes['nomes'][0]['nome'] = "Mateus Avila Isidoro";
$nomes['nomes'][1]['id'] = 2;
$nomes['nomes'][1]['nome'] = "Carolina Fontoura Cartana";
$nomes['nomes'][2]['id'] = 5;
$nomes['nomes'][2]['nome'] = "José da Silva";
echo json_encode($nomes);
?>