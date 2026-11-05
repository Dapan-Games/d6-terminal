const DICE_PATTERN = /[0-9]*d6/;

// "2d6" -> 2
function diceCount(diceText) {
    return parseInt(diceText);
}

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

class Battle {
    rolldice(amount) {
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
        if (context.combat.isFirst) context.combat.isFirst = false; 

        return [
            this.playerAttack(command, context), 
            this.enemyAttack(context)
        ];
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

        const playerAttackValue = this.rolldice(amountDice);
        const enemyDefenseValue = this.rolldice(enemyDiceDefense);

        console.log(`voce escolheu o dado ${dice} ele rolou player ${playerAttackValue}, enemy ${enemyDefenseValue}`);

        if (playerAttackValue < enemyDefenseValue) {
            return `${player.name} errou o ataque contra ${enemy.name}, ${randomItem(battle.miss)}`;
        }

        const isKillingBlow = enemy.hp <= 1;
        enemy.hp -= 1;
        const status = `${player.name} <span class="green">acertou o ataque</span> em ${enemy.name} (-1HP => ${enemy.hp} HP)`;

        if (isKillingBlow) {
            context.chapter.isBattle = false;
            context.combat = null;
            return `${status} ${battle.win.content}`;
        }

        return `${status} ${randomItem(battle.hit)}`;
    }

    enemyAttack(context) {
        const { player, enemy } = context.combat;
        const { battle } = context.chapter;

        const enemyAttackValue = this.rolldice(diceCount(enemy.attack));
        const playerDefenseValue = this.rolldice(context.combat.diceDefenseRemain + context.combat.diceAttackRemain);

        this.restore(context);

        if (enemyAttackValue < playerDefenseValue) {
            return `${enemy.name} errou o ataque contra ${player.name}, ${randomItem(battle.fail)}`;
        }

        const isKillingBlow = player.hp <= 1;
        player.hp -= 1;
        const status = `${enemy.name} <span class="red">acertou o ataque</span> em ${player.name} (-1HP => ${player.hp} HP)`;

        if (isKillingBlow) {
            context.chapter.isBattle = false;
            context.chapter.isFinal = true;
            context.combat = null;
            return `${status} Você morreu!! o Jogo acabou!`;
        }

        return `${status} ${randomItem(battle.attack)}`;
    }

    // devolve todos os dados de defesa ao jogador para o próximo turno
    restore(context) {
        context.combat.diceDefenseRemain = diceCount(context.combat.player.defense);
        context.combat.diceAttackRemain = 0;
    }
}

window.Battle = Battle;
