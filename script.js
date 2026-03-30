function abrirGrupo(grupo) {
  localStorage.setItem("grupoSelecionado", grupo);
  window.location.href = "grupo.html";
}

function voltarInicio() {
  window.location.href = "index.html";
}

/* ==============================
CONTAS
============================== */

const contas = {
  academicas: [
    { nome: "Faculdade ADS", valor: 493.50, vencimento: "2026-04-05", status: "nao_paga" },
    { nome: "Faculdade Logística", valor: 140.53, vencimento: "2026-04-09", status: "nao_paga" },
    { nome: "Mensalidade Colégio Propósito", valor: 600.00, vencimento: "2026-04-06", status: "nao_paga" },
    { nome: "Faculdade Letras", valor: 320.00, vencimento: "2026-04-12", status: "nao_paga" },
    { nome: "Curso de Inglês", valor: 400.50, vencimento: "2026-04-20", status: "nao_paga" },
    { nome: "Mensalidade AABB", valor: 100.00, vencimento: "2026-04-09", status: "nao_paga" }
  ],

  casa: [
    { nome: "Conta de energia", valor: 411.17, vencimento: "2026-04-10", status: "nao_paga" },
    { nome: "Internet", valor: 0.00, vencimento: "2026-04-15", status: "nao_paga" },
    { nome: "Conta de água", valor: 0.00, vencimento: "2026-04-07", status: "nao_paga" },
    { nome: "HiperTV", valor: 0.00, vencimento: "2026-04-08", status: "nao_paga" },
    { nome: "Cartão de crédito Elidiane", valor: 0.00, vencimento: "2026-04-27", status: "nao_paga" },
    { nome: "Cartão de crédito Thiago", valor: 0.00, vencimento: "2026-04-22", status: "nao_paga" },
    { nome: "Consórcio", valor: 0.00, vencimento: "2026-03-07", status: "nao_paga" },
    { nome: "IPTU", valor: 0.00, vencimento: "2026-03-29", status: "nao_paga" }
  ],

  imobiliaria: [
    { nome: "Aluguel", valor: 2980.00, vencimento: "2026-03-16", status: "nao_paga" },
    { nome: "Conta de energia", valor: 0.00, vencimento: "2026-03-06", status: "nao_paga" },
    { nome: "Internet", valor: 0.00, vencimento: "2026-03-18", status: "nao_paga" },
    { nome: "Conta de água", valor: 0.00, vencimento: "2026-03-21", status: "nao_paga" }
  ]
};

/* ==============================
EXIBIÇÃO
============================== */

if (document.getElementById("listaContas")) {

  const grupo = localStorage.getItem("grupoSelecionado");
  const lista = document.getElementById("listaContas");

  let total = 0;
  let totalVencidas = 0;

  let tabela = `
  <table border="1" width="100%" cellpadding="10">
    <tr style="background:#333; color:white;">
      <th>Conta</th>
      <th>Valor</th>
      <th>Vencimento</th>
      <th>Tempo Restante</th>
      <th>Situação</th>
    </tr>
  `;

  if (contas[grupo]) {
    contas[grupo].forEach(conta => {

      total += conta.valor;

      let situacao = "";
      let cor = "";

      if (conta.status === "paga") {
        situacao = "PAGA ✅";
        cor = "#4CAF50";
      } else if (conta.status === "vencida") {
        situacao = "VENCIDA ❌";
        cor = "#f44336";
        totalVencidas++;
      } else {
        situacao = "NÃO PAGA ⚠";
        cor = "#ffc107";
      }

      tabela += `
      <tr style="background:${cor}20">
        <td>${conta.nome}</td>
        <td>R$ ${conta.valor.toFixed(2)}</td>
        <td>${formatarData(conta.vencimento)}</td>
        <td>${calcularTempoRestante(conta.vencimento)}</td>
        <td><strong>${situacao}</strong></td>
      </tr>
      `;
    });
  }

  tabela += `
    <tr>
      <td colspan="5" style="text-align:right; font-weight:bold;">
        Total do grupo: R$ ${total.toFixed(2)} | Contas vencidas: ${totalVencidas}
      </td>
    </tr>
  </table>
  `;

  lista.innerHTML = tabela;
}

/* ==============================
DATA
============================== */

function formatarData(dataISO) {
  const partes = dataISO.split("-");
  const data = new Date(partes[0], partes[1] - 1, partes[2]);
  return data.toLocaleDateString("pt-BR");
}

/* ==============================
TEMPO RESTANTE
============================== */

function calcularTempoRestante(dataISO) {

  const agora = new Date();
  const partes = dataISO.split("-");

  const vencimento = new Date(partes[0], partes[1] - 1, partes[2], 23, 59, 59);
  const diferenca = vencimento - agora;

  if (diferenca <= 0) {
    return "Vencida";
  }

  const minutos = Math.floor(diferenca / (1000 * 60));
  const dias = Math.floor(minutos / (60 * 24));
  const horas = Math.floor((minutos % (60 * 24)) / 60);
  const mins = minutos % 60;

  return `${dias}d ${horas}h ${mins}m`;
}