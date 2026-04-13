/**
 * lib/formatters.ts
 * Formatadores reutilizáveis para números, percentuais e taxas.
 */

const ptBR = "pt-BR";

/** Inteiro com separador de milhar: 44127 → "44.127" */
export function fmtInteiro(v: number | null | undefined): string {
  if (v == null) return "—";
  return v.toLocaleString(ptBR);
}

/** Decimal com N casas: 20.76 → "20,76" */
export function fmtDecimal(v: number | null | undefined, casas = 2): string {
  if (v == null) return "—";
  return v.toLocaleString(ptBR, {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

/** Percentual com sinal: 4.97 → "+4,97%" | -4.97 → "-4,97%" */
export function fmtVariacao(v: number | null | undefined): string {
  if (v == null) return "—";
  const abs = Math.abs(v).toLocaleString(ptBR, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${v >= 0 ? "+" : "-"}${abs}%`;
}

/** Percentual simples: 40.3 → "40,3%" */
export function fmtPct(v: number | null | undefined, casas = 1): string {
  if (v == null) return "—";
  return (
    v.toLocaleString(ptBR, {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
    }) + "%"
  );
}

/** Valor monetário em bilhões: 153200000 → "R$ 153,2 bi" */
export function fmtBilhoes(v: number | null | undefined): string {
  if (v == null) return "—";
  const bi = v / 1_000_000;
  return `R$ ${bi.toLocaleString(ptBR, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} bi`;
}

/** Taxa por 100k: 20.76 → "20,76 /100k" */
export function fmtTaxa(v: number | null | undefined): string {
  if (v == null) return "—";
  return `${fmtDecimal(v)} /100k hab.`;
}

/** Retorna a cor CSS de variação (verde = queda, vermelho = alta) para MVI */
export function corVariacaoMVI(v: number | null | undefined): string {
  if (v == null) return "var(--text-muted)";
  // Para dados de violência, queda é positiva (verde)
  return v <= 0 ? "var(--accent-green)" : "var(--accent)";
}

/** Idem mas invertido (ex: gastos, onde alta não é necessariamente ruim) */
export function corVariacaoNeutra(v: number | null | undefined): string {
  if (v == null) return "var(--text-muted)";
  return v >= 0 ? "var(--accent-amber)" : "var(--accent-green)";
}
