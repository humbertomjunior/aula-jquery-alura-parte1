var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input",function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(" ").length;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}   

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.addClass("campo-desabilitado digitado-errado");
    inserePlacar();
};

function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel){
            campo.removeClass("digitado-errado");
            campo.addClass("digitado-certo");
        } else {
            campo.removeClass("digitado-certo");
            campo.addClass("digitado-errado");
        }
    });
};

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Humberto";
    var numeroDePalavras = $("#contador-palavras").text();
    // var botaoRemover = "<a href='#' class='botao-remover' >" + "<i class='small material-icons'>delete</i>" + "</a>";
    var linha = novaLinha(usuario, numeroDePalavras);
    corpoTabela.append(linha);
    linha.find(".botao-remover").click(removeLinha);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
};

function removeLinha(){
    event.preventDefault();
    $(this).parent().parent().remove();
};

function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("campo-desabilitado");
    inicializaCronometro();
    campo.removeClass("digitado-errado");
    campo.removeClass("digitado-certo");
};