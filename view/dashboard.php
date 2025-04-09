<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChocoTrack - Consultar pedido</title>
    <link rel="stylesheet" href="../assets/css/MenuLateral.css">
    <link rel="stylesheet" href="../assets/css/Dash.css">
    <link rel="stylesheet" href="../assets/css/cards.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
    
    <div class="btn-expandir">
        <i class="bi bi-list-ul" id="btn-exp-mobile"></i>
    </div>
    <div class="btn-expandir-note">
        <i class="bi bi-list-ul" id="btn-exp"></i>
    </div>
    
    <nav class="menu-lateral">
        <ul>
            <li class="item-menu"><a href="../view/index.php">
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
        <main>
            <section class="dashboard-content">
                <div class="cards-metricas">
                    <div class="card">
                        <h3>Total de pedidos</h3>
                        <p id="totalPedidos">-</p>
                    </div>
                    <div class="card">
                        <h3>Faturamento</h3>
                        <p id="faturamento">-</p>
                    </div>
                    <div class="card">
                        <h3>Total de pedidos pendentes</h3>
                        <p id="pedidosPendentes">-</p>
                    </div>
                    <div class="card">
                        <h3>Total de pedidos concluídos</h3>
                        <p id="pedidosConcluidos">-</p>
                    </div>
                </div>

                <!-- Cards por Categoria de Produto -->
                <div class="cards-vendas">
                    <div class="card-venda">
                        <h4>Ovos Tradicionais</h4>
                        <p>Total de itens: <span id="qtdOvosTrad">--</span></p>
                        <p>Mais vendido: <span id="maisVendidoOvosTrad">--</span></p>
                    </div>

                    <div class="card-venda">
                        <h4>Ovos Tradicionais Recheados</h4>
                        <p>Total de itens: <span id="qtdOvosRecheados">--</span></p>
                        <p>Mais vendido: <span id="maisVendidoOvosRecheados">--</span></p>
                    </div>

                    <div class="card-venda">
                        <h4>Caixas de Bombom</h4>
                        <p>Total de itens: <span id="qtdCaixasBombom">--</span></p>
                        <p>Mais vendido: <span id="maisVendidoCaixasBombom">--</span></p>
                    </div>

                    <div class="card-venda">
                        <h4>Ovos de Colher</h4>
                        <p>Total de itens: <span id="qtdOvosColher">--</span></p>
                        <p>Mais vendido: <span id="maisVendidoOvosColher">--</span></p>
                    </div>
                </div>

                <div class="grafico-vendas">
                    <h4>Ovos Tradicionais</h4>
                    <canvas id="graficoOvosTrad"></canvas>
                </div>

                <div class="grafico-vendas">
                    <h4>Ovos Tradicionais Recheados</h4>
                    <canvas id="graficoOvosRecheados"></canvas>
                </div>

                <div class="grafico-vendas">
                    <h4>Caixas de Bombom</h4>
                    <canvas id="graficoCaixasBombom"></canvas>
                </div>

                <div class="grafico-vendas">
                    <h4>Ovos de Colher</h4>
                    <canvas id="graficoOvosColher"></canvas>
                </div>

            </section>
        </main>
    </div>
    <script src="../assets/js/menulateral.js"></script>
    <script src="../assets/js/dash.js"></script>
</body>


</html>
