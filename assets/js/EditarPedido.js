import { mostrarNotificacao } from '../js/Notificacao.js';

function EditarPedido(id_identificador, id_ovostradicionais, id_ovosrecheados, id_ovoscolher, id_caixabombom) {
    if (id_ovostradicionais != null) {
        $.ajax({
            url: '../controller/Editar_pedidos.php',
            method: 'GET',
            data: { 
                id: id_identificador, 
                id_Tradicional: id_ovostradicionais,
                id_Recheado: id_ovosrecheados,
                id_Colher: id_ovoscolher,
                id_Caixabombom: id_caixabombom
            },
            success: function(response) {
                if (response.success) {
                    console.log(response)
                    const modalData = {
                        pedido: response.data.infoPedido,
                        itens: {
                            ovostradicionais: response.data.ovostradicionais || [],
                            ovosrecheados: response.data.ovosrecheados || [],
                            ovoscolher: response.data.ovoscolher || [],
                            caixabombom: response.data.caixabombom || []
                        }
                    };
                    
                    // Chama a função para abrir e preencher o modal
                    Montar_modal(modalData);
                } else {
                    console.error("Erro na resposta:", response.message);
                    alert('Erro ao carregar dados do pedido: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro na requisição AJAX:", error);
                alert('Erro ao carregar dados do pedido. Verifique o console para detalhes.');
            }
        });
    }
}

function Montar_modal(pedidoData) {
    const modal = document.querySelector('.modal-edit-pedido');
    const overlay = document.querySelector('.modal-overlay');

    // Ativa o modal
    document.body.classList.add('modal-active');
    modal.classList.add('show');
    overlay.style.display = 'block';

    // Preenche os dados do pedido (acessando pedido[0][0])
    const pedido = pedidoData.pedido && pedidoData.pedido[0] && pedidoData.pedido[0][0] 
        ? pedidoData.pedido[0][0] 
        : {};
    modal.querySelector('.conteudo-fixo').innerHTML = `
        <div class="form-group">
            <label>Id pedido:</label>
            <input type="text" value="${pedido.id_identificador || ''}" class="editable" data-field="id_identificador">
        </div>
        <div class="form-group">
            <label>Nome:</label>
            <input type="text" value="${pedido.nome || ''}" class="editable" data-field="nome">
        </div>
        <div class="form-group">
            <label>Telefone:</label>
            <input type="text" value="${pedido.telefone || ''}" class="editable" data-field="telefone">
        </div>
        <div class="form-group">
            <label>Data:</label>
            <input type="date" value="${pedido.data || ''}" class="editable" data-field="data">
        </div>
        <div class="form-group">
            <label>Valor:</label>
            <input type="text" value="${pedido.valor ? 'R$ ' + pedido.valor : ''}" class="editable" data-field="valor">
        </div>
        <div class="form-group">
            <label>Tipo do pedido:</label>
            <input type="text" value="${pedido.tipoPedido || ''}" class="editable" data-field="tipoPedido">
        </div>
    `;

    modal.dataset.idPedido = pedido.id_identificador || '';
    const conteudoItens = modal.querySelector('.conteudo-itens');
    conteudoItens.innerHTML = '<h3>Itens do Pedido</h3>';

    // Função para criar campos editáveis para cada item
    const criarItem = (item, tipo) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-container';
        itemDiv.dataset.tipo = tipo;
        itemDiv.dataset.id = item.id; 
        
        let titulo = '';
        let camposHTML = '';

        // Determina o título e campos específicos com base no tipo
        switch(tipo) {
            case 'ovostradicionais':
                titulo = `Ovo Tradicional (ID: ${item.id})`;
                camposHTML = `
                    <div class="form-group">
                        <label>Casca 1:</label>
                        <input type="text" value="${item.casca1 || ''}" class="editable" data-field="casca1">
                    </div>
                    <div class="form-group">
                        <label>Tipo Chocolate 1:</label>
                        <input type="text" value="${item.tpChocolate1 || ''}" class="editable" data-field="tpChocolate1">
                    </div>
                    <div class="form-group">
                        <label>Casca 2:</label>
                        <input type="text" value="${item.casca2 || ''}" class="editable" data-field="casca2">
                    </div>
                    <div class="form-group">
                        <label>Tipo Chocolate 2:</label>
                        <input type="text" value="${item.tpChocolate2 || ''}" class="editable" data-field="tpChocolate2">
                    </div>
                `;
                break;
                
            case 'ovosrecheados':
                titulo = `Ovo Recheado (ID: ${item.id})`;
                camposHTML = `
                    <div class="form-group">
                        <label>Casca 1:</label>
                        <input type="text" value="${item.casca1 || ''}" class="editable" data-field="casca1">
                    </div>
                    <div class="form-group">
                        <label>Recheio 1:</label>
                        <input type="text" value="${item.recheio1 || ''}" class="editable" data-field="recheio1">
                    </div>
                    <div class="form-group">
                        <label>Tipo Chocolate 1:</label>
                        <input type="text" value="${item.tpchocolate1 || ''}" class="editable" data-field="tpchocolate1">
                    </div>
                    <div class="form-group">
                        <label>Casca 2:</label>
                        <input type="text" value="${item.casca2 || ''}" class="editable" data-field="casca2">
                    </div>
                    <div class="form-group">
                        <label>Recheio 2:</label>
                        <input type="text" value="${item.recheio2 || ''}" class="editable" data-field="recheio2">
                    </div>
                    <div class="form-group">
                        <label>Tipo Chocolate 2:</label>
                        <input type="text" value="${item.tpchocolate2 || ''}" class="editable" data-field="tpchocolate2">
                    </div>
                `;
                break;
                
            case 'caixabombom':
                titulo = `Caixa de Bombom (ID: ${item.id})`;
                camposHTML = `
                    <div class="form-group">
                        <label>Tipo Bombom:</label>
                        <input type="text" value="${item.tpBombom || ''}" class="editable" data-field="tpBombom">
                    </div>
                    <div class="form-group">
                        <label>Tipo Recheio:</label>
                        <input type="text" value="${item.tpRecheio || ''}" class="editable" data-field="tpRecheio">
                    </div>
                    <div class="form-group">
                        <label>Sabor:</label>
                        <input type="text" value="${item.sabor || ''}" class="editable" data-field="sabor">
                    </div>
                    <div class="form-group">
                        <label>Recheio:</label>
                        <input type="text" value="${item.Recheio || ''}" class="editable" data-field="Recheio">
                    </div>
                `;
                break;
                
            case 'ovoscolher':
                titulo = `Ovo de Colher (ID: ${item.id})`;
                camposHTML = `
                    <div class="form-group">
                        <label>Casca 1:</label>
                        <input type="text" value="${item.casca1 || ''}" class="editable" data-field="casca1">
                    </div>
                    <div class="form-group">
                        <label>Recheio 1:</label>
                        <input type="text" value="${item.recheio1 || ''}" class="editable" data-field="recheio1">
                    </div>
                    <div class="form-group">
                        <label>Tipo Chocolate 1:</label>
                        <input type="text" value="${item.tpchocolate1 || ''}" class="editable" data-field="tpchocolate1">
                    </div>
                `;
                break;
        }

        // Campos comuns a todos os itens
        camposHTML += `
            <div class="form-group">
                <label>Observação:</label>
                <input type="text" value="${item.observacao || ''}" class="editable" data-field="observacao">
            </div>
            <div class="form-group">
                <label>Peso:</label>
                <input type="text" value="${item.peso || ''}" class="editable" data-field="peso">
            </div>
            <div class="form-group">
                <label>Status:</label>
                <select class="editable" data-field="status">
                    <option value="pendente" ${item.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                    <option value="Em andamento" ${item.status === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                    <option value="Fabricado" ${item.status === 'Fabricado' ? 'selected' : ''}>Fabricado</option>
                    <option value="Embalado" ${item.status === 'Embalado' ? 'selected' : ''}>Embalado</option>
                    <option value="Concluído" ${item.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                </select>
            </div>
        `;

        camposHTML += `
            <div class="item-actions">
                <button class="btn-excluir-item" onclick="excluirItem(this)">Excluir Item</button>
            </div>
        `;

        itemDiv.innerHTML = `<h5>${titulo}</h5>${camposHTML}`;
        return itemDiv;
    };

    // Tipos de itens possíveis
    const tiposItens = ['ovostradicionais', 'ovosrecheados', 'caixabombom', 'ovoscolher'];

    // Adiciona cada tipo de item ao modal
    tiposItens.forEach(tipo => {
        // Verifica se existe o tipo dentro de 'itens' e se tem itens
        if (pedidoData.itens && pedidoData.itens[tipo] && pedidoData.itens[tipo].length > 0) {
            // Cria uma seção para o tipo
            const section = document.createElement('div');
            section.className = 'item-section';
            
            // Adiciona título da seção
            let tituloSecao = '';
            switch(tipo) {
                case 'ovostradicionais': tituloSecao = 'Ovos Tradicionais'; break;
                case 'ovosrecheados': tituloSecao = 'Ovos Recheados'; break;
                case 'caixabombom': tituloSecao = 'Caixas de Bombom'; break;
                case 'ovoscolher': tituloSecao = 'Ovos de Colher'; break;
            }
            section.innerHTML = `<h4>${tituloSecao}</h4>`;
            
            // Percorre todos os grupos de itens deste tipo
            pedidoData.itens[tipo].forEach(grupoItens => {
                // Agora percorre cada item dentro do grupo
                grupoItens.forEach(item => {
                    section.appendChild(criarItem(item, tipo));
                });
            });
            
            conteudoItens.appendChild(section);
        }
    });

    // Botão de adicionar item
    const btnAdicionar = document.createElement('button');
    btnAdicionar.type = 'button';
    btnAdicionar.textContent = 'Adicionar Item';
    btnAdicionar.classList.add('botao-adicionar');
    btnAdicionar.onclick = adicionarItem;
    conteudoItens.appendChild(btnAdicionar);

    // Div onde os itens podem ser agrupados (caso você use para previews ou organização futura)
    const divTodosItens = document.createElement('div');
    divTodosItens.id = 'todos-itens';
    conteudoItens.appendChild(divTodosItens);



    // Botão de salvar
    const btnSalvar = document.createElement('button');
    btnSalvar.className = 'btn-salvar';
    btnSalvar.textContent = 'Salvar Alterações';
    btnSalvar.onclick = function() {
        const dadosEditados = coletarDadosEdicao();
        console.log('Dados coletados:', dadosEditados);
    };
    conteudoItens.appendChild(btnSalvar);

    // Fechar modal
    modal.querySelector('.close-modal').onclick = fecharModal;
    overlay.onclick = fecharModal;
}

    function fecharModal() {
        const modal = document.querySelector('.modal-edit-pedido');
        const overlay = document.querySelector('.modal-overlay');
        
        modal.classList.remove('show');
        overlay.style.display = 'none';
        document.body.classList.remove('modal-active');
    }


    function excluirItem(button) {
        const itemContainer = button.closest('.item-container');
        const modal = document.querySelector('.modal-edit-pedido');
        const tipo = itemContainer.dataset.tipo;
        const id = itemContainer.dataset.id;
        const id_identificador = modal.dataset.idPedido;
    
        if (confirm(`Tem certeza que deseja excluir este item?`)) {
            // Mostrar indicador de carregamento
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Excluindo...';
    
            $.ajax({
                url: '../controller/Excluir_item_pedido.php',
                method: 'POST',  // Alterado para POST (mais seguro para operações de modificação)
                dataType: 'json', // Esperamos JSON como resposta
                data: { 
                    tipo_item: tipo,
                    id_item: id,
                    id_identificador: id_identificador
                },
                success: function(response) {
                    if (response.success) {
                        // Remove visualmente o item
                        itemContainer.remove();
                        // Atualiza a interface se necessário
                        mostrarNotificacao("Item excluído com sucesso!", "success");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        alert('Erro ao excluir: ' + response.message);
                        button.disabled = false;
                        button.textContent = 'Excluir Item';
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Detalhes do erro:", xhr.responseText);
                    alert('Erro na comunicação com o servidor. Verifique o console para detalhes.');
                    button.disabled = false;
                    button.textContent = 'Excluir Item';
                }
            });
        }
    }


let indexGlobal = 0; // Vai controlando os IDs únicos

function adicionarItem() {
    indexGlobal++;

    // Cria um novo container para o novo item
    const novoItem = document.createElement("div");
    novoItem.id = `item-${indexGlobal}`;
    novoItem.classList.add("item-grupo"); // Opcional pra estilizar

    novoItem.innerHTML = `
        <h4>Produto ${indexGlobal + 1}</h4>
        <div class="box-user">
            <select id="produto-${indexGlobal}" name="produto-${indexGlobal}" onchange="LogicaCampos(${indexGlobal})" required>
                <option value="" disabled selected>Selecione o produto</option>
                <option value="Tradicional">Ovo Tradicional</option>
                <option value="Tradicional recheado">Ovo Tradicional Recheado</option>
                <option value="Colher">Ovo de Colher</option>
                <option value="Caixa de bombom">Caixa de Bombom</option>
            </select>
        </div>
        <div id="campos-dinamicos-${indexGlobal}"></div>
        <hr>
    `;

    document.getElementById("todos-itens").appendChild(novoItem);
}


window.excluirItem = excluirItem;
window.EditarPedido = EditarPedido;
