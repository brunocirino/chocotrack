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
                    // Prepara a estrutura de dados para o modal
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

    const conteudoItens = modal.querySelector('.conteudo-itens');
    conteudoItens.innerHTML = '<h3>Itens do Pedido</h3>';

    // Função para criar campos editáveis para cada item
    const criarItem = (item, tipo) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-container';
        
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

        itemDiv.innerHTML = `<h5>${titulo}</h5>${camposHTML}`;
        return itemDiv;
    };

    // Tipos de itens possíveis
    const tiposItens = ['ovostradicionais', 'ovosrecheados', 'caixabombom', 'ovoscolher'];

    // Adiciona cada tipo de item ao modal
    tiposItens.forEach(tipo => {
        // Verifica se existe o tipo dentro de 'itens' e se tem itens (acessando itens[tipo][0])
        if (pedidoData.itens && pedidoData.itens[tipo] && pedidoData.itens[tipo][0] && pedidoData.itens[tipo][0].length > 0) {
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
            
            // Adiciona cada item do tipo (acessando itens[tipo][0])
            pedidoData.itens[tipo][0].forEach(item => {
                section.appendChild(criarItem(item, tipo));
            });
            
            conteudoItens.appendChild(section);
        }
    });

    // Botão de salvar
    const btnSalvar = document.createElement('button');
    btnSalvar.className = 'btn-salvar';
    btnSalvar.textContent = 'Salvar Alterações';
    btnSalvar.onclick = salvarAlteracoes;
    conteudoItens.appendChild(btnSalvar);

    // Fechar modal
    modal.querySelector('.close-modal').onclick = fecharModal;
    overlay.onclick = fecharModal;
}

    
    function salvarAlteracoes() {
        const dadosAtualizados = {
            pedido: {},
            itens: {}
        };
    
        // Captura dados do pedido
        document.querySelectorAll('.conteudo-fixo .editable').forEach(input => {
            dadosAtualizados.pedido[input.dataset.field] = input.value;
        });
    
        // Captura dados dos itens
        document.querySelectorAll('.conteudo-itens .editable').forEach(input => {
            const tipo = input.dataset.tipo;
            const id = input.dataset.id;
            const field = input.dataset.field;
            
            if (!dadosAtualizados.itens[tipo]) {
                dadosAtualizados.itens[tipo] = {};
            }
            
            if (!dadosAtualizados.itens[tipo][id]) {
                dadosAtualizados.itens[tipo][id] = {};
            }
            
            dadosAtualizados.itens[tipo][id][field] = input.value;
        });
    
        console.log('Dados para salvar:', dadosAtualizados);
        // Aqui você faria a chamada AJAX para salvar os dados
        alert('Dados prontos para serem enviados ao servidor! Verifique o console.');
    }

    function fecharModal() {
        const modal = document.querySelector('.modal-edit-pedido');
        const overlay = document.querySelector('.modal-overlay');
        
        modal.classList.remove('show');
        overlay.style.display = 'none';
        document.body.classList.remove('modal-active');
    }

