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
    $("#botaoProximoPasso").hide();
  } else {
    tipoSolucao = "PassoPasso";
    $("#botaoSolucionar").hide();
    $("#botaoProximoPasso").show();
  }
});

$("#botaoSolucionar").click(function () {
  SolucionaTabela($("#sentencaInput").val());
});

$("#botaoProximoPasso").click(function () {
  if (passoTabela === 0) {
    SolucionaTabela($("#sentencaInput").val());
    passoTabela++;
  } else if (passoTabela < iteracao.length) {
    AdicionaNaTabela(iteracao[passoTabela]);
    passoTabela++;
  }
});

function AdicionaNaTabela(passo) {
  ultimaLetraPilha = passo.pilha[passo.pilha.length - 1];

  if (
    ultimaLetraPilha == ultimaLetraPilha.toUpperCase() &&
    ultimaLetraPilha != "$"
  ) {
    $("#tabela").append(
      `<tr class=iteracao><td>${passo.pilha}</td><td>${passo.entrada}</td><td>${ultimaLetraPilha} ➜ ${passo.acao}</td></tr>`
    );
  } else {
    $("#tabela").append(
      `<tr class="iteracao"><td>${passo.pilha}</td><td>${passo.entrada}</td><td>${passo.acao}</td></tr>`
    );
  }
}

function SolucionaTabela(sentenca) {
  iteracao = [];
  passoTabela = 0;
  pilha = "$S";
  entrada = sentenca + "$";
  acao = tabela["S"][entrada[0]];

  iteracao.push({
    pilha: pilha,
    entrada: entrada,
    acao: acao,
  });

  ultimaIteracao = iteracao[iteracao.length - 1];

  while (true) {
    ultimaLetraPilha = ultimaIteracao.pilha[ultimaIteracao.pilha.length - 1];
    primeiraLetraEntrada = ultimaIteracao.entrada[0];
    if (ultimaIteracao.pilha.length > 0 || ultimaIteracao.entrada > 0) {
      if (ultimaLetraPilha != primeiraLetraEntrada) {
        if (ultimaLetraPilha != ultimaLetraPilha.toUpperCase()) {
          break;
        }

        if (tabela[ultimaLetraPilha][primeiraLetraEntrada] != null) {
          ultimaIteracao.acao = tabela[ultimaLetraPilha][primeiraLetraEntrada];

          if (ultimaIteracao.acao != "E") {
            novaPilha =
              ultimaIteracao.pilha.slice(0, -1) +
              ultimaIteracao.acao.split("").reverse().join("");
          } else {
            novaPilha = ultimaIteracao.pilha.slice(0, -1);
          }

          iteracao.push({
            pilha: novaPilha,
            entrada: entrada,
            acao: "",
          });
        } else {
          acao = "Erro em " + iteracao.length + " iterações";
          break;
        }
      } else {
        if (primeiraLetraEntrada == "$" && ultimaLetraPilha == "$") {
          break;
        }

        acao = "Ler  '" + primeiraLetraEntrada + "'";
        ultimaIteracao.acao = acao;

        novaPilha = ultimaIteracao.pilha.slice(0, -1);
        entrada = ultimaIteracao.entrada.substr(1);

        iteracao.push({
          pilha: novaPilha,
          entrada: entrada,
          acao: "",
        });
      }

      ultimaIteracao = iteracao[iteracao.length - 1];
    }
  }

  ultimaLetraPilha = ultimaIteracao.pilha[ultimaIteracao.pilha.length - 1];
  primeiraLetraEntrada = ultimaIteracao.entrada[0];

  if (ultimaLetraPilha == "$" && primeiraLetraEntrada == "$") {
    ultimaIteracao.acao = "Aceito em " + iteracao.length + " iterações";
  } else {
    ultimaIteracao.acao = "Erro em " + iteracao.length + " iterações";
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
    ultimaLetraPilha = iteracao[i].pilha[iteracao[i].pilha.length - 1];

    if (
      i < iteracao.length - 1 &&
      ultimaLetraPilha == ultimaLetraPilha.toUpperCase()
    ) {
      $("#tabela").append(
        `<tr class=iteracao><td>${iteracao[i].pilha}</td><td>${iteracao[i].entrada}</td><td>${ultimaLetraPilha} ➜ ${iteracao[i].acao}</td></tr>`
      );
    } else {
      $("#tabela").append(
        `<tr class=iteracao><td>${iteracao[i].pilha}</td><td>${iteracao[i].entrada}</td><td>${iteracao[i].acao}</td></tr>`
      );
    }
  }
}
