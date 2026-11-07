const DICE_PATTERN = /[0-9]*d6/;

// "2d6" -> 2
function diceCount(diceText) {
    return parseInt(diceText);
}

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

class Battle {
    diceRoll(dice) {
        let total = 0;
        let amount = parseInt(dice)

        for (let i = 0; i < amount; i++) {
            total += Math.floor(Math.random() * 6) + 1;
        }

        return total;
    }

    // Retorna uma instrução (string) se o jogador não informou dados, senão os dois turnos [jogador, inimigo]
    combat(_, context) {

        // controle de flag para saber se está lutando pela primeira vez
        if (context.settings.isFirstBattle) context.settings.isFirstBattle = false;

        const playerNarrative = this.playerAttack(context);
        const enemyNarrative = this.enemyAttack(context);

        const isEnemyDie = context.combat.enemy.hp === 0;
        const healthTag = `<span class="violet">[Você - <strong>${context.combat.player.hp}HP</strong> | ${context.combat.enemy.name} - <strong>${context.combat.enemy.hp}HP</strong>]</span></br>`;

        const message = [];

        if (!isEnemyDie) message.push(healthTag);
        if (playerNarrative) message.push(...playerNarrative);
        if (enemyNarrative) message.push("", ...enemyNarrative);

        if (isEnemyDie) context.combat.isFinishCombat = true;

        return message;
    }

    playerAttack(context) {
        const { player, enemy } = context.combat;
        const { battle } = context.chapter;

        const equipament = context.inventory.inventory.find(f => f.isEquiped && f.type === "attack");

        const playerDiceAttack = equipament.dice;
        const enemyDiceDefense = enemy.defense;

        const playerAttackValue = this.diceRoll(playerDiceAttack);
        const enemyDefenseValue = this.diceRoll(enemyDiceDefense);

        if (playerAttackValue < enemyDefenseValue) {
            return [
                `Você <span class="red">erra</span> o ataque.`,
                randomItem(battle.miss)
            ];
        }

        enemy.hp -= playerAttackValue;

        const status = `Você <span class="green">acerta</span> o ataque. causando <span class="yellow">${playerAttackValue}</span> de dano.`;

        if (enemy.hp <= 0) {
            context.chapter.isBattle = false;
            context.chapter.content = battle.win.content;
            context.currentState = CONTEXT_STATE.Chapter

            return [
                status,
                battle.win.content,
                "",
                ...context.inventory.grantReward(context.chapter)
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

        const equipament = context.inventory.inventory.find(f => f.isEquiped && f.type === "defense");

        const enemyAttackValue = this.diceRoll(enemy.attack);
        const playerDefenseValue = this.diceRoll(equipament.dice);

        if (enemyAttackValue < playerDefenseValue) {
            return [
                `${enemy.name} <span class="red">erra</span> o ataque.`,
                randomItem(battle.fail)
            ];
        }

        player.hp -= enemyAttackValue;
        const status = `${enemy.name} <span class="green">acerta</span> o ataque. causando <span class="yellow">${enemyAttackValue}</span> de dano.`;

        if (player.hp <= 0) {
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
}

window.Battle = Battle;
