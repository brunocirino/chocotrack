import { mostrarNotificacao } from '../js/Notificacao.js';

const pedidos = [];

function adicionarPedido(id, nome, telefone, data, valor, observacao, itens, id_ovostradicionais, id_ovosrecheados, id_caixabombom, id_ovoscolher, progresso, 
    status_ovostradicionais, status_ovosrecheados, status_caixabombom, status_ovoscolher) {
// Adiciona o pedido ao array de pedidos com todos os status
pedidos.push({ 
id, 
nome, 
telefone,
data,
valor,
observacao,
itens, 
id_ovostradicionais, 
id_ovosrecheados, 
id_caixabombom, 
id_ovoscolher, 
progresso,
status_ovostradicionais,
status_ovosrecheados,
status_caixabombom,
status_ovoscolher
});

const listaPedidos = document.getElementById('lista-pedidos');

// Gera o card do pedido passando todos os parâmetros
const novoPedido = gerarCard({ 
id, 
nome, 
telefone,
data,
valor,
observacao,
itens, 
id_ovostradicionais, 
id_ovosrecheados, 
id_caixabombom, 
id_ovoscolher, 
progresso,
status_ovostradicionais,
status_ovosrecheados,
status_caixabombom,
status_ovoscolher
});
listaPedidos.innerHTML += novoPedido;
}



function CarregarBombons(id_identificador, itemIdlinha) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../controller/get_Bombons.php',
            method: 'GET',
            data: { id: id_identificador, id_linha: itemIdlinha},
            success: function(response) {
                console.log('Resposta bruta:', response);
                resolve(response); // resolve os dados
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
                reject('Erro na requisição AJAX: ' + error);
            }
        });
    });
}


function CarregarTradicionais(id_identificador, itemIdlinha){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../controller/get_Tradicional.php', 
            method: 'GET',
            data: { id: id_identificador, id_linha: itemIdlinha},
            success: function(response) {
                console.log('Resposta bruta:', response);
                resolve(response); // Já está como objeto
            },
            error: function(xhr, status, error) {
                reject('Erro na requisição AJAX: ' + error);
            }
        });
    });
}



function CarregarColher(id_identificador, itemIdlinha) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../controller/get_Colher.php',
            method: 'GET',
            data: { id: id_identificador , id_linha: itemIdlinha},
            success: function(response) {
                console.log('Resposta bruta:', response);
                resolve(response); // Pode fazer o parse aqui se necessário
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
                console.error('Resposta do servidor:', xhr.responseText);
                reject('Erro na requisição AJAX: ' + error);
            }
        });
    });
}

function CarregarRecheados(id_identificador, itemIdlinha) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../controller/get_Recheado.php', 
            method: 'GET',
            data: { id: id_identificador, id_linha: itemIdlinha },
            success: function(response) {
                console.log('Resposta bruta:', response);
                resolve(response); // Retorna o conteúdo como está
            },
            error: function(xhr, status, error) {
                reject('Erro na requisição AJAX: ' + error);
            }
        });
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
    const statusOptions = ['Pendente', 'Em andamento', 'Fabricado', 'Embalado','Concluído'];

    // Função para garantir que os dados sejam arrays válidos
    const ensureArray = (data) => {
        if (data === null || data === undefined) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === 'string' && data.includes(',')) return data.split(',').map(item => item.trim());
        return [data];
    };

    // Normaliza os dados do pedido
    const normalizedPedido = {
        ...pedido,
        itens: ensureArray(pedido.itens),
        id_ovostradicionais: ensureArray(pedido.id_ovostradicionais),
        status_ovostradicionais: ensureArray(pedido.status_ovostradicionais),
        id_ovosrecheados: ensureArray(pedido.id_ovosrecheados),
        status_ovosrecheados: ensureArray(pedido.status_ovosrecheados),
        id_caixabombom: ensureArray(pedido.id_caixabombom),
        status_caixabombom: ensureArray(pedido.status_caixabombom),
        id_ovoscolher: ensureArray(pedido.id_ovoscolher),
        status_ovoscolher: ensureArray(pedido.status_ovoscolher)
    };

    // Objeto que organiza os dados por tipo de item
    const itemData = {
        "Tradicional": {
            ids: normalizedPedido.id_ovostradicionais,
            status: normalizedPedido.status_ovostradicionais
        },
        "Tradicional recheado": {
            ids: normalizedPedido.id_ovosrecheados,
            status: normalizedPedido.status_ovosrecheados
        },
        "Caixa de bombom": {
            ids: normalizedPedido.id_caixabombom,
            status: normalizedPedido.status_caixabombom
        },
        "Colher": {
            ids: normalizedPedido.id_ovoscolher,
            status: normalizedPedido.status_ovoscolher
        }
    };

    // Contadores para cada tipo de item
    const contadores = {
        "Tradicional": 0,
        "Tradicional recheado": 0,
        "Caixa de bombom": 0,
        "Colher": 0
    };

    // Gera a lista de itens
    const listaItens = normalizedPedido.itens.map(item => {
        const data = itemData[item] || { ids: [], status: [] };
        const itemId = data.ids[contadores[item]] || null;
        const itemStatus = (data.status[contadores[item]] || 'Pendente').trim();
        
        // Log para depuração
        console.log(`Item: ${item}`, {
            id: itemId,
            status: itemStatus,
            idsDisponiveis: data.ids,
            statusDisponiveis: data.status
        });

        contadores[item]++;

        return `
            <li onclick='handleItemClick(event, ${normalizedPedido.id}, "${item}", this)' data-item-id="${itemId}">
                <span class="icone-item">⮞</span> ${item}
                <select class="status-select" 
                        data-item-id="${itemId}"
                        data-pedido-id="${normalizedPedido.id}"
                        data-itens='${JSON.stringify(normalizedPedido.itens)}'
                        onchange="atualizarStatus(this);">
                    ${statusOptions.map(option => `
                        <option value="${option}" ${option.toLowerCase() === itemStatus.toLowerCase() ? 'selected' : ''}>
                            ${option}
                        </option>
                    `).join('')}
                </select>
            </li>
        `;

    }).join('');

    return `
        <div class="card" data-pedido-id="${normalizedPedido.id}">
            <div class="card-header">
                <h4>Pedido #${normalizedPedido.id}</h4>
                <button class="btn-excluir" onclick="confirmarExclusao(${normalizedPedido.id})" title="Excluir pedido">
                    <img src="../assets/img/excluir.png" alt="Excluir" class="icone-lixeira">
                </button>
            </div>
            <p>Nome: ${normalizedPedido.nome}</p>
            <p>Telefone: ${normalizedPedido.telefone}</p>
            <p>Data: ${normalizedPedido.data}</p>
            <p>Valor: ${Number(normalizedPedido.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <ul class="itens-pedido">
                ${listaItens}
            </ul>
        </div>
    `;
}

function confirmarExclusao(id) {
    if (confirm("Tem certeza que deseja excluir o pedido #" + id + "?")) {
        excluirPedido(id); // aqui você chama sua função de exclusão real
    }
}

function excluirPedido(id_identificador) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../controller/Excluir_pedidos.php',
            method: 'GET',
            data: { id: id_identificador },
            success: function(response) {
                console.log('Resposta bruta:', response);

                // A resposta já é um objeto JavaScript, não é necessário usar JSON.parse
                if (response.success) {
                    mostrarNotificacao("Pedido excluído com sucesso!", "success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    resolve(response);
                } else {
                    mostrarNotificacao(response.error || "Erro ao excluir o pedido.", "error");
                    reject(response.error || "Erro ao excluir o pedido.");
                }
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
                console.error('Resposta do servidor:', xhr.responseText);
                mostrarNotificacao("Erro na requisição. Verifique o console.", "error");
                reject('Erro na requisição AJAX: ' + error);
            }
        });
    });
}




// Função para controlar o clique no item
function handleItemClick(event, pedidoId, item, liElement) {
    // Verifica se o clique foi na caixa de seleção
    if (event.target.tagName.toLowerCase() === 'select') {
        // Se for, apenas evita a propagação do clique
        event.stopPropagation();
        return;
    }
    // Caso contrário, chama o modal
    openModal(pedidoId, item, liElement);
}


function atualizarStatus(selectElement) {
    const novoStatus = selectElement.value;
    const itemId = selectElement.dataset.itemId;
    const pedidoId = selectElement.dataset.pedidoId;
    const itens = JSON.parse(selectElement.dataset.itens || '[]');

    console.log('Dados enviados para atualização:', {
        pedidoId,
        itemId,
        novoStatus,
        itens
    });

    // Cria um FormData para enviar como POST tradicional
    const formData = new FormData();
    formData.append('Status', novoStatus);
    formData.append('ID', pedidoId);
    formData.append('ItemID', itemId);
    formData.append('Itens', JSON.stringify(itens));

    fetch('../controller/Post_StatusPedido.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta:', data);
        if (data.success) {
        } else {
            alert('Erro: ' + data.message);
            selectElement.value = selectElement.dataset.lastStatus;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        selectElement.value = selectElement.dataset.lastStatus;
        alert('Erro na conexão');
    });
}


async function openModal(pedidoId, item, element) {
    const modal = document.getElementById('modal-pedido');
    const itensPedido = document.getElementById('itens-pedido');
    const itemIdlinha = element.getAttribute('data-item-id');
    itensPedido.innerHTML = ''; 

    console.log("Abrindo modal para:", pedidoId, item);

    // Inicializa com cabeçalho do pedido
    let conteudoHTML = `
        <p><strong>Pedido:</strong> #${pedidoId}</p>
        <p><strong>Tipo de item:</strong> ${item}</p>
        <hr/>
    `;

    if (item === 'Tradicional') {
        try {
            const retornos = await CarregarTradicionais(pedidoId, itemIdlinha);

            retornos.forEach(detalhe => {
                conteudoHTML += `
                    <div class="item-detalhe">
                        <p><strong>Casca 1:</strong> ${detalhe.casca1} (${detalhe.tpChocolate1})</p>
                        <p><strong>Casca 2:</strong> ${detalhe.casca2} (${detalhe.tpChocolate2})</p>
                        <p><strong>Observação:</strong> ${detalhe.observacao}</p>
                        <p><strong>Peso:</strong> ${detalhe.peso}g</p>
                        <p><strong>Status:</strong> ${detalhe.status}</p>
                    </div>
                    <hr/>
                `;
            });

        } catch (error) {
            conteudoHTML += `<p style="color:red;">Erro ao carregar detalhes: ${error}</p>`;
        }
    }
    if (item === 'Tradicional recheado') {
        try {
            const retornos = await CarregarRecheados(pedidoId, itemIdlinha);

            retornos.forEach(detalhe => {
                conteudoHTML += `
                    <div class="item-detalhe">
                        <p><strong>Casca 1:</strong> ${detalhe.casca1} (${detalhe.tpchocolate1}) (${detalhe.recheio1})</p>
                        <p><strong>Casca 2:</strong> ${detalhe.casca2} (${detalhe.tpchocolate2}) (${detalhe.recheio2})</p>
                        <p><strong>Observação:</strong> ${detalhe.observacao}</p>
                        <p><strong>Peso:</strong> ${detalhe.peso}g</p>
                        <p><strong>Status:</strong> ${detalhe.status}</p>
                    </div>
                    <hr/>
                `;
            });

        } catch (error) {
            conteudoHTML += `<p style="color:red;">Erro ao carregar detalhes: ${error}</p>`;
        }
    }
    if (item === 'Caixa de bombom') {
        try {
            const retornos = await CarregarBombons(pedidoId, itemIdlinha);

            retornos.forEach(detalhe => {
                conteudoHTML += `
                    <div class="item-detalhe">
                        <p><strong>Tipo Bombom:</strong> ${detalhe.tpBombom}</p>
                        <p><strong>Tipo Recheio:</strong> ${detalhe.tpRecheio}</p>
                        <p><strong>Observação:</strong> ${detalhe.observacao}</p>
                        <p><strong>Peso:</strong> ${detalhe.peso}g</p>
                        <p><strong>Status:</strong> ${detalhe.status}</p>
                    </div>
                    <hr/>
                `;
            });

        } catch (error) {
            conteudoHTML += `<p style="color:red;">Erro ao carregar detalhes: ${error}</p>`;
        }
    }
    if (item === 'Colher') {
        try {
            const retornos = await CarregarColher(pedidoId, itemIdlinha);

            retornos.forEach(detalhe => {
                conteudoHTML += `
                    <div class="item-detalhe">
                        <p><strong>Casca 1:</strong> ${detalhe.casca1} (${detalhe.tpChocolate1})</p>
                        <p><strong>Casca 2:</strong> ${detalhe.casca2} (${detalhe.tpChocolate2})</p>
                        <p><strong>Observação:</strong> ${detalhe.observacao}</p>
                        <p><strong>Peso:</strong> ${detalhe.peso}g</p>
                        <p><strong>Status:</strong> ${detalhe.status}</p>
                    </div>
                    <hr/>
                `;
            });

        } catch (error) {
            conteudoHTML += `<p style="color:red;">Erro ao carregar detalhes: ${error}</p>`;
        }
    }

    itensPedido.innerHTML = conteudoHTML;
    modal.style.display = 'flex';
}


function closeModal() {
    const modal = document.getElementById('modal-pedido');
    const itensPedido = document.getElementById('itens-pedido'); 
    modal.style.display = 'none';
    if (itensPedido) itensPedido.innerHTML = '';
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
                    adicionarPedido(
                        pedido.id, 
                        pedido.nome, 
                        pedido.telefone,
                        pedido.data,
                        pedido.valor,
                        pedido.observacao,
                        pedido.itens, 
                        pedido.id_ovostradicionais, 
                        pedido.id_ovosrecheados, 
                        pedido.id_caixabombom, 
                        pedido.id_ovoscolher, 
                        0,
                        pedido.status_ovostradicionais,
                        pedido.status_ovosrecheados,
                        pedido.status_caixabombom,
                        pedido.status_ovoscolher
                    );                });

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

window.confirmarExclusao = confirmarExclusao;
window.handleItemClick = handleItemClick;
window.closeModal = closeModal;
window.toggleCheck = toggleCheck;
window.atualizarStatus = atualizarStatus;
