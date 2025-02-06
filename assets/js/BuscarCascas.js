const Cascas = []; // Array para armazenar os sabores

function preencherCascas(Cascasarray) {
    // Limpa o array antes de adicionar novos sabores
    Cascas.length = 0; // Zera o array

    // Verifica se saboresarray é um array
    if (Array.isArray(Cascasarray)) {
        // Adiciona os nomes dos sabores ao array
        Cascas.push(...Cascasarray.map(item => item.nome)); // Mapeia para obter apenas os nomes
    } else {
        console.error('Esperado um array, mas recebido:', Cascasarray);
    }
}

function filtrarCascas(id) {
    const input = document.getElementById(`casca-input_${id}`);
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById(`casca-dropdown_${id}`);

    //console.log(input, dropdown, id)

    // Limpar o dropdown antes de adicionar novos itens
    dropdown.innerHTML = '';

    // Filtrar sabores
    const filteredCascas = Cascas.filter(casca => casca.toLowerCase().includes(filter));

    // Mostrar o dropdown apenas se houver resultados
    if (filteredCascas.length > 0) {
        dropdown.style.display = 'block';
        filteredCascas.forEach(casca => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = casca;
            item.onclick = () => {
                input.value = casca; // Atualiza o campo de entrada com o sabor selecionado
                dropdown.style.display = 'none'; // Esconde o dropdown após a seleção
            };
            dropdown.appendChild(item);
        });
    } else {
        dropdown.style.display = 'none'; // Esconde o dropdown se não houver resultados
    }
}

// Função para carregar os sabores do banco de dados
function CarregarCascas() {
    $.ajax({
        url: '../controller/get_Cascas.php', // Use o caminho correto
        method: 'GET',
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            preencherCascas(response); // Preencher os sabores
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

// Chama a função de carregamento de sabores assim que a página é carregada
window.addEventListener("load", function() {
    CarregarCascas();
});
