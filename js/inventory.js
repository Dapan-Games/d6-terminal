class Inventory {
    constructor() {
        // equipamento inicial
        this.inventory = [
            {
                name: 'Espada Curta',
                type: 'attack',
                dice: '2d6'
            },
            {
                name: 'Escudo de Madeira',
                type: 'defense',
                dice: '1d6'
            }
        ];
    }

    list() {
        if (Object.keys(this.inventory).length == 0) return "Inventário vazio";

        return this.inventory.map(item => {
            return `${item.name} - <span class="yellow">${item.dice}</span>`
        });
    }
}

window.Inventory = Inventory;
