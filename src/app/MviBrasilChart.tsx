"use client";

import { LineChart } from "@/components/charts/LineChart";
import { fmtInteiro } from "@/lib/formatters";

interface Props {
  data: { ano: number; valor: number }[];
}

export function MviBrasilChart({ data }: Props) {
  const chartData = data.map((d) => ({ ano: d.ano, mvi: d.valor }));

  return (
    <div
      className="rounded-lg p-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <LineChart
        data={chartData}
        xKey="ano"
        series={[{ key: "mvi", label: "MVI Brasil", cor: "var(--accent)" }]}
        titulo="Mortes Violentas Intencionais — Brasil 2012–2024"
        formatY={(v) => fmtInteiro(v)}
        formatTooltip={(v) => `${fmtInteiro(v)} mortes`}
        fonte="Fórum Brasileiro de Segurança Pública"
        tabela="T02 · Números absolutos"
        altura={300}
      />
    </div>
  );
}
