function coletarDadosEdicao() {
    const dados = {
        pedido: {},
        itens: []
    };

    // 1. Coletar dados do pedido (conteúdo fixo)
    document.querySelectorAll('.conteudo-fixo .editable').forEach(input => {
        const field = input.getAttribute('data-field');
        dados.pedido[field] = input.value;
    });

    // 2. Coletar itens existentes (ovos recheados, tradicionais, etc.)
    document.querySelectorAll('.item-container').forEach(container => {
        const item = {
            tipo: container.getAttribute('data-tipo'),
            id: container.getAttribute('data-id'),
            dados: {}
        };

        container.querySelectorAll('.editable').forEach(input => {
            const field = input.getAttribute('data-field');
            item.dados[field] = input.value;
        });

        dados.itens.push(item);
    });

    // 3. Coletar itens dinâmicos (novos itens adicionados no modal)
    document.querySelectorAll('.item-grupo').forEach((itemDiv, index) => {
        if (!itemDiv.id.startsWith('item-')) return; // Ignorar se não for um item dinâmico

        const produtoSelect = itemDiv.querySelector('select[name^="produto-"]');
        const tipoProduto = produtoSelect ? produtoSelect.value : '';

        if (!tipoProduto) return; // Se não selecionou um produto, ignora

        const item = {
            tipo: tipoProduto,
            id: `novo-${index}`,
            dados: {}
        };

        // Campos comuns a todos os tipos
        const observacao = itemDiv.querySelector('input[name^="observacao-"]');
        const peso = itemDiv.querySelector('select[name^="peso-"]');

        if (observacao) item.dados.observacao = observacao.value;
        if (peso) item.dados.peso = peso.value;

        // Campos específicos por tipo de produto
        switch (tipoProduto) {
            case 'Tradicional':
            case 'Tradicional recheado':
            case 'Colher':
                // Cascas
                const casca1 = itemDiv.querySelector('input[name^="casca_1"]');
                const casca2 = itemDiv.querySelector('input[name^="casca_2"]');
                const tipoChocolate1 = itemDiv.querySelector('select[name^="tipo-chocolate-1"]');
                const tipoChocolate2 = itemDiv.querySelector('select[name^="tipo-chocolate-2"]');

                if (casca1) item.dados.casca1 = casca1.value;
                if (tipoChocolate1) item.dados.tpchocolate1 = tipoChocolate1.value;
                if (casca2) item.dados.casca2 = casca2.value;
                if (tipoChocolate2) item.dados.tpchocolate2 = tipoChocolate2.value;

                // Recheios (apenas para recheados e colher)
                if (tipoProduto !== 'Tradicional') {
                    const recheio1 = itemDiv.querySelector('input[name^="recheio_1"]');
                    const recheio2 = itemDiv.querySelector('input[name^="recheio_2"]');

                    if (recheio1) item.dados.recheio1 = recheio1.value;
                    if (recheio2) item.dados.recheio2 = recheio2.value;
                }
                break;

            case 'Caixa de bombom':
                const tipoBombom = itemDiv.querySelector('select[name^="tipo-bombom-"]');
                const tipoRecheio = itemDiv.querySelector('select[name^="conteudo-bombom-"]');
                const recheioBombom = itemDiv.querySelector('input[name^="recheio_1"]');
                const tipoSabor = itemDiv.querySelector('select[name^="tipo-sabor-bombom-"]');

                if (tipoBombom) item.dados.tipoBombom = tipoBombom.value;
                if (tipoRecheio) item.dados.tipoRecheio = tipoRecheio.value;
                if (tipoSabor) item.dados.tipoSabor = tipoSabor.value;
                if (recheioBombom) item.dados.recheio = recheioBombom.value;
                break;
        }

        dados.itens.push(item);
    });

    return dados;
}