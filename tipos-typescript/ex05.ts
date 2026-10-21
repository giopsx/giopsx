export {};

// ===== Exercício 05: Boletim do clima =====

// --- 1) Tupla nomeada ---
type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

// --- 3) Percorrendo com desestruturação no for...of ---
for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

// --- 2) Mínima e máxima em uma tupla ---
function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

const temperaturas: number[] = leituras.map(([, temp]): number => temp);
const [minima, maxima] = extremos(temperaturas);

const media: number =
  temperaturas.reduce((acc: number, t: number): number => acc + t, 0) / temperaturas.length;

console.log(
  `Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`
);

// --- 4) Contatos de imprensa: último elemento opcional ---
type Contato = [nome: string, telefone: string, email?: string];

const contatoComEmail: Contato = ['Joana Reis', '(69) 98888-1111', 'joana@noticias.com'];
const contatoSemEmail: Contato = ['Marcos Dias', '(41) 97777-2222'];

// contatoComEmail[2] === 'joana@noticias.com' e contatoSemEmail[2] === undefined
void contatoComEmail;
void contatoSemEmail;

// --- 5) Elemento rest: cidade + N temperaturas ---
type HistoricoSemanal = [string, ...number[]];

const historico: HistoricoSemanal = ['Porto Velho', 34, 33, 35, 32, 34, 36, 33];
const [cidadeHistorico, ...tempsSemana] = historico;
const mediaSemana: number =
  tempsSemana.reduce((acc: number, t: number): number => acc + t, 0) / tempsSemana.length;

// Média semanal de Porto Velho: 33.9°C
void cidadeHistorico;
void mediaSemana;

// --- 6) Tupla readonly ---
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Vilhena';
// error TS2540: Cannot assign to '1' because it is a read-only property.
void capitalOficial;
