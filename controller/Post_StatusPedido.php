<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

// Habilita logs detalhados
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Arquivo de log
$logFile = 'C:\\Users\\bruno\\OneDrive\\Área de Trabalho\\Log_Erro_TCC\\status_log.txt';

// Captura os dados (usando POST tradicional)
$status = $_POST['Status'] ?? null;
$pedidoId = $_POST['ID'] ?? null;
$itemId = $_POST['ItemID'] ?? null;
$itens = json_decode($_POST['Itens'] ?? '[]', true) ?? [];

// Log inicial
file_put_contents($logFile, "\n[".date('Y-m-d H:i:s')."] INICIO - Pedido: $pedidoId, Item: $itemId\n", FILE_APPEND);
file_put_contents($logFile, "Dados recebidos: ".print_r($_POST, true)."\n", FILE_APPEND);

try {
    // Verificação básica
    if (empty($status) || empty($pedidoId) || empty($itemId)) {
        throw new Exception("Status, ID ou ItemID faltando");
    }

    $PedidosDAO = new PedidoModel();
    
    // Log antes da atualização
    file_put_contents($logFile, "Antes de atualizar - Status: $status, Pedido: $pedidoId, Item: $itemId\n", FILE_APPEND);
    
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

    // Log do tipo determinado
    file_put_contents($logFile, "Tipo determinado: $tipoItem\n", FILE_APPEND);
    
    // Atualiza no banco
    $resultado = $PedidosDAO->atualizarStatusItem( $itemId, $status, $pedidoId);
    
    // Log após atualização
    file_put_contents($logFile, "Resultado da atualização: ".($resultado ? 'SUCESSO' : 'FALHA')."\n", FILE_APPEND);
    
    if ($resultado) {
        // Verificação extra - consulta o status atual no banco
        $statusAtual = $PedidosDAO->verificarStatusAtual($tipoItem, $itemId, $pedidoId);
        file_put_contents($logFile, "Status confirmado no banco: ".$statusAtual."\n", FILE_APPEND);
        
        echo json_encode(['success' => true, 'message' => 'Status atualizado com sucesso']);
    } else {
        throw new Exception("Falha ao executar atualização no banco");
    }
} catch (Exception $e) {
    file_put_contents($logFile, "ERRO: ".$e->getMessage()."\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>