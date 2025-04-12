<?php
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DB_NAME', 'chocotrack');

class PedidoModel {
    private $banco;
    
    public function __construct() {
        $this->banco = new PDO('mysql:host=' . HOST . ';dbname=' . DB_NAME, USER, PASSWORD);
        $this->banco->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function cadastrarPedido($nome, $telefone, $data, $valor, $qtd_prod, $itens, $id_identificador) {
        $sql = "INSERT INTO pedido (nome, telefone, data, valor, qtd_prod, item, id_identificador) VALUES (:nome, :telefone, :data, :valor, :qtd_prod, :itens, :id_identificador)";
        $stmt = $this->banco->prepare($sql);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":telefone", $telefone);
        $stmt->bindParam(":data", $data);
        $stmt->bindParam(":valor", $valor);
        $stmt->bindParam(":qtd_prod", $qtd_prod);
        $stmt->bindParam(":itens", $itens);
        $stmt->bindParam(":id_identificador", $id_identificador);

        if ($stmt->execute()) {
            return $this->banco->lastInsertId(); // Retorna o ID do pedido inserido
        }
        return false;
    }

    public function consultarID_identificador() {
        $sql = "SELECT id_identificador FROM pedido ORDER BY id_identificador DESC LIMIT 1";
        $stmt = $this->banco->prepare($sql);
        
        if ($stmt->execute()) {
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC); // Pega o primeiro resultado (o mais recente)
            return $resultado ? $resultado['id_identificador'] : false;
        }
    
        return false;
    }
    
    public function buscarPedidos(){
        $sql = "SELECT * FROM pedido";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarPedidosFormatado() {
        $sql = "SELECT 
                p.id_identificador AS id, 
                p.nome, 
                p.telefone,
                p.data,
                p.valor,
                p.observacao,
                GROUP_CONCAT(p.item ORDER BY p.id SEPARATOR ', ') AS itens,
    
                (SELECT GROUP_CONCAT(ot.id ORDER BY ot.id SEPARATOR ', ') 
                FROM ovostradicionais ot 
                WHERE ot.id_pedido = p.id_identificador) AS id_ovostradicionais,
    
                (SELECT GROUP_CONCAT(ot.status ORDER BY ot.id SEPARATOR ', ') 
                FROM ovostradicionais ot 
                WHERE ot.id_pedido = p.id_identificador) AS status_ovostradicionais,
    
                (SELECT GROUP_CONCAT(orc.id ORDER BY orc.id SEPARATOR ', ') 
                FROM ovosrecheados orc 
                WHERE orc.id_pedido = p.id_identificador) AS id_ovosrecheados,
    
                (SELECT GROUP_CONCAT(orc.status ORDER BY orc.id SEPARATOR ', ') 
                FROM ovosrecheados orc 
                WHERE orc.id_pedido = p.id_identificador) AS status_ovosrecheados,
    
                (SELECT GROUP_CONCAT(cb.id ORDER BY cb.id SEPARATOR ', ') 
                FROM caixabombom cb 
                WHERE cb.id_pedido = p.id_identificador) AS id_caixabombom,
    
                (SELECT GROUP_CONCAT(cb.status ORDER BY cb.id SEPARATOR ', ') 
                FROM caixabombom cb 
                WHERE cb.id_pedido = p.id_identificador) AS status_caixabombom,
    
                (SELECT GROUP_CONCAT(oc.id ORDER BY oc.id SEPARATOR ', ') 
                FROM ovoscolher oc 
                WHERE oc.id_pedido = p.id_identificador) AS id_ovoscolher,
    
                (SELECT GROUP_CONCAT(oc.status ORDER BY oc.id SEPARATOR ', ') 
                FROM ovoscolher oc 
                WHERE oc.id_pedido = p.id_identificador) AS status_ovoscolher
    
            FROM pedido p
            GROUP BY p.id_identificador, p.nome;";
    
        $stmt = $this->banco->prepare($sql);
    
        if ($stmt->execute()) {
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            // Convertendo os itens, IDs e status para arrays
            foreach ($resultado as &$pedido) {
                $pedido['itens'] = explode(', ', $pedido['itens']);
                $pedido['id_ovostradicionais'] = explode(', ', $pedido['id_ovostradicionais']);
                $pedido['status_ovostradicionais'] = explode(', ', $pedido['status_ovostradicionais']);
                $pedido['id_ovosrecheados'] = explode(', ', $pedido['id_ovosrecheados']);
                $pedido['status_ovosrecheados'] = explode(', ', $pedido['status_ovosrecheados']);
                $pedido['id_caixabombom'] = explode(', ', $pedido['id_caixabombom']);
                $pedido['status_caixabombom'] = explode(', ', $pedido['status_caixabombom']);
                $pedido['id_ovoscolher'] = explode(', ', $pedido['id_ovoscolher']);
                $pedido['status_ovoscolher'] = explode(', ', $pedido['status_ovoscolher']);
            }
    
            return $resultado;
        }
    
        return false;
    }
    
    public function consultarPedidosDashboar(){
            $sql = "-- Tradicional
                SELECT DISTINCT 
                    p.id_identificador,
                    p.nome,
                    p.telefone,
                    p.data,
                    p.valor,
                    p.item,
                    p.qtd_prod,
                    ot.casca1,
                    NULL AS recheio1,
                    ot.tpChocolate1,
                    ot.casca2,
                    NULL AS recheio2,
                    ot.tpChocolate2,
                    ot.peso,
                    ot.status
                FROM pedido p
                LEFT JOIN ovostradicionais ot ON ot.id_pedido = p.id_identificador
                WHERE p.item = 'Tradicional'

                UNION ALL

                -- Tradicional Recheado
                SELECT DISTINCT 
                    p.id_identificador,
                    p.nome,
                    p.telefone,
                    p.data,
                    p.valor,
                    p.item,
                    p.qtd_prod,
                    orc.casca1,
                    orc.recheio1,
                    orc.tpchocolate1,
                    orc.casca2,
                    orc.recheio1, -- Você repetiu aqui, mas mantive como está
                    orc.tpchocolate2,
                    orc.peso,
                    orc.status
                FROM pedido p
                LEFT JOIN ovosrecheados orc ON orc.id_pedido = p.id_identificador
                WHERE p.item = 'Tradicional recheado'

                UNION ALL

                -- Caixa de Bombom
                SELECT DISTINCT 
                    p.id_identificador,
                    p.nome,
                    p.telefone,
                    p.data,
                    p.valor,
                    p.item,
                    p.qtd_prod,
                    cb.tpBombom AS casca1,
                    cb.tpRecheio AS recheio1,
                    cb.sabor AS tpChocolate1,
                    NULL AS casca2,
                    cb.Recheio AS recheio2,
                    NULL AS tpChocolate2,
                    cb.peso,
                    cb.status
                FROM pedido p
                LEFT JOIN caixabombom cb ON cb.id_pedido = p.id_identificador
                WHERE p.item = 'Caixa de bombom'

                UNION ALL

                -- Ovo de Colher
                SELECT DISTINCT 
                    p.id_identificador,
                    p.nome,
                    p.telefone,
                    p.data,
                    p.valor,
                    p.item,
                    p.qtd_prod,
                    oc.casca1,
                    oc.recheio1,
                    oc.tpchocolate1,
                    NULL AS casca2,
                    NULL AS recheio2,
                    NULL AS tpChocolate2,
                    oc.peso,
                    oc.status
                FROM pedido p
                LEFT JOIN ovoscolher oc ON oc.id_pedido = p.id_identificador
                WHERE p.item = 'Colher';";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function consultarPedido($id_identificador){
        $sql = "SELECT * FROM pedido WHERE id_identificador = ?";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute([$id_identificador])){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarBombons($id_identificador, $id_linha){
        $sql = "SELECT * FROM caixabombom WHERE id_pedido = ? AND id = ?";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute([$id_identificador, $id_linha])){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarColher($id_identificador, $id_linha){
        $sql = "SELECT * FROM ovoscolher WHERE id_pedido = ? AND id = ?";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute([$id_identificador, $id_linha])){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarTradicional($id_identificador, $id_linha){
        $sql = "SELECT * FROM ovostradicionais WHERE id_pedido = ? AND id = ?";
        $stmt = $this->banco->prepare($sql);
    
        if ($stmt->execute([$id_identificador, $id_linha])) {
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }
    
        return false;
    }
    
    public function buscarRecheado($id_identificador, $id_linha){
        $sql = "SELECT * FROM ovosrecheados WHERE id_pedido = ? AND id = ?";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute([$id_identificador, $id_linha])){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function atualizarStatusItem($itemId, $novoStatus, $pedidoId) {
        // Define as tabelas possíveis
        $tabelas = ['ovostradicionais', 'ovosrecheados', 'caixabombom', 'ovoscolher'];
        
        foreach ($tabelas as $tabela) {
            // Verifica se o item existe nesta tabela
            $sqlVerifica = "SELECT id FROM $tabela WHERE id_pedido = :id_pedido AND id = :itemId";
            $stmtVerifica = $this->banco->prepare($sqlVerifica);
            $stmtVerifica->bindParam(':id_pedido', $pedidoId, PDO::PARAM_INT);
            $stmtVerifica->bindParam(':itemId', $itemId, PDO::PARAM_INT);
            
            if ($stmtVerifica->execute()) {
                $resultado = $stmtVerifica->fetch(PDO::FETCH_ASSOC);
                
                if ($resultado) {
                    // Log para depuração
                    error_log("Item encontrado na tabela $tabela para o pedido $pedidoId e ID $itemId.");
                    
                    // Atualiza o status
                    $sqlUpdate = "UPDATE $tabela SET status = :status WHERE id_pedido = :id_pedido AND id = :itemId";
                    $stmtUpdate = $this->banco->prepare($sqlUpdate);
                    $stmtUpdate->bindParam(':status', $novoStatus, PDO::PARAM_STR);
                    $stmtUpdate->bindParam(':id_pedido', $pedidoId, PDO::PARAM_INT);
                    $stmtUpdate->bindParam(':itemId', $itemId, PDO::PARAM_INT);
                    
                    if ($stmtUpdate->execute()) {
                        error_log("Status atualizado com sucesso na tabela $tabela.");
                        return ['success' => true, 'message' => "Status atualizado na tabela $tabela."];
                    } else {
                        error_log("Erro ao atualizar o status na tabela $tabela.");
                        return ['success' => false, 'message' => "Erro ao atualizar o status na tabela $tabela."];
                    }
                } else {
                    // Log para depuração
                    error_log("Item NÃO encontrado na tabela $tabela para o pedido $pedidoId e ID $itemId.");
                }
            } else {
                error_log("Erro na consulta SELECT na tabela $tabela.");
            }
        }
    
        // Se não encontrou em nenhuma tabela, retorna erro
        error_log("Item não encontrado em nenhuma tabela para o pedido $pedidoId e ID $itemId.");
        return ['success' => false, 'message' => "Item não encontrado em nenhuma tabela para o pedido $pedidoId e ID $itemId."];
    }
    
    
    

    public function verificarStatusAtual($tipoItem, $itemId, $pedidoId) {
        $tabelas = [
            'Tradicional' => 'ovostradicionais',
            'Tradicional recheado' => 'ovosrecheados',
            'Caixa de bombom' => 'caixabombom',
            'Ovo de colher' => 'ovoscolher'
        ];
        
        if (!isset($tabelas[$tipoItem])) {
            return "Tipo inválido";
        }
        
        $sql = "SELECT status FROM ".$tabelas[$tipoItem]." 
                WHERE id_pedido = :pedidoId AND id = :itemId";
        $stmt = $this->banco->prepare($sql);
        $stmt->bindParam(':pedidoId', $pedidoId);
        $stmt->bindParam(':itemId', $itemId);
        $stmt->execute();
        
        return $stmt->fetchColumn() ?: "Não encontrado";
    }


    
}
?>
