# Changelog

Todas as mudanças relevantes do **d6 Terminal** estão neste arquivo.

O versionamento segue o [SemVer](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`), aplicado a cada commit:

- **MAJOR**: mudança incompatível com versões anteriores.
- **MINOR**: nova funcionalidade compatível (`feat`).
- **PATCH**: correção de bug ou ajuste pequeno (`fix`).

Enquanto o jogo estiver abaixo da `1.0.0`, ele é considerado em desenvolvimento inicial, e novas funcionalidades incrementam o MINOR.

## [0.13.0] - 2026-11-07 - não commitado

### Adicionado
- Enredo de `ogreHunterChapter.js` expandido de 16 para 33 capítulos, mantendo a caçada ao ogro como linha principal e a mesma estrutura de capítulos.
- Prólogo na Vila de Pedraalta, com a taverneira Hilda, o ferreiro Brogan (armadura de couro reforçado) e a curandeira Maren (poção).
- Caminho da trilha: mochila esquecida com poção e diário, torre de vigia em ruínas com baú (espada longa de aço) e mini-boss Lobo-Alfa cicatrizado.
- Caminho do riacho: missão secundária do barqueiro Orvyl (buscar musgo-lunar para curar a filha), mini-boss Guardião do Santuário e travessia de canoa até a clareira do ogro.
- Caminho do acampamento: baú trancado com elmo, encontro com o desertor Dorian (conversar ou lutar), missão secundária do corno de caça do capitão Harkon e mini-boss Urso-das-cavernas.
- Novas recompensas distribuídas pelo enredo, usando equipamentos e poções que ainda não eram usados.

### Alterado
- Cada caminho continua terminando em um ogro final próprio (`enemy` independente), com textos de chegada específicos.
- Os ids dos capítulos foram renumerados por profundidade (`1-A` a `10-A`).

### Corrigido
- `startGame` em `js/game.js` iniciava em `chapters[2]` (resquício de depuração) e agora inicia em `chapters[0]`.

## [0.12.0] - 2026-11-06 - não commitado

### Adicionado
- 13 novos equipamentos e poções em `js/items.js`, totalizando 28 itens: 12 de ataque, 10 de defesa e 6 poções.

### Alterado
- As propriedades dos itens em `js/items.js` passaram a usar nomes em inglês (`snake_case`).
- Os `reward` em `ogreHunterChapter.js` foram atualizados para os novos ids.

### Corrigido
- Dano de `steel_longsword` ajustado para 3d6.

## [0.11.0] - 2026-11-06 - `080aa23`

### Adicionado
- Método único `brain` em `js/game.js`, que compara o texto digitado com os comandos internos e com as opções do capítulo ao mesmo tempo e escolhe a melhor correspondência.
- Opções com `func` passam a ser tratadas como comandos internos (`isInternalCommand`).
- Campo `validations` nos comandos. O comando de equipar não pode ser usado durante o combate e responde "Você não pode fazer isso agora."
- Comando `reload game` ("resetar o jogo"), que recarrega a página.
- Ajuda com lista de comandos: Inventário, Analisar, Equipar e Beber, cada um com sua descrição.

### Alterado
- `CONTEXT_STATE` passa a usar textos (`'CHAPTER'`, `'COMBAT'`, etc.) no lugar de números.
- Frases-exemplo (`keys`) de inventário, detalhes, equipar e poção reduzidas a palavras-chave curtas ("inventário", "bolsa", "analisar", "equipar", "beber").
- `COMMAND_MIN_SCORE` subiu de 0,5 para 0,68, e a margem mínima sobre o segundo colocado (`COMMAND_MIN_MARGIN`) foi removida.
- Mensagem "Não entendi" mais completa, e a ajuda coloca o jogo em estado de consulta.
- Erros agora também aparecem no console (`console.error`).

### Corrigido
- Detalhes de equipamento não quebram mais quando nenhum item é encontrado pelo nome.

### Removido
- `commandBrain` e `chapterBrain`, substituídos por `brain`.
- Logs de depuração em `js/embedding.js` e `js/game.js`.

## [0.10.0] - 2026-11-06 - `6b4fabd`

### Adicionado
- Arquivo `CHANGELOG.md` com o histórico de versões do projeto.

## [0.9.0] - 2026-11-06 - `430e17a`

### Adicionado
- Cache de embeddings em `js/embedding.js`: os vetores das frases esperadas são calculados uma única vez.
- Método `scores`, que retorna a similaridade de cosseno de cada frase esperada.

### Alterado
- `commandBrain` calcula os scores de todos os comandos numa única chamada ao modelo e escolhe o melhor comando globalmente.
- Novas constantes `COMMAND_MIN_SCORE` e `COMMAND_MIN_MARGIN`: o comando só é aceito se superar o score mínimo e a margem sobre o segundo colocado.

### Removido
- Limpeza de stopwords (`clearCommand`), que podia inverter o sentido das frases (ex.: "não quero atacar"). Agora o texto só é normalizado.

## [0.8.0] - 2026-11-06 - `2939c78`

### Alterado
- Frases-exemplo (`keys`) do `commandMapper` reescritas para inventário, detalhes, equipar, poção, resumo da história, ajuda e batalha, com mais variedade para melhorar o reconhecimento por similaridade.

## [0.7.0] - 2026-11-06 - `119939e`

### Adicionado
- Catálogo de itens em `js/items.js` com 15 itens (armas, defesas e poções) balanceados por raridade.
- Campo `reward` nos capítulos de `ogreHunterChapter.js`, com recompensa ao vencer monstros ou ao entrar em capítulos específicos.
- Sistema de recompensas no inventário, entregue uma única vez por capítulo.
- Comando para usar poções, que curam até o máximo de 7 HP.

### Alterado
- Combate entrega a recompensa ao final da batalha vencida.

## [0.6.0] - 2026-11-06 - `657ae4f`

### Adicionado
- Inventário com equipamentos, raridade (Comum, Raro, Épico e Lendário) e itens equipados.
- Comandos para ver detalhes de um equipamento e para equipar itens.
- Estilos de cores por raridade.

### Alterado
- Atributos de ataque e defesa do jogador passam a vir dos itens equipados.
- Narrativa de combate e prompts do terminal melhorados.

## [0.5.0] - 2026-11-05 - `b718067`

### Alterado
- Saída do terminal aprimorada e contexto do jogo com estados (consulta, capítulo e combate).
- Ajustes visuais em `css/style.css` e `index.html`.
- Melhorias em `js/embedding.js` e `js/battle.js`.

## [0.4.0] - 2026-11-05 - `139d51d`

### Alterado
- Estrutura do HTML refatorada para melhorar o layout.
- Adicionada seção de histórico com rolagem.

## [0.3.1] - 2026-11-05 - `c227ee1`

### Corrigido
- Limites de score no reconhecimento de comandos e de opções do capítulo ajustados para maior acerto.

## [0.3.0] - 2026-11-05 - `55e77aa`

### Adicionado
- Classe `Helper` (`js/helper.js`), que explica o básico do jogo conforme a situação (exploração ou batalha).
- Comando de ajuda por frases ou pelas palavras rápidas "ajuda", "help", "?" e "socorro".

### Alterado
- Mensagem "Não entendi" passa a sugerir o comando "ajuda".

## [0.2.0] - 2026-11-05 - `5f752cc`

### Adicionado
- Mecânicas de batalha com falas de ação por inimigo (`hit`, `attack`, `miss`, `fail` e `win`) para todos os combates de `ogreHunterChapter.js`.
- Campos `isBattle` e `battle` nos capítulos com inimigos.

### Alterado
- Código dividido em arquivos por responsabilidade: `css/style.css` e `js/` com `battle.js`, `embedding.js`, `game.js`, `inventory.js` e `terminal.js`. O `index.html` ficou só com a estrutura da página.
- Classe `Embedding` agora é um script comum, carregado pela biblioteca na CDN com `import()`.

## [0.1.0] - 2026-11-04 - `3fb8ba3`

### Adicionado
- Versão inicial do jogo: terminal em `index.html` e a história "Caçador de Ogro" em `ogreHunterChapter.js`.
