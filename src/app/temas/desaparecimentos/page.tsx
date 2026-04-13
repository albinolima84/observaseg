import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { getDesaparecimentos } from "@/lib/data";
import { fmtInteiro } from "@/lib/formatters";

export const metadata = {
  title: "Desaparecimentos",
  description:
    "Pessoas desaparecidas no Brasil 2024. 81.873 registros — primeiro ano de coleta sistemática nacional.",
};

export default function DesaparecimentosPage() {
  const dados = getDesaparecimentos();

  const brasil = dados.dados.find((d) => d.uf === "Brasil")!;

  const porUF = dados.dados
    .filter((d) => d.regiao !== null && d.desaparecidos_2024 != null)
    .sort((a, b) => (b.desaparecidos_2024 ?? 0) - (a.desaparecidos_2024 ?? 0));

  const top5 = porUF.slice(0, 5);
  const total2024 = brasil.desaparecidos_2024 ?? 0;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <p className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-dim)" }}>Início</a>
          {" / "}
          <span style={{ color: "var(--text)" }}>Desaparecimentos</span>
        </p>

        <header className="mb-6">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Desaparecimentos
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Registros de pessoas desaparecidas por Unidade da Federação, 2024.
            Dados do Sistema Nacional de Localização e Identificação de Desaparecidos (SINALID).
          </p>
        </header>

        {/* ── Aviso metodológico ── */}
        <div
          className="rounded-lg p-4 mb-10 text-sm"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--accent)",
            color: "var(--text-muted)",
          }}
        >
          <p className="font-semibold mb-1" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            NOTA METODOLÓGICA
          </p>
          <p>
            Os dados de 2024 representam o <strong style={{ color: "var(--text)" }}>primeiro ano de coleta sistemática nacional</strong> pelo SINALID.
            Os registros de 2023 são parciais e não refletem a realidade daquele ano.
            Por isso, <strong style={{ color: "var(--text)" }}>não é possível comparar 2023 e 2024</strong> — as variações percentuais entre os dois anos
            não têm validade analítica e não são apresentadas nesta página.
          </p>
        </div>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
          <StatCard
            titulo="Desaparecidos 2024"
            valor={fmtInteiro(total2024)}
            descricao="registros nacionais"
            fonte="FBSP · T11"
            inverterCor={false}
          />
          <StatCard
            titulo="Maior volume"
            valor={top5[0]?.uf ?? "—"}
            descricao={top5[0] ? `${fmtInteiro(top5[0].desaparecidos_2024)} registros` : "—"}
            fonte="FBSP · T11"
            inverterCor={false}
          />
          <StatCard
            titulo="Estados reportando"
            valor={String(porUF.length)}
            descricao="unidades da federação"
            fonte="FBSP · T11"
            inverterCor={false}
          />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            titulo="81.873 desaparecidos: um dado inédito na segurança pública"
            dado="81.873"
            contexto="Este é o primeiro levantamento nacional sistemático de desaparecimentos. O volume revela uma dimensão até então invisível nos dados de segurança: pessoas que somem sem que haja necessariamente um crime registrado — podendo envolver fugas voluntárias, situações de rua, exploração e violência doméstica."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T11"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="São Paulo concentra 24% dos casos nacionais"
            dado="19.549"
            contexto="São Paulo registrou 19.549 desaparecimentos — quase um quarto do total nacional. A concentração reflete tanto a densidade populacional quanto a capacidade de registro: estados com maior estrutura policial tendem a registrar mais ocorrências desta natureza. Dados não são comparáveis entre estados sem ajuste por população."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T11"
            anoReferencia={2024}
          />
        </section>

        {/* ── Top 5 barra ── */}
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Estados com mais registros — 2024
          </h2>

          <div className="space-y-3">
            {top5.map((d, i) => {
              const pct = total2024 > 0 ? ((d.desaparecidos_2024 ?? 0) / total2024) * 100 : 0;
              const barWidth = top5[0].desaparecidos_2024
                ? ((d.desaparecidos_2024 ?? 0) / top5[0].desaparecidos_2024) * 100
                : 0;
              return (
                <div key={d.uf} className="flex items-center gap-4">
                  <span
                    className="text-xs w-5 text-right shrink-0"
                    style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-sm w-36 shrink-0"
                    style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
                  >
                    {d.uf}
                  </span>
                  <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--surface-2)" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: "var(--accent-amber)",
                      }}
                    />
                  </div>
                  <span
                    className="text-sm w-28 text-right shrink-0"
                    style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
                  >
                    {fmtInteiro(d.desaparecidos_2024)} ({pct.toFixed(1)}%)
                  </span>
                </div>
              );
            })}
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T11" />
        </section>

        {/* ── Tabela completa ── */}
        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Por estado — 2024
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "Desaparecidos 2024", "% do total"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 px-3 text-xs uppercase tracking-wide"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {porUF.map((d) => {
                  const pct = total2024 > 0 ? ((d.desaparecidos_2024 ?? 0) / total2024) * 100 : 0;
                  return (
                    <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {d.uf}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                      <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.desaparecidos_2024)}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {pct.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T11" />
        </section>

      </main>
      <Footer />
    </>
  );
}
