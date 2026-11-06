const MAX_PLAYER_HP = 7;

class Inventory {
    constructor() {
        // equipamento inicial
        this.inventory = [
            {
                name: 'Adaga',
                description: 'adaga e boa pra cortar coisas',
                type: 'attack',
                dice: '1d6',
                isEquiped: false,
                rarity: 'Comum'
            },
            {
                name: 'Espada Curta',
                description: 'espada e boa pra cortar coisas',
                type: 'attack',
                dice: '2d6',
                isEquiped: false,
                rarity: 'Comum'
            },
            {
                name: 'Espada longa',
                description: 'espada grande e boa pra cortar ao meio',
                type: 'attack',
                dice: '3d6',
                special: '1d6',
                isEquiped: true,
                rarity: 'Raro'
            },
            {
                name: 'Escudo de Madeira',
                type: 'defense',
                dice: '1d6',
                isEquiped: false,
                rarity: 'Epico'
            },
            {
                name: 'Espada de Haikiu',
                type: 'defense',
                dice: '4d6',
                isEquiped: true,
                rarity: 'Lendario'
            },
        ];

        this.claimedRewards = new Set();

        this.embedding = new Embedding();
        this.embedding.init();
    }

    async findEquipamentByName(command) {
        const match = await this.embedding.processing(command, this.inventory.map(m => m.name), 0.5);

        if (!match) return;

        return {
            item: this.inventory[match.index],
            index: match.index
        };
    }

    list() {
        if (Object.keys(this.inventory).length == 0) return "Inventário vazio";

        return this.inventory.map(item => {
            const equipedTag = item.isEquiped ? `- <span class="blue">[Equipado]</span>` : '';
            const rarityTag = item.rarity ? `<span class="${item.rarity.toLowerCase()}-rarity">[${item.rarity}]</span>` : '';
            const stat = item.type === 'potion' ? `+${item.heal} HP` : item.dice;

            return `${rarityTag} ${item.name} - <span class="yellow">${stat}</span>  ${equipedTag}`;
        });
    }

    // Entrega a recompensa de um capítulo (id do ITEM_CATALOG) uma única vez e retorna as linhas a exibir
    grantReward(chapter) {
        const template = ITEM_CATALOG[chapter?.reward];

        if (!template || this.claimedRewards.has(chapter.id)) return [];

        this.claimedRewards.add(chapter.id);
        this.inventory.push({ ...template, isEquiped: false });

        const obtained = template.type === 'potion' ? 'Poção obtida' : 'Equipamento obtido';

        return [`<strong>Recompensa!</strong> ${obtained}: <span class="${template.rarity.toLowerCase()}-rarity">[${template.rarity}]</span> <strong>${template.name}</strong>`];
    }

    async use(command, context) {
        const potions = this.inventory.filter(item => item.type === 'potion');

        if (potions.length === 0) return "Você não tem nenhuma poção.";

        const match = await this.embedding.processing(command, potions.map(p => p.name), 0.3);
        const potion = match ? potions[match.index] : potions[0];
        const { player } = context;

        if (player.hp >= MAX_PLAYER_HP) return "Sua vida já está cheia, guarde a poção para quando precisar.";

        const before = player.hp;
        player.hp = Math.min(MAX_PLAYER_HP, player.hp + potion.heal);
        this.inventory.splice(this.inventory.indexOf(potion), 1);

        return `Você bebe <strong>${potion.name}</strong> e recupera ${player.hp - before} HP (${player.hp}/${MAX_PLAYER_HP}).`;
    }

    async desctiption(command, context) {
        const { item } = await this.findEquipamentByName(command);

        if (!item) return `Nenhum equipamento encontrado com esse nome`;

        return [
            `<span class="${item.rarity.toLowerCase()}-rarity">[${item.rarity}]</span> <strong>${item.name}</strong>`,
            `<p>${item.description}</p>`
        ]
    }

    async equip(command, context) {
        const { index, item } = await this.findEquipamentByName(command);

        if (!item) return `Nenhum equipamento encontrado com esse nome`;

        if (item.type === 'potion') return `Poções não são equipadas, use-a dizendo por exemplo "beber a ${item.name}".`;

        // desequipando tudo do mesmo tipo para equipar o selecionado, assim garantindo que so pode ter 1 por tipo

        for (const equip of this.inventory) {
            if (equip.type === item.type) equip.isEquiped = false;
        }

        this.inventory[index].isEquiped = true;

        // update stats player
        let attackDice = this.inventory.find(f => f.isEquiped && f.type === "attack") || {};
        let defenseDice = this.inventory.find(f => f.isEquiped && f.type === "defense") || {};

        context.player.attack = attackDice?.dice || "0d6";
        context.player.defense = defenseDice?.dice || "0d6";


        return [
            `<span class="${item.rarity.toLowerCase()}-rarity">[${item.rarity}]</span> <strong>${item.name}</strong> equipado!`,
        ]
    }
}

window.Inventory = Inventory;
