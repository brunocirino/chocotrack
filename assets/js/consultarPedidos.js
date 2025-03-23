const pedidos = [];

function adicionarPedido(id, nome, itens, id_ovostradicionais, id_ovosrecheados, id_caixabombom, id_ovoscolher, progresso) {
    // Adiciona o pedido ao array de pedidos
    pedidos.push({ id, nome, itens, id_ovostradicionais, id_ovosrecheados, id_caixabombom, id_ovoscolher, progresso });

    const listaPedidos = document.getElementById('lista-pedidos');

    // Gera o card do pedido, passando todos os parâmetros necessários
    const novoPedido = gerarCard({ id, nome, itens, id_ovostradicionais, id_ovosrecheados, id_caixabombom, id_ovoscolher, progresso });
    listaPedidos.innerHTML += novoPedido;
}



function CarregarBombons(id_identificador,  callback){
    $.ajax({
        url: '../controller/get_Bombons.php', 
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
        url: '../controller/get_Tradicional.php', 
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
        url: '../controller/get_Colher.php', 
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
        url: '../controller/get_Recheado.php', 
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

   
    arrayPedidos.forEach(pedido => {
        const idIdentificador = pedido.id_identificador;
        const item = pedido.item;

        if (!agrupados[idIdentificador]) {
            agrupados[idIdentificador] = {};
        }

        if (!agrupados[idIdentificador][item]) {
            agrupados[idIdentificador][item] = {
                item: item,
                id_identificador: idIdentificador
            };
        }
    });

    const resultado = [];
    for (const id in agrupados) {
        for (const item in agrupados[id]) {
            resultado.push(agrupados[id][item]);
        }
    }

    resultado.forEach(grupo => {
        const idIdentificador = grupo.id_identificador;
        const item = grupo.item;
        console.log(grupo)

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
    const statusOptions = ['Pendente', 'Em andamento', 'Concluído'];

    // Objeto que mapeia cada item ao seu array de IDs correspondente
    const itemIds = {
        "Tradicional": pedido.id_ovostradicionais || [],
        "Tradicional recheado": pedido.id_ovosrecheados || [],
        "Caixa de bombom": pedido.id_caixabombom || [],
        "Ovo de colher": pedido.id_ovoscolher || []
    };

    // Objeto que mapeia cada item ao seu array de status correspondente
    const itemStatus = {
        "Tradicional": pedido.status_ovostradicionais || [],
        "Tradicional recheado": pedido.status_ovosrecheados || [],
        "Caixa de bombom": pedido.status_caixabombom || [],
        "Ovo de colher": pedido.status_ovoscolher || []
    };

    // Contadores para controlar o índice de cada tipo de item
    const contadores = {
        "Tradicional": 0,
        "Tradicional recheado": 0,
        "Caixa de bombom": 0,
        "Ovo de colher": 0
    };

    // Gera a lista de itens com os IDs e status corretos
    const listaItens = pedido.itens.map(item => {
        const ids = itemIds[item] || []; // Obtém os IDs do item
        const status = itemStatus[item] || []; // Obtém os status do item
        const itemId = ids[contadores[item]] || null; // Obtém o ID correspondente ao contador do item
        const itemStatusAtual = status[contadores[item]] || 'Pendente'; // Obtém o status correspondente ao contador do item

        // Log para depuração
        console.log(`Item: ${item}, ID: ${itemId}, Status: ${itemStatusAtual}, IDs: ${ids}, Statuses: ${status}`);

        // Incrementa o contador para o próximo item do mesmo tipo
        contadores[item]++;

        return `
            <li>
                <span class="icone-item">⮞</span> ${item}
                <select class="status-select" data-item-id="${itemId}" data-itens='${JSON.stringify(pedido.itens)}' onchange="atualizarStatus(this, ${pedido.id})">
                    ${statusOptions.map(optionStatus => `
                        <option value="${pedido.status_ovostradicionais}" ${optionStatus.toLowerCase() === itemStatusAtual.toLowerCase() ? 'selected' : ''}>
                            ${optionStatus}
                        </option>
                    `).join('')}
                </select>
            </li>
        `;
    }).join('');

    return `
        <div class="card" onclick="(${pedido.id})">
            <h4>Pedido #${pedido.id}</h4>
            <p>Nome: ${pedido.nome}</p>
            <ul class="itens-pedido">
                ${listaItens}  
            </ul>
        </div>
    `;
}

function atualizarStatus(selectElement, pedidoId) {
    const novoStatus = selectElement.value;
    const itemId = selectElement.dataset.itemId; // Captura o ID do item
    const itens = JSON.parse(selectElement.dataset.itens); // Captura a lista de itens

    console.log(`Pedido ${pedidoId}, Item ${itemId} atualizado para: ${novoStatus}, Itens: ${itens}`);

    $.ajax({
        url: '../controller/Post_StatusPedido.php', 
        method: 'GET',
        data: { 
            Status: novoStatus, 
            ID: pedidoId, 
            ItemID: itemId, // Passa o ID do item
            Itens: itens 
        },
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            return response;
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            console.error('Resposta do servidor:', xhr.responseText);
        }
    });
}


function openModal(pedidoId) {
    const modal = document.getElementById('modal-pedido');
    const itensPedido = document.getElementById('itens-pedido');
    
    itensPedido.innerHTML = `
        <p>Item 1 - Status: Aguardando</p>
        <p>Item 2 - Status: Concluído</p>
        <p>Item 3 - Status: Em andamento</p>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal-pedido');
    modal.style.display = 'none';
}
function toggleCheck(element) {
    element.classList.toggle("checked");
}


function CarregarPedidos() {
    $.ajax({
        url: '../controller/get_Pedidos.php',
        method: 'GET',
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            
            // Chama a função InsertArray se necessário
            InsertArray(response);
            
            if (Array.isArray(response) && response.length > 0) {
                response.forEach(pedido => {
                    adicionarPedido(pedido.id, pedido.nome, pedido.itens, pedido.id_ovostradicionais, pedido.id_ovosrecheados, pedido.id_caixabombom, pedido.id_ovoscolher, 0);
                });

                console.log('Pedidos carregados:', pedidos);
            } else {
                console.error('Resposta da API não contém dados válidos:', response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            console.error('Resposta completa:', xhr.responseText);
        }
    });
}



window.addEventListener("load", function() {
    CarregarPedidos();
});
