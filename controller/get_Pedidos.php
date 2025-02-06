<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

$PedidosDAO = new PedidoModel();
$Pedidos = $PedidosDAO->buscarPedidosFormatado();


echo json_encode($Pedidos);

?>