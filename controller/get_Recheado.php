<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

$id_identificador = $_GET['id'];

$PedidosDAO = new PedidoModel();
$Recheados = $PedidosDAO->buscarRecheado($id_identificador);


echo json_encode($Recheados);

?>