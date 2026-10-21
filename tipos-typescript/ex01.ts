export {};

// ===== Exercício 01: Caixa da padaria =====

// --- 1) Declarações com anotação de tipo explícita ---
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

// --- 2) Sem anotação: o tipo é inferido ---
const aberta = true;
// Tipo inferido: `true` (tipo literal, porque é `const`).
// Se fosse `let aberta = true`, o tipo inferido seria `boolean`.

// --- 3) Subtotais e total ---
const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

// --- 4) Separadores numéricos ---
const paesVendidosNoAno: number = 1_250_000;

// --- 5) Hexadecimal -> decimal ---
const categoriaPanificacao: number = 0x1a; // 26 em decimal

// --- Saída ---
console.log(
  `${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`
);
console.log(
  `${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`
);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
console.log(`Categoria: ${categoriaPanificacao}`);

// --- 6) Erro provocado ---
// quantidade1 = 'doze';
// error TS2322: Type 'string' is not assignable to type 'number'.
