export {};

// ===== Exercício 07: Central de notificações =====

// --- 1) Tipo de função ---
type Notificador = (destinatario: string, mensagem: string) => void;

// --- 2) Três implementações ---
const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

// --- 4) return antecipado (vazio) para mensagens longas ---
const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return;
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

// --- 3) Envio em lote ---
function notificarTodos(
  destinatarios: string[],
  mensagem: string,
  enviar: Notificador
): void {
  destinatarios.forEach((destinatario: string): void => {
    enviar(destinatario, mensagem);
  });
}

const aviso: string = 'Reunião de pais sexta às 19h';

notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], aviso.repeat(10), porSms);

// --- 5) Erro provocado ---
// function teste(): void { return 10; }
// error TS2322: Type 'number' is not assignable to type 'void'.

// --- 6) Reflexão: retorno ignorado em um tipo de função void ---
const contar: Notificador = (d, m) => m.length; // aceito!
void contar;
//
// Quando o tipo de função declara `=> void`, o TypeScript entende que quem
// chama a função NÃO vai usar o valor devolvido. Então qualquer retorno é
// permitido e simplesmente descartado — isso é o que permite escrever
// `arr.forEach(x => arr2.push(x))` sem erro, mesmo que `push` devolva number.
// A proibição do item 5 é diferente: ali o `void` está na ASSINATURA da própria
// função, declarada por mim, e aí o compilador exige um `return` vazio.
