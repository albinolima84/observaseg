"use client";

import { LineChart } from "@/components/charts/LineChart";
import { fmtInteiro } from "@/lib/formatters";

interface DataPoint {
  ano: number;
  total: number | null;
  sistema: number | null;
  custodia: number | null;
}

export function PrisionalChart({ data }: { data: DataPoint[] }) {
  const chartData = data.map((d) => ({
    ano: d.ano,
    total: d.total,
    sistema: d.sistema,
    custodia: d.custodia,
  }));

  return (
    <LineChart
      data={chartData}
      xKey="ano"
      series={[
        { key: "total", label: "Total encarcerado", cor: "var(--accent)" },
        { key: "sistema", label: "Sistema penitenciário", cor: "var(--accent-amber)" },
        { key: "custodia", label: "Custódia das polícias", cor: "var(--text-muted)" },
      ]}
      titulo="Evolução da população prisional — Brasil 2000–2024"
      formatY={(v) => fmtInteiro(v)}
      formatTooltip={(v) => `${fmtInteiro(v)} pessoas`}
      fonte="Fórum Brasileiro de Segurança Pública"
      tabela="T127"
      altura={320}
    />
  );
}
