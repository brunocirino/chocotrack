<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

$id_identificador = $_GET['id'];
$id_linha = $_GET['id_linha'];

$PedidosDAO = new PedidoModel();
$Bombons = $PedidosDAO->buscarBombons($id_identificador, $id_linha);


echo json_encode($Bombons);

?>