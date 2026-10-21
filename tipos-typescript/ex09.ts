export {};

// ===== Exercício 09: Lendo a resposta de uma API de clima =====

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// --- 1) Versão com any (só para ver o problema) ---
function lerComAny(json: string): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dados: any = JSON.parse(json);
  console.log(`${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`);
}
// lerComAny(respostaQuebrada);
// O compilador aceita tudo, mas em tempo de EXECUÇÃO estoura:
// TypeError: dados.temperatura.toFixed is not a function
// (porque "quente" é string e string não tem toFixed).
void lerComAny;

// --- 3) Função que nunca retorna ---
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// --- 2) Versão segura com unknown ---
function lerClima(json: string): { cidade: string; temperatura: number } {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch {
    // JSON.parse lança SyntaxError quando o texto está malformado.
    falhar('JSON malformado');
  }

  if (typeof bruto !== 'object' || bruto === null) {
    falhar('resposta não é um objeto');
  }

  if (!('cidade' in bruto) || typeof bruto.cidade !== 'string') {
    falhar('campo "cidade" inválido');
  }

  if (!('temperatura' in bruto) || typeof bruto.temperatura !== 'number') {
    falhar('campo "temperatura" inválido');
  }

  return { cidade: bruto.cidade, temperatura: bruto.temperatura };
}

// --- 4 e 5) Testando as três respostas com try/catch ---
const respostas: string[] = [respostaOk, respostaQuebrada, respostaInvalida];

respostas.forEach((resposta: string): void => {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    // `erro` é unknown: preciso estreitar antes de ler .message.
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro: falha desconhecida');
    }
  }
});
