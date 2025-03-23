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

    public function cadastrarPedido($nome, $telefone, $data, $qtd_prod, $itens, $id_identificador) {
        $sql = "INSERT INTO pedido (nome, telefone, data, qtd_prod, item, id_identificador) VALUES (:nome, :telefone, :data, :qtd_prod, :itens, :id_identificador)";
        $stmt = $this->banco->prepare($sql);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":telefone", $telefone);
        $stmt->bindParam(":data", $data);
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
    

    public function consultarPedido($id_identificador){
        $sql = "SELECT * FROM pedido WHERE id_identificador";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarBombons($id_identificador){
        $sql = "SELECT * FROM caixabombom WHERE id_pedido";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarColher($id_identificador){
        $sql = "SELECT * FROM ovoscolher WHERE id_pedido";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarTradicional($id_identificador){
        $sql = "SELECT * FROM ovostradicionais WHERE id_pedido";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function buscarRecheado($id_identificador){
        $sql = "SELECT * FROM ovosrecheados WHERE id_pedido";
        $stmt = $this->banco->prepare($sql);

        if ($stmt->execute()){
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }

        return false;
    }

    public function atualizarStatusItem($tipoItem, $itemId, $novoStatus, $pedidoId) {
        // Define a tabela correta com base no tipo do item
        $tabela = '';
        switch ($tipoItem) {
            case 'Tradicional':
                $tabela = 'ovostradicionais';
                break;
            case 'Tradicional recheado':
                $tabela = 'ovosrecheados';
                break;
            case 'Caixa de bombom':
                $tabela = 'caixabombom';
                break;
            case 'Ovo de colher':
                $tabela = 'ovoscolher';
                break;
            default:
                throw new Exception("Tipo de item inválido: $tipoItem");
        }
    
        // Prepara a query para atualizar o status
        $sql = "UPDATE $tabela SET status = :status WHERE id_pedido = :id_pedido AND id = :itemId";
        $stmt = $this->banco->prepare($sql);
    
        // Executa a query
        $stmt->bindParam(':status', $novoStatus);
        $stmt->bindParam(':id_pedido', $pedidoId);
        $stmt->bindParam(':itemId', $itemId);
    
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Erro ao atualizar o status do item na tabela $tabela.");
        }
    }

    
}
?>
