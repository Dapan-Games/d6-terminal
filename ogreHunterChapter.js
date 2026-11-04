const ogreHunter = [
    {
        "id": "1-A",
        "content": "A recompensa pela cabeça do ogro é alta o bastante para atrair aventureiros de toda a região. Ao entardecer, você chega à orla da Floresta de Brumafunda. Pegadas enormes marcam a lama, e uma coluna de fumaça sobe por trás das árvores. Você pode seguir pela trilha marcada, acompanhar o riacho ou investigar um antigo acampamento de caçadores.",
        "parent": null,
        "isFinal": false,
        "options": [
            {
                "content": "Seguir pela trilha marcada entre as árvores.",
                "next": "2-A"
            },
            {
                "content": "Acompanhar o riacho, que entra mais fundo na floresta.",
                "next": "2-B"
            },
            {
                "content": "Investigar o antigo acampamento de caçadores.",
                "next": "2-C"
            }
        ]
    },
    {
        "id": "2-A",
        "content": "A trilha está coberta de galhos partidos. As marcas são largas demais para pertencer a um homem, e há tufos de pelo cinzento presos nos espinhos. Um rosnado baixo vem de algum lugar adiante. Você pode encarar a alcateia ou tentar passar sem chamar sua atenção.",
        "parent": "1-A",
        "isFinal": false,
        "options": [
            {
                "content": "Preparar a arma e enfrentar os lobos.",
                "next": "3-A"
            },
            {
                "content": "Desviar pela vegetação e evitar o confronto.",
                "next": "3-B"
            }
        ]
    },
    {
        "id": "3-A",
        "content": "Três lobos cinzentos saltam de trás dos arbustos.",
        "parent": "2-A",
        "isFinal": false,
        "isBattle": true,
        "enemy": {
            "name": "Alcateia de lobos",
            "attack": "2d6",
            "defense": "1d6",
            "special": "0d6",
            "hp": 4
        },
        "options": [
            {
                "content": "Seguir as marcas até a fumaça.",
                "next": "4-A"
            }
        ],
        battle: {
            win: {
                content: "Quando o último lobo recua, você encontra marcas recentes de uma criatura enorme levando uma carcaça para o norte. Depois de vencer a alcateia, siga o rastro até a fumaça.",
                next: "4-A"
            },
            hit: ["O golpe pega em cheio no lobo cincento", "com o poder do ataque o logo é lançado para trás", "Acertou o golpe!!"],
            attack: ["O lobo olha fixadamente, corre e salta sobre você acertando a mordida em seu braço", "O lobo corre rapido e lhe acerta com uma babeçada", "Ele consegue lhe morder!"],
            miss: ["O lobo veloz desvia de seu golpe", "com agilidade o lobo salta por você e sua tentantiva de ataque falha"],
            fail: ["O ataque do lobo foi desviado por sua agilidade", "ao tentar lhe atacar o lobo salta alto demais e passa por cima de você sem lhe causar dano", "na hora que o lobo vai lhe morder, sua arma vai ao encontro dos dentes dele e bloqueia o ataque."]
        }
    },
    {
        "id": "3-B",
        "content": "Você contorna os lobos por uma encosta coberta de samambaias. Do alto, avista o ogro cruzando uma clareira, carregando um tronco como se fosse um bastão. Você não foi percebido. Desça com cuidado e aproxime-se da clareira.",
        "parent": "2-A",
        "isFinal": false,
        "options": [
            {
                "content": "Descer pela encosta e seguir até a clareira.",
                "next": "4-B"
            }
        ]
    },
    {
        "id": "4-A",
        "content": "O rastro termina numa clareira enfumaçada. O ogro está perto de uma fogueira, distraído com a carcaça que trouxe. Ao notar você, ergue o tronco que usa como clava e ruge. É hora de enfrentar o alvo da recompensa.",
        "parent": "3-A",
        "isFinal": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 7
        },
        "options": []
    },
    {
        "id": "4-B",
        "content": "Você chega à clareira sem ser visto e encontra o ogro de costas, ocupado junto à fogueira. Ele ouve um galho estalar e se vira, mas você já está em posição para começar o confronto.",
        "parent": "3-B",
        "isFinal": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 7
        },
        "options": []
    },
    {
        "id": "2-B",
        "content": "O riacho corre entre pedras escorregadias e leva até um trecho alagado. Do outro lado, você vê uma árvore derrubada que pode servir de ponte. Algo se move sob a água turva. Você pode atravessar pelo vau ou procurar um caminho mais seguro rio acima.",
        "parent": "1-A",
        "isFinal": false,
        "options": [
            {
                "content": "Atravessar pelo vau, apesar do movimento na água.",
                "next": "3-C"
            },
            {
                "content": "Subir o curso do riacho e procurar uma passagem segura.",
                "next": "3-D"
            }
        ]
    },
    {
        "id": "3-C",
        "content": "Uma criatura escamosa investe contra você no vau. Após derrotá-la, você nota pegadas enormes na margem oposta, seguindo na direção de uma fumaça escura. Atravesse e siga o rastro do ogro.",
        "parent": "2-B",
        "isFinal": false,
        "enemy": {
            "name": "Crocodilo do brejo",
            "attack": "2d6",
            "defense": "2d6",
            "special": "1d6",
            "hp": 4
        },
        "options": [
            {
                "content": "Atravessar o riacho e seguir as pegadas.",
                "next": "4-C"
            }
        ]
    },
    {
        "id": "3-D",
        "content": "Rio acima, você encontra uma árvore caída formando uma ponte natural. Do outro lado há pegadas fundas, um pedaço de tecido preso num espinho e o cheiro forte da fumaça. A travessia é segura; siga as marcas até a clareira.",
        "parent": "2-B",
        "isFinal": false,
        "options": [
            {
                "content": "Cruzar pela árvore e seguir o rastro.",
                "next": "4-D"
            }
        ]
    },
    {
        "id": "4-C",
        "content": "As pegadas levam a uma clareira junto ao brejo. O ogro está remexendo um monte de lenha. Quando você se aproxima, ele agarra sua clava e parte para o ataque.",
        "parent": "3-C",
        "isFinal": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 7
        },
        "options": []
    },
    {
        "id": "4-D",
        "content": "A passagem pela árvore deixa você perto da clareira sem precisar cruzar o brejo. O ogro está de guarda junto à fogueira e percebe sua chegada. Ele rosna e avança, bloqueando o caminho de volta.",
        "parent": "3-D",
        "isFinal": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 7
        },
        "options": []
    },
    {
        "id": "2-C",
        "content": "O acampamento está abandonado às pressas. Há uma panela virada, uma armadilha desmontada e um mapa parcialmente queimado. Pegadas de botas seguem para o norte; outras, muito maiores, vão para leste. Você pode seguir as botas ou aproveitar os materiais deixados para preparar uma armadilha.",
        "parent": "1-A",
        "isFinal": false,
        "options": [
            {
                "content": "Seguir as pegadas de botas e descobrir quem passou por ali.",
                "next": "3-E"
            },
            {
                "content": "Reaproveitar a armadilha e preparar uma isca para o ogro.",
                "next": "3-F"
            }
        ]
    },
    {
        "id": "3-E",
        "content": "Um caçador desertor surge entre as árvores. Ele acredita que você veio disputar a recompensa e ataca antes que consiga explicar sua missão. Depois de vencê-lo, você encontra no acampamento dele um mapa que indica a clareira do ogro.",
        "parent": "2-C",
        "isFinal": false,
        "enemy": {
            "name": "Caçador desertor",
            "attack": "3d6",
            "defense": "1d6",
            "special": "1d6",
            "hp": 4
        },
        "options": [
            {
                "content": "Usar o mapa para chegar à clareira.",
                "next": "4-E"
            }
        ]
    },
    {
        "id": "3-F",
        "content": "Você monta a armadilha com cuidado e deixa um pedaço de carne como isca. Um javali faminto aparece antes do ogro e investe contra você, enfurecido. Depois do confronto, a isca desapareceu e as pegadas enormes seguem em direção à clareira.",
        "parent": "2-C",
        "isFinal": false,
        "enemy": {
            "name": "Javali selvagem",
            "attack": "2d6",
            "defense": "1d6",
            "special": "1d6",
            "hp": 3
        },
        "options": [
            {
                "content": "Seguir as pegadas até a clareira.",
                "next": "4-F"
            }
        ]
    },
    {
        "id": "4-E",
        "content": "O mapa leva você diretamente à clareira. O ogro está junto à fogueira e carrega no cinto uma bolsa com objetos roubados. Ao ver você, larga tudo e ergue a clava.",
        "parent": "3-E",
        "isFinal": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 7
        },
        "options": []
    },
    {
        "id": "4-F",
        "content": "Você segue o rastro até a clareira. O ogro encontra os restos da isca e fareja o ar até localizar você. Com um grunhido furioso, agarra o tronco que usa como clava e avança.",
        "parent": "3-F",
        "isFinal": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 7
        },
        "options": []
    }
]