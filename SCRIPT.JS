// Função para mostrar a página selecionada e esconder as outras
function mostrarPagina(paginaId) {
    if (!paginaId) return;

    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(p => p.classList.remove('ativa'));

    const pagina = document.getElementById(paginaId);
    if (pagina) {
        pagina.classList.add('ativa');
    }

    const botoes = document.querySelectorAll('.nav-btn');
    botoes.forEach(botao => {
        const ativo = botao.dataset.pagina === paginaId;
        botao.classList.toggle('active', ativo);
        botao.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
}

// Função para atualizar os valores exibidos e o status da plantação
function atualizarSimulador() {
    const tempInput = document.getElementById('temperatura');
    const umidadeArInput = document.getElementById('umidadeAr');
    const umidadeSoloInput = document.getElementById('umidadeSolo');

    const tempValor = document.getElementById('tempValor');
    const arValor = document.getElementById('arValor');
    const soloValor = document.getElementById('soloValor');

    const status = document.getElementById('status');
    const morangos = document.getElementById('morangos');

    // Atualiza os spans com os valores atuais
    tempValor.textContent = tempInput.value + '°C';
    arValor.textContent = umidadeArInput.value + '%';
    soloValor.textContent = umidadeSoloInput.value + '%';

    // Lógica simples para status da plantação
    const temp = Number(tempInput.value);
    const umidadeAr = Number(umidadeArInput.value);
    const umidadeSolo = Number(umidadeSoloInput.value);

    let mensagem = '';
    let emojis = '🍓🍓🍓🍓🍓';

    // Condições ideais para morangos (exemplo)
    const tempIdeal = temp >= 18 && temp <= 28;
    const umidadeArIdeal = umidadeAr >= 60 && umidadeAr <= 80;
    const umidadeSoloIdeal = umidadeSolo >= 70 && umidadeSolo <= 85;

    if (tempIdeal && umidadeArIdeal && umidadeSoloIdeal) {
        mensagem = 'Condições ideais para os morangos 🍓';
        emojis = '🍓🍓🍓🍓🍓';
    } else {
        mensagem = 'Atenção! Ajuste as condições para melhorar a plantação.';
        // Ajusta a quantidade de morangos conforme as condições
        let count = 0;
        if (tempIdeal) count++;
        if (umidadeArIdeal) count++;
        if (umidadeSoloIdeal) count++;

        emojis = '🍓'.repeat(count) || '⚠️';
    }

    status.textContent = mensagem;
    morangos.textContent = emojis;
}

// Configura os eventos dos controles para atualizar o simulador em tempo real
function configurarEventos() {
    const controles = ['temperatura', 'umidadeAr', 'umidadeSolo'];
    controles.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', atualizarSimulador);
        }
    });

    const botoes = document.querySelectorAll('.nav-btn');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => mostrarPagina(botao.dataset.pagina));
    });
}

// Inicialização após o carregamento da página
window.addEventListener('DOMContentLoaded', () => {
    configurarEventos();
    mostrarPagina('simulador');
    atualizarSimulador();
});