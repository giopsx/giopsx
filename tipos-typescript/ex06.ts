export {};

// ===== Exercício 06: Status do pedido no app de delivery =====

// --- 1) Enum numérico começando em 1 ---
enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

// --- 2) Enum de string ---
enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

// --- 3) Mensagem por etapa ---
function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Seu pedido foi cancelado.';
  }
}

// --- 4) Avançar de etapa ---
function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status;
  }
  return status + 1;
}

// --- 5 e 6) Simulação do pedido, usando o mapeamento reverso ---
let atual: StatusPedido = StatusPedido.Recebido;

// StatusPedido[2] devolve 'EmPreparo' -> esse é o mapeamento reverso,
// que existe apenas em enums numéricos.
console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);

while (atual !== StatusPedido.Entregue) {
  atual = avancar(atual);
  console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// --- 7) Erro provocado ---
// const pagamentoErrado: FormaPagamento = 'PIX';
// error TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
//
// Por quê? Um enum de string é um tipo nominal: o único jeito de produzir um
// valor de FormaPagamento é pelo próprio enum (FormaPagamento.Pix). A string
// 'PIX' tem o mesmo conteúdo, mas não é "da mesma marca", então é rejeitada.
// (Em enums numéricos essa checagem é mais frouxa por causa do histórico da linguagem.)
