tabela = {
  S: { a: "aBd", d: "dCc" },
  A: { a: "aBc", c: "cSa" },
  B: { b: "bCc", c: "E", d: "E" },
  C: { a: "aAb" },
};

tipoSolucao = "Completa";
iteracao = [];
passoTabela = 0;

function LimpaTabela() {
  iteracao = [];
  passoTabela = 0;
  $("#sentencaInput").val("");
  $(".iteracao").remove();
}

$("#limparTabela").click(function () {
  LimpaTabela();
});

$('input[type="radio"]').change(function () {
  LimpaTabela();
  if ($("input:radio[name=tipoSolucao]:checked").val() == 0) {
    tipoSolucao = "Completa";
    $("#botaoSolucionar").show();
    $("#botaoProximoPassoo").hide();
  } else {
    tipoSolucao = "PassoPasso";
    $("#botaoSolucionar").hide();
    $("#botaoProximoPassoo").show();
  }
});

$("#botaoSolucionar").click(function () {
  SolucionaTabela($("#sentencaInput").val());
});

$("#botaoProximoPassoo").click(function () {
  if (passoTabela === 0) {
    SolucionaTabela($("#sentencaInput").val());
    passoTabela++;
  } else if (passoTabela < iteracao.length) {
    AdicionaNaTabela(iteracao[passoTabela]);
    passoTabela++;
  }
});

function AdicionaNaTabela(step) {
  $("#tabela").append(
    `<tr class="iteracao"><td>${step.pilha}</td><td>${step.entrada}</td><td>${step.proximoPasso}</td></tr>`
  );
}

function SolucionaTabela(sentenca) {
  iteracao = [];
  passoTabela = 0;
  pilha = "$S";
  sentenca = sentenca + "$";
  proximoPasso = tabela["S"][sentenca[0]];

  iteracao.push({
    pilha: pilha,
    entrada: sentenca,
    proximoPasso: proximoPasso,
  });

  var ultimaPosicao = iteracao[iteracao.length - 1];

  while (ultimaPosicao.pilha.length) {
    ultimaLetra = ultimaPosicao.pilha[ultimaPosicao.pilha.length - 1];
    entrada = ultimaPosicao.entrada[0];
    if (ultimaPosicao.pilha.length > 0 || ultimaPosicao.entrada > 0) {
      if (ultimaLetra != entrada) {
        if (ultimaLetra != ultimaLetra.toUpperCase()) {
          break;
        }

        if (tabela[ultimaLetra][entrada] != null) {
          ultimaPosicao.proximoPasso = tabela[ultimaLetra][entrada];
          sentenca = ultimaPosicao.entrada;

          if (ultimaPosicao.proximoPasso != "E") {
            novaPilha =
              ultimaPosicao.pilha.slice(0, -1) +
              ultimaPosicao.proximoPasso.split("").reverse().join("");
          } else {
            novaPilha = ultimaPosicao.pilha.slice(0, -1);
          }

          iteracao.push({
            pilha: novaPilha,
            entrada: sentenca,
            proximoPasso: "",
          });
        } else {
          proximoPasso = "Erro em " + iteracao.length + " iterações";
          break;
        }
      } else {
        if (entrada == "$" && ultimaLetra == "$") {
          break;
        }

        proximoPasso = "Ler  '" + entrada + "'";
        ultimaPosicao.proximoPasso = proximoPasso;

        novaPilha = ultimaPosicao.pilha.slice(0, -1);
        sentenca = ultimaPosicao.entrada.substr(1);

        iteracao.push({
          pilha: novaPilha,
          entrada: sentenca,
          proximoPasso: "",
        });
      }

      ultimaPosicao = iteracao[iteracao.length - 1];
    }
  }

  ultimaLetra = ultimaPosicao.pilha[ultimaPosicao.pilha.length - 1];
  entrada = ultimaPosicao.entrada[0];

  if (ultimaLetra == "$" && entrada == "$") {
    ultimaPosicao.proximoPasso = "Aceito em " + iteracao.length + " iterações";
  } else {
    ultimaPosicao.proximoPasso = "Erro em " + iteracao.length + " iterações";
  }

  if (tipoSolucao == "Completa") {
    AtualizaTabela();
  } else {
    AdicionaNaTabela(iteracao[passoTabela]);
  }
}

function AtualizaTabela() {
  $(".iteracao").remove();

  for (var i = 0; i < iteracao.length; i++) {
    ultimaLetra = iteracao[i].pilha[iteracao[i].pilha.length - 1];

    if (i < iteracao.length - 1 && ultimaLetra == ultimaLetra.toUpperCase()) {
      $("#tabela").append(
        `<tr class=iteracao><td>${iteracao[i].pilha}</td><td>${iteracao[i].entrada}</td><td>${ultimaLetra} ➜ ${iteracao[i].proximoPasso}</td></tr>`
      );
    } else {
      $("#tabela").append(
        `<tr class=iteracao><td>${iteracao[i].pilha}</td><td>${iteracao[i].entrada}</td><td>${iteracao[i].proximoPasso}</td></tr>`
      );
    }
  }
}
