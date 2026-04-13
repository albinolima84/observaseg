"use client";

import { BarChart } from "@/components/charts/BarChart";
import { fmtDecimal } from "@/lib/formatters";

interface RankingItem {
  uf: string;
  taxa: number | null;
}

interface Props {
  top10: RankingItem[];
  bottom5: RankingItem[];
}

export function RankingChart({ top10, bottom5 }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2
          className="text-xl font-semibold mb-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Ranking por taxa de MVI — 2024
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Taxa por 100 mil habitantes. Estados com maior e menor incidência.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p
              className="text-xs uppercase tracking-wide mb-4"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              10 maiores taxas
            </p>
            <BarChart
              data={top10.map((d) => ({ uf: d.uf, taxa: d.taxa ?? 0 }))}
              xKey="uf"
              layout="vertical"
              series={[{ key: "taxa", label: "Taxa /100k", cor: "var(--accent)" }]}
              formatY={(v) => fmtDecimal(v)}
              formatTooltip={(v) => `${fmtDecimal(v)} /100k`}
              fonte="Fórum Brasileiro de Segurança Pública"
              tabela="T01"
              altura={280}
            />
          </div>

          <div>
            <p
              className="text-xs uppercase tracking-wide mb-4"
              style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}
            >
              5 menores taxas
            </p>
            <BarChart
              data={bottom5.map((d) => ({ uf: d.uf, taxa: d.taxa ?? 0 }))}
              xKey="uf"
              layout="vertical"
              series={[{ key: "taxa", label: "Taxa /100k", cor: "var(--accent-green)" }]}
              formatY={(v) => fmtDecimal(v)}
              formatTooltip={(v) => `${fmtDecimal(v)} /100k`}
              altura={160}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
