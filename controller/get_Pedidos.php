<?php
header('Content-Type: application/json');

try {
    require_once("../model/PedidoDAO.php");

    $PedidosDAO = new PedidoModel();
    $Pedidos = $PedidosDAO->buscarPedidosFormatado();

    if ($Pedidos === false) {
        throw new Exception("Erro ao buscar pedidos.");
    }

    echo json_encode($Pedidos);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>