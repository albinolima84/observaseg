"use client";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FonteTag } from "@/components/ui/FonteTag";

export interface LineSerie {
  key: string;
  label: string;
  cor: string;
}

interface LineChartProps {
  /** Array de objetos onde cada objeto é um ponto no eixo X */
  data: Record<string, number | null>[];
  /** Chave do campo que representa o eixo X (ex: "ano") */
  xKey?: string;
  series: LineSerie[];
  titulo?: string;
  yLabel?: string;
  /** Função para formatar os valores do eixo Y */
  formatY?: (v: number) => string;
  /** Função para formatar os valores do tooltip */
  formatTooltip?: (v: number) => string;
  fonte?: string;
  tabela?: string;
  altura?: number;
}

const TOOLTIP_STYLE = {
  backgroundColor: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  color: "var(--text)",
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
};

const CURSOR_STYLE = { stroke: "var(--border)", strokeWidth: 1 };

export function LineChart({
  data,
  xKey = "ano",
  series,
  titulo,
  yLabel,
  formatY,
  formatTooltip,
  fonte,
  tabela,
  altura = 320,
}: LineChartProps) {
  return (
    <div className="flex flex-col gap-3">
      {titulo && (
        <h3
          className="text-base font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          {titulo}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={altura}>
        <ReLineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

          <XAxis
            dataKey={xKey}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />

          <YAxis
            tickFormatter={formatY}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            label={
              yLabel
                ? {
                    value: yLabel,
                    angle: -90,
                    position: "insideLeft",
                    fill: "var(--text-dim)",
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                  }
                : undefined
            }
          />

          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value, name) => {
              const v = typeof value === "number" ? value : Number(value);
              const label = series.find((s) => s.key === String(name))?.label ?? String(name);
              return [formatTooltip ? formatTooltip(v) : v.toLocaleString("pt-BR"), label];
            }}
            cursor={CURSOR_STYLE}
          />

          {series.length > 1 && (
            <Legend
              wrapperStyle={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
              formatter={(value: string) =>
                series.find((s) => s.key === value)?.label ?? value
              }
            />
          )}

          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.cor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>

      {fonte && <FonteTag fonte={fonte} tabela={tabela} />}
    </div>
  );
}
