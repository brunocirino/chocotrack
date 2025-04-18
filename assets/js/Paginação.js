import { gerarCard } from '../js/consultarPedidos.js';

export class Paginacao {
    constructor(itensPorPagina = 40) {
        // Valores padrão
        this.itensPorPagina = itensPorPagina;
        this.paginaAtual = 1;
        this.totalPaginas = 1;
        this.dadosFiltrados = [];
        
        // Verifica se os elementos DOM existem
        try {
            this.listaPedidos = document.getElementById('lista-pedidos');
            this.btnAnterior = document.getElementById('paginaAnterior');
            this.btnProximo = document.getElementById('proximaPagina');
            this.spanPaginaAtual = document.getElementById('paginaAtual');
            
            if (!this.listaPedidos || !this.btnAnterior || !this.btnProximo || !this.spanPaginaAtual) {
                throw new Error('Elementos de paginação não encontrados no DOM');
            }
            
            this.configurarEventos();
        } catch (error) {
            console.error('Erro ao inicializar paginação:', error);
        }
    }
    
    configurarEventos() {
        // Remove event listeners existentes para evitar duplicação
        this.btnAnterior.replaceWith(this.btnAnterior.cloneNode(true));
        this.btnProximo.replaceWith(this.btnProximo.cloneNode(true));
        
        // Atualiza referências dos botões
        this.btnAnterior = document.getElementById('paginaAnterior');
        this.btnProximo = document.getElementById('proximaPagina');
        
        // Adiciona novos listeners
        this.btnAnterior.addEventListener('click', () => this.paginaAnterior());
        this.btnProximo.addEventListener('click', () => this.proximaPagina());
    }
    
    atualizarDados(dados) {
        if (!Array.isArray(dados)) {
            console.error('Dados fornecidos não são um array:', dados);
            return;
        }
        
        this.dadosFiltrados = dados;
        this.totalPaginas = Math.max(1, Math.ceil(dados.length / this.itensPorPagina));
        this.paginaAtual = 1;
        this.atualizarBotoes();
        this.exibirDadosPaginaAtual();
    }
    
    exibirDadosPaginaAtual() {
        try {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
            const fim = inicio + this.itensPorPagina;
            const dadosPagina = this.dadosFiltrados.slice(inicio, fim);
            
            this.exibirPedidos(dadosPagina);
            this.atualizarContadorPagina();
        } catch (error) {
            console.error('Erro ao exibir dados da página:', error);
        }
    }
    
    exibirPedidos(pedidos) {
        try {
            this.listaPedidos.innerHTML = '';
            
            if (!pedidos || pedidos.length === 0) {
                this.listaPedidos.innerHTML = '<p class="sem-pedidos">Nenhum pedido encontrado</p>';
                return;
            }
            
            pedidos.forEach(pedido => {
                try {
                    const cardHTML = gerarCard(pedido);
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(cardHTML, 'text/html');
                    const cardElement = doc.body.firstChild;
                    
                    if (cardElement) {
                        this.listaPedidos.appendChild(cardElement);
                    }
                } catch (error) {
                    console.error('Erro ao gerar card para pedido:', pedido, error);
                }
            });
            
            this.configurarEventosCards();
        } catch (error) {
            console.error('Erro ao exibir pedidos:', error);
        }
    }
    
    configurarEventosCards() {
        // Configura eventos para cada card
        const configurarEvento = (seletor, evento, callback) => {
            document.querySelectorAll(seletor).forEach(element => {
                element.removeEventListener(evento, callback);
                element.addEventListener(evento, callback);
            });
        };
        
        // Evento de edição
        configurarEvento('.btn-editar', 'click', (e) => {
            const pedidoId = e.currentTarget.closest('.card').dataset.pedidoId;
            if (typeof window.EditarPedido === 'function') {
                window.EditarPedido(pedidoId);
            }
        });
        
        // Evento de exclusão
        configurarEvento('.btn-excluir', 'click', (e) => {
            const pedidoId = e.currentTarget.closest('.card').dataset.pedidoId;
            if (typeof window.confirmarExclusao === 'function') {
                window.confirmarExclusao(pedidoId);
            }
        });
        
        // Evento de status
        configurarEvento('.status-select', 'change', (e) => {
            if (typeof window.atualizarStatus === 'function') {
                window.atualizarStatus(e.target);
            }
        });
    }
    
    atualizarContadorPagina() {
        this.spanPaginaAtual.textContent = `Página ${this.paginaAtual} de ${this.totalPaginas}`;
    }
    
    paginaAnterior() {
        if (this.paginaAtual > 1) {
            this.paginaAtual--;
            this.exibirDadosPaginaAtual();
            this.atualizarBotoes();
        }
    }
    
    proximaPagina() {
        if (this.paginaAtual < this.totalPaginas) {
            this.paginaAtual++;
            this.exibirDadosPaginaAtual();
            this.atualizarBotoes();
        }
    }
    
    atualizarBotoes() {
        this.btnAnterior.disabled = this.paginaAtual === 1;
        this.btnProximo.disabled = this.paginaAtual === this.totalPaginas;
    }
    
    // Método para forçar a re-renderização da página atual
    atualizarPaginaAtual() {
        this.exibirDadosPaginaAtual();
    }
}