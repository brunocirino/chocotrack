import { mostrarNotificacao } from '../js/Notificacao.js';

document.addEventListener("DOMContentLoaded", function() {
    // Usando Map para garantir contadores independentes
    const contadores = new Map();

    // Função para inicializar controles de quantidade
    function inicializarControlesQuantidade(container) {
        const controle = container.querySelector('.controle-botoes');
        if (!controle) return;

        const index = controle.getAttribute('data-index');
        const contador = controle.querySelector('.contador');
        
        // Garante que cada container comece com 0
        if (!contadores.has(index)) {
            contadores.set(index, 0);
            contador.textContent = '0';
        }

        // Remove event listeners antigos
        const novoBtnAdd = controle.querySelector('.btn-add').cloneNode(true);
        const novoBtnRemove = controle.querySelector('.btn-remove').cloneNode(true);

        // Adiciona novos listeners com escopo isolado
        novoBtnAdd.addEventListener('click', () => {
            const novoValor = (contadores.get(index) || 0) + 1;
            contadores.set(index, novoValor);
            contador.textContent = novoValor;
            console.log(`Container ${index}: + → ${novoValor}`);
        });
        
        novoBtnRemove.addEventListener('click', () => {
            const valorAtual = contadores.get(index) || 0;
            if (valorAtual > 0) {
                const novoValor = valorAtual - 1;
                contadores.set(index, novoValor);
                contador.textContent = novoValor;
                console.log(`Container ${index}: - → ${novoValor}`);
            }
        });

        // Substitui os botões
        controle.querySelector('.btn-add').replaceWith(novoBtnAdd);
        controle.querySelector('.btn-remove').replaceWith(novoBtnRemove);
    }

    // Observador para containers dinâmicos
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    const container = node.matches('[class*="produtos-"]') ? node : node.querySelector('[class*="produtos-"]');
                    if (container) {
                        console.log(`Novo container detectado: ${container.className}`);
                        inicializarControlesQuantidade(container);
                    }
                }
            });
        });
    });

    // Configura o observador
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Inicializa containers existentes
    document.querySelectorAll('[class*="produtos-"]').forEach((container) => {
        inicializarControlesQuantidade(container);
    });

    // Handler para o submit do formulário
    document.getElementById("pedidoForm").addEventListener("submit", function(e) {
        e.preventDefault();

        let data = {
            nome: document.querySelector('input[name="nome"]').value,
            telefone: document.querySelector('input[name="telefone"]').value,
            data: document.querySelector('input[name="data"]').value,
            qtd: parseInt(document.querySelector('input[name="qtd"]').value) || 0,
            valor: document.querySelector('input[name="valor"]').value,
            "tipo-pedido": document.querySelector('select[name="tipo-pedido"]').value,
            produto: []
        };

        let contadorCampos = 0;

        // Processa todos os containers de produtos
        document.querySelectorAll('[class*="produtos-"]').forEach(container => {
            const controle = container.querySelector('.controle-botoes');
            if (!controle) return;
            
            const index = controle.getAttribute('data-index');
            const qtdAdicional = contadores.get(index) || 0;
            
            let produto = processarProduto(contadorCampos);
            if (produto) {
                data.produto.push(produto);
                
                // Adiciona cópias se houver quantidade adicional
                for (let i = 0; i < qtdAdicional; i++) {
                    data.produto.push(JSON.parse(JSON.stringify(produto)));
                }
            }
            
            contadorCampos += (produto?.produto === "Caixa de bombom") ? 1 : 2;
        });

        // Envia os dados para o backend
        fetch("../controller/pedido.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro na resposta do servidor");
            return response.text();
        })
        .then(data => {
            mostrarNotificacao("Pedido cadastrado com sucesso!", "success");
            setTimeout(() => window.location.reload(), 1000);
        })
        .catch(error => {
            console.error("Erro:", error);
            mostrarNotificacao("Erro ao cadastrar o pedido. Tente novamente.", "error");
        });
    });

    // Função para processar os dados de um produto específico
    function processarProduto(index) {
        const selectProduto = document.querySelector(`select[name="produto_${index}"]`);
        if (!selectProduto) return null;

        const produtoSelecionado = selectProduto.value;
        let produto = { produto: produtoSelecionado };

        switch(produtoSelecionado) {
            case "Tradicional":
                produto.casca_1 = document.querySelector(`input[name="casca_${index}"]`)?.value || "";
                produto.tipo_chocolate_1 = document.querySelector(`select[name="tipo-chocolate-${index}"]`)?.value || "";
                produto.casca_2 = document.querySelector(`input[name="casca_${index+1}"]`)?.value || "";
                produto.tipo_chocolate_2 = document.querySelector(`select[name="tipo-chocolate-${index+1}"]`)?.value || "";
                produto.observacao = document.querySelector(`input[name="observacao-${index}"]`)?.value || "";
                produto.peso = document.querySelector(`select[name="peso-${index}"]`)?.value || "";
                break;
                
            case "Tradicional recheado":
                produto.casca_1 = document.querySelector(`input[name="casca_${index}"]`)?.value || "";
                produto.recheio_1 = document.querySelector(`input[name="recheio_${index}"]`)?.value || "";
                produto.tipo_chocolate_1 = document.querySelector(`select[name="tipo-chocolate-${index}"]`)?.value || "";
                produto.casca_2 = document.querySelector(`input[name="casca_${index+1}"]`)?.value || "";
                produto.recheio_2 = document.querySelector(`input[name="recheio_${index+1}"]`)?.value || "";
                produto.tipo_chocolate_2 = document.querySelector(`select[name="tipo-chocolate-${index+1}"]`)?.value || "";
                produto.observacao = document.querySelector(`input[name="observacao-${index}"]`)?.value || "";
                produto.peso = document.querySelector(`select[name="peso-${index}"]`)?.value || "";
                break;
                
            case "Colher":
                produto.casca_1 = document.querySelector(`input[name="casca_${index}"]`)?.value || "";
                produto.recheio_1 = document.querySelector(`input[name="recheio_${index}"]`)?.value || "";
                produto.tipo_chocolate_1 = document.querySelector(`select[name="tipo-chocolate-${index}"]`)?.value || "";
                produto.observacao = document.querySelector(`input[name="observacao-${index}"]`)?.value || "";
                produto.peso = document.querySelector(`select[name="peso-${index}"]`)?.value || "";
                break;
                
            case "Caixa de bombom":
                produto.tpBombom = document.querySelector(`select[name="tipo-bombom-${index}"]`)?.value || "";
                
                if (produto.tpBombom === "Maciço") {
                    produto.tpRecheio = document.querySelector(`select[name="conteudo-bombom-${index}"]`)?.value || "";
                    produto.observacao = document.querySelector(`input[name="observacao-${index}"]`)?.value || "";
                    produto.peso = document.querySelector(`select[name="peso-${index}"]`)?.value || "";
                    produto.sabor = "nulo";
                    produto.Recheio = "nulo";

                    if (produto.tpRecheio === "Especifico") {
                        produto.sabor = document.querySelector(`select[name="tipo-sabor-bombom-${index}"]`)?.value || "";
                    }
                } else if (produto.tpBombom === "Recheado") {
                    produto.Recheio = document.querySelector(`input[name="recheio_${index}"]`)?.value || "";
                    produto.observacao = document.querySelector(`input[name="observacao-${index}"]`)?.value || "";
                    produto.peso = document.querySelector(`select[name="peso-${index}"]`)?.value || "";
                    produto.sabor = "nulo";
                    produto.tpRecheio = "nulo";
                }
                break;
                
            default:
                return null;
        }

        return produto;
    }
});