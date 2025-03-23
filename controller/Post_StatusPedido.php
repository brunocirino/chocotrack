<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

// Captura os dados da requisição
$status = $_GET['Status'] ?? null;
$pedidoId = $_GET['ID'] ?? null;
$itemId = $_GET['ItemID'] ?? null;
$itensJson = $_GET['Itens'] ?? '[]'; // Se não existir, assume um JSON vazio

// Se $itensJson for um array, converte para JSON
if (is_array($itensJson)) {
    $itensJson = json_encode($itensJson);
}

// Decodificar Itens (de JSON para array)
$itens = json_decode($itensJson, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    // Se houver erro na decodificação, loga o erro e define $itens como array vazio
    logError("Erro ao decodificar JSON de Itens: " . json_last_error_msg());
    $itens = [];
}

// Caminho do log de erros
$logFile = 'C:\\Users\\bruno\\OneDrive\\Área de Trabalho\\Log_Erro_TCC\\Log_Erro_TCC.txt';

// Registrar logs para depuração
logError("Status: $status");
logError("Pedido ID: $pedidoId");
logError("Item ID: $itemId");
logError("Itens: " . json_encode($itens));

try {
    // Verifica se todos os parâmetros necessários foram fornecidos
    if (empty($status) || empty($pedidoId) || empty($itemId)) {
        throw new Exception("Parâmetros inválidos na requisição.");
    }

    // Determina o tipo do item com base no índice do ItemID
    $tipoItem = '';
    if (isset($itens[0]) && $itens[0] === 'Tradicional') {
        $tipoItem = 'Tradicional';
    } elseif (isset($itens[1]) && $itens[1] === 'Tradicional recheado') {
        $tipoItem = 'Tradicional recheado';
    } elseif (isset($itens[2]) && $itens[2] === 'Caixa de bombom') {
        $tipoItem = 'Caixa de bombom';
    } elseif (isset($itens[3]) && $itens[3] === 'Ovo de colher') {
        $tipoItem = 'Ovo de colher';
    } else {
        throw new Exception("Tipo de item não encontrado para o ID: $itemId");
    }

    // Criar instância do DAO
    $PedidosDAO = new PedidoModel();

    // Atualiza o status do item
    $resultado = $PedidosDAO->atualizarStatusItem($tipoItem, $itemId, $status, $pedidoId);

    if ($resultado) {
        // Retorna uma resposta de sucesso
        echo json_encode(['success' => true, 'message' => 'Status atualizado com sucesso']);
    } else {
        throw new Exception("Erro ao atualizar o status do item.");
    }
} catch (Exception $e) {
    // Loga o erro e retorna uma resposta de erro
    logError("Erro: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

// Função para registrar logs de erro
function logError($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message" . PHP_EOL, FILE_APPEND);
}
?>