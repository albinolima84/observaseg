"use client";

import { LineChart } from "@/components/charts/LineChart";
import { fmtInteiro, fmtDecimal } from "@/lib/formatters";
import { useState } from "react";

interface DataPoint {
  ano: number;
  mvi: number | null;
  taxa: number | null;
}

export function MviHistoricoChart({ data }: { data: DataPoint[] }) {
  const [modo, setModo] = useState<"absolutos" | "taxa">("absolutos");

  const chartData = data.map((d) => ({
    ano: d.ano,
    valor: modo === "absolutos" ? d.mvi : d.taxa,
  }));

  return (
    <figure aria-label="Série histórica de MVI no Brasil, 2012 a 2024, em valores absolutos e taxa">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2
            className="text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            MVI Brasil — série histórica 2012–2024
          </h2>
          {/* Toggle absolutos / taxa */}
          <div
            className="flex rounded overflow-hidden text-xs"
            style={{ border: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}
          >
            {(["absolutos", "taxa"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setModo(m)}
                className="px-3 py-1.5 transition-colors"
                style={{
                  backgroundColor: modo === m ? "var(--accent)" : "var(--surface)",
                  color: modo === m ? "#fff" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {m === "absolutos" ? "Ns. Absolutos" : "Taxa /100k"}
              </button>
            ))}
          </div>
        </div>

        <LineChart
          data={chartData}
          xKey="ano"
          series={[{ key: "valor", label: modo === "absolutos" ? "MVI (absoluto)" : "Taxa /100k", cor: "var(--accent)" }]}
          formatY={modo === "absolutos" ? (v) => fmtInteiro(v) : (v) => fmtDecimal(v)}
          formatTooltip={
            modo === "absolutos"
              ? (v) => `${fmtInteiro(v)} mortes`
              : (v) => `${fmtDecimal(v)} /100k`
          }
          fonte="Fórum Brasileiro de Segurança Pública"
          tabela="T02"
          altura={280}
        />
      </div>
      <figcaption className="sr-only">Série histórica de MVI no Brasil, 2012 a 2024, em valores absolutos e taxa</figcaption>
    </figure>
  );
}
