const MIN_COMMAND_LENGTH = 5;
// Score mínimo (cosseno) para aceitar um comando e diferença mínima para o 2º colocado
const COMMAND_MIN_SCORE = 0.6;

const MESSAGES = {
    tooShort: "Poderia elaborar mais seu pedido, o que você quer fazer?",
    notUnderstood: "Não entendi o que você quiz dizer. Se estiver com dúvidas, digite \"ajuda\".",
    unclearChoice: "Não ficou claro o que deseja fazer, pode tentar me dizer de outra forma?",
    thanks: "Obrigado por jogar d6 Terminal - by Joeverson Santos",
    inBattle: "o que voce vai fazer? (se for atacar diga quantos dados 1d6, 4d6)"
};
const CONTEXT_STATE = {
    None: 'NONE',
    Chapter: 'CHAPTER',
    Consult: 'CONSULT',
    Combat: 'COMBAT',
    System: 'SYSTEM',
    EndGame: 'END_GAME'
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
                keys: ["inventário", "bolsa"],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.list.bind(this.inventory)
            },
            {
                name: "details equipamment",
                keys: ["analisar"],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.desctiption.bind(this.inventory),
            },
            {
                name: "equip",
                keys: ["equipar", "equip", "usar clava de madeira", "equipar clava de madeira"],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.equip.bind(this.inventory),
                validations: [
                    // (context) => !context.is(CONTEXT_STATE.Combat)
                ]
            },
            {
                name: "use item",
                keys: ["beber"],
                type: CONTEXT_STATE.Consult,
                func: this.inventory.use.bind(this.inventory),
            },
            {
                name: "resume story",
                keys: [
                    "quero ouvir a história de novo",
                    "me repete o que você disse",
                    "peraí, o que tava acontecendo mesmo?",
                    "como estava a cena atual?",
                    "repetir",
                    "continuar história"
                ],
                type: CONTEXT_STATE.Chapter,
                func: (_, context) => this.narrative(context.chapter),
            },
            {
                name: "help",
                keys: [
                    "quero saber como jogar",
                    "me explica como esse jogo funciona",
                    "tô perdido, o que eu faço?",
                    "tem algum tutorial aí?",
                    "ajuda",
                    "como jogar"
                ],
                type: CONTEXT_STATE.Consult,
                func: (_, context) => this.helper.explain(context),
            },
            {
                name: "reload game",
                keys: ["resetar o jogo"],
                type: CONTEXT_STATE.System,
                func: () => location.reload(),
            },
            {
                name: "battle",
                keys: [
                    "quero atacar o inimigo",
                    "me prepara pra atacar com a arma",
                    "bora partir pra cima do bicho",
                    "dá pra bater nele agora?",
                    "atacar",
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
            hp: 50,
        };
    }

    startGame(chapters) {
        this.chapters = chapters;
        const chapter = chapters[0];

        // const internalCommand = this.commandMapper[0];
        // this.context.currentState = internalCommand.type;
        // return internalCommand.func(undefined, this.context);

        return this.narrative(chapter);
    }

    // --- Narrativa ---
    /**
     * metodo valida se vem func(que indica que é um tipo de comando interno)
    */
    nextNarrative(option) {
        if (option?.isInternalCommand) return option.func(undefined, this.context);

        const nextChapter = this.chapters.find(chapter => chapter.id === option.next);

        if (!nextChapter) return MESSAGES.unclearChoice;

        return this.narrative(nextChapter);
    }

    narrative(chapter) {
        if (!chapter) return MESSAGES.unclearChoice;

        if (this.context.chapter == chapter && chapter.isFinal) return MESSAGES.thanks;

        if (chapter.isBattle) return this.startCombat(chapter);

        this.context.chapter = chapter;
        this.context.currentState = CONTEXT_STATE.Chapter;

        const rewardLines = this.inventory.grantReward(chapter);

        if (rewardLines.length) return [this.context.chapter.content, "", ...rewardLines];

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

    async brain(phaseInput) {
        const allKeys = [];
        const options = this.context?.chapter?.options || [];

        allKeys.push(...this.commandMapper.flatMap(element => element.keys));
        allKeys.push(...options.map(option => option.content));

        const scores = await this.embedding.scores(phaseInput, allKeys);

        // melhor score de cada comando (maior entre as suas frases)
        let offset = 0;
        const commandScores = [...this.commandMapper, ...options]
            .map(element => {
                const length = element.keys ? element.keys.length : 1;
                const keyScores = scores.slice(offset, offset + length);
                offset += length;

                return {
                    score: Math.max(...keyScores),
                    element: {
                        ...element,
                        isInternalCommand: !!element?.func // flag para definir se é comando interno ou é narrativo
                    },
                    type: element.type || CONTEXT_STATE.Chapter
                };
            })
            .sort((a, b) => b.score - a.score);

        console.log("============ score commandos =============");
        console.log(commandScores);

        const [bestOutput] = commandScores;

        console.log(`Escolhodo:`);
        console.log(bestOutput);

        if (!bestOutput || bestOutput.score <= COMMAND_MIN_SCORE) return;


        return bestOutput;
    }

    async processor(input) {
        if (Helper.isQuickHelp(input)) return this.helper.explain(this.context);

        if (this.context.is(CONTEXT_STATE.EndGame)) return MESSAGES.thanks;

        if (input.length < MIN_COMMAND_LENGTH) return MESSAGES.tooShort;

        const brain = await this.brain(input);

        if (!brain || !this.context.chapter.isBattle && brain?.type === CONTEXT_STATE.Combat) {
            this.context.currentState = CONTEXT_STATE.System;
            return MESSAGES.notUnderstood;
        }

        if (this.context.chapter.isBattle && brain?.type === CONTEXT_STATE.Combat) {
            return this.battle.combat(input, this.context);
        }

        if (brain.type === CONTEXT_STATE.Chapter) return this.nextNarrative(brain.element);

        const isvalid = brain.element.validations?.every(validation => validation(this.context));

        if (brain.element.validations && !isvalid) {
            this.context.currentState = CONTEXT_STATE.Consult;
            return `Você não pode fazer isso agora.`;
        }

        this.context.currentState = brain.type;
        return await brain.element.func(input, this.context);
    }
}

window.Game = Game;
