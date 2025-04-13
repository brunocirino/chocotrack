document.getElementById("btnFiltrar").addEventListener("click", function () {
    const tipoFiltro = document.getElementById("tipoFiltro").value;
    const valorFiltro = document.getElementById("valorFiltro").value.toLowerCase().trim();
    const pedidos = document.querySelectorAll(".conteudo .card");

    pedidos.forEach(card => {
        let exibir = false;

        if (tipoFiltro === "nome") {
            const nomeCliente = card.querySelector("p").innerText.toLowerCase();
            exibir = nomeCliente.includes(valorFiltro);
        } else if (tipoFiltro === "pedido") {
            const numeroPedido = card.querySelector("h4").innerText.toLowerCase();
            exibir = numeroPedido.includes(valorFiltro);
        } else if (tipoFiltro === "telefone") {
            const telefoneCliente = card.querySelector("p:nth-of-type(2)").innerText.toLowerCase();
            exibir = telefoneCliente.includes(valorFiltro);
        } else if (tipoFiltro === "data") {
            const dataPedido = card.querySelector("p:nth-of-type(3)").innerText.toLowerCase();
            exibir = dataPedido.includes(valorFiltro);
        }

        card.style.display = exibir ? "block" : "none";
    });
});

document.getElementById("valorFiltro").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // evita comportamentos inesperados
        document.getElementById("btnFiltrar").click(); // dispara o clique no botão
    }
});

