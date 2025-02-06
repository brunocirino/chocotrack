<?php
header('Content-Type: application/json');
require_once("../model/RecheiosDAO.php");

$RecheiosDAO = new RecheiosDAO();
$Recheios = $RecheiosDAO->buscarRecheios();

echo json_encode($Recheios);

?>