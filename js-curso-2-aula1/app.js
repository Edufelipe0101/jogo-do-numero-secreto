// Lista para armazenar números já sorteados, evitando repetições
let listadeNumerosSorteados = [];

// Define o limite máximo para o número secreto
let numeroLimite = 100;

// Gera o primeiro número secreto ao iniciar o jogo
let numeroSecreto = gerarNumeroAleatorio();

// Contador de tentativas do jogador
let tentavivas = 1;

// Exibe a mensagem inicial ao carregar o jogo
exibirMensagemInicial();

/**
 * Exibe um texto em uma tag HTML específica e o lê em voz alta.
 * 
 * @function
 * @param {string} tag - Seletor da tag onde o texto será exibido (ex: "h1", "p").
 * @param {string} texto - Texto a ser exibido e lido em voz alta.
 */
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

/**
 * Gera um número aleatório entre 1 e o número limite definido, garantindo que
 * não seja repetido caso já tenha sido sorteado anteriormente.
 * 
 * @function
 * @returns {number} - Número aleatório não repetido.
 */
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;

  // Se todos os números já foram sorteados, limpa a lista para reiniciar
  if (quantidadeDeElementosNaLista == numeroLimite) {
    listadeNumerosSorteados = [];
  }

  // Verifica se o número já foi sorteado, se sim, gera outro
  if (listadeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listadeNumerosSorteados.push(numeroEscolhido);
    console.log(listadeNumerosSorteados);
    return numeroEscolhido;
  }
}

/**
 * Limpa o campo de entrada do jogador após cada tentativa.
 * 
 * @function
 */
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

/**
 * Exibe o título e a mensagem inicial do jogo na tela.
 * 
 * @function
 */
function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do Número Secreto");
  exibirTextoNaTela("p", "Digite um número de 1-100");
}

/**
 * Reinicia o jogo após o jogador acertar:
 * - Gera um novo número secreto
 * - Limpa o campo de entrada
 * - Reseta o contador de tentativas
 * - Desabilita o botão de reinício até que o jogador acerte novamente
 * 
 * @function
 */
function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentavivas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

/**
 * Verifica se o número digitado pelo jogador é igual ao número secreto:
 * - Se acertar, mostra mensagem de sucesso e habilita o botão reiniciar
 * - Se errar, indica se o próximo chute deve ser maior ou menor
 * - Incrementa o contador de tentativas
 * 
 * @function
 */
function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    let palavratentativa = tentavivas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você acertou o número secreto ${numeroSecreto} com ${tentavivas} ${palavratentativa}`;
    
    exibirTextoNaTela("h1", "Acertou");
    exibirTextoNaTela("p", mensagemTentativas);

    document.getElementById("reiniciar").removeAttribute("disabled");

  } else if (chute < numeroSecreto) {
    exibirTextoNaTela("h1", "Tente Novamente");
    exibirTextoNaTela("p", "Tente um número maior");

  } else {
    exibirTextoNaTela("h1", "Tente Novamente");
    exibirTextoNaTela("p", "Tente um número menor");
  }

  tentavivas++;
  limparCampo();
}
