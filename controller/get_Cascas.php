<?php
header('Content-Type: application/json');
require_once("../model/CascasDAO.php");

$CascasDAO = new CascasDAO();
$Cascas = $CascasDAO->buscarCascas();

echo json_encode($Cascas);

?>