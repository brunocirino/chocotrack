export function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.getElementById('notificacao');
    const notificacaoMensagem = document.getElementById('notificacao-mensagem');
    const notificacaoIcone = document.getElementById('notificacao-icone');

    notificacaoMensagem.textContent = mensagem;
    notificacao.className = `notificacao ${tipo}`;

    // Adiciona um ícone com base no tipo
    if (tipo === 'success') {
        notificacaoIcone.innerHTML = '✔️'; // Ou use um ícone do FontAwesome
    } else if (tipo === 'error') {
        notificacaoIcone.innerHTML = '❌';
    }

    notificacao.classList.remove('escondido');
    notificacao.classList.add('mostrar');

    setTimeout(() => {
        notificacao.classList.remove('mostrar');
        notificacao.classList.add('escondido');
    }, 3000);
}