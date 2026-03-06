function verificarContas(contas) {

  const hoje = new Date();

  contas.forEach(conta => {

    const vencimento = new Date(conta.vencimento);
    const diffTempo = vencimento - hoje;
    const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

    if(diffDias <= 3 && conta.pago === false){

      enviarNotificacao(
        "Conta perto de vencer",
        `A conta ${conta.nome} vence em ${diffDias} dia(s)`
      );

    }

  });

}
function enviarNotificacao(titulo, mensagem){

  if(Notification.permission === "granted"){

    new Notification(titulo,{
      body: mensagem,
      icon: "icon.png"
    });

  }

}

if(Notification.permission !== "granted"){
  Notification.requestPermission();
}

if(Notification.permission !== "granted"){
  Notification.requestPermission();
}
function verificarHorario(contas){

  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes();

  if((hora === 10 && minutos === 0) || (hora === 18 && minutos === 0)){
      verificarContas(contas);
  }

}

setInterval(() => {
  verificarHorario(listaContas);
},60000);
