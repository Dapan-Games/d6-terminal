const DICE_PATTERN = /[0-9]*d6/;

// "2d6" -> 2
function diceCount(diceText) {
    return parseInt(diceText);
}

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

class Battle {
    diceRoll(amount) {
        let total = 0;

        for (let i = 0; i < amount; i++) {
            total += Math.floor(Math.random() * 6) + 1;
        }

        return total;
    }

    // Retorna uma instrução (string) se o jogador não informou dados, senão os dois turnos [jogador, inimigo]
    combat(command, context) {
        if (!DICE_PATTERN.test(command)) {
            const { player } = context.combat;
            return `o que voce vai fazer? Descreva o seu ataque diga quantos dados de ataque irá usar, você tem ${player.attack} de ataque e ${player.defense} de defesa. voce pode usar todos os dados no ataque, mas irá ficar sem dados para defesa ai o hit é certo!`;
        }

        // controle de flag para saber se está lutando pela primeira vez
        if (context.settings.isFirstBattle) context.settings.isFirstBattle = false;

        const playerNarrative = this.playerAttack(command, context);
        const enemyNarrative = this.enemyAttack(context);

        const isEnemyDie = context.combat.enemy.hp === 0;
        const healthTag = `<span class="violet">[Você - <strong>${context.combat.player.hp}HP</strong> | ${context.combat.enemy.name} - <strong>${context.combat.enemy.hp}HP</strong>]</span></br>`;

        const message = [];

        if (!isEnemyDie) message.push(healthTag);
        if (playerNarrative) message.push(...playerNarrative);
        if (enemyNarrative) message.push("", ...enemyNarrative);

        if (isEnemyDie) this.finishCombat(context);

        return message;
    }

    playerAttack(command, context) {
        const { player, enemy } = context.combat;
        const { battle } = context.chapter;

        const dice = command.match(DICE_PATTERN)[0];
        const amountDice = diceCount(dice);
        const playerDiceAttack = diceCount(player.attack);
        const playerDiceDefense = diceCount(player.defense);
        const enemyDiceDefense = diceCount(enemy.defense);

        if (amountDice > playerDiceAttack + playerDiceDefense) {
            return `Você não tem isso tudo de dados, você tem no maximo ${playerDiceAttack} dados de ataque e ${playerDiceDefense} dados de defesa`;
        }

        // dados não usados no ataque sobram para a defesa contra o contra-ataque
        if (amountDice > playerDiceAttack) context.combat.diceDefenseRemain = (playerDiceAttack + playerDiceDefense) - amountDice;
        if (amountDice < playerDiceAttack) context.combat.diceAttackRemain = playerDiceAttack - amountDice;

        const playerAttackValue = this.diceRoll(amountDice);
        const enemyDefenseValue = this.diceRoll(enemyDiceDefense);

        if (playerAttackValue < enemyDefenseValue) {
            return [
                `Você <span class="red">erra</span> o ataque.`,
                randomItem(battle.miss)
            ];
        }

        enemy.hp -= 1;

        const status = `Você <span class="green">acerta</span> o ataque.`;

        if (enemy.hp == 0) {
            context.chapter.isBattle = false;
            context.currentState = CONTEXT_STATE.Chapter

            return [
                status,
                battle.win.content
            ];
        }

        return [
            status,
            randomItem(battle.hit)
        ];
    }

    enemyAttack(context) {
        if (!context.chapter.isBattle) return;

        const { player, enemy } = context.combat;
        const { battle } = context.chapter;

        const enemyAttackValue = this.diceRoll(diceCount(enemy.attack));
        const playerDefenseValue = this.diceRoll(context.combat.diceDefenseRemain + context.combat.diceAttackRemain);

        this.restore(context);

        if (enemyAttackValue < playerDefenseValue) {
            return [
                `${enemy.name} <span class="red">erra</span> o ataque.`,
                randomItem(battle.fail)
            ];
        }

        player.hp -= 1;
        const status = `${enemy.name} <span class="green">acerta</span> o ataque.`;

        if (player.hp == 0) {
            context.chapter.isBattle = false;
            context.chapter.isFinal = true;

            return [
                status,
                `<span class="red font-big">Você morreu!! o Jogo acabou!</span>`
            ];
        }

        return [
            status,
            randomItem(battle.attack)
        ];
    }

    // devolve todos os dados de defesa ao jogador para o próximo turno
    restore(context) {
        context.combat.diceDefenseRemain = diceCount(context.combat.player.defense);
        context.combat.diceAttackRemain = 0;
    }

    finishCombat(context) {
        context.combat.isFinishCombat = true;
    }
}

window.Battle = Battle;
