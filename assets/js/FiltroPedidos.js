export function configurarFiltro(paginacao) {
    const btnFiltrar = document.getElementById("btnFiltrar");
    const valorFiltro = document.getElementById("valorFiltro");
    
    if (!btnFiltrar || !valorFiltro) return;

    // Armazena todos os pedidos originais
    let todosPedidos = [];

    // Função para aplicar o filtro
    function aplicarFiltro() {
        const tipoFiltro = document.getElementById("tipoFiltro").value;
        const valor = valorFiltro.value.toLowerCase().trim();

        // Se o campo estiver vazio, mostra todos os pedidos
        if (!valor) {
            paginacao.atualizarDados(todosPedidos);
            return;
        }

        // Filtra os pedidos
        const pedidosFiltrados = todosPedidos.filter(pedido => {
            switch (tipoFiltro) {
                case "nome":
                    return pedido.nome.toLowerCase().includes(valor);
                case "pedido":
                    return pedido.id.toString().includes(valor);
                case "telefone":
                    return pedido.telefone.includes(valor);
                case "data":
                    return pedido.data.includes(valor);
                default:
                    return true;
            }
        });

        // Atualiza a paginação com os resultados filtrados
        paginacao.atualizarDados(pedidosFiltrados);
    }

    // Evento do botão filtrar
    btnFiltrar.addEventListener("click", aplicarFiltro);

    // Evento do Enter no campo de filtro
    valorFiltro.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            aplicarFiltro();
        }
    });

    // Método para atualizar a lista completa de pedidos
    return {
        atualizarListaCompleta: function(pedidos) {
            todosPedidos = pedidos;
        }
    };
}