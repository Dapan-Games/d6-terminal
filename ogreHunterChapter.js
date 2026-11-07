const ogreHunter = [
    // ===================== VILA DE PEDRAALTA (prólogo) =====================
    {
        "id": "1-A",
        "content": "A recompensa pela cabeça do Ogro da Brumafunda é alta o bastante para atrair aventureiros de toda a região, mas poucos voltam para contar a história. Na taverna O Javali Cego, na Vila de Pedraalta, a taverneira Hilda enche sua caneca e avisa baixinho: o ogro já devorou três grupos de caçadores, e a floresta ao norte anda cheia de lobos, brejos e desertores. Antes de partir, vale conversar com o ferreiro Brogan ou com a curandeira Maren, que conhecem os segredos da região. Ou você pode seguir direto para a floresta.",
        "parent": null,
        "isFinal": false,
        "options": [
            {
                "content": "Conversar com Brogan, o ferreiro da vila.",
                "next": "2-A"
            },
            {
                "content": "Procurar Maren, a curandeira de ervas.",
                "next": "2-B"
            },
            {
                "content": "Partir direto para a Floresta de Brumafunda.",
                "next": "3-A"
            }
        ]
    },
    {
        "id": "2-A",
        "content": "A forja de Brogan ainda está quente quando você entra. O ferreiro, um homem enorme de barba chamuscada, ouve seu plano e solta uma risada rouca. 'Meu irmão caçou aquele ogro e voltou sem uma orelha e sem a coragem', diz. 'O bicho tem a pele grossa, mas sente os joelhos.' Ele joga sobre a bancada uma armadura de couro reforçado que sobrou de uma encomenda e a empurra na sua direção. 'Leve. Eu odiaria perder um bom freguês.'",
        "parent": "1-A",
        "isFinal": false,
        "reward": "reinforced_leather_armor",
        "options": [
            {
                "content": "Visitar Maren, a curandeira, antes de partir.",
                "next": "2-B"
            },
            {
                "content": "Deixar a forja e partir para a floresta.",
                "next": "3-A"
            }
        ]
    },
    {
        "id": "2-B",
        "content": "A casa de Maren cheira a ervas secas e mel. A curandeira o examina com olhos cinzentos e balança a cabeça. 'Mais um herói com pressa de morrer', resmunga, mas lhe entrega um frasco rubro. 'Beba quando o sangue começar a escorrer. E lembre-se: a névoa da Brumafunda engana quem confia só nos olhos. Siga as pegadas, os cheiros e os barulhos.'",
        "parent": "1-A",
        "isFinal": false,
        "reward": "minor_healing_potion",
        "options": [
            {
                "content": "Agradecer e partir para a Floresta de Brumafunda.",
                "next": "3-A"
            }
        ]
    },

    // ===================== ORLA DA FLORESTA (ponto de escolha) =====================
    {
        "id": "3-A",
        "content": "Ao entardecer, você chega à orla da Floresta de Brumafunda. Pegadas enormes marcam a lama, e uma coluna de fumaça sobe por trás das árvores enquanto a névoa começa a se arrastar entre os troncos. Você pode seguir pela trilha marcada, acompanhar o riacho ou investigar um antigo acampamento de caçadores.",
        "parent": "1-A",
        "isFinal": false,
        "options": [
            {
                "content": "Seguir pela trilha marcada entre as árvores.",
                "next": "4-A"
            },
            {
                "content": "Acompanhar o riacho, que entra mais fundo na floresta.",
                "next": "4-B"
            },
            {
                "content": "Investigar o antigo acampamento de caçadores.",
                "next": "4-C"
            }
        ]
    },

    // ===================== CAMINHO DA TRILHA (lobos, mochila, mini boss Lobo-Alfa) =====================
    {
        "id": "4-A",
        "content": "A trilha está coberta de galhos partidos. As marcas são largas demais para pertencer a um homem, e há tufos de pelo cinzento presos nos espinhos. Um rosnado baixo vem de algum lugar adiante. Você pode encarar a alcateia ou tentar passar sem chamar sua atenção.",
        "parent": "3-A",
        "isFinal": false,
        "options": [
            {
                "content": "Preparar a arma e enfrentar os lobos.",
                "next": "5-A"
            },
            {
                "content": "Desviar pela vegetação e evitar o confronto.",
                "next": "5-B"
            }
        ]
    },
    {
        "id": "5-A",
        "content": "Três lobos cinzentos saltam de trás dos arbustos.",
        "parent": "4-A",
        "isFinal": false,
        "reward": "minor_healing_potion",
        "isBattle": true,
        "enemy": {
            "name": "Alcateia de lobos",
            "attack": "2d6",
            "defense": "1d6",
            "special": "0d6",
            "hp": 12
        },
        "options": [
            {
                "content": "Revistar a mochila esquecida na árvore oca.",
                "next": "6-A"
            },
            {
                "content": "Seguir as marcas até a fumaça, ignorando a mochila.",
                "next": "7-A"
            }
        ],
        "battle": {
            "win": {
                "content": "Quando o último lobo recua ganindo, o silêncio volta à trilha. Entre as raízes de uma árvore oca você vê a alça de uma mochila de couro esquecida por algum caçador. Mais adiante, marcas recentes de uma criatura enorme que levava uma carcaça para o norte seguem em direção à fumaça, mas um uivo grave ecoa nessa direção: o líder da matilha ainda está por perto.",
                "next": "6-A"
            },
            "hit": ["O golpe pega em cheio no lobo cinzento, que gane e cambaleia.", "Com a força do ataque, o lobo é lançado para trás e rola entre as samambaias.", "Sua lâmina corta o pelo eriçado do lobo e ele recua mostrando os dentes.", "Acertou o golpe! O lobo uiva de dor e o resto da alcateia hesita."],
            "attack": ["O lobo olha fixamente, corre e salta sobre você, cravando a mordida em seu braço.", "Um lobo rápido lhe acerta com uma cabeçada no flanco e o desequilibra.", "Dois lobos o cercam e um deles rasga sua perna com as garras.", "Ele consegue lhe morder!"],
            "miss": ["O lobo veloz desvia de seu golpe e rosna, rodeando você.", "Com agilidade, o lobo salta para o lado e sua tentativa de ataque corta só o ar.", "Sua lâmina acerta apenas a terra enquanto o lobo recua e prepara o bote."],
            "fail": ["O ataque do lobo foi desviado por sua agilidade.", "Ao tentar lhe atacar, o lobo salta alto demais e passa por cima de você sem causar dano.", "Na hora em que o lobo vai morder, sua arma encontra os dentes dele e bloqueia o ataque.", "Você gira o corpo e as presas do lobo fecham no vazio."]
        }
    },
    {
        "id": "6-A",
        "content": "A mochila é velha, mas o couro ainda está firme. Dentro há um diário com a letra trêmula de um caçador, uma poção bem vedada e um desenho do ogro com o joelho esquerdo circulado: uma antiga ferida que o faz mancar. O dono não parece ter voltado para buscá-la. Você guarda o que serve e percebe que o uivo ficou mais próximo.",
        "parent": "5-A",
        "isFinal": false,
        "reward": "healing_potion",
        "options": [
            {
                "content": "Seguir as marcas e enfrentar o que uiva à frente.",
                "next": "7-A"
            }
        ]
    },
    {
        "id": "7-A",
        "content": "Um lobo gigantesco, cinzento e coberto de cicatrizes, bloqueia a trilha com os dentes à mostra. É o alfa da matilha, e ele não pretende deixar você chegar à fumaça.",
        "parent": "5-A",
        "isFinal": false,
        "reward": "battle_axe",
        "isBattle": true,
        "enemy": {
            "name": "Lobo-Alfa cicatrizado",
            "attack": "3d6",
            "defense": "2d6",
            "special": "1d6",
            "hp": 20
        },
        "options": [
            {
                "content": "Seguir o rastro do ogro até a clareira.",
                "next": "8-A"
            }
        ],
        "battle": {
            "win": {
                "content": "O alfa cai com um último rosnado e a floresta parece respirar de novo. Entre os ossos da toca dele, você encontra um machado de batalha que algum caçador perdeu há muito tempo. O rastro do ogro continua trilha acima, e a fumaça já está bem perto.",
                "next": "8-A"
            },
            "hit": ["Sua arma rasga o ombro do alfa e o grande lobo recua com um rosnado furioso.", "O golpe acerta a antiga cicatriz do lobo e ele uiva de dor.", "Acertou! O alfa balança a cabeça, atordoado, enquanto o sangue escorre pelo focinho."],
            "attack": ["O alfa salta sobre seu peito e as presas rasgam seu ombro.", "O lobo gigante o derruba com uma investida e as garras arranham suas costas.", "Ele crava os dentes em seu braço e o arrasta pelo chão antes de soltar."],
            "miss": ["O alfa se joga para o lado e sua arma só encontra a terra.", "O lobo gigante antecipa seu golpe e recua com um salto elegante.", "Sua lâmina corta o ar enquanto o alfa gira ao seu redor, medindo você."],
            "fail": ["Você ergue a guarda e as presas do alfa batem contra o metal.", "Rolando para o lado, você sente o vento da mordida passar pelo seu pescoço.", "O alfa erra o salto e derrapa na lama, rosnando de raiva."]
        }
    },
    {
        "id": "8-A",
        "content": "O rastro termina numa clareira enfumaçada. O ogro está perto de uma fogueira, distraído com a carcaça que trouxe e mancando de uma perna antiga. Ao notar você, ergue o tronco que usa como clava e ruge. É hora de enfrentar o alvo da recompensa.",
        "parent": "7-A",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    },
    {
        "id": "5-B",
        "content": "Você contorna os lobos por uma encosta coberta de samambaias. Do alto, avista o ogro cruzando uma clareira, carregando um tronco como se fosse um bastão. Você não foi percebido. No topo da encosta ergue-se uma torre de vigia em ruínas, com a porta entreaberta, e a clareira está logo abaixo.",
        "parent": "4-A",
        "isFinal": false,
        "reward": "healing_potion",
        "options": [
            {
                "content": "Explorar a torre de vigia em ruínas.",
                "next": "6-B"
            },
            {
                "content": "Descer pela encosta e seguir até a clareira.",
                "next": "7-B"
            }
        ]
    },
    {
        "id": "6-B",
        "content": "A escada da torre range a cada degrau. No último andar, entre vigas caídas e ninhos de pássaros, há um baú de ferro com a tampa rachada, esquecido por guardas que abandonaram o posto há muito tempo. Dentro, embrulhada em pano oleado, você encontra uma espada longa de aço ainda afiada. Pela janela quebrada, você enxerga a clareira do ogro bem abaixo e planeja a melhor descida.",
        "parent": "5-B",
        "isFinal": false,
        "reward": "steel_longsword",
        "options": [
            {
                "content": "Descer da torre e seguir até a clareira.",
                "next": "7-B"
            }
        ]
    },
    {
        "id": "7-B",
        "content": "Você chega à clareira sem ser visto e encontra o ogro de costas, ocupado junto à fogueira. Ele ouve um galho estalar e se vira, mas você já está em posição para começar o confronto.",
        "parent": "5-B",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    },

    // ===================== CAMINHO DO RIACHO (barqueiro Orvyl, missão do musgo-lunar, mini boss Guardião) =====================
    {
        "id": "4-B",
        "content": "O riacho corre entre pedras escorregadias até um pequeno cais apodrecido. Lá, um barqueiro idoso remenda uma canoa à luz de um lampião. Do outro lado do trecho alagado você vê uma árvore derrubada que pode servir de ponte, e algo se move sob a água turva. Você pode falar com o barqueiro, atravessar pelo vau ou procurar um caminho mais seguro rio acima.",
        "parent": "3-A",
        "isFinal": false,
        "options": [
            {
                "content": "Conversar com o barqueiro que conserta a canoa.",
                "next": "5-C"
            },
            {
                "content": "Atravessar pelo vau, apesar do movimento na água.",
                "next": "5-D"
            },
            {
                "content": "Subir o curso do riacho e procurar uma passagem segura.",
                "next": "5-E"
            }
        ]
    },
    {
        "id": "5-C",
        "content": "O barqueiro se apresenta como Orvyl e, sem tirar os olhos da canoa, conta que sua filha Nira está com a febre do brejo há três noites. A cura é o musgo-lunar, que brilha nas ruínas de um santuário submerso rio acima, mas o lugar é guardado por uma estátua que desperta com a névoa. 'Traga o musgo e eu atravesso você de canoa até a clareira do ogro, pelo único caminho que a criatura não vigia', promete.",
        "parent": "4-B",
        "isFinal": false,
        "options": [
            {
                "content": "Aceitar a missão e subir o riacho até o santuário.",
                "next": "6-C"
            },
            {
                "content": "Recusar com educação e seguir para o vau.",
                "next": "5-D"
            }
        ]
    },
    {
        "id": "6-C",
        "content": "Rio acima, a margem se abre para as ruínas de um santuário meio afundado. Colunas cobertas de limo cercam um altar baixo onde uma massa de musgo-lunar brilha com uma luz azulada e fria. Sobre o altar, uma estátua de pedra com um escudo rachado parece observar cada passo seu. O musgo é exatamente o que Orvyl descreveu, mas colhê-lo vai custar caro.",
        "parent": "5-C",
        "isFinal": false,
        "options": [
            {
                "content": "Colher o musgo-lunar do altar.",
                "next": "7-C"
            }
        ]
    },
    {
        "id": "7-C",
        "content": "Assim que seus dedos tocam o musgo, a névoa se adensa e a estátua do altar estala, desprendendo-se do pedestal. Musgo e água escorrem de seus braços de pedra enquanto o Guardião do Santuário avança para proteger o que é dele.",
        "parent": "6-C",
        "isFinal": false,
        "reward": "steel_plate_armor",
        "isBattle": true,
        "enemy": {
            "name": "Guardião do Santuário",
            "attack": "3d6",
            "defense": "3d6",
            "special": "1d6",
            "hp": 24
        },
        "options": [
            {
                "content": "Levar o musgo-lunar de volta para Orvyl.",
                "next": "8-C"
            }
        ],
        "battle": {
            "win": {
                "content": "O Guardião se desfaz em pedaços com um estrondo e a névoa se dissipa. O musgo-lunar continua brilhando intacto na sua mão, e entre os escombros você encontra uma armadura de placas esquecida pelos antigos guardiões do santuário. Orvyl precisa dessa cura antes que a febre de Nira piore.",
                "next": "8-C"
            },
            "hit": ["Sua arma arranca uma lasca de pedra do ombro do Guardião, que estala e recua.", "O golpe abre uma rachadura funda no peito da estátua e o musgo escorre dela como sangue.", "Acertou! O Guardião cambaleia e o chão do santuário treme sob seus pés."],
            "attack": ["O punho de pedra desce sobre você e o impacto sacode todos os seus ossos.", "O Guardião o empurra com o escudo rachado e você bate de costas numa coluna.", "Um golpe lateral acerta suas costelas e o ar foge dos seus pulmões."],
            "miss": ["Sua lâmina arranha a pedra e arranca apenas faíscas.", "O Guardião ergue o escudo e seu golpe ricocheteia sem causar dano.", "A estátua gira o tronco com uma lentidão assustadora e seu ataque encontra apenas o ar."],
            "fail": ["O punho de pedra esmaga a coluna atrás de você, que se desfaz em poeira.", "Você rola entre as pernas do Guardião e o golpe dele atinge só o chão.", "O escudo rachado desce, mas você o desvia com a sua arma e sai ileso."]
        }
    },
    {
        "id": "8-C",
        "content": "Orvyl esmaga o musgo-lunar numa tigela de barro com mãos trêmulas e prepara a infusão enquanto a pequena Nira ainda delira na cabana ao lado. Quando a febre cede, o barqueiro chora de alívio e coloca em suas mãos o frasco mais precioso da casa: um elixir destilado das ervas da Brumafunda. 'Eu prometi um caminho. Entre na canoa.'",
        "parent": "7-C",
        "isFinal": false,
        "reward": "mistdeep_elixir",
        "options": [
            {
                "content": "Embarcar na canoa e atravessar até a clareira do ogro.",
                "next": "9-C"
            }
        ]
    },
    {
        "id": "9-C",
        "content": "A canoa desliza em silêncio pela névoa e encosta numa margem de pedras lisas. Orvyl aponta uma clareira com o dedo, sem dizer palavra, e volta a remar. A fogueira do ogro está bem à sua frente, e a criatura, de costas para o brejo, ainda não percebeu que você chegou por onde ninguém vigiava.",
        "parent": "8-C",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    },
    {
        "id": "5-D",
        "content": "Uma criatura escamosa investe contra você no vau.",
        "parent": "4-B",
        "isFinal": false,
        "reward": "leather_jerkin",
        "isBattle": true,
        "enemy": {
            "name": "Crocodilo do brejo",
            "attack": "2d6",
            "defense": "2d6",
            "special": "1d6",
            "hp": 12
        },
        "options": [
            {
                "content": "Atravessar o riacho e seguir as pegadas.",
                "next": "6-D"
            }
        ],
        "battle": {
            "win": {
                "content": "Após derrotar a criatura, você nota pegadas enormes na margem oposta, seguindo na direção de uma fumaça escura. Atravesse e siga o rastro do ogro.",
                "next": "6-D"
            },
            "hit": ["Sua arma encontra a fenda entre as escamas e o crocodilo se debate na água.", "O golpe acerta o focinho do crocodilo, que sacode a cabeça e espirra lama.", "Acertou! O crocodilo recua, batendo a cauda na água turva."],
            "attack": ["O crocodilo emerge da água e fecha as mandíbulas em sua perna.", "A cauda poderosa varre seus pés e você cai na água rasa, ferido.", "Ele se joga sobre você e as escamas ásperas rasgam seu braço."],
            "miss": ["O crocodilo mergulha e seu golpe acerta apenas a água.", "As escamas escorregadias desviam sua arma sem causar dano.", "A criatura gira o corpo e escapa da sua investida."],
            "fail": ["As mandíbulas do crocodilo se fecham a centímetros da sua perna.", "Você se afasta a tempo e a cauda passa zunindo sobre sua cabeça.", "Sua arma bloqueia o bote e o crocodilo recua, sibilando."]
        }
    },
    {
        "id": "6-D",
        "content": "As pegadas levam a uma clareira junto ao brejo. O ogro está remexendo um monte de lenha. Quando você se aproxima, ele agarra sua clava e parte para o ataque.",
        "parent": "5-D",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    },
    {
        "id": "5-E",
        "content": "Rio acima, você encontra uma árvore caída formando uma ponte natural. Do outro lado há pegadas fundas, um pedaço de tecido preso num espinho e o cheiro forte da fumaça. A travessia é segura; siga as marcas até a clareira.",
        "parent": "4-B",
        "isFinal": false,
        "reward": "chainmail",
        "options": [
            {
                "content": "Cruzar pela árvore e seguir o rastro.",
                "next": "6-E"
            }
        ]
    },
    {
        "id": "6-E",
        "content": "A passagem pela árvore deixa você perto da clareira sem precisar cruzar o brejo. O ogro está de guarda junto à fogueira e percebe sua chegada. Ele rosna e avança, bloqueando o caminho de volta.",
        "parent": "5-E",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    },

    // ===================== CAMINHO DO ACAMPAMENTO (baú, desertor Dorian, missão do corno, mini boss Urso) =====================
    {
        "id": "4-C",
        "content": "O acampamento está abandonado às pressas. Há uma panela virada, uma armadilha desmontada e um baú de madeira trancado debaixo de uma lona rasgada, além de uma machadinha de lenhador esquecida num tronco. Pegadas de botas seguem para o norte; outras, muito maiores, vão para leste. Você pode forçar o baú, seguir as botas ou aproveitar os materiais deixados para preparar uma armadilha.",
        "parent": "3-A",
        "isFinal": false,
        "reward": "lumberjack_hatchet",
        "options": [
            {
                "content": "Forçar a fechadura do baú debaixo da lona.",
                "next": "5-F"
            },
            {
                "content": "Seguir as pegadas de botas e descobrir quem passou por ali.",
                "next": "5-G"
            },
            {
                "content": "Reaproveitar a armadilha e preparar uma isca para o ogro.",
                "next": "5-H"
            }
        ]
    },
    {
        "id": "5-F",
        "content": "A fechadura cede com um estalo seco. Dentro do baú há mantimentos mofados, um rolo de corda e um elmo de ferro amassado, mas ainda inteiro, com as iniciais H.K. gravadas na testa. Quem quer que tenha deixado isso aqui saiu com pressa. Você ouve passos de botas se afastando para o norte e uma voz abafada ao longe.",
        "parent": "4-C",
        "isFinal": false,
        "reward": "iron_helmet",
        "options": [
            {
                "content": "Seguir as pegadas de botas e descobrir quem passou por ali.",
                "next": "5-G"
            },
            {
                "content": "Reaproveitar a armadilha e preparar uma isca para o ogro.",
                "next": "5-H"
            }
        ]
    },
    {
        "id": "5-G",
        "content": "Um caçador magro, de olhos fundos e gibão rasgado, surge entre as árvores com o arco apontado para você. É Dorian, desertor de uma expedição de caça que o ogro massacrou. Ele acha que você veio disputar a recompensa e treme de medo e raiva ao mesmo tempo.",
        "parent": "4-C",
        "isFinal": false,
        "options": [
            {
                "content": "Baixar a arma e tentar conversar com ele.",
                "next": "6-F"
            },
            {
                "content": "Sacar a arma e enfrentar o desertor.",
                "next": "6-G"
            }
        ]
    },
    {
        "id": "6-F",
        "content": "Você abaixa a arma e mostra as mãos vazias. Dorian hesita, solta o ar e desaba sobre um tronco. Ele conta que a expedição do capitão Harkon foi massacrada pelo ogro e que o corpo do capitão ficou na Gruta dos Ursos, onde o grupo se escondeu, junto com o corno de caça da família. 'Traga o corno, preciso levá-lo à viúva', pede, 'e eu lhe dou o mapa da clareira e o Montante Mata-Ogros do capitão. Foi feito para derrubar monstros como aquele.'",
        "parent": "5-G",
        "isFinal": false,
        "options": [
            {
                "content": "Aceitar buscar o corno de caça na Gruta dos Ursos.",
                "next": "7-D"
            },
            {
                "content": "Recusar o pedido e pedir apenas o mapa da clareira.",
                "next": "10-A"
            }
        ]
    },
    {
        "id": "7-D",
        "content": "A Gruta dos Ursos é uma fenda escura cheia de ossos e cheiro de pelo molhado. Perto da entrada você encontra os restos do acampamento da expedição: bolsas rasgadas, flechas quebradas e uma garrafa de tônico ainda lacrada. Mais ao fundo, o corpo do capitão Harkon repousa junto a uma pedra, e uma respiração pesada ecoa da escuridão. O corno deve estar ao lado dele, e alguém vigia o corpo.",
        "parent": "6-F",
        "isFinal": false,
        "reward": "herbal_tonic",
        "options": [
            {
                "content": "Entrar mais fundo na gruta para pegar o corno de Harkon.",
                "next": "8-D"
            }
        ]
    },
    {
        "id": "8-D",
        "content": "Um urso-das-cavernas enorme, de pelo escuro e cheio de cicatrizes, ergue-se sobre as patas traseiras e defende o corpo do capitão como se fosse a sua toca. Ele ruge de um jeito que sacode a poeira do teto.",
        "parent": "7-D",
        "isFinal": false,
        "reward": "greater_healing_potion",
        "isBattle": true,
        "enemy": {
            "name": "Urso-das-cavernas",
            "attack": "3d6",
            "defense": "2d6",
            "special": "2d6",
            "hp": 24
        },
        "options": [
            {
                "content": "Voltar até Dorian e entregar o corno de caça.",
                "next": "9-D"
            }
        ],
        "battle": {
            "win": {
                "content": "O urso desaba com um rugido que faz o teto soltar poeira. Ao lado do corpo do capitão Harkon, você pega o corno de caça e cobre o corpo com uma capa antes de sair da gruta. Dorian está esperando por você lá fora.",
                "next": "9-D"
            },
            "hit": ["Sua lâmina corta o flanco do urso, que ruge de dor e raiva.", "O golpe acerta a pata dianteira do urso e ele recua mancando.", "Acertou! O urso-das-cavernas balança a cabeça, atordoado."],
            "attack": ["As garras do urso rasgam seu peito e o jogam contra a parede da gruta.", "O urso o agarra num abraço esmagador e só o solta depois de arranhar suas costas.", "Uma patada violenta acerta seu ombro e você rola pelo chão de ossos."],
            "miss": ["O urso se ergue nas patas traseiras e seu golpe encontra apenas o ar.", "O pelo grosso do urso amortece sua lâmina, que desliza sem ferir.", "Ele gira o corpo com uma agilidade que você não esperava e escapa do ataque."],
            "fail": ["A pata do urso passa a centímetros do seu rosto e arranca uma lasca da pedra.", "Você se abaixa e as garras rasgam apenas o ar acima da sua cabeça.", "O urso investe, mas escorrega nos ossos espalhados e erra o bote."]
        }
    },
    {
        "id": "9-D",
        "content": "Dorian segura o corno com as duas mãos e deixa as lágrimas caírem sem vergonha. Quando recupera a voz, entrega a você o mapa da clareira e o pesado Montante Mata-Ogros que pertenceu a Harkon. 'Ele ia querer que fosse usado contra o monstro. Acabe com aquilo por todos nós.'",
        "parent": "8-D",
        "isFinal": false,
        "reward": "ogre_slayer_greatsword",
        "options": [
            {
                "content": "Usar o mapa para chegar à clareira.",
                "next": "10-A"
            }
        ]
    },
    {
        "id": "6-G",
        "content": "Você saca a arma e o desertor reage com um grito de pânico, disparando uma flecha que passa raspando e puxando a faca de caça. Não há mais tempo para conversa.",
        "parent": "5-G",
        "isFinal": false,
        "reward": "hunter_spear",
        "isBattle": true,
        "enemy": {
            "name": "Caçador desertor",
            "attack": "3d6",
            "defense": "1d6",
            "special": "1d6",
            "hp": 12
        },
        "options": [
            {
                "content": "Usar o mapa para chegar à clareira.",
                "next": "10-A"
            }
        ],
        "battle": {
            "win": {
                "content": "Depois de vencê-lo, você encontra no acampamento dele um mapa que indica a clareira do ogro.",
                "next": "10-A"
            },
            "hit": ["Sua lâmina atravessa a guarda do caçador e ele resmunga de dor.", "O golpe o acerta no ombro e a faca de caça quase lhe escapa da mão.", "Acertou! O desertor tropeça para trás, ofegante."],
            "attack": ["O caçador gira a faca e corta seu braço antes que você reaja.", "Ele dispara uma flecha à queima-roupa e ela raspa seu ombro.", "Um chute no seu joelho o derruba, e a lâmina dele alcança suas costelas."],
            "miss": ["O desertor se joga atrás de uma árvore e seu golpe lasca a casca.", "Ele rola pelo chão e sai do alcance da sua arma.", "Com um passo de lado, o caçador evita o ataque."],
            "fail": ["Você bloqueia a faca dele com a guarda da sua arma.", "A flecha do caçador passa de raspão e se crava no tronco atrás de você.", "Você prevê o golpe e desvia, enquanto ele perde o equilíbrio."]
        }
    },
    {
        "id": "10-A",
        "content": "O mapa leva você diretamente à clareira. O ogro está junto à fogueira e carrega no cinto uma bolsa com objetos roubados. Ao ver você, larga tudo e ergue a clava.",
        "parent": "6-G",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    },
    {
        "id": "5-H",
        "content": "Você monta a armadilha com cuidado e deixa um pedaço de carne como isca. Um javali faminto aparece antes do ogro e investe contra você, enfurecido.",
        "parent": "4-C",
        "isFinal": false,
        "reward": "iron_shield",
        "isBattle": true,
        "enemy": {
            "name": "Javali selvagem",
            "attack": "2d6",
            "defense": "1d6",
            "special": "1d6",
            "hp": 9
        },
        "options": [
            {
                "content": "Seguir as pegadas até a clareira.",
                "next": "6-H"
            }
        ],
        "battle": {
            "win": {
                "content": "Depois do confronto, a isca desapareceu e as pegadas enormes seguem em direção à clareira.",
                "next": "6-H"
            },
            "hit": ["Sua arma atinge o lombo do javali, que guincha e derrapa na terra.", "O golpe pega de lado e o javali rola pelo chão.", "Acertou! O javali sacode a cabeça, atordoado."],
            "attack": ["O javali investe de cabeça e as presas arranham sua coxa.", "Ele atinge seu abdômen com uma trombada e tira o ar dos seus pulmões.", "O animal gira e acerta você com as presas."],
            "miss": ["O javali muda de direção no último instante e seu golpe falha.", "Sua arma raspa nas cerdas duras sem ferir o animal.", "O bicho escapa pelo mato e volta rosnando."],
            "fail": ["Você salta de lado e o javali passa direto, esmagando a vegetação.", "As presas do javali prendem na sua arma, que as desvia.", "A investida do animal erra e ele bate numa raiz, furioso."]
        }
    },
    {
        "id": "6-H",
        "content": "Você segue o rastro até a clareira. O ogro encontra os restos da isca e fareja o ar até localizar você. Com um grunhido furioso, agarra o tronco que usa como clava e avança.",
        "parent": "5-H",
        "isFinal": true,
        "reward": "spiked_mace",
        "isBattle": true,
        "enemy": {
            "name": "Ogro da Brumafunda",
            "attack": "4d6",
            "defense": "3d6",
            "special": "2d6",
            "hp": 40
        },
        "options": [],
        "battle": {
            "win": { "content": "O Ogro da Brumafunda tomba com um estrondo que faz a clareira tremer. A caçada acabou e a recompensa é sua." },
            "hit": ["Sua arma abre um corte fundo no braço do ogro, que ruge de fúria.", "O golpe atinge o joelho da criatura e ela cambaleia, quase largando a clava.", "Acertou! O ogro recua um passo, ofegando como um fole.", "Você acerta o flanco do ogro e a pele grossa se rasga."],
            "attack": ["O ogro ergue o tronco e o desce sobre você, e o impacto faz o chão tremer.", "Uma mão enorme o agarra pelo ombro e o arremessa contra uma árvore.", "A clava varre o ar e acerta suas costelas.", "Ele pisoteia o chão, avança e o acerta com uma cotovelada."],
            "miss": ["O ogro bloqueia seu golpe com o tronco e a lâmina resvala na madeira.", "A criatura recua com surpreendente agilidade e seu ataque falha.", "Seu golpe encontra apenas o ar quando o ogro se abaixa."],
            "fail": ["A clava do ogro esmaga o chão onde você estava um instante antes.", "Você rola para o lado e o tronco passa zunindo sobre sua cabeça.", "Você ergue a arma e desvia a pancada, e o ogro perde o equilíbrio.", "O ogro tenta agarrá-lo, mas você escapa por entre as pernas dele."]
        }
    }
]
