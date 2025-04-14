<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

// Habilita logs detalhados
ini_set('display_errors', 1);
error_reporting(E_ALL);


// Captura os dados (usando POST tradicional)
$status = $_POST['Status'] ?? null;
$pedidoId = $_POST['ID'] ?? null;
$itemId = $_POST['ItemID'] ?? null;
$itens = json_decode($_POST['Itens'] ?? '[]', true) ?? [];

try {
    // Verificação básica
    if (empty($status) || empty($pedidoId) || empty($itemId)) {
        throw new Exception("Status, ID ou ItemID faltando");
    }

    $PedidosDAO = new PedidoModel();
    
    // Determina o tipo do item de forma simples
    $tipoItem = '';
    if (in_array('Tradicional', $itens)) {
        $tipoItem = 'Tradicional';
    } elseif (in_array('Tradicional recheado', $itens)) {
        $tipoItem = 'Tradicional recheado';
    } elseif (in_array('Caixa de bombom', $itens)) {
        $tipoItem = 'Caixa de bombom';
    } elseif (in_array('Colher', $itens)) {
        $tipoItem = 'Colher';
    }
    
    if (empty($tipoItem)) {
        throw new Exception("Tipo de item não identificado");
    }


    
    // Atualiza no banco
    $resultado = $PedidosDAO->atualizarStatusItem( $itemId, $status, $pedidoId);
    
    if ($resultado['success']){
        echo json_encode($resultado);
    } else {
        echo json_encode($resultado);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>