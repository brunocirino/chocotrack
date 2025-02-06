<?php

    define('HOST', 'localhost');
    define('USER', 'root');
    define('PASSWORD', '');
    define('DB_NAME', 'chocotrack');

    require_once("Recheios.php");
    

    class RecheiosDAO {

        private $banco;
    
        public function __construct() {
            $this->banco = new PDO('mysql:host=' . HOST . ';dbname=' . DB_NAME, USER, PASSWORD);
            $this->banco->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    
        public function buscarRecheios() {
            $consulta = $this->banco->prepare('SELECT nome FROM recheios');
                $consulta->execute();
                $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $resultados;
        }
    }
?>