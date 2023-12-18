// na listaDeNumerosSorteados é para gerar uma lista de números já sorteados. Depois, vamos para a função gerarNumeroAleatorio

let listaDeNumerosSorteados = []; 
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

//o "let titulo = document.querySelector" é para alterar o h1 no html: vai no htlm e seleciona o h1 e coloca um texto dentro. h1 e p são tags
// Tipos: String = texto/Number = número/Boolean = verdadeiro ou falso
//>>>>>let titulo = document.querySelector('h1');

//dentro do título HTML. Para alterar o texto, é sempre dentro de aspas simples
//>>>>>titulo.innerHTML = 'Jogo do número secreto';

//>>>>>let paragrafo = document.querySelector('p');
//>>>>>paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//a função abaixo é uma forma de juntar as linhas acima em uma só função. Acima, cria a função, abaixo, a função será executada. Quando chamar a função exibirTextoNaTela, onde tiver 'tag', será substituído por h1 ou p, conforme o caso, assim como o texto. Desta forma, as funções receberão 2 parâmetros: a tag e o texto. Sempre que tivermos um padrão de código, um muito parecido com o outro, é possível isolar o comportamento repetitivo em uma só função, evitando a repetição de códigos.
//A função exibirTextoNaTela faz algo, executa, mas não queremos que ela devolva uma informação. Ela tem parâmetro.

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //na linha 7 do html foi importada uma função que não é nativa do js. serve para ler o texto. para utilizá-la vamos usar o caminho abaixo.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

// a função 'input' dentro do html é o campo onde será escrito o número do chute

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

//função é um trecho de código que executa algo, que é responsável por uma ação. 
//Nesse caso, essa função vai verificar o chute. Por padrão, a função deve ter apenas uma funcionalidade. A função verificarChute não tem parâmetro e não tem retorno
//Da mesma forma do h1 e do p, iremos pegar um elemento do html. Só que, diferentemente, desta vez iremos só pegar a informação, e não exibi-la.
//Como não queremos o texto do imput, mas o valor ali contido, é necessário colocar o '.value' após o documento.querySelector
//o "=" serve para atribuir um valor. o "==" serve para comparar um valor.
//Tipo Booleano é um valor que pode ser verdadeiro ou falso

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        
        //se o número de tentativas for maior do que um , retornará com a palavra 'tentativas'. Se não, com a palavra 'tentativa'.

        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
      
        //Do html, pegamos a informação do botão "novo jogo". Alí, há o id (identificador único), que se chama "reiniciar". A propriedade para puxar esse id é o getElementById 
       
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela ('p','O número secreto é menor');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
      
        //tentativas = tentativas + 1;
      
        tentativas++;
        limparCampo();
    }
}

//a função Math.random() cria um número aleatório; mas ele cria um número decimal com muitas casas. Assim, é necessário * 10 + 1. O parseInt transoforma essa expressão em um número inteiro. O return atribui o valor para a variável, o return serve para que seja mostrado o resultado da função
//nessa função, não temos parâmetro "()", mas temos um retorno, ou seja, a geração de um número. para que a função seja executada, ela deve ser chamada. Abaixo, ela é declarada, mas para ser executada, deve chamar:gerarNumeroAleatorio(), que está armazenado em let numeroSecreto

// return parseInt(Math.random() * 10 + 11);
   //para fazer a função listaDeNumerosSorteados, tiramos o return e fazermos um if para saber se o número já está na lista de números escolhido (includes()). //o .push adiciona item na lista // o console.log checa o comportamento do código. // o .length é para saber quantos argumentos tem na lista. // a variável quantidadeDeElementosNaLista vai servir para limpar a lista após ela atingir seu número total

function gerarNumeroAleatorio() {
   let numeroEscolhido parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   //sabendo a quantidade de elementos da lista pela variável acima, podemos fazer uma verificação para saber se o limite máximo já foi atingido // a quantidade de elementos na lista é igual ao numeroEscolhido parseInt acima. Então, para não ter que trocar os dois sempre que for alterar, criamos uma variável (numeroLimite)

   if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

// modelos de função: 
//1. sem parâmetro e sem retorno (ex. verificarChute()) >
//2. com parâmetro e sem retorno (ex. exibirTextoNaTela()) > executa, mas não devolve a informação
//3. sem parâmetro e com retorno (ex. gerarNumeroAleatorio()) > 

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

// para criar o click do botão, vamos até o html em "onclick" e criamos a função reiniciarJogo(). Essa função só será iniciada quando clicarmos no botão

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    
    //para que o código não fique repetido, foi criada uma função exibirMensagemInicial()
    //exibirTextoNaTela('h1', 'Jogo do número secreto');
    //exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
    
    exibirMensagemInicial();
    
    //para desabilitarmos o botão novo jogo fazemos o abaixo. Após a vírgula, podemos informar qual o status que queremos o disabled, se habilitado (falso) ou desabilitado (verdadeiro)
    
    document.getElementById('reiniciar').setAttribute('disabled', true)
}