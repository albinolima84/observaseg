"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface Ponto {
  uf: string;
  gasto: number;
  taxa: number;
}

interface Props {
  dados: Ponto[];
  mediaGasto: number;
  mediaTaxa: number;
}

function TooltipCustom({ active, payload }: { active?: boolean; payload?: { payload: Ponto }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="rounded px-3 py-2 text-xs"
      style={{
        backgroundColor: "var(--surface-2)",
        border: "1px solid var(--border)",
        color: "var(--text)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <p className="font-bold mb-1">{d.uf}</p>
      <p>Gasto: R$ {(d.gasto / 1_000_000).toFixed(1)} bi</p>
      <p>Taxa MVI: {d.taxa.toFixed(2)}/100k</p>
    </div>
  );
}

export function GastoMviScatter({ dados, mediaGasto, mediaTaxa }: Props) {
  return (
    <div>
      <h2
        className="text-xl font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Gasto vs. taxa de homicídios por estado
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Cada ponto é um estado. Linhas tracejadas indicam a mediana nacional.
        Não há correlação linear clara entre investimento e redução de violência.
      </p>
      <figure>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              dataKey="gasto"
              name="Gasto"
              tickFormatter={(v) => `R$${(v / 1_000_000).toFixed(0)}bi`}
              tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              label={{
                value: "Gasto total 2024 (R$ bi)",
                position: "insideBottom",
                offset: -12,
                fill: "var(--text-muted)",
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="taxa"
              name="Taxa MVI"
              tickFormatter={(v) => `${v}`}
              tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              label={{
                value: "Taxa MVI /100k",
                angle: -90,
                position: "insideLeft",
                fill: "var(--text-muted)",
                fontSize: 11,
              }}
            />
            <Tooltip content={<TooltipCustom />} />
            <ReferenceLine
              x={mediaGasto}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={mediaTaxa}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <Scatter
              data={dados}
              fill="var(--accent)"
              fillOpacity={0.75}
              r={5}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <figcaption className="sr-only">Dispersão entre gasto público em segurança e taxa MVI por estado em 2024</figcaption>
      </figure>
    </div>
  );
}
