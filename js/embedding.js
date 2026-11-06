const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2';
const EMBEDDING_MODEL = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';

// Compara o texto digitado com frases esperadas usando similaridade semântica
class Embedding {
    constructor() {
        this.extractor = null;
    }

    async init() {
        console.log("Inicializando modelo...");
        // import() dinâmico funciona em script clássico, inclusive abrindo o arquivo via file://
        const { pipeline } = await import(TRANSFORMERS_URL);

        this.extractor = await pipeline('feature-extraction', EMBEDDING_MODEL);
        
        console.log("Sistema pronto!");
    }

    clearCommand(command) {
        // text-embedding-3-small

        const stopwords = new Set([
            // Artigos
            "o", "a", "os", "as", "um", "uma", "uns", "umas",

            // Preposições
            "de", "da", "do", "das", "dos", "em", "na", "no", "nas", "nos",
            "por", "pelo", "pela", "pelos", "pelas", "para", "com", "sem",
            "sob", "sobre", "entre", "até", "perante", "contra", "desde",

            // Conjunções
            "e", "ou", "mas", "porém", "todavia", "contudo", "porque", "pois",
            "portanto", "logo", "como", "se", "caso", "quando", "enquanto",
            "embora", "conquanto", "que", "nem",

            // Pronomes Pessoais e Demonstrativos
            "eu", "tu", "ele", "ela", "nós", "vós", "eles", "elas",
            "me", "mim", "comigo", "te", "ti", "contigo", "se", "si", "consigo",
            "o", "a", "lhe", "nos", "vos", "lhes",
            "este", "esta", "estes", "estas", "isto",
            "esse", "essa", "esses", "essas", "isso",
            "aquele", "aquela", "aqueles", "aquelas", "aquilo",
            "meu", "minha", "meus", "minhas", "teu", "tua", "teus", "tuas",
            "seu", "sua", "seus", "suas", "nosso", "nossa", "nossos", "nossas",

            // Advérbios comuns de pouca relevância semântica isolada
            "não", "sim", "mais", "muito", "pouco", "ja", "já", "agora",
            "aqui", "ali", "la", "lá", "onde", "como", "tao", "tão",

            // Verbos auxiliares comuns no gerúndio ou particípio/passado
            "ser", "estar", "ter", "haver", "foi", "são", "está", "estão",
            "tem", "têm", "era", "eram", "fui", "foram", "sido", "sendo"
        ]);

        const wordArray = command.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/);

        return wordArray.filter(f => !stopwords.has(f)).join(" ");
    }

    // command: string digitada | phasesExpected: lista de strings | weight: score mínimo
    // Retorna { phaseSelected, index, score } ou undefined se nenhum passar do weight
    async processing(command, phasesExpected, weight = 0.6) {
        if (!this.extractor) {
            throw new Error("O sistema ainda não foi inicializado!");
        }

        command = this.clearCommand(command);
        phasesExpected = phasesExpected.map(m => this.clearCommand(m));

        const vectors = (await this.extractor([command, ...phasesExpected], { pooling: 'mean', normalize: true })).tolist();
        const commandVector = vectors.shift();

        let selectedIndex = -1;
        let highestScore = -1;

        vectors.forEach((phaseVector, index) => {
            const score = this.cosineSimilarity(commandVector, phaseVector);
            if (score > highestScore) {
                highestScore = score;
                selectedIndex = index;
            }
        });

        console.log({
            phaseSelected: phasesExpected[selectedIndex],
            index: selectedIndex,
            score: highestScore,
            condition: highestScore > weight
        });

        if (highestScore > weight) {
            return {
                phaseSelected: phasesExpected[selectedIndex],
                index: selectedIndex,
                score: highestScore
            };
        }
    }

    // Com `normalize: true` o produto escalar já é a similaridade de cosseno
    cosineSimilarity(v1, v2) {
        let dotProduct = 0;
        for (let i = 0; i < v1.length; i++) {
            dotProduct += v1[i] * v2[i];
        }
        return dotProduct;
    }
}

window.Embedding = Embedding;
