export {};

// ===== Exercício 08: Formulário de cadastro =====

// --- 1) Código do cliente: number | string ---
const codigo: number | string = 42;

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  // Aqui o tipo já foi estreitado para string.
  const digitos: string = c.replace(/\D/g, '');
  return `CLI-${digitos.padStart(4, '0')}`;
}

// --- 2) Tipo literal do tamanho ---
type Tamanho = 'P' | 'M' | 'G' | 'GG';
const tamanho: Tamanho = 'M';
// const tamanhoInvalido: Tamanho = 'XG';
// error TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

// --- 3) Frete por região ---
type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

// --- 4) Complemento: string | null ---
const logradouro: string = 'Rua das Flores, 100';
const complemento: string | null = null;
const complementoTexto: string = complemento === null ? '(sem complemento)' : complemento;

// --- 5) Limpeza do telefone ---
function limparTelefone(tel: string | number): string {
  if (typeof tel === 'number') {
    return String(tel);
  }
  return tel.replace(/\D/g, '');
}

// --- 6) Inferência de literais ---
const r = 'sul'; // tipo inferido: 'sul' (literal) -> pode ser passado a calcularFrete
let r2 = 'sul'; // tipo inferido: string -> NÃO pode
// calcularFrete(r2);
// error TS2345: Argument of type 'string' is not assignable to parameter of type 'Regiao'.
//
// Por quê? `const` nunca muda, então o compilador guarda o tipo literal exato.
// Com `let` o valor pode ser reatribuído depois, então ele "alarga" (widening)
// o tipo para string, que é mais amplo que a união de literais.
r2 = 'norte'; // prova de que r2 pode mudar
const r3 = 'sul' as const; // correção: `as const` trava o tipo literal
void r2;

// --- Saída ---
console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: ${logradouro} - ${complementoTexto}`);
console.log(`Frete para o ${r}: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
// limparTelefone(69999990000) também devolve '69999990000' (não impresso,
// para a saída bater com a esperada). O mesmo vale para calcularFrete(r3).
void limparTelefone(69999990000);
void calcularFrete(r3);
