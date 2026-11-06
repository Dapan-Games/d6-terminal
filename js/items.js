// Catálogo de itens do jogo. Capítulos referenciam estes itens pelo id no campo "reward".
// Balanceamento (dados de 6 lados por raridade):
//   Comum: 1-2d6 | Raro: 2-3d6 | Épico: 3-4d6 | Lendário: 4d6 + special
//   Defesa fica 1 dado abaixo do ataque da mesma raridade, e poções curam conforme a raridade.
const ITEM_CATALOG = {
    // --- Armas (attack) ---
    adaga_enferrujada: {
        name: 'Adaga Enferrujada',
        description: 'lamina velha e gasta, mas ainda corta carne mole',
        type: 'attack', dice: '1d6', rarity: 'Comum'
    },
    machadinha_lenhador: {
        name: 'Machadinha de Lenhador',
        description: 'ferramenta pesada de rachar lenha, serve bem em uma briga',
        type: 'attack', dice: '2d6', rarity: 'Comum'
    },
    lanca_cacador: {
        name: 'Lança de Caçador',
        description: 'lança longa e balanceada, boa para manter feras a distancia',
        type: 'attack', dice: '2d6', special: '1d6', rarity: 'Raro'
    },
    espada_longa_aco: {
        name: 'Espada Longa de Aço',
        description: 'espada de aço bem forjado, corta com facilidade',
        type: 'attack', dice: '2d6', special: '2d6', rarity: 'Raro'
    },
    maca_cravejada: {
        name: 'Maça Cravejada',
        description: 'maça de ferro cheia de espinhos, esmaga armaduras e ossos',
        type: 'attack', dice: '4d6', rarity: 'Epico'
    },
    lamina_brumafunda: {
        name: 'Lâmina da Brumafunda',
        description: 'lamina lendaria que brilha dentro da neblina, dizem que nunca perde o alvo',
        type: 'attack', dice: '4d6', special: '2d6', rarity: 'Lendario'
    },

    // --- Defesa (defense) ---
    gibao_couro: {
        name: 'Gibão de Couro',
        description: 'protecao leve que nao atrapalha os movimentos',
        type: 'defense', dice: '1d6', rarity: 'Comum'
    },
    escudo_ferro: {
        name: 'Escudo de Ferro',
        description: 'escudo redondo e resistente, aguenta golpes pesados',
        type: 'defense', dice: '2d6', rarity: 'Raro'
    },
    cota_malha: {
        name: 'Cota de Malha',
        description: 'aneis de aco entrelacados que cobrem torso e ombros',
        type: 'defense', dice: '3d6', rarity: 'Raro'
    },
    couraca_ogro: {
        name: 'Couraça de Pele de Ogro',
        description: 'pele grossa e curtida de ogro, quase impossivel de perfurar',
        type: 'defense', dice: '3d6', special: '1d6', rarity: 'Epico'
    },
    egide_cacador: {
        name: 'Égide do Caçador',
        description: 'escudo ancestral gravado com runas de protecao',
        type: 'defense', dice: '4d6', special: '1d6', rarity: 'Lendario'
    },

    // --- Poções (potion) ---
    pocao_cura_menor: {
        name: 'Poção de Cura Menor',
        description: 'liquido vermelho e doce, fecha pequenos ferimentos',
        type: 'potion', heal: 2, rarity: 'Comum'
    },
    pocao_cura: {
        name: 'Poção de Cura',
        description: 'liquido vermelho e espesso, recupera boa parte da vitalidade',
        type: 'potion', heal: 4, rarity: 'Raro'
    },
    elixir_brumafunda: {
        name: 'Elixir da Brumafunda',
        description: 'elixir raro destilado de ervas da floresta, restaura todas as forcas',
        type: 'potion', heal: 7, rarity: 'Epico'
    },
    adaga_sombria: {
        name: 'Adaga Sombria',
        description: 'adaga fina e escura, rapida e precisa',
        type: 'attack', dice: '2d6', special: '2d6', rarity: 'Raro'
    }
};

window.ITEM_CATALOG = ITEM_CATALOG;
