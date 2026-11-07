// Explica o básico do jogo conforme a situação atual do jogador
class Helper {
    // Palavras curtas que acionam a ajuda sem passar pelo limite mínimo de caracteres
    static QUICK_WORDS = ["ajuda", "help", "?", "socorro"];

    static isQuickHelp(text) {
        return Helper.QUICK_WORDS.includes(text.trim().toLowerCase());
    }

    explain(context) {
        const inBattle = context.chapter?.isBattle === true;
        
        context.currentState = CONTEXT_STATE.Consult;

        return [
            this.basics(),
            inBattle ? this.battleHelp(context) : this.explorationHelp(),
            this.commandsHelp()
        ].join("<br><br>");
    }

    basics() {
        return "<b>Como jogar:</b> eu narro a história e você responde escrevendo, em frases livres, o que seu personagem faz. Não precisa copiar as opções, basta dizer com suas palavras o que quer fazer.";
    }

    explorationHelp() {
        return "<b>Explorando:</b> leia a história e escolha um dos caminhos descritos. Exemplo: se há uma trilha e um riacho, escreva \"vou seguir pela trilha entre as árvores\". Frases com menos de 10 caracteres são consideradas curtas demais.";
    }

    battleHelp(context) {
        const player = context.combat?.player;
        const attack = player ? parseInt(player.attack) : "?";
        const defense = player ? parseInt(player.defense) : "?";

        return `<b>Em batalha:</b> descreva seu ataque e diga quantos dados vai usar, por exemplo "ataco o lobo com 2d6". Você tem ${attack} dado(s) de ataque e ${defense} de defesa. Seus dados rolam contra os da defesa do inimigo, e se o seu total for maior ou igual você causa 1 de dano. Dados que você não gasta no ataque ficam para defesa no contra-ataque. Usar todos no ataque deixa o inimigo acertar você com certeza. Cada acerto tira 1 HP, e quem chegar a 0 perde.`;
    }

    commandsHelp() {
        const commands = [
            {
                command: "Inventário",
                description: "Lista todos os items que você possui"
            },
            {
                command: "Analisar [equipamento/item]",
                description: "mostra detalhes sobre o item como nome, descrição, etc."
            },
            {
                command: "Equipar [arma/item]",
                description: "Equipa o item informado, como usar nova espada ou escudo."
            },
            {
                command: "Beber [item]",
                description: "Ação para beber uma poção"
            },
        ]

        const render = commands.map(m => `<br>- <span class="yellow">${m.command}</span> - ${m.description}`);

        return `<b>Você também pode dar commando:</b>${render}`;
    }
}

window.Helper = Helper;
