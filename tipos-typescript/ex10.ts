export {};

// ===== Exercício 10: Sistema de estacionamento (projeto integrador) =====

// --- 1) Type aliases ---
type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

// --- 2) União discriminada ---
type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };

// Para o item 5 (teste do never), basta acrescentar `| Van` aqui:
// type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
type Veiculo = Carro | Moto | Caminhao;

// --- 3) Enum de string ---
enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

// --- 4) Objeto do ticket ---
type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// --- 5) Tarifa, com verificação exaustiva ---
function calcularTarifa(v: Veiculo, horas: number): number {
  const adicionais: number = Math.max(0, horas - 1);
  switch (v.tipo) {
    case 'carro':
      return 8 + adicionais * 5;
    case 'moto':
      return 4 + adicionais * 2;
    case 'caminhao':
      return 15 + adicionais * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}
//
// Teste do never: ao acrescentar `| Van` em Veiculo sem tratar 'van' no switch,
// o compilador aponta na atribuição do default:
// error TS2322: Type 'Van' is not assignable to type 'never'.
// O que o never garantiu: no `default` só sobra o que o switch NÃO cobriu. Se
// sobrar algum membro da união, ele não cabe em `never` e a compilação falha —
// ou seja, é impossível esquecer um caso novo em silêncio.

// --- 6) Fechamento do ticket (sem alterar o original) ---
function fecharTicket(t: Ticket): Ticket {
  const [entrada, saida] = t.periodo;
  const horas: number = Math.max(1, saida - entrada);
  const bruto: number = calcularTarifa(t.veiculo, horas);
  const valor: number = t.selo ? bruto * 0.5 : bruto;

  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

// --- 7) Log ---
function registrar(msg: string): void {
  console.log(msg);
}

function horasDoTicket(t: Ticket): number {
  const [entrada, saida] = t.periodo;
  return Math.max(1, saida - entrada);
}

function descreverTicket(t: Ticket): string {
  const valor: number = t.valor ?? 0;
  const selo: string = t.selo ? ' (selo -50%)' : '';
  return `[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horasDoTicket(
    t
  )}h - R$ ${valor.toFixed(2)}${selo}`;
}

// --- 8) Entrada externa com unknown ---
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerVeiculo(json: string): Veiculo {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch {
    falhar('JSON malformado');
  }

  if (typeof bruto !== 'object' || bruto === null) {
    falhar('resposta não é um objeto');
  }
  if (!('placa' in bruto) || typeof bruto.placa !== 'string') {
    falhar('campo "placa" inválido');
  }
  if (!('tipo' in bruto) || typeof bruto.tipo !== 'string') {
    falhar('campo "tipo" inválido');
  }

  const placa: Placa = bruto.placa;

  switch (bruto.tipo) {
    case 'carro': {
      if (!('portas' in bruto) || (bruto.portas !== 2 && bruto.portas !== 4)) {
        falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas: bruto.portas };
    }
    case 'moto': {
      if (!('cilindradas' in bruto) || typeof bruto.cilindradas !== 'number') {
        falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas: bruto.cilindradas };
    }
    case 'caminhao': {
      if (!('eixos' in bruto) || typeof bruto.eixos !== 'number') {
        falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos: bruto.eixos };
    }
    default:
      falhar(`tipo "${bruto.tipo}" desconhecido`);
  }
}

// --- Dados de teste ---
const tickets: Ticket[] = [
  {
    veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 },
    periodo: [8, 11],
    selo: false,
    situacao: SituacaoTicket.Aberto,
  },
  {
    veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 },
    periodo: [9, 10],
    selo: false,
    situacao: SituacaoTicket.Aberto,
  },
  {
    veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 },
    periodo: [7, 12],
    selo: false,
    situacao: SituacaoTicket.Aberto,
  },
  {
    veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 },
    periodo: [14, 16],
    selo: true,
    situacao: SituacaoTicket.Aberto,
  },
];

// --- 9) Relatório com map / filter / reduce ---
const fechados: Ticket[] = tickets.map(fecharTicket);

fechados
  .filter((t: Ticket): boolean => t.situacao === SituacaoTicket.Pago)
  .forEach((t: Ticket): void => registrar(descreverTicket(t)));

const faturamento: number = fechados.reduce(
  (acc: number, t: Ticket): number => acc + (t.valor ?? 0),
  0
);
registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);

const entradas: { carro: number; moto: number; caminhao: number } = fechados.reduce(
  (acc: { carro: number; moto: number; caminhao: number }, t: Ticket) => {
    acc[t.veiculo.tipo] = acc[t.veiculo.tipo] + 1;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);
registrar(
  `Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`
);

// --- Leitura da cancela ---
try {
  const v: Veiculo = lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
  registrar(`Veículo lido: ${v.placa}`);
} catch (erro: unknown) {
  if (erro instanceof Error) {
    registrar(`Erro ao ler veículo: ${erro.message}`);
  } else {
    registrar('Erro ao ler veículo: falha desconhecida');
  }
}
