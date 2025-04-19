<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Verifica se os parâmetros foram recebidos
if (!isset($_POST['tipo_item'], $_POST['id_item'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Parâmetros faltando']);
    exit;
}

$tipo_item = $_POST['tipo_item'];
$id_item = (int)$_POST['id_item'];
$id_identificador = (int)$_POST['id_identificador'];

// Validações adicionais
if ($id_item <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID inválido']);
    exit;
}

$tipos_permitidos = ['ovostradicionais', 'ovosrecheados', 'ovoscolher', 'caixabombom'];
if (!in_array($tipo_item, $tipos_permitidos)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tipo de item inválido']);
    exit;
}

$PedidosDAO = new PedidoModel();
$resultado = null;

switch ($tipo_item) {
    case 'ovostradicionais':
        $resultado = $PedidosDAO->ExcluirTradicional($id_item, $id_identificador);
        break;
    case 'ovosrecheados':
        $resultado = $PedidosDAO->ExcluirRecheado($id_item, $id_identificador);
        break;
    case 'ovoscolher':
        $resultado = $PedidosDAO->ExcluirColher($id_item, $id_identificador);
        break;
    case 'caixabombom':
        $resultado = $PedidosDAO->ExcluirCaixabombom($id_item, $id_identificador);
        break;
}

// Verifica se a exclusão foi bem-sucedida
if ($resultado && $resultado['success']) {
    echo json_encode(['success' => true, 'message' => 'Item excluído com sucesso']);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'success' => false,
        'message' => $resultado['message'] ?? 'Falha ao excluir item'
    ]);
}
?>