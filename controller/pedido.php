<?php
require_once "../model/PedidoDAO.php";
require_once "../model/ProdutoDAO.php";

$data = json_decode(file_get_contents("php://input"), true);

// Log para depuração
error_log("Dados recebidos: " . print_r($data, true));

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $pedidoModel = new PedidoModel();

    $id_identificador_bruto = $pedidoModel->consultarID_identificador();

    $id_identificador = $id_identificador_bruto + 1;

    foreach ($data["produto"] as $index => $produto) {
        $nome_produto = $produto['produto'];
        $qtd_produto = $data["qtd"]; // Captura a quantidade do mesmo índice
    
        // Cadastra o pedido na tabela principal para cada produto
        $id_pedido = $pedidoModel->cadastrarPedido(
            $data["nome"], 
            $data["telefone"], 
            $data["data"], 
            $data["valor"], 
            $qtd_produto,  // Passando a quantidade correta
            $nome_produto,    
            $id_identificador   // Passando apenas um produto
        );
    }
    


    if ($id_identificador) {
        $produtoModel = new ProdutoModel();

        if (!empty($data["produto"])) {
            foreach ($data["produto"] as $produto) {
                // Log do produto processado
                error_log("Processando produto: " . print_r($produto, true));

                switch ($produto["produto"]) { 
                    case "Tradicional":
                        $produtoModel->cadastrarOvoTradicional(
                            $id_identificador, 
                            $produto["casca_1"], 
                            $produto["tipo_chocolate_1"], 
                            $produto["casca_2"], 
                            $produto["tipo_chocolate_2"], 
                            $produto["peso"]
                        );
                        break;

                    case "Tradicional recheado":
                        $produtoModel->cadastrarOvoRecheado(
                            $id_identificador, 
                            $produto["casca_1"], 
                            $produto["recheio_1"], 
                            $produto["tipo_chocolate_1"], 
                            $produto["casca_2"], 
                            $produto["recheio_2"], 
                            $produto["tipo_chocolate_2"], 
                            $produto["peso"]
                        );
                        break;

                    case "Colher":
                        $produtoModel->cadastrarOvoColher(
                            $id_identificador, 
                            $produto["casca_1"], 
                            $produto["recheio_1"], 
                            $produto["tipo_chocolate_1"], 
                            $produto["peso"]
                        );
                        break;

                    case "Caixa de bombom":
                        
                        $produtoModel->cadastrarCaixaBombom(
                            $id_identificador, 
                            $produto["tpBombom"], 
                            $produto["tpRecheio"], 
                            $produto["sabor"], 
                            $produto["Recheio"], 
                            $produto["peso"]
                        );
                        break;

                    default:
                        error_log("Produto desconhecido: " . print_r($produto, true));
                        break;
                }
            }
        }

        // Resposta JSON de sucesso
        header('Content-Type: application/json');
        echo json_encode(["status" => "success", "message" => "Pedido cadastrado com sucesso!"]);
    } else {
        // Resposta JSON de erro
        header('Content-Type: application/json');
        echo json_encode(["status" => "error", "message" => "Erro ao cadastrar pedido"]);
    }
}
?>
