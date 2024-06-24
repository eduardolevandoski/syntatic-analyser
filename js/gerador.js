let passo = "S";
let sentenca = "";

function ResetaEstilo() {
  $("#gerador td").css({
    "background-color": "white",
    color: "black",
  });
}

function AtualizaEstiloLinha(seletor, estilos) {
  $(`${seletor} td`).each(function () {
    if ($(this).text().trim() !== "") {
      $(this).css(estilos);
    }
  });
}

$(document).ready(function () {
  LimpaGerador();
  $("#limparGerador").click(function () {
    LimpaGerador();
  });
  $("#copiarSentenca").click(function () {
    if ($("#sentencaGerador").val() != "") {
      copiarTexto();
    }
  });
});

function LimpaGerador() {
  passo = "S";
  sentenca = "";
  $("#sentencaGerador").val("");
  ResetaEstilo();
  AtualizaEstiloLinha(`.${passo}`, {
    "background-color": "#3cc590",
    color: "white",
  });
}

$("#gerador td").click(function () {
  if ($(this).text() !== "" && $(this).text().includes(passo)) {
    ResetaEstilo();

    var acao = $(this).text();
    var regra = acao.split("➜")[0];
    var selecionado = acao.split("➜")[1];
    var sentencaAtual = $("#sentencaGerador").val();

    if (selecionado == "ε") {
      sentenca = sentencaAtual.replace(regra, "");
      passo = "";
    } else {
      if (sentenca == "") {
        sentenca = selecionado;
      } else {
        sentenca = sentencaAtual.replace(regra, selecionado);
      }
    }

    for (var i = 0; i < sentenca.length; i++) {
      if (sentenca[i] == sentenca[i].toUpperCase()) {
        passo = sentenca[i];
        break;
      } else {
        passo = "";
      }
    }

    if (passo) {
      AtualizaEstiloLinha(`.${passo}`, {
        "background-color": "#3cc590",
        color: "white",
      });
    }

    $("#sentencaGerador").val(sentenca);
  }
});
