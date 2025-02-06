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
                    id_identificador AS id, 
                    nome, 
                    GROUP_CONCAT(item ORDER BY id SEPARATOR ', ') AS itens
                FROM pedido
                GROUP BY id_identificador, nome";
    
        $stmt = $this->banco->prepare($sql);
    
        if ($stmt->execute()) {
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            // Convertendo os itens para um array
            foreach ($resultado as &$pedido) {
                $pedido['itens'] = explode(', ', $pedido['itens']);
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
    
}
?>
