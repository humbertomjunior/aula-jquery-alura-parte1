var frase = $(".frase").text();
var arrayPalavras = frase.split(" ");
var numeroPalavras = arrayPalavras.length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numeroPalavras);

var campoDigitacao = $(".campo-digitacao");
campoDigitacao.on("input", function(){
    var conteudo = campoDigitacao.val();
    var quantidadeLetras = conteudo.length;
    var quantidadePalavras = conteudo.split(/\s+/).length - 1;
    var campoQuantidadeLetras = $("#contador-caracteres");
    campoQuantidadeLetras.text(quantidadeLetras);
    var campoQuantidadepalavras = $("#contador-palavras");
    campoQuantidadepalavras.text(quantidadePalavras);
});

var tempoDigitacao = $("#tempo-digitacao").text();
campoDigitacao.one("focus", function(){
    var cronometroId = setInterval(function() {
        tempoDigitacao--;
        console.log(tempoDigitacao);
        $("#tempo-digitacao").text(tempoDigitacao);
        if(tempoDigitacao < 1){
            campoDigitacao.attr("disabled", true);
            clearInterval(cronometroId);
        }
    }, 1000);
});