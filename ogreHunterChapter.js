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
        "reward": "pocao_cura_menor",
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
            hit: ["O golpe pega em cheio no lobo cinzento, que gane e cambaleia.", "Com a força do ataque, o lobo é lançado para trás e rola entre as samambaias.", "Sua lâmina corta o pelo eriçado do lobo e ele recua mostrando os dentes.", "Acertou o golpe! O lobo uiva de dor e o resto da alcateia hesita."],
            attack: ["O lobo olha fixamente, corre e salta sobre você, cravando a mordida em seu braço.", "Um lobo rápido lhe acerta com uma cabeçada no flanco e o desequilibra.", "Dois lobos o cercam e um deles rasga sua perna com as garras.", "Ele consegue lhe morder!"],
            miss: ["O lobo veloz desvia de seu golpe e rosna, rodeando você.", "Com agilidade, o lobo salta para o lado e sua tentativa de ataque corta só o ar.", "Sua lâmina acerta apenas a terra enquanto o lobo recua e prepara o bote."],
            fail: ["O ataque do lobo foi desviado por sua agilidade.", "Ao tentar lhe atacar, o lobo salta alto demais e passa por cima de você sem causar dano.", "Na hora em que o lobo vai morder, sua arma encontra os dentes dele e bloqueia o ataque.", "Você gira o corpo e as presas do lobo fecham no vazio."]
        }
    },
    {
        "id": "3-B",
        "reward": "pocao_cura",
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
        "reward": "maca_cravejada",
        "isBattle": true,
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        },
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
        "reward": "maca_cravejada",
        "isBattle": true,
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        },
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
        "reward": "gibao_couro",
        "isBattle": true,
        "battle": {
            "win": {
                "content": "Após derrotar a criatura, você nota pegadas enormes na margem oposta, seguindo na direção de uma fumaça escura. Atravesse e siga o rastro do ogro.",
                "next": "4-C"
            },
            "hit": ["Sua arma encontra a fenda entre as escamas e o crocodilo se debate na água.", "O golpe acerta o focinho do crocodilo, que sacode a cabeça e espirra lama.", "Acertou! O crocodilo recua, batendo a cauda na água turva."],
            "attack": ["O crocodilo emerge da água e fecha as mandíbulas em sua perna.", "A cauda poderosa varre seus pés e você cai na água rasa, ferido.", "Ele se joga sobre você e as escamas ásperas rasgam seu braço."],
            "miss": ["O crocodilo mergulha e seu golpe acerta apenas a água.", "As escamas escorregadias desviam sua arma sem causar dano.", "A criatura gira o corpo e escapa da sua investida."],
            "fail": ["As mandíbulas do crocodilo se fecham a centímetros da sua perna.", "Você se afasta a tempo e a cauda passa zunindo sobre sua cabeça.", "Sua arma bloqueia o bote e o crocodilo recua, sibilando."]
        },
        "content": "Uma criatura escamosa investe contra você no vau.",
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
        "reward": "cota_malha",
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
        "reward": "maca_cravejada",
        "isBattle": true,
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        },
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
        "reward": "maca_cravejada",
        "isBattle": true,
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        },
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
        "reward": "machadinha_lenhador",
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
        "reward": "lanca_cacador",
        "isBattle": true,
        "battle": {
            "win": {
                "content": "Depois de vencê-lo, você encontra no acampamento dele um mapa que indica a clareira do ogro.",
                "next": "4-E"
            },
            "hit": ["Sua lâmina atravessa a guarda do caçador e ele resmunga de dor.", "O golpe o acerta no ombro e a faca de caça quase lhe escapa da mão.", "Acertou! O desertor tropeça para trás, ofegante."],
            "attack": ["O caçador gira a faca e corta seu braço antes que você reaja.", "Ele dispara uma flecha à queima-roupa e ela raspa seu ombro.", "Um chute no seu joelho o derruba, e a lâmina dele alcança suas costelas."],
            "miss": ["O desertor se joga atrás de uma árvore e seu golpe lasca a casca.", "Ele rola pelo chão e sai do alcance da sua arma.", "Com um passo de lado, o caçador evita o ataque."],
            "fail": ["Você bloqueia a faca dele com a guarda da sua arma.", "A flecha do caçador passa de raspão e se crava no tronco atrás de você.", "Você prevê o golpe e desvia, enquanto ele perde o equilíbrio."]
        },
        "content": "Um caçador desertor surge entre as árvores. Ele acredita que você veio disputar a recompensa e ataca antes que consiga explicar sua missão.",
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
        "reward": "escudo_ferro",
        "isBattle": true,
        "battle": {
            "win": {
                "content": "Depois do confronto, a isca desapareceu e as pegadas enormes seguem em direção à clareira.",
                "next": "4-F"
            },
            "hit": ["Sua arma atinge o lombo do javali, que guincha e derrapa na terra.", "O golpe pega de lado e o javali rola pelo chão.", "Acertou! O javali sacode a cabeça, atordoado."],
            "attack": ["O javali investe de cabeça e as presas arranham sua coxa.", "Ele atinge seu abdômen com uma trombada e tira o ar dos seus pulmões.", "O animal gira e acerta você com as presas."],
            "miss": ["O javali muda de direção no último instante e seu golpe falha.", "Sua arma raspa nas cerdas duras sem ferir o animal.", "O bicho escapa pelo mato e volta rosnando."],
            "fail": ["Você salta de lado e o javali passa direto, esmagando a vegetação.", "As presas do javali prendem na sua arma, que as desvia.", "A investida do animal erra e ele bate numa raiz, furioso."]
        },
        "content": "Você monta a armadilha com cuidado e deixa um pedaço de carne como isca. Um javali faminto aparece antes do ogro e investe contra você, enfurecido.",
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
        "reward": "maca_cravejada",
        "isBattle": true,
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        },
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
        "reward": "maca_cravejada",
        "isBattle": true,
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        },
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