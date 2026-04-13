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
  Label,
} from "recharts";

interface Ponto {
  uf: string;
  taxaMvi: number;
  pctLet: number;
  mortes: number;
}

interface Props {
  data: Ponto[];
}

const DESTAQUES = ["Amapá", "São Paulo", "Bahia", "Rio de Janeiro", "Goiás"];

function CustomDot(props: {
  cx?: number;
  cy?: number;
  payload?: Ponto;
}) {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  const destaque = DESTAQUES.includes(payload.uf);
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={destaque ? 6 : 4}
        fill={destaque ? "var(--accent)" : "var(--accent-green)"}
        fillOpacity={destaque ? 0.9 : 0.55}
        stroke="none"
      />
      {destaque && (
        <text
          x={cx + 9}
          y={cy + 4}
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono)"
        >
          {payload.uf}
        </text>
      )}
    </g>
  );
}

function CustomTooltip({ active, payload }: {
  active?: boolean;
  payload?: { payload: Ponto }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="text-xs rounded px-3 py-2"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <p className="font-semibold mb-1">{d.uf}</p>
      <p style={{ color: "var(--text-muted)" }}>
        Taxa MVI: {d.taxaMvi.toFixed(2)}/100k
      </p>
      <p style={{ color: "var(--text-muted)" }}>
        Letalidade policial: {d.pctLet.toFixed(1)}% das MVI
      </p>
      <p style={{ color: "var(--text-muted)" }}>
        {d.mortes.toLocaleString("pt-BR")} mortes por intervenção policial
      </p>
    </div>
  );
}

export function LetalidadeMviScatter({ data }: Props) {
  const mediaX = data.reduce((s, d) => s + d.taxaMvi, 0) / data.length;
  const mediaY = data.reduce((s, d) => s + d.pctLet, 0) / data.length;

  return (
    <figure aria-label="Gráfico de dispersão: letalidade policial versus taxa de MVI por estado">
      <figcaption className="sr-only">
        Cada ponto representa um estado brasileiro. Eixo X = taxa de MVI por 100 mil habitantes.
        Eixo Y = proporção das MVI que são mortes por intervenção policial.
      </figcaption>

      <h3
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Letalidade policial vs intensidade da violência
      </h3>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Cada ponto é um estado. Eixo X = taxa de MVI/100k. Eixo Y = % das mortes
        violentas causadas pela polícia.
      </p>

      <ResponsiveContainer width="100%" height={380}>
        <ScatterChart margin={{ top: 10, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            strokeOpacity={0.5}
          />
          <XAxis
            type="number"
            dataKey="taxaMvi"
            name="Taxa MVI"
            tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={false}
            domain={[0, "auto"]}
          >
            <Label
              value="Taxa MVI (por 100k hab)"
              position="insideBottom"
              offset={-25}
              style={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="pctLet"
            name="% das MVI"
            tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          >
            <Label
              value="% das MVI pela polícia"
              angle={-90}
              position="insideLeft"
              offset={15}
              style={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            />
          </YAxis>

          {/* Linhas de média */}
          <ReferenceLine
            x={mediaX}
            stroke="var(--border)"
            strokeDasharray="4 4"
            strokeOpacity={0.7}
          />
          <ReferenceLine
            y={mediaY}
            stroke="var(--border)"
            strokeDasharray="4 4"
            strokeOpacity={0.7}
          />

          <Tooltip content={<CustomTooltip />} />

          <Scatter
            data={data}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape={(props: any) => <CustomDot {...props} />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </figure>
  );
}
