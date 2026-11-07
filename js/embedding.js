const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2';
const EMBEDDING_MODEL = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';

// Compara o texto digitado com frases esperadas usando similaridade semântica
class Embedding {
    constructor() {
        this.extractor = null;
        this.cache = new Map();
    }

    async init() {
        console.log("Inicializando modelo...");
        // import() dinâmico funciona em script clássico, inclusive abrindo o arquivo via file://
        const { pipeline } = await import(TRANSFORMERS_URL);

        this.extractor = await pipeline('feature-extraction', EMBEDDING_MODEL);
        
        console.log("Sistema pronto!");
    }

    // Só normaliza: modelos de sentença funcionam melhor com frases naturais (sem remover stopwords)
    normalize(text) {
        return text.trim().toLowerCase().replace(/\s+/g, " ");
    }

    // Retorna os vetores dos textos, calculando apenas os que ainda não estão no cache
    async embed(texts) {
        if (!this.extractor) {
            throw new Error("O sistema ainda não foi inicializado!");
        }

        const normalized = texts.map(text => this.normalize(text));
        const missing = [...new Set(normalized.filter(text => !this.cache.has(text)))];

        if (missing.length > 0) {
            const vectors = (await this.extractor(missing, { pooling: 'mean', normalize: true })).tolist();
            missing.forEach((text, index) => this.cache.set(text, vectors[index]));
        }

        return normalized.map(text => this.cache.get(text));
    }

    // Retorna a lista de scores (cosseno) de cada frase esperada em relação ao comando
    async scores(command, phasesExpected) {
        const [commandVector, ...phaseVectors] = await this.embed([command, ...phasesExpected]);

        return phaseVectors.map(phaseVector => this.cosineSimilarity(commandVector, phaseVector));
    }

    // command: string digitada | phasesExpected: lista de strings | weight: score mínimo
    // Retorna { phaseSelected, index, score } ou undefined se nenhum passar do weight
    async processing(command, phasesExpected, weight = 0.6) {
        const scores = await this.scores(command, phasesExpected);

        let selectedIndex = -1;
        let highestScore = -1;

        scores.forEach((score, index) => {
            if (score > highestScore) {
                highestScore = score;
                selectedIndex = index;
            }
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
