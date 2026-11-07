const masterLine = (text, context) => {
    let actions = '';

    if (context.chapter?.options && context.is(CONTEXT_STATE.Chapter)) {
        actions = '<ul>';
        
        context.chapter.options.forEach(f => actions += `<li>${f.content}</li>`);
        
        actions += '</ul>';
    }

    // badge incombate
        
    const badgeInCombat = context.is(CONTEXT_STATE.Combat) ? `<span class="red">[COMBATE INICIADO]</span>` : '';

    return [
        `<div><p class="yellow">$> Mestre: ${badgeInCombat}</p><div class="card">${text}</div></div>`,
        context.is(CONTEXT_STATE.Chapter) && `<div><p class="yellow">$> Mestre: o que você quer fazer?</p> ${actions}</div>` || "",
        context.is(CONTEXT_STATE.Consult) && `<div><p class="yellow">$> Mestre: </p> Narrativa em espera, diga 'continuar' para avançarmos no enredo. </div>` || "",
        (context.is(CONTEXT_STATE.Combat) && context.settings.isFirstBattle) && `<div><p class="yellow">$> Mestre: <span class="blue">[DICA]</span></p>Em combate, a narrativa e a mecânica caminham juntas. Diga-me como seu personagem executa a investida e quantos dados você está lançando — seja <strong class="yellow">1d6</strong>, <strong class="yellow">2d6</strong> ou mais. Confirme sempre no seu inventário o que sua arma tem capacidade de causar.</div>` || "",
        context.is(CONTEXT_STATE.EndGame) && `<div><p class="yellow">$> Mestre: <span class="blue">[DICA]</span></p>Quer jogar outra aventura? ou tentar algo diferente? recarregue a pagina!.</div>` || "",
    ];
}
const ARRAY_LINE_DELAY_MS = 400;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Interface do terminal: imprime linhas, lê o input e mantém o histórico (setas ↑ ↓)
class Terminal {
    constructor(game) {
        this.game = game;
        this.terminal = document.getElementById('terminal');
        this.output = document.getElementById('output');
        this.header = document.getElementById('header');
        this.history = document.getElementById('history');
        this.input = document.getElementById('input');
        this.terminalHistory = [];
        this.historyIndex = 0;
    }

    start(chapters) {
        this.input.addEventListener('keydown', (e) => this.onKeyDown(e));
        this.terminal.addEventListener('click', () => this.input.focus());

        this.printHeader(`<div style="text-align:center">$> Bem vindo ao d6 Terminal, um jogo de RPG textual.\n <p>[Campanha caça ao ogro]</p></div>`);
        this.printResult(this.game.startGame(chapters), 'cmd');
    }

    printTerminal(html, cls = '') {
        const div = document.createElement('div');
        div.className = 'line ' + cls;
        div.innerHTML = html;
        this.output.appendChild(div);
        this.terminal.scrollTop = 0;
    }
    printHeader(html, cls = '') {
        const div = document.createElement('div');
        div.className = 'line ' + cls;
        div.innerHTML = html;
        this.header.appendChild(div);
        this.terminal.scrollTop = 0;
    }
    printHistory(html) {
        const itens = Array.from(html.children);

        itens.forEach(item => {
            this.history.appendChild(item);
        });

        this.terminal.scrollTop = 0
    }

    onKeyDown(e) {
        if (e.key === 'Enter') this.submit();
        else if (e.key === 'ArrowUp') this.historyPrevious(e);
        else if (e.key === 'ArrowDown') this.historyNext(e);
    }

    async submit() {
        const command = this.input.value.trim();
        this.input.value = '';
        this.printTerminal(`<p class="green">$> Você:</p> ${command}`, 'cmd');

        if (!command) return;

        this.terminalHistory.push(command);
        this.historyIndex = this.terminalHistory.length;

        try {
            await this.printResult(await this.game.processor(command));
        } catch (err) {
            console.error(err)
            this.printTerminal(err.message || String(err), 'error');
        }
    }

    // Aceita string (uma fala) ou array (várias falas exibidas com pausa entre elas)
    async printResult(result) {
        if (result === undefined || result === null) return;

        // limpando a tela
        this.printHistory(this.output);
        this.output.innerHTML = '';

        if (typeof result === 'string') this.printTerminal(masterLine(result, this.game.context).join(''), 'cmd');

        if (Array.isArray(result)) {
            this.printTerminal(masterLine(result.join('</br>'), this.game.context).join(''), 'cmd');
        }
    }

    historyPrevious(e) {
        e.preventDefault();
        if (this.historyIndex > 0) this.input.value = this.terminalHistory[--this.historyIndex];
    }

    historyNext(e) {
        e.preventDefault();
        this.historyIndex = Math.min(this.historyIndex + 1, this.terminalHistory.length);
        this.input.value = this.terminalHistory[this.historyIndex] || '';
    }
}

const game = new Game();

window.addEventListener('DOMContentLoaded', () => {
    game.init();

    new Terminal(game).start(ogreHunter);
});
