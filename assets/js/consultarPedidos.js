const pedidos = [];

function adicionarPedido(id, nome, itens, progresso) {
    pedidos.push({ id, nome, itens, progresso });

    // Obtém a referência do contêiner da lista de pedidos
    const listaPedidos = document.getElementById('lista-pedidos');

    // Adiciona apenas o novo pedido ao HTML
    const novoPedido = gerarCard({ id, nome, itens, progresso });
    listaPedidos.innerHTML += novoPedido;
}


function CarregarBombons(id_identificador,  callback){
    $.ajax({
        url: '../controller/get_Bombons.php', // Use o caminho correto
        method: 'GET',
        data: { id: id_identificador },
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            callback(response);
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function CarregarTradicionais(id_identificador){
    $.ajax({
        url: '../controller/get_Tradicional.php', // Use o caminho correto
        method: 'GET',
        data: { id: id_identificador },
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            return response
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function CarregarColher(id_identificador){
    $.ajax({
        url: '../controller/get_Colher.php', // Use o caminho correto
        method: 'GET',
        data: { id: id_identificador },
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            return response
            
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            console.error('Resposta do servidor:', xhr.responseText);
        }
    });
}

function CarregarRecheados(id_identificador){
    $.ajax({
        url: '../controller/get_Recheado.php', // Use o caminho correto
        method: 'GET',
        data: { id: id_identificador },
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            return response
            
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function InsertArray(arrayPedidos) {
    const agrupados = {};

    // Agrupando os pedidos
    arrayPedidos.forEach(pedido => {
        const idIdentificador = pedido.id_identificador;
        const item = pedido.item;

        // Verifica se o grupo já existe para o id_identificador
        if (!agrupados[idIdentificador]) {
            agrupados[idIdentificador] = {};
        }

        // Adiciona o item se ainda não estiver presente
        if (!agrupados[idIdentificador][item]) {
            agrupados[idIdentificador][item] = {
                item: item,
                id_identificador: idIdentificador
            };
        }
    });

    // Convertendo o objeto em um array
    const resultado = [];
    for (const id in agrupados) {
        for (const item in agrupados[id]) {
            resultado.push(agrupados[id][item]);
        }
    }

    resultado.forEach(grupo => {
        const idIdentificador = grupo.id_identificador;
        const item = grupo.item;

        // Verificações e chamadas de função
        if (item === "Tradicional") {
            CarregarTradicionais(idIdentificador);
        }

        if (item === "Tradicional recheado") {
            CarregarRecheados(idIdentificador);
        }

        if (item === "Colher") {
            CarregarColher(idIdentificador);
        }

        if (item === "Caixa de bombom") {
            CarregarBombons(idIdentificador, function(response){
                const bombons = response;

                bombons.forEach(bombom => {
                    pedidos.itens.push(bombom.tpBombom);
                });

                console.log(bombons)

            });
        }
    });
}

function gerarCard(pedido) {
    // Gerar a lista de itens do pedido
    const listaItens = pedido.itens.map(item => `
        <li>
            <span class="icone-item">⮞</span> ${item}
            <span class="checkbox" onclick="toggleCheck(this)"></span>
        </li>
    `).join('');

    return `
        <div class="card" onclick="openModal(${pedido.id})">
            <h4>Pedido #${pedido.id}</h4>
            <p>Nome: ${pedido.nome}</p>
             <ul class="itens-pedido">
                ${listaItens}  <!-- Aqui está a correção -->
            </ul>

            <div class="div-barra">
                <div class="barra-concluida">
                <div class="barra-concluida-status" style="width: ${pedido.progresso}%"></div>
                
            </div>
            <div class="percentagem-container">
                    <span class="percentagem">${pedido.progresso}%</span> <!-- Exibe a porcentagem -->
            </div>
        </div>

           
        </div>
    `;
}

function openModal(pedidoId) {
    // Aqui você pode carregar os itens do pedido via AJAX ou direto em HTML
    const modal = document.getElementById('modal-pedido');
    const itensPedido = document.getElementById('itens-pedido');
    
    // Exemplo simples para carregar os itens
    itensPedido.innerHTML = `
        <p>Item 1 - Status: Aguardando</p>
        <p>Item 2 - Status: Concluído</p>
        <p>Item 3 - Status: Em andamento</p>
    `;
    
    // Mostrar o modal
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal-pedido');
    modal.style.display = 'none';
}
function toggleCheck(element) {
    // Alterna a classe "checked" no span clicado
    element.classList.toggle("checked");
}


function CarregarPedidos(){
    $.ajax({
        url: '../controller/get_Pedidos.php', // Use o caminho correto
        method: 'GET',
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            InsertArray(response);
            if (Array.isArray(response) && response.length > 0) {
                response.forEach(pedido => {
                    adicionarPedido(pedido.id, pedido.nome, pedido.itens, 0);
                });

                console.log('Pedidos carregados:', pedidos);
            } else {
                console.error('Resposta da API não contém dados válidos:', response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}



window.addEventListener("load", function() {
    CarregarPedidos();
});
