cont = 2;
function atualizarCampos() {
 
    // Pega o valor da quantidade
    const qtd = parseInt(document.getElementById('qtd').value, 10); // Certifica-se de obter um número inteiro

    // Remove os produtos extras se a quantidade foi reduzida
    const produtosExistentes = document.querySelectorAll('[class^="produtos-"]');
    produtosExistentes.forEach((produto) => {
        const produtoIndex = parseInt(produto.classList[0].match(/\d+/), 10); // Extrai o número da classe
        if (produtoIndex > qtd) {
            produto.remove();
        }
    });

    // Se a quantidade de produtos for maior que 1, adicionar os novos produtos após o primeiro
    if (qtd > 1) {
        for (let i = 2; i <= qtd; i++) { 
            if (!document.querySelector(`.produtos-${i}-campos`)) {

                
                // Cria o contêiner para o novo produto
                const produtoContainer = document.createElement('div');
                produtoContainer.classList.add(`produtos-${i}-campos`);

                produtoContainer.innerHTML = `
                    <h3>Produto ${i}</h3>
                    <!-- Seletor de Produto -->
                    <div class="box-user">
                        <select id="produto-${cont}" name="produto_${cont}" onchange="LogicaCampos(${cont})" required>
                            <option value="" disabled selected>Selecione o produto</option>
                            <option value="Tradicional">Ovo Tradicional</option>
                            <option value="Tradicional recheado">Ovo Tradicional recheado</option>
                            <option value="Colher">Ovo Colher</option>
                            <option value="Caixa de bombom">Caixa de bombom</option>
                        </select>
                    </div>
                    <!-- Campos Dinâmicos -->
                    <div id="campos-dinamicos-${cont}"></div>

                     <div class="controle-botoes">
                        <button type="button" class="btn-remove" data-index="${cont}">-</button>
                        <span class="contador" data-index="${cont}">0</span>
                        <button type="button" class="btn-add" data-index="${cont}">+</button>
                    </div>

                    <!-- Divisória entre os produtos -->
                    <hr class="divisoria-produto">
                `;

                cont += 2;
                console.log(cont)
                
                // Insere o produto dinamicamente após o produto anterior
                const ultimoProduto = document.querySelector(`[class^="produtos-"]:last-of-type`);
                ultimoProduto.insertAdjacentElement('afterend', produtoContainer);
            }
        }
    }
}
