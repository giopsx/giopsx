export {};

// ===== Exercício 04: Lista de compras do mês =====

// --- 1) Lista de itens ---
const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];

// --- 2) map / filter / reduce (sem for) ---
const nomes: string[] = itens.map((item): string => item.nome);

const caros: { nome: string; preco: number; quantidade: number }[] = itens.filter(
  (item): boolean => item.preco > 10
);

const total: number = itens.reduce(
  (acc: number, item): number => acc + item.preco * item.quantidade,
  0
);

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((i): string => i.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);

// --- 3) readonly array ---
const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Bebidas');
// error TS2339: Property 'push' does not exist on type 'readonly string[]'.
// Um `readonly string[]` só expõe os métodos que não alteram o array.

// --- 4) Matriz: 3 prateleiras da despensa ---
const despensa: number[][] = [
  [2, 0, 1],
  [4, 4],
  [1],
];

const itensGuardados: number = despensa.reduce(
  (acc: number, prateleira: number[]): number =>
    acc + prateleira.reduce((soma: number, qtd: number): number => soma + qtd, 0),
  0
);

console.log(`Itens na despensa: ${itensGuardados}`);

// --- 5) Desestruturação e spread ---
const [primeiro, segundo] = itens;

const listaNova: { nome: string; preco: number; quantidade: number }[] = [
  ...itens,
  { nome: 'Macarrão 500g', preco: 5.49, quantidade: 3 },
];

// Conferência (sem imprimir, para a saída bater com a esperada):
// primeiro.nome === 'Arroz 5kg', segundo.nome === 'Feijão 1kg',
// itens.length === 5 e listaNova.length === 6 -> a original não foi alterada.
void primeiro;
void segundo;
void listaNova;
void categorias;
