<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

$id_identificador = $_GET['id'];

$PedidosDAO = new PedidoModel();
$Return = $PedidosDAO->excluirPedido($id_identificador);


echo json_encode($Return);

?>