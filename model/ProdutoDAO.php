<?php


class ProdutoModel {
    private $db;
    
    public function __construct() {
        $this->db = new PDO('mysql:host=' . HOST . ';dbname=' . DB_NAME, USER, PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function cadastrarOvoTradicional($id_pedido, $casca1, $tpChocolate1, $casca2, $tpChocolate2, $peso) {
        $sql = "INSERT INTO ovostradicionais (id_pedido, casca1, tpChocolate1, casca2, tpChocolate2, peso, status) VALUES (:id_pedido, :casca1, :tpChocolate1, :casca2, :tpChocolate2, :peso, 'pendente')";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":id_pedido", $id_pedido);
        $stmt->bindParam(":casca1", $casca1);
        $stmt->bindParam(":tpChocolate1", $tpChocolate1);
        $stmt->bindParam(":casca2", $casca2);
        $stmt->bindParam(":tpChocolate2", $tpChocolate2);
        $stmt->bindParam(":peso", $peso);
        return $stmt->execute();
    }

    public function cadastrarOvoRecheado($id_pedido, $casca1, $recheio1, $tpchocolate1, $casca2, $recheio2, $tpchocolate2, $peso) {
        $sql = "INSERT INTO ovosrecheados (id_pedido, casca1, recheio1, tpchocolate1, casca2, recheio2, tpchocolate2, peso, status) VALUES (:id_pedido, :casca1, :recheio1, :tpchocolate1, :casca2, :recheio2, :tpchocolate2, :peso, 'pendente')";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":id_pedido", $id_pedido);
        $stmt->bindParam(":casca1", $casca1);
        $stmt->bindParam(":recheio1", $recheio1);
        $stmt->bindParam(":tpchocolate1", $tpchocolate1);
        $stmt->bindParam(":casca2", $casca2);
        $stmt->bindParam(":recheio2", $recheio2);
        $stmt->bindParam(":tpchocolate2", $tpchocolate2);
        $stmt->bindParam(":peso", $peso);
        return $stmt->execute();
    }

    public function cadastrarOvoColher($id_pedido, $casca1, $recheio1, $tpchocolate1, $peso) {
        $sql = "INSERT INTO ovoscolher (id_pedido, casca1, recheio1, tpchocolate1, peso, status) 
                VALUES (:id_pedido, :casca1, :recheio1, :tpchocolate1, :peso, 'pendente')";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":id_pedido", $id_pedido);
        $stmt->bindParam(":casca1", $casca1);
        $stmt->bindParam(":recheio1", $recheio1);
        $stmt->bindParam(":tpchocolate1", $tpchocolate1);
        $stmt->bindParam(":peso", $peso);
        return $stmt->execute();
    }
    
    public function cadastrarCaixaBombom($id_pedido, $tpBombom, $tpRecheio, $sabor, $recheio, $peso) {
        $sql = "INSERT INTO caixabombom (id_pedido, tpBombom, tpRecheio, sabor, Recheio, peso, status) 
                VALUES (:id_pedido, :tpBombom, :tpRecheio, :sabor, :recheio, :peso, 'pendente')";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":id_pedido", $id_pedido);
        $stmt->bindParam(":tpBombom", $tpBombom);
        $stmt->bindParam(":tpRecheio", $tpRecheio);
        $stmt->bindParam(":sabor", $sabor);
        $stmt->bindParam(":recheio", $recheio);
        $stmt->bindParam(":peso", $peso);
        return $stmt->execute();
    }
    
}
?>
