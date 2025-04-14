<?php
header('Content-Type: application/json');
require_once("../model/PedidoDAO.php");

// Receber os parâmetros e converter strings em arrays
$id_identificador = $_GET['id'] ?? null;
$id_Tradicional = !empty($_GET['id_Tradicional']) ? explode(',', $_GET['id_Tradicional']) : [];
$id_Recheado = !empty($_GET['id_Recheado']) ? explode(',', $_GET['id_Recheado']) : [];
$id_Colher = !empty($_GET['id_Colher']) ? explode(',', $_GET['id_Colher']) : [];
$id_Caixabombom = !empty($_GET['id_Caixabombom']) ? explode(',', $_GET['id_Caixabombom']) : [];

$PedidosDAO = new PedidoModel();
$resultadoFinal = [];

$infoPedido = $PedidosDAO->consultarPedido($id_identificador);
$resultadoFinal['infoPedido'][] = $infoPedido;


// Consultar Ovos Tradicionais (se existirem)
if (!empty($id_Tradicional)) {
    $resultadoFinal['ovostradicionais'] = [];
    foreach ($id_Tradicional as $id) {
        if (!empty($id)) {
            $dados = $PedidosDAO->buscarTradicional($id_identificador, $id);
            if ($dados !== false) {
                $resultadoFinal['ovostradicionais'][] = $dados;
            }
        }
    }
}

// Consultar Ovos Recheados (se existirem)
if (!empty($id_Recheado)) {
    $resultadoFinal['ovosrecheados'] = [];
    foreach ($id_Recheado as $id) {
        if (!empty($id)) {
            $dados = $PedidosDAO->buscarRecheado($id_identificador, $id);
            if ($dados !== false) {
                $resultadoFinal['ovosrecheados'][] = $dados;
            }
        }
    }
}

// Consultar Colheres (se existirem)
if (!empty($id_Colher)) {
    $resultadoFinal['ovoscolher'] = [];
    foreach ($id_Colher as $id) {
        if (!empty($id)) {
            $dados = $PedidosDAO->buscarColher($id_identificador, $id);
            if ($dados !== false) {
                $resultadoFinal['ovoscolher'][] = $dados;
            }
        }
    }
}

// Consultar Caixas de Bombom (se existirem)
if (!empty($id_Caixabombom)) {
    $resultadoFinal['caixabombom'] = [];
    foreach ($id_Caixabombom as $id) {
        if (!empty($id)) {
            $dados = $PedidosDAO->buscarBombons($id_identificador, $id);
            if ($dados !== false) {
                $resultadoFinal['caixabombom'][] = $dados;
            }
        }
    }
}

// Retornar os resultados consolidados
echo json_encode([
    'success' => true,
    'data' => $resultadoFinal,
    'message' => 'Consulta realizada com sucesso'
]);
?>