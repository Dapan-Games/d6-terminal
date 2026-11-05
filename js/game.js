const MIN_COMMAND_LENGTH = 10;

const MESSAGES = {
    tooShort: "Poderia elaborar mais seu pedido, o que você quer fazer?",
    notUnderstood: "Não entendi. Se estiver com dúvidas, digite \"ajuda\".",
    unclearChoice: "Não ficou claro o que deseja fazer, pode tentar me dizer de outra forma?",
    thanks: "Obrigado por jogar d6 Terminal - by Joeverson Santos",
    inBattle: "o que voce vai fazer? (se for atacar diga quantos dados 1d6, 4d6)"
};

class Game {
    constructor() {
        this.context = {};
    }

    init() {
        this.inventory = new Inventory();
        this.battle = new Battle();
        this.helper = new Helper();
        this.chapters = [];

        this.playerLoad();

        // Para adicionar um comando novo: inclua um item aqui com frases-exemplo (keys) e a função (func)
        this.commandMapper = [
            {
                name: "inventory",
                keys: ["abrir o inventário", "o que tem no inventario", "olhar a bolsa para ver o que tem", "o que estou usando"],
                type: "consulta",
                func: this.inventory.list.bind(this.inventory),
            },
            {
                name: "resume story",
                keys: ["O que você disse mesmo?", "pode repetir a história novamente?", "o que foi que você disse antes?"],
                type: "consulta",
                func: () => this.context.chapter.content,
            },
            {
                name: "help",
                keys: ["não sei o que fazer, me ajuda", "como eu jogo esse jogo?", "tenho uma dúvida, pode me explicar como funciona?", "quais são os comandos que posso usar?", "como funciona a batalha?"],
                type: "consulta",
                func: (_, context) => this.helper.explain(context),
            },
            // {
            //     name: "reload game",
            //     keys: ["quero começar tudo de novo, resete o jogo", "recomeçar o jogo novamente", "resetar o jogo"],
            //     type: "system",
            //     func: () => location.reload(),
            // },
            {
                name: "battle",
                keys: ["atacar o inimigo", "bater no bicho", "sacar a arma e ir para o ataque"],
                type: "combat",
                func: this.battle.combat.bind(this.battle),
            }
        ];

        this.embedding = new Embedding();
        this.embedding.init();
    }

    playerLoad() {
        let amountAttackDice = this.inventory.inventory.reduce((acc, item) => {
            if (item.type === "attack") return acc + parseInt(item.dice)

            return acc;
        }, 0);

        let amountDefenseDice = this.inventory.inventory.reduce((acc, item) => {
            if (item.type === "defense") return acc + parseInt(item.dice)

            return acc;
        }, 0);

        this.player = {
            name: "barbarian joy",
            attack: `${amountAttackDice}d6`,
            defense: `${amountDefenseDice}d6`,
            special: "0d6",
            debility: "0d6",
            hp: 7,
        };
    }

    startGame(chapters) {
        this.chapters = chapters;
        this.context.chapter = chapters[0];

        return this.context.chapter.content;
    }

    // --- Narrativa ---

    callNextNarrative(option) {
        const nextChapter = this.chapters.find(chapter => chapter.id === option.next);

        console.log(nextChapter);

        if (!nextChapter) return MESSAGES.unclearChoice;

        if (this.context.chapter == nextChapter && nextChapter.isFinal) return MESSAGES.thanks;

        if (nextChapter.isBattle) return this.startCombat(nextChapter);

        this.context.chapter = nextChapter;

        return this.context.chapter.content;
    }

    startCombat(battleChapter) {
        if (this.context.combat == null) {
            this.context.combat = {
                enemy: battleChapter.enemy,
                player: this.player,
                turn: 0,
                diceDefenseRemain: parseInt(this.player.defense),
                diceAttackRemain: 0
            };

            this.context.chapter = battleChapter;

            return this.context.chapter.content;
        }

        return MESSAGES.inBattle;
    }

    // --- Interpretação do texto digitado ---

    // Retorna o comando mapeado mais parecido com o texto, se algum passar do score mínimo
    async commandBrain(wordCommand) {
        const commandScores = [];

        for (const element of this.commandMapper) {
            const match = await this.embedding.processing(wordCommand, element.keys);

            if (!match) continue;

            commandScores.push({ score: match.score, element });
        }

        commandScores.sort((a, b) => b.score - a.score);

        return commandScores[0]?.element;
    }

    // Retorna a opção do capítulo atual mais parecida com o texto
    async chapterBrain(wordCommand) {
        const options = this.context.chapter.options;
        const match = await this.embedding.processing(wordCommand, options.map(option => option.content), 0.4);

        if (!match) return;

        return options[match.index];
    }

    async processor(wordCommand) {
        if (Helper.isQuickHelp(wordCommand)) return this.helper.explain(this.context);

        if (wordCommand.length < MIN_COMMAND_LENGTH) return MESSAGES.tooShort;

        const command = await this.commandBrain(wordCommand);
        const nextChapter = await this.chapterBrain(wordCommand);

        if (this.context.chapter.isBattle && command?.type === "combat") {
            return this.battle.combat(wordCommand, this.context);
        }

        if (!command && !nextChapter) return MESSAGES.notUnderstood;

        if (nextChapter) return this.callNextNarrative(nextChapter);
        if (command) return command.func(wordCommand, this.context);
    }
}

window.Game = Game;
