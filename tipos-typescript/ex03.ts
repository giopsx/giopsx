export {};

// ===== Exercício 03: Ficha de paciente =====

// --- 1) Tipo de objeto escrito direto na anotação (sem type/interface) ---
const paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
};

// --- 2) Segundo paciente, só com os campos obrigatórios ---
const paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

// --- 3) Resumo ---
function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const infoAlergias: string =
    p.alergias === undefined || p.alergias.length === 0
      ? 'Sem alergias registradas'
      : `Alergias: ${p.alergias.join(', ')}`;
  return `${p.nome}, ${p.idade} anos. ${infoAlergias}`;
}

console.log(resumo(paciente));
console.log(resumo(paciente2));

// --- 4) Erros provocados ---
// paciente.cpf = '000.000.000-00';
// error TS2540: Cannot assign to 'cpf' because it is a read-only property.

// paciente.peso = 70;
// error TS2339: Property 'peso' does not exist on type
// '{ readonly cpf: string; nome: string; idade: number; plano: boolean; alergias?: string[] | undefined;
//    contatoEmergencia?: { nome: string; telefone: string; } | undefined; }'.

// --- 5) Reflexão: object x Object x {} ---
const dados: object = paciente;
// console.log(dados.nome);
// error TS2339: Property 'nome' does not exist on type 'object'.
//
// Por quê? `object` diz apenas "é algum valor não-primitivo". Ele não guarda
// nenhuma informação sobre QUAIS propriedades existem, então o compilador não
// deixa acessar `.nome`. O tipo declarado (object) é o que vale para a checagem,
// e não o valor que foi atribuído.
void dados;

// let x: {} = 10;      // ACEITO: `{}` significa "qualquer coisa que não seja null/undefined",
//                      // e isso inclui os primitivos (number, string, boolean...).
// let y: object = 10;  // ERRO TS2322: Type 'number' is not assignable to type 'object'.
//                      // `object` exclui os primitivos: aceita só objetos, arrays e funções.
