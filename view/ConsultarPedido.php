<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/MenuLateral.css">
    <link rel="stylesheet" href="../assets/css/ConsultarPedido.css">
    <link rel="stylesheet" href="../assets/css/notificacao.css">
    <link rel="stylesheet" href="../assets/css/cards.css">
    <link rel="stylesheet" href="../assets/css/Modal-Editar.css">
    <title>ChocoTrack - Consultar pedido</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
    <aside>
        <div class="logo">
            <img src="../assets/img/LogoChocoSonha2.png">
            <div class="logo-texto">
                <h3>Choco<span>Track</span></h3>
            </div>
        </div>
        
    </aside>
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
            <li class="item-menu"><a href="../view/dashboard.php">
                <span class="icon"><i class="bi bi-box-fill"></i></span>
                <span class="txt-link">Dashboard</span>
            </a></li>
            <li class="item-menu"><a href="../view/InserirPedido.php">
                <span class="icon"><i class="bi bi-file-earmark-plus"></i></span>
                <span class="txt-link">Inserir</span>
            </a></li>
            <li class="item-menu"><a href="../view/ConsultarPedido.php">
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

    <div id="filtros">
    <select id="tipoFiltro">
        <option value="pedido">ID do Pedido</option>
        <option value="nome">Nome do Cliente</option>
        <option value="telefone">Telefone</option>
        <option value="data">Data do Pedido</option>
    </select>
    <input type="text" id="valorFiltro" placeholder="Digite aqui...">
    <button id="btnFiltrar">Filtrar</button>
</div>


    <div class="conteudo" id="lista-pedidos">
        <!-- Os cards serão inseridos dinamicamente aqui -->
    </div>

    <div id="paginacao" class="paginacao">
        <button id="paginaAnterior" disabled>Anterior</button>
        <span id="paginaAtual">Página 1</span>
        <button id="proximaPagina">Próxima</button>
    </div>


    <!-- Modal -->
    <div class="modal" id="modal-pedido">
        <div class="modal-conteudo">
            <button class="Editar-modal" onclick="EditarItem()">Editar</button>
            <button class="fechar-modal" onclick="closeModal()">×</button>
            <h2>Itens do Pedido</h2>
            <div id="itens-pedido">
                <!-- Itens serão carregados via JS aqui -->
            </div>
        </div>
    </div>

    <!-- Modal editar -->
    <div class="modal-overlay"></div>
    <div class="modal-edit-pedido">
        <button class="close-modal">&times;</button>
        <div class="modal-content">
            <div class="conteudo-fixo"></div>
            <div class="conteudo-itens"></div>
        </div>
    </div>

    <div id="notificacao" class="notificacao escondido">
        <span id="notificacao-icone"></span>
        <span id="notificacao-mensagem"></span>
    </div>

    <!-- Depois os scripts não-module que não dependem de outros -->
    <script src="../assets/js/menulateral.js"></script>
    <script src="../assets/js/BuscarRecheios.js" ></script>
    <script src="../assets/js/BuscarCascas.js" ></script>
    <script src="../assets/js/ColhetarEdição.js" ></script>
    

    <!-- Em seguida os módulos na ordem de dependência -->
    <script src="../assets/js/LogicaDeProdutos.js"></script>
    <script type="module" src="../assets/js/consultarPedidos.js"></script>
    <script type="module" src="../assets/js/Paginação.js"></script>
    <script type="module" src="../assets/js/FiltroPedidos.js"></script>

    <script type="module" src="../assets/js/EditarPedido.js"></script>

    
   
    
    
</body>
</html>
