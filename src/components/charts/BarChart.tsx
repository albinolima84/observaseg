"use client";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FonteTag } from "@/components/ui/FonteTag";

export interface BarSerie {
  key: string;
  label: string;
  cor: string;
}

interface BarChartProps {
  data: Record<string, string | number | null>[];
  xKey?: string;
  series: BarSerie[];
  titulo?: string;
  layout?: "horizontal" | "vertical";
  formatY?: (v: number) => string;
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

export function BarChart({
  data,
  xKey = "uf",
  series,
  titulo,
  layout = "horizontal",
  formatY,
  formatTooltip,
  fonte,
  tabela,
  altura = 360,
}: BarChartProps) {
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
        <ReBarChart
          data={data}
          layout={layout}
          margin={{ top: 4, right: 16, left: layout === "vertical" ? 120 : 0, bottom: layout === "horizontal" ? 40 : 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

          {layout === "horizontal" ? (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tickFormatter={formatY}
                tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tickFormatter={formatY}
                tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey={xKey}
                tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                width={110}
              />
            </>
          )}

          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value, name) => {
              const v = typeof value === "number" ? value : Number(value);
              const label = series.find((s) => s.key === String(name))?.label ?? String(name);
              return [formatTooltip ? formatTooltip(v) : v.toLocaleString("pt-BR"), label];
            }}
          />

          {series.length > 1 && (
            <Legend
              wrapperStyle={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
              formatter={(value) => series.find((s) => s.key === value)?.label ?? value}
            />
          )}

          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} fill={s.cor} radius={[2, 2, 0, 0]}>
              {series.length === 1 &&
                data.map((_, i) => (
                  <Cell key={i} fill={s.cor} fillOpacity={0.85} />
                ))}
            </Bar>
          ))}
        </ReBarChart>
      </ResponsiveContainer>

      {fonte && <FonteTag fonte={fonte} tabela={tabela} />}
    </div>
  );
}
