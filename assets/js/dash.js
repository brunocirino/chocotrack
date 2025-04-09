$(document).ready(function () {
    CarregarPedidos();
});

function CarregarPedidos() {
    $.ajax({
        url: '../controller/get_PedidosDashboard.php',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response)
            if (response && response.length > 0) {
                let totalPedidos = 0;
                let faturamento = 0;
                let pedidosPendentes = 0;
                let pedidosConcluidos = 0;
                let pedidosContabilizados = new Set();

                // Contadores por tipo de produto
                let ovosTrad = 0;
                let ovosRecheados = 0;
                let caixasBombom = 0;
                let ovosColher = 0;

                response.forEach(pedido => {
                    // Evita contar o mesmo pedido mais de uma vez
                    if (!pedidosContabilizados.has(pedido.id_identificador)) {
                        totalPedidos++;
                        if (pedido.valor) {
                            faturamento += parseFloat(pedido.valor);
                        }

                        
                        pedidosContabilizados.add(pedido.id_identificador);

                        
                    }

                    // Conta status
                    if (pedido.status && pedido.status.toLowerCase() === 'pendente') {
                        pedidosPendentes++;
                    } else if (pedido.status && pedido.status.toLowerCase() === 'concluído') {
                        pedidosConcluidos++;
                    }

                    // Conta por tipo de produto (ajuste para 'item')
                    if (pedido.item) {
                        switch (pedido.item.toLowerCase()) {
                            case 'tradicional':
                                ovosTrad++;
                                break;
                            case 'tradicional recheado':
                                ovosRecheados++;
                                break;
                            case 'caixa de bombom':
                                caixasBombom++;
                                break;
                            case 'colher':
                                ovosColher++;
                                break;
                        }
                    }
                });

                // Atualiza números no HTML
                $('#totalPedidos').text(totalPedidos);
                $('#faturamento').text(`R$ ${faturamento.toFixed(2).replace('.', ',')}`);
                $('#pedidosPendentes').text(pedidosPendentes);
                $('#pedidosConcluidos').text(pedidosConcluidos);

                // Cria os gráficos
                CriarGrafico('graficoOvosTrad', ['Pedidos'], [ovosTrad]);
                CriarGrafico('graficoOvosRecheados', ['Pedidos'], [ovosRecheados]);
                CriarGrafico('graficoCaixasBombom', ['Pedidos'], [caixasBombom]);
                CriarGrafico('graficoOvosColher', ['Pedidos'], [ovosColher]);

                preencherCards(response);

            } else {
                $('#totalPedidos').text('0');
                $('#faturamento').text('R$ 0,00');
                $('#pedidosPendentes').text('0');
                $('#pedidosConcluidos').text('0');
            }
        },
        error: function (err) {
            console.error('Erro ao carregar os pedidos:', err);
            $('#totalPedidos').text('-');
            $('#faturamento').text('-');
            $('#pedidosPendentes').text('-');
            $('#pedidosConcluidos').text('-');
        }
    });
}

function preencherCards(json) {
    const categorias = {
        "Tradicional": {
            total: 0,
            idsContabilizados: new Set(),
            maisVendidos: {}
        },
        "Tradicional recheado": {
            total: 0,
            idsContabilizados: new Set(),
            maisVendidos: {}
        },
        "Caixa de bombom": {
            total: 0,
            idsContabilizados: new Set(),
            maisVendidos: {}
        },
        "Colher": {
            total: 0,
            idsContabilizados: new Set(),
            maisVendidos: {}
        }
    };

    json.forEach(pedido => {
        const cat = pedido.item;
        const id = pedido.id_identificador;

        if (categorias[cat]) {
            const categoria = categorias[cat];

            if (!categoria.idsContabilizados.has(id)) {
                categoria.idsContabilizados.add(id);
                categoria.total++;
            }

            // TRADICIONAL
            if (cat === 'Tradicional') {
                const saborPrincipal = pedido.tpChocolate1;
                if (saborPrincipal) {
                    categoria.maisVendidos[saborPrincipal] = (categoria.maisVendidos[saborPrincipal] || 0) + 1;
                }
            }

            // TRADICIONAL RECHEADO
            if (cat === 'Tradicional recheado') {
                const sabor1 = pedido.recheio1;
                const sabor2 = pedido.recheio2;

                if (sabor1 && sabor1.toLowerCase() !== 'nulo') {
                    categoria.maisVendidos[sabor1] = (categoria.maisVendidos[sabor1] || 0) + 1;
                }
                if (sabor2 && sabor2.toLowerCase() !== 'nulo') {
                    categoria.maisVendidos[sabor2] = (categoria.maisVendidos[sabor2] || 0) + 1;
                }
            }

           // CAIXA DE BOMBOM
            if (cat === 'Caixa de bombom') {
                let saborPrincipal = pedido.recheio2;

                if (!saborPrincipal || saborPrincipal.toLowerCase() === 'nulo') {
                    saborPrincipal = 'Maciço';
                }

                categoria.maisVendidos[saborPrincipal] = (categoria.maisVendidos[saborPrincipal] || 0) + 1;
            }


            // COLHER
            if (cat === 'Colher') {
                const saborPrincipal = pedido.recheio1;
                if (saborPrincipal) {
                    categoria.maisVendidos[saborPrincipal] = (categoria.maisVendidos[saborPrincipal] || 0) + 1;
                }
            }
        }
    });

    function atualizarCard(idPrefix, dadosCat) {
        document.getElementById(`qtd${idPrefix}`).textContent = dadosCat.total;

        const maisVendido = Object.entries(dadosCat.maisVendidos)
            .sort((a, b) => b[1] - a[1])[0];

        document.getElementById(`maisVendido${idPrefix}`).textContent = maisVendido ? maisVendido[0] : '--';
    }

    atualizarCard("OvosTrad", categorias["Tradicional"]);
    atualizarCard("OvosRecheados", categorias["Tradicional recheado"]);
    atualizarCard("CaixasBombom", categorias["Caixa de bombom"]);
    atualizarCard("OvosColher", categorias["Colher"]);
}


function CriarGrafico(canvasId, labels, data) {
    new Chart(document.getElementById(canvasId), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade',
                data: data,
                backgroundColor: '#8B4513'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    });
}
