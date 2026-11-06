const MIN_COMMAND_LENGTH = 5;
// Score mínimo (cosseno) para aceitar um comando e diferença mínima para o 2º colocado
const COMMAND_MIN_SCORE = 0.5;
const COMMAND_MIN_MARGIN = 0.05;

const MESSAGES = {
    tooShort: "Poderia elaborar mais seu pedido, o que você quer fazer?",
    notUnderstood: "Não entendi. Se estiver com dúvidas, digite \"ajuda\".",
    unclearChoice: "Não ficou claro o que deseja fazer, pode tentar me dizer de outra forma?",
    thanks: "Obrigado por jogar d6 Terminal - by Joeverson Santos",
    inBattle: "o que voce vai fazer? (se for atacar diga quantos dados 1d6, 4d6)"
};
const CONTEXT_STATE = {
    None: 0,
    Chapter: 1,
    Consult: 2,
    Combat: 3,
    System: 4,
    EndGame: 5
}

class Game {
    constructor() {
        this.context = {
            chapter: null,
            combat: null,
            player: null,
            currentState: CONTEXT_STATE.None,
            is: (state) => this.context.currentState === state,
            settings: {
                isFirstBattle: true,
            }
        };
    }

    init() {
        this.inventory = new Inventory();
        this.context.inventory = this.inventory;
        this.battle = new Battle();
        this.helper = new Helper();
        this.chapters = [];

        this.playerLoad();

        // Para adicionar um comando novo: inclua um item aqui com frases-exemplo (keys) e a função (func)
        this.commandMapper = [
            {
                name: "inventory",
                keys: [
                    "abrir o inventário",
                    "quero ver o meu inventário",
                    "o que tem na minha bolsa?",
                    "olhar a mochila para ver o que eu tenho",
                    "listar todos os meus itens",
                    "quais equipamentos eu estou usando agora?",
                    "mostre meus itens e poções"
                ],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.list.bind(this.inventory),
            },
            {
                name: "details equipamment",
                keys: [
                    "quero ver os detalhes",
                    "me descreva esse",
                    "me descreva 0",
                    "me fale mais sobre",
                    "examinar a ",
                    "examinar o ",
                    "o que esse item faz?",
                    "quais são os atributos",
                    "inspecionar a"
                ],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.desctiption.bind(this.inventory),
            },
            {
                name: "equip",
                keys: [
                    "quero equipar a",
                    "eu quero equipar a",
                    "equipe o ",
                    "equipe a ",
                    "colocar a",
                    "quero vestir a",
                ],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.equip.bind(this.inventory),
            },
            {
                name: "use item",
                keys: [
                    "quero beber uma poção de cura",
                    "usar a poção para me curar",
                    "tomar o elixir para recuperar vida",
                    "vou beber a poção para me recuperar",
                    "estou ferido, preciso me curar",
                    "consumir uma poção para recuperar meus pontos de vida"
                ],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.use.bind(this.inventory),
            },
            {
                name: "resume story",
                keys: [
                    "o que você disse mesmo?",
                    "pode repetir a história novamente?",
                    "o que foi que você disse antes?",
                    "não entendi a cena, repita por favor",
                    "pode narrar de novo o que está acontecendo?",
                    "qual é a situação atual?",
                    "pode continuar a história"
                ],
                type: CONTEXT_STATE.Chapter,
                func: (_, context) => this.narrative(context.chapter),
            },
            {
                name: "help",
                keys: [
                    "não sei o que fazer, me ajuda",
                    "como eu jogo esse jogo?",
                    "tenho uma dúvida, pode me explicar como funciona?",
                    "quais são os comandos que posso usar?",
                    "como funciona a batalha?",
                    "como faço para atacar ou me defender?",
                    "explique as regras do jogo"
                ],
                type: CONTEXT_STATE.Consult,
                func: (_, context) => this.helper.explain(context),
            },
            // {
            //     name: "reload game",
            //     keys: ["quero começar tudo de novo, resete o jogo", "recomeçar o jogo novamente", "resetar o jogo"],
            //     type: CONTEXT_STATE.System,
            //     func: () => location.reload(),
            // },
            {
                name: "battle",
                keys: [
                    "atacar o",
                    "sacar a arma e",
                    "vou atacar com a",
                    "bater com",
                    "brandir a",
                    "golpear com",
                    "investir contra o inimigo com tudo",
                    "lutar"
                ],
                type: CONTEXT_STATE.Combat,
                func: this.battle.combat.bind(this.battle),
            }
        ];

        this.embedding = new Embedding();
        this.embedding.init();
    }

    playerLoad() {
        let attackDice = this.inventory.inventory.find(f => f.isEquiped && f.type === "attack") || {};
        let defenseDice = this.inventory.inventory.find(f => f.isEquiped && f.type === "defense") || {};

        this.context.player = {
            name: "player",
            attack: attackDice?.dice || "0d6",
            defense: defenseDice?.dice || "0d6",
            special: "0d6",
            debility: "0d6",
            hp: 7,
        };
    }

    startGame(chapters) {
        this.chapters = chapters;
        const chapter = chapters[0];

        // this.context.currentState = CONTEXT_STATE.Consult
        // return this.commandMapper[0].func(undefined, this.context);
        return this.narrative(chapter);
    }

    // --- Narrativa ---

    nextNarrative(option) {
        const nextChapter = this.chapters.find(chapter => chapter.id === option.next);

        if (!nextChapter) return MESSAGES.unclearChoice;

        return this.narrative(nextChapter);
    }

    narrative(chapter) {
        // const chapter = isResume ? this.context.chapter : this.chapters.find(chapter => chapter.id === option.next);

        console.log(chapter);

        if (!chapter) return MESSAGES.unclearChoice;

        if (this.context.chapter == chapter && chapter.isFinal) return MESSAGES.thanks;

        if (chapter.isBattle) return this.startCombat(chapter);

        this.context.chapter = chapter;
        this.context.currentState = CONTEXT_STATE.Chapter;

        const rewardLines = this.inventory.grantReward(chapter);

        if (rewardLines.length) return [this.context.chapter.content, ...rewardLines];

        return this.context.chapter.content;
    }

    startCombat(battleChapter) {
        if (this.context.combat == null || this.context.combat.isFinishCombat) {
            this.context.combat = {
                enemy: battleChapter.enemy,
                player: this.context.player,
                turn: 0,
                diceDefenseRemain: parseInt(this.context.player.defense),
                diceAttackRemain: 0,
                isFinishCombat: false
            };
        }

        this.context.chapter = battleChapter;
        this.context.currentState = CONTEXT_STATE.Combat;

        return this.context.chapter.content;
    }

    // --- Interpretação do texto digitado ---

    // Retorna o comando mapeado mais parecido com o texto, se algum passar do score mínimo
    async commandBrain(wordCommand) {
        const allKeys = this.commandMapper.flatMap(element => element.keys);
        const scores = await this.embedding.scores(wordCommand, allKeys);

        // melhor score de cada comando (maior entre as suas frases)
        let offset = 0;
        const commandScores = this.commandMapper.map(element => {
            const keyScores = scores.slice(offset, offset + element.keys.length);
            offset += element.keys.length;

            return { score: Math.max(...keyScores), element };
        });

        commandScores.sort((a, b) => b.score - a.score);

        console.log("============ score commandos =============");
        console.log(commandScores.map(c => ({ name: c.element.name, score: c.score })));

        const [best, second] = commandScores;

        if (!best || best.score <= COMMAND_MIN_SCORE) return;

        // evita escolher quando dois comandos estão praticamente empatados
        // if (second && best.score - second.score < COMMAND_MIN_MARGIN) return;

        return best.element;
    }

    // Retorna a opção do capítulo atual mais parecida com o texto
    async chapterBrain(wordCommand) {
        const options = this.context.chapter.options;
        const match = await this.embedding.processing(wordCommand, options.map(option => option.content), 0.5);

        if (!match) return;

        return options[match.index];
    }

    async processor(wordCommand) {
        if (Helper.isQuickHelp(wordCommand)) return this.helper.explain(this.context);

        if (this.context.is(CONTEXT_STATE.EndGame)) return MESSAGES.thanks;

        if (wordCommand.length < MIN_COMMAND_LENGTH) return MESSAGES.tooShort;

        const command = await this.commandBrain(wordCommand);
        const nextChapter = await this.chapterBrain(wordCommand);

        if (this.context.chapter.isBattle && command?.type === "combat") {
            return this.battle.combat(wordCommand, this.context);
        }

        if (!command && !nextChapter) return MESSAGES.notUnderstood;

        if (nextChapter) return this.nextNarrative(nextChapter);
        if (command) {
            this.context.currentState = command.type;
            return await command.func(wordCommand, this.context);
        }
    }
}

window.Game = Game;
