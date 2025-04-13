<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/MenuLateral.css">
    <link rel="stylesheet" href="../assets/css/notificacao.css">
    <link rel="stylesheet" href="../assets/css/InserirPedido.css">
    <title>ChocoTrack - Inserir pedido</title>
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


    <div class="conteudo">
        <div class="quadro">
            <form id="pedidoForm">
                <!-- Informações do cliente -->
                <div class="box-user">
                    <input type="text" name="nome" required placeholder=" ">
                    <label>Nome completo</label>
                </div>
                <div class="box-user">
                    <input type="number" name="telefone" required placeholder=" ">
                    <label>Telefone</label>
                </div>
                <div class="box-user">
                    <input type="date" name="data" required placeholder=" ">
                    <label>Data</label>
                </div>
                <div class="box-user">
                    <input type="number" id="qtd" name="qtd" required placeholder=" " value="1" min="1" onchange="atualizarCampos()" />
                    <label>Quantidade</label>
                </div>
                <div class="box-user">
                    <input type="number" step="0.01" id="valor" name="valor" required placeholder=" "/>
                    <label>Valor</label>
                </div>
                <div class="box-user">
                    <select id="tipo-pedido" name="tipo-pedido">
                        <option value="" disabled selected>Selecione o tipo do pedido</option>
                        <option value="Normal">Venda comum</option>  
                        <option value="Rifa">Rifa</option>                                                              
                    </select>
                </div>
                <div class="produtos-1-campos">
                    <h3>Produto 1</h3>
                    <!-- Seletor de Produto -->
                    <div class="box-user">
                        <select id="produto-0" name="produto_0" onchange="LogicaCampos(0)">
                            <option value="" disabled selected>Selecione o produto</option>
                            <option value="Tradicional">Ovo Tradicional</option>
                            <option value="Tradicional recheado">Ovo Tradicional recheado</option>
                            <option value="Colher">Ovo Colher</option>
                            <option value="Caixa de bombom">Caixa de bombom</option>
                        </select>
                    </div>

                    <!-- Campos Dinâmicos -->
                    <div id="campos-dinamicos-0"></div>

                    <div class="controle-botoes">
                        <button type="button" class="btn-remove" data-index="1">-</button>
                        <span class="contador" data-index="1">0</span>
                        <button type="button" class="btn-add" data-index="1">+</button>
                    </div>




                    <!-- Divisória entre os produtos -->
                    <hr class="divisoria-produto">
                </div>

                

                <button type="submit">Entrar</button>
            </form>
        </div>
    </div>

    <div id="notificacao" class="notificacao escondido">
        <span id="notificacao-icone"></span>
        <span id="notificacao-mensagem"></span>
    </div>

    <script src="../assets/js/LogicaDeProdutos.js"></script>
    <script src="../assets/js/Notificacao.js" type="module"></script>
    <script src="../assets/js/menulateral.js"></script>
    <script src="../assets/js/ColhetandoPedido.js" type="module"></script>
    <script src="../assets/js/BuscarRecheios.js" ></script>
    <script src="../assets/js/BuscarCascas.js" ></script>
    <script src="../assets/js/AtualizarCamposQtd.js" ></script>
</body>
</html>
