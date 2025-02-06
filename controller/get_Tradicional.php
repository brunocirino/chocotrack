<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

$id_identificador = $_GET['id'];

$PedidosDAO = new PedidoModel();
$Tradicionais = $PedidosDAO->buscarTradicional($id_identificador );


echo json_encode($Tradicionais);

?>