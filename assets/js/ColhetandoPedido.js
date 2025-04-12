import { mostrarNotificacao } from '../js/Notificacao.js';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pedidoForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let data = {};

        // Seleciona os campos específicos do formulário
        data["nome"] = document.querySelector('input[name="nome"]').value;
        data["telefone"] = document.querySelector('input[name="telefone"]').value;
        data["data"] = document.querySelector('input[name="data"]').value;
        data["qtd"] = parseInt(document.querySelector('input[name="qtd"]').value); 
        data["valor"] = document.querySelector('input[name="valor"]').value;

        // Cria o array de produtos com base na quantidade
        let produtos = [];

        var contProd = 1
        var cont = 0
        var y = 1
        var tpcont = 2

        for (let i = 0; i < data["qtd"]; i++) {

            data["produto"] = document.querySelector(`select[name="produto_${cont}"]`).value;

            var produto = {
                produto: data["produto"],  
            };

            console.log(produto)

            console.log("i:"+ i, "cont:" + cont, "y:"+y)
            // Coleta os campos específicos com base no tipo de produto
            if (data["produto"] === "Tradicional") {
                produto.casca_1 = document.querySelector(`input[name="casca_${cont}"]`).value;
                produto.tipo_chocolate_1 = document.querySelector(`select[name="tipo-chocolate-${cont}"]`).value;
                produto.casca_2 = document.querySelector(`input[name="casca_${cont+1}"]`).value;
                produto.tipo_chocolate_2 = document.querySelector(`select[name="tipo-chocolate-${cont+1}"]`).value;
                produto.observacao = document.querySelector(`input[name="observacao-${cont}"]`).value;
                produto.peso = document.querySelector(`select[name="peso-${cont}"]`).value;
                

            }
            else if (data["produto"] === "Tradicional recheado") {
                produto.casca_1 = document.querySelector(`input[name="casca_${cont}"]`).value;
                produto.recheio_1 = document.querySelector(`input[name="recheio_${cont}"]`).value;
                produto.tipo_chocolate_1 = document.querySelector(`select[name="tipo-chocolate-${cont}"]`).value;
                produto.casca_2 = document.querySelector(`input[name="casca_${cont+1}"]`).value;
                produto.recheio_2 = document.querySelector(`input[name="recheio_${cont+1}"]`).value;
                produto.tipo_chocolate_2 = document.querySelector(`select[name="tipo-chocolate-${cont+1}"]`).value;
                produto.observacao = document.querySelector(`input[name="observacao-${cont}"]`).value;
                produto.peso = document.querySelector(`select[name="peso-${cont}"]`).value;
                
            }
            else if (data["produto"] === "Colher") {
                produto.casca_1 = document.querySelector(`input[name="casca_${cont}"]`).value;
                produto.recheio_1 = document.querySelector(`input[name="recheio_${cont}"]`).value;
                produto.tipo_chocolate_1 = document.querySelector(`select[name="tipo-chocolate-${cont}"]`).value;
                produto.observacao = document.querySelector(`input[name="observacao-${cont}"]`).value;
                produto.peso = document.querySelector(`select[name="peso-${cont}"]`).value;
                
            }
            else if (data["produto"] === "Caixa de bombom") {

                    produto.tpBombom = document.querySelector(`select[name="tipo-bombom-${cont}"]`).value;

                    if (produto.tpBombom === "Maciço"){

                        produto.tpRecheio = document.querySelector(`select[name="conteudo-bombom-${cont}"]`).value;
                        produto.observacao = document.querySelector(`input[name="observacao-${cont}"]`).value;
                        produto.peso = document.querySelector(`select[name="peso-${cont}"]`).value;
                        produto.sabor = "nulo";
                        produto.Recheio = "nulo"


                        if (produto.tpRecheio === "Especifico"){
                            produto.sabor = document.querySelector(`select[name="tipo-sabor-bombom-${cont}"]`).value;
                            produto.observacao = document.querySelector(`input[name="observacao-${cont}"]`).value;
                            produto.peso = document.querySelector(`select[name="peso-${cont}"]`).value;
                            
                        }
                        
                        
                    }else if (produto.tpBombom === "Recheado"){

                        produto.Recheio = document.querySelector(`input[name="recheio_${cont}"]`).value;
                        produto.observacao = document.querySelector(`input[name="observacao-${cont}"]`).value;
                        produto.peso = document.querySelector(`select[name="peso-${cont}"]`).value; 
                        produto.sabor = "nulo";
                        produto.tpRecheio = "nulo";
                    } 
            }

            y += data["qtd"]
            cont += 2

            // Adiciona o produto ao array de produtos
            produtos.push(produto);
        }

        // Substitui 'produto' por produtos no objeto final
        data["produto"] = produtos;

        console.log(data)

        // Envia os dados via Fetch para o backend
        fetch("../controller/pedido.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.text()) // Em vez de .json(), use .text() para ver o erro real
        .then(data => {
            // Se a requisição foi bem-sucedida, exibe uma notificação de sucesso
            mostrarNotificacao("Pedido cadastrado com sucesso!", "success");
            console.log("Resposta do servidor:", data);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
        .catch(error => {
            // Se ocorrer um erro, exibe uma notificação de erro
            mostrarNotificacao("Erro ao cadastrar o pedido. Tente novamente.", "error");
            console.error("Erro:", error);
        });
    })
});
