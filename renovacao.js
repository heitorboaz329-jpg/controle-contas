import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function renovarContas() {

  const hoje = new Date();
  const mesAtual = hoje.getMonth();

  const querySnapshot = await getDocs(collection(db, "contas"));

  querySnapshot.forEach(async (documento) => {

    const dados = documento.data();

    if (dados.mesPago !== mesAtual) {

      await updateDoc(doc(db, "contas", documento.id), {
        pago: false,
        mesPago: mesAtual
      });

    }

  });

}

import { db } from "./firebase.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function marcarPago(idConta) {

  const contaRef = doc(db, "contas", idConta);

  await updateDoc(contaRef, {
    pago: true
  });

}

import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onSnapshot(collection(db, "contas"), (snapshot) => {

  snapshot.forEach((doc) => {

    const dados = doc.data();

    console.log(dados.nome, dados.pago);

    // atualizar interface aqui

  });

});