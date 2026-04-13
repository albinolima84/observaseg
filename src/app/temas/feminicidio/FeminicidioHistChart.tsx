"use client";

import { LineChart } from "@/components/charts/LineChart";
import { fmtPct } from "@/lib/formatters";

interface DataPoint {
  ano: number;
  proporcao: number | null;
}

export function FeminicidioHistChart({ data }: { data: DataPoint[] }) {
  const chartData = data.map((d) => ({
    ano: d.ano,
    proporcao: d.proporcao,
  }));

  return (
    <figure aria-label="Proporção de feminicídios em relação a homicídios de mulheres, 2015 a 2024">
      <LineChart
        data={chartData}
        xKey="ano"
        series={[
          {
            key: "proporcao",
            label: "Proporção feminicídio (%)",
            cor: "var(--accent)",
          },
        ]}
        titulo="Proporção de feminicídios em relação a homicídios de mulheres — Brasil 2015–2024"
        formatY={(v) => `${v}%`}
        formatTooltip={(v) => fmtPct(v)}
        fonte="Fórum Brasileiro de Segurança Pública"
        tabela="Q07"
        altura={260}
      />
      <figcaption className="sr-only">Proporção de feminicídios em relação a homicídios de mulheres, 2015 a 2024</figcaption>
    </figure>
  );
}
