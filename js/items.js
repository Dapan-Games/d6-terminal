// Catálogo de itens do jogo. Capítulos referenciam estes itens pelo id (chave em inglês) no campo "reward".
// Balanceamento (dados de 6 lados por raridade):
//   Comum: 1-2d6 | Raro: 2-3d6 | Épico: 3-4d6 | Lendário: 4d6 + special
//   Defesa fica 1 dado abaixo do ataque da mesma raridade, e poções curam conforme a raridade (HP máximo: 7).
const ITEM_CATALOG = {
    // --- Armas (attack) ---
    rusty_dagger: {
        name: 'Adaga Enferrujada',
        description: 'lamina velha e gasta, mas ainda corta carne mole',
        type: 'attack', dice: '1d6', rarity: 'Comum'
    },
    wooden_club: {
        name: 'Clava de Madeira',
        description: 'tronco grosso lapidado de forma tosca, simples mas eficaz',
        type: 'attack', dice: '1d6', rarity: 'Comum'
    },
    lumberjack_hatchet: {
        name: 'Machadinha de Lenhador',
        description: 'ferramenta pesada de rachar lenha, serve bem em uma briga',
        type: 'attack', dice: '2d6', rarity: 'Comum'
    },
    hunting_bow: {
        name: 'Arco de Caça',
        description: 'arco de madeira flexivel usado para abater presas a distancia',
        type: 'attack', dice: '2d6', rarity: 'Comum'
    },
    hunter_spear: {
        name: 'Lança de Caçador',
        description: 'lança longa e balanceada, boa para manter feras a distancia',
        type: 'attack', dice: '2d6', special: '1d6', rarity: 'Raro'
    },
    shadow_dagger: {
        name: 'Adaga Sombria',
        description: 'adaga fina e escura, rapida e precisa',
        type: 'attack', dice: '2d6', special: '2d6', rarity: 'Raro'
    },
    steel_longsword: {
        name: 'Espada Longa de Aço',
        description: 'espada de aço bem forjado, corta com facilidade',
        type: 'attack', dice: '3d6', rarity: 'Raro'
    },
    battle_axe: {
        name: 'Machado de Batalha',
        description: 'machado de lamina larga, feito para partir escudos ao meio',
        type: 'attack', dice: '3d6', special: '1d6', rarity: 'Raro'
    },
    spiked_mace: {
        name: 'Maça Cravejada',
        description: 'maça de ferro cheia de espinhos, esmaga armaduras e ossos',
        type: 'attack', dice: '4d6', rarity: 'Epico'
    },
    ogre_slayer_greatsword: {
        name: 'Montante Mata-Ogros',
        description: 'espada enorme forjada para derrubar criaturas gigantes',
        type: 'attack', dice: '3d6', special: '2d6', rarity: 'Epico'
    },
    mistdeep_blade: {
        name: 'Lâmina da Brumafunda',
        description: 'lamina lendaria que brilha dentro da neblina, dizem que nunca perde o alvo',
        type: 'attack', dice: '4d6', special: '2d6', rarity: 'Lendario'
    },
    thunder_hammer: {
        name: 'Martelo do Trovão',
        description: 'martelo ancestral que solta faiscas a cada golpe e faz o chao tremer',
        type: 'attack', dice: '4d6', special: '3d6', rarity: 'Lendario'
    },

    // --- Defesa (defense) ---
    wooden_buckler: {
        name: 'Broquel de Madeira',
        description: 'escudo pequeno e leve, bom para desviar golpes rapidos',
        type: 'defense', dice: '1d6', rarity: 'Comum'
    },
    leather_jerkin: {
        name: 'Gibão de Couro',
        description: 'protecao leve que nao atrapalha os movimentos',
        type: 'defense', dice: '1d6', rarity: 'Comum'
    },
    reinforced_leather_armor: {
        name: 'Armadura de Couro Reforçado',
        description: 'couro curtido com placas de metal costuradas nos pontos vitais',
        type: 'defense', dice: '2d6', rarity: 'Comum'
    },
    iron_shield: {
        name: 'Escudo de Ferro',
        description: 'escudo redondo e resistente, aguenta golpes pesados',
        type: 'defense', dice: '2d6', rarity: 'Raro'
    },
    iron_helmet: {
        name: 'Elmo de Ferro',
        description: 'elmo fechado que protege a cabeca dos golpes mais violentos',
        type: 'defense', dice: '2d6', special: '1d6', rarity: 'Raro'
    },
    chainmail: {
        name: 'Cota de Malha',
        description: 'aneis de aco entrelacados que cobrem torso e ombros',
        type: 'defense', dice: '3d6', rarity: 'Raro'
    },
    ogre_hide_armor: {
        name: 'Couraça de Pele de Ogro',
        description: 'pele grossa e curtida de ogro, quase impossivel de perfurar',
        type: 'defense', dice: '3d6', special: '1d6', rarity: 'Epico'
    },
    steel_plate_armor: {
        name: 'Armadura de Placas de Aço',
        description: 'armadura completa de placas de aco, pesada e muito resistente',
        type: 'defense', dice: '4d6', rarity: 'Epico'
    },
    hunter_aegis: {
        name: 'Égide do Caçador',
        description: 'escudo ancestral gravado com runas de protecao',
        type: 'defense', dice: '4d6', special: '1d6', rarity: 'Lendario'
    },
    dragon_scale_armor: {
        name: 'Armadura de Escamas de Dragão',
        description: 'escamas de um dragao antigo que resistem ao fogo e ao aco',
        type: 'defense', dice: '4d6', special: '2d6', rarity: 'Lendario'
    },

    // --- Poções (potion) ---
    herbal_tonic: {
        name: 'Tônico de Ervas',
        description: 'infusao amarga de ervas da floresta, alivia dores leves',
        type: 'potion', heal: 1, rarity: 'Comum'
    },
    minor_healing_potion: {
        name: 'Poção de Cura Menor',
        description: 'liquido vermelho e doce, fecha pequenos ferimentos',
        type: 'potion', heal: 2, rarity: 'Comum'
    },
    healing_potion: {
        name: 'Poção de Cura',
        description: 'liquido vermelho e espesso, recupera boa parte da vitalidade',
        type: 'potion', heal: 4, rarity: 'Raro'
    },
    greater_healing_potion: {
        name: 'Poção de Cura Maior',
        description: 'liquido rubro e brilhante, fecha feridas profundas em segundos',
        type: 'potion', heal: 5, rarity: 'Raro'
    },
    mistdeep_elixir: {
        name: 'Elixir da Brumafunda',
        description: 'elixir raro destilado de ervas da floresta, restaura todas as forcas',
        type: 'potion', heal: 7, rarity: 'Epico'
    },
    phoenix_tears: {
        name: 'Lágrimas de Fênix',
        description: 'gotas douradas e quentes que curam qualquer ferida e devolvem a vida plena',
        type: 'potion', heal: 7, rarity: 'Lendario'
    }
};

window.ITEM_CATALOG = ITEM_CATALOG;
