const Recheios = []; // Array para armazenar os sabores

function preencherRecheios(Recheiosarray) {
    // Limpa o array antes de adicionar novos sabores
    Recheios.length = 0; // Zera o array

    // Verifica se saboresarray é um array
    if (Array.isArray(Recheiosarray)) {
        // Adiciona os nomes dos sabores ao array
        Recheios.push(...Recheiosarray.map(item => item.nome)); // Mapeia para obter apenas os nomes
    } else {
        console.error('Esperado um array, mas recebido:', Recheiosarray);
    }
}

function filtrarRecheios(id) {

    const input = document.getElementById(`recheio-input_${id}`);
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById(`recheio-dropdown_${id}`);

    //console.log(input, dropdown, id)

    // Limpar o dropdown antes de adicionar novos itens
    dropdown.innerHTML = '';

    // Filtrar sabores
    const filtrarRecheios = Recheios.filter(recheio => recheio.toLowerCase().includes(filter));

    // Mostrar o dropdown apenas se houver resultados
    if (filtrarRecheios.length > 0) {
        dropdown.style.display = 'block';
        filtrarRecheios.forEach(recheio => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = recheio;
            item.onclick = () => {
                input.value = recheio; // Atualiza o campo de entrada com o sabor selecionado
                dropdown.style.display = 'none'; // Esconde o dropdown após a seleção
            };
            dropdown.appendChild(item);
        });
    } else {
        dropdown.style.display = 'none'; // Esconde o dropdown se não houver resultados
    }
}

// Função para carregar os sabores do banco de dados
function CarregarRecheios() {
    $.ajax({
        url: '../controller/get_Recheios.php', // Use o caminho correto
        method: 'GET',
        success: function(response) {
            console.log('Requisição AJAX bem sucedida:', response);
            preencherRecheios(response); // Preencher os sabores
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}


// Função que detecta cliques fora do input ou do dropdown e fecha o dropdown
function fecharDropdownsExteriores() {
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.dropdown');
        const inputs = document.querySelectorAll('.box-user input');
        
        dropdowns.forEach(dropdown => {
            // Verifica se o clique ocorreu fora do input ou do dropdown
            if (!dropdown.contains(event.target) && !inputs[Array.from(dropdowns).indexOf(dropdown)].contains(event.target)) {
                dropdown.style.display = 'none'; // Fecha o dropdown
            }
        });
    });
}

// Adiciona o listener para fechar o dropdown quando clicar fora
fecharDropdownsExteriores();

// Função de filtragem dos sabores
function filtrarSabores(id) {
    const input = document.getElementById(`recheio-input_${id}`);
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById(`recheio-dropdown_${id}`);

    // Limpar o dropdown antes de adicionar novos itens
    dropdown.innerHTML = '';

    // Filtrar sabores
    const filteredRecheios = Recheios.filter(recheio => recheio.toLowerCase().includes(filter));

    // Mostrar o dropdown apenas se houver resultados
    if (filteredRecheios.length > 0) {
        dropdown.style.display = 'block';
        filteredRecheios.forEach(recheio => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = recheio;
            item.onclick = () => {
                input.value = recheio; // Atualiza o campo de entrada com o sabor selecionado
                dropdown.style.display = 'none'; // Esconde o dropdown após a seleção
            };
            dropdown.appendChild(item);
        });
    } else {
        dropdown.style.display = 'none'; // Esconde o dropdown se não houver resultados
    }
}

// Chama a função de carregamento de sabores assim que a página é carregada
window.addEventListener("load", function() {
    CarregarRecheios();
});

