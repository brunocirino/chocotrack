<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/MenuLateral.css">
    <link rel="stylesheet" href="../assets/css/Login.css">
    <title>Home - Controle de estoque</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
    <!-- Botão de abrir menu para celulares -->
    <div class="btn-expandir">
        <i class="bi bi-list-ul" id="btn-exp-mobile"></i>
    </div>

    <!-- Botão de abrir menu para notebooks -->
    <div class="btn-expandir-note">
        <i class="bi bi-list-ul" id="btn-exp"></i>
    </div>

    <!-- Menu Lateral -->
    <nav class="menu-lateral">
        <!-- Itens do menu -->
        <ul>
            <li class="item-menu"><a href="../view/Estoque.php">
                <span class="icon"><i class="bi bi-box-fill"></i></span>
                <span class="txt-link">Dashboard</span>
            </a></li>
            <li class="item-menu"><a href="../view/InserirPedido.php">
                <span class="icon"><i class="bi bi-file-earmark-plus"></i></span>
                <span class="txt-link">Inserir</span>
            </a></li>
            <li class="item-menu"><a href="../view/AdicionarUsuarios.php">
                <span class="icon"><i class="bi bi-clipboard"></i></span>
                <span class="txt-link">Pedidos</span>
            </a></li>
            <li class="item-menu"><a href="../view/Cliente.php">
                <span class="icon"><i class="bi bi-person-vcard-fill"></i></span>
                <span class="txt-link">Users</span>
            </a></li>
            <li class="item-menu"><a href="../view/Cliente.php">
                <span class="icon"><i class="bi bi-box-arrow-in-right"></i></span>
                <span class="txt-link">Sair</span>
            </a></li>
        </ul>
    </nav>

    <script src="../assets/js/menulateral.js"></script>
</body>
</html>
