export {};

// ===== Exercício 02: Cupom fiscal =====

// --- 1) Entrada "suja" digitada pelo caixa ---
const nomeDigitado: string = '  maria   da   silva ';

// --- 2) Formatação do nome ---
const MINUSCULAS: string[] = ['da', 'de', 'do'];

function formatarNome(nome: string): string {
  return nome
    .trim()
    .split(' ')
    .filter((parte: string): boolean => parte.length > 0)
    .map((parte: string): string => {
      const palavra: string = parte.toLowerCase();
      if (MINUSCULAS.includes(palavra)) {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
}

// --- 3) Conversões de texto para número ---
const precoLido: string = '12.40';
const quantidadeLida: string = '3un';

const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida, 10);

// --- 4) Desconto de fidelidade ---
const clienteFidelidade: boolean = true;
const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const total: number = subtotal - desconto;

// --- 5) Cupom em uma única template string, com padStart ---
const numeroCupom: number = 42;
const cupomFormatado: string = String(numeroCupom).padStart(6, '0');

const cupom: string = `CUPOM Nº ${cupomFormatado}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
