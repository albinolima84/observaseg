/**
 * lib/data.ts
 * Funções de carregamento dos JSONs gerados pelo script Python.
 * No Next.js (App Router) estes imports são resolvidos em build-time —
 * sem fetch, sem banco, sem runtime server.
 */

import type {
  AnoMeta,
  AutoriaSexo,
  Desaparecimentos,
  Estupro,
  Feminicidio,
  FeminicidioHist,
  Gastos,
  Letalidade,
  MviEstados,
  MviHistorico,
  Patrimonio,
  PopulacaoUF,
  Prisional,
  Suicidios,
} from "@/types";

// ---------------------------------------------------------------------------
// Helper genérico — lê de data/{ano}/{arquivo}
// ---------------------------------------------------------------------------

function load<T>(ano: number, filename: string): T {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(`../../data/${ano}/${filename}`) as T;
}

// ---------------------------------------------------------------------------
// Loaders por dataset
// ---------------------------------------------------------------------------

export function getMeta(ano = 2025): AnoMeta {
  return load<AnoMeta>(ano, "meta.json");
}

export function getMviHistorico(ano = 2025): MviHistorico {
  return load<MviHistorico>(ano, "mvi_historico.json");
}

export function getMviEstados(ano = 2025): MviEstados {
  return load<MviEstados>(ano, "mvi_estados.json");
}

export function getFeminicidio(ano = 2025): Feminicidio {
  return load<Feminicidio>(ano, "feminicidio.json");
}

export function getFeminicidioHist(ano = 2025): FeminicidioHist {
  return load<FeminicidioHist>(ano, "feminicidio_hist.json");
}

export function getLetalidade(ano = 2025): Letalidade {
  return load<Letalidade>(ano, "letalidade.json");
}

export function getEstupro(ano = 2025): Estupro {
  return load<Estupro>(ano, "estupro.json");
}

export function getPrisional(ano = 2025): Prisional {
  return load<Prisional>(ano, "prisional.json");
}

export function getDesaparecimentos(ano = 2025): Desaparecimentos {
  return load<Desaparecimentos>(ano, "desaparecimentos.json");
}

export function getPatrimonio(ano = 2025): Patrimonio {
  return load<Patrimonio>(ano, "patrimonio.json");
}

export function getGastos(ano = 2025): Gastos {
  return load<Gastos>(ano, "gastos.json");
}

export function getSuicidios(ano = 2025): Suicidios {
  return load<Suicidios>(ano, "suicidios.json");
}

export function getAutoriaSexo(ano = 2025): AutoriaSexo {
  return load<AutoriaSexo>(ano, "autoria_sexo.json");
}

export function getPopulacaoUF(ano = 2025): PopulacaoUF {
  return load<PopulacaoUF>(ano, "populacao_uf.json");
}

// ---------------------------------------------------------------------------
// Helpers derivados usados em múltiplas páginas
// ---------------------------------------------------------------------------

/** Retorna apenas a linha do Brasil de mvi_historico */
export function getMviBrasil(ano = 2025) {
  const { dados, anos } = getMviHistorico(ano);
  const brasil = dados.find((d) => d.uf === "Brasil")!;
  return { anos, absolutos: brasil.absolutos, taxas: brasil.taxas };
}

/** Série histórica formatada para Recharts: [{ ano, valor }] */
export function getMviBrasilSerie(
  ano = 2025,
  tipo: "absolutos" | "taxas" = "absolutos"
): { ano: number; valor: number }[] {
  const { anos, absolutos, taxas } = getMviBrasil(ano);
  const valores = tipo === "absolutos" ? absolutos : taxas;
  return anos.map((a, i) => ({ ano: a, valor: valores[i] ?? 0 }));
}

/** Retorna os 4 StatCards da home com dados reais */
export function getHomeStats(ano = 2025) {
  const mviHist = getMviHistorico(ano);
  const brasil = mviHist.dados.find((d) => d.uf === "Brasil")!;
  const fem = getFeminicidio(ano);
  const brasiFem = fem.dados.find((d) => d.uf === "Brasil");
  const let_ = getLetalidade(ano);
  const brasilLet = let_.dados.find((d) => d.uf === "Brasil");

  const n = mviHist.anos.length;
  const mvi2024 = brasil.absolutos[n - 1] ?? 0;
  const mvi2023 = brasil.absolutos[n - 2] ?? 0;
  const taxa2024 = brasil.taxas[n - 1] ?? 0;
  const taxa2023 = brasil.taxas[n - 2] ?? 0;

  const fem2024 = brasiFem?.feminicidios_2024 ?? 0;
  const fem2023 = brasiFem?.feminicidios_2023 ?? 0;
  const mortesPol2024 = brasilLet?.mortes_2024 ?? 0;
  const mortesPol2023 = brasilLet?.mortes_2023 ?? 0;

  const pct = (a: number, b: number) =>
    b ? +((a - b) / b * 100).toFixed(2) : 0;

  return [
    {
      titulo: "MVI Brasil 2024",
      valor: mvi2024.toLocaleString("pt-BR"),
      variacao: pct(mvi2024, mvi2023),
      descricao: "Mortes Violentas Intencionais",
      fonte: "Fórum Brasileiro de Segurança Pública · T02",
    },
    {
      titulo: "Taxa MVI",
      valor: taxa2024.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      variacao: pct(taxa2024, taxa2023),
      descricao: "por 100 mil habitantes",
      fonte: "Fórum Brasileiro de Segurança Pública · T02",
    },
    {
      titulo: "Feminicídios",
      valor: fem2024.toLocaleString("pt-BR"),
      variacao: pct(fem2024, fem2023),
      descricao: "registros em 2024",
      fonte: "Fórum Brasileiro de Segurança Pública · T24",
    },
    {
      titulo: "Mortes por intervenção policial",
      valor: mortesPol2024.toLocaleString("pt-BR"),
      variacao: pct(mortesPol2024, mortesPol2023),
      descricao: "em 2024",
      fonte: "Fórum Brasileiro de Segurança Pública · T09",
    },
  ];
}
