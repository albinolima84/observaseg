import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { getGastos } from "@/lib/data";
import { fmtDecimal, fmtVariacao, corVariacaoNeutra } from "@/lib/formatters";

export const metadata = {
  title: "Gastos Públicos",
  description:
    "Gastos com segurança pública no Brasil 2024 por Unidade da Federação.",
};

// Formata valor em R$ bilhões ou milhões
function fmtReais(v: number | null | undefined): string {
  if (v == null) return "—";
  if (v >= 1_000_000) return `R$ ${fmtDecimal(v / 1_000_000, 1)} bi`;
  if (v >= 1_000) return `R$ ${fmtDecimal(v / 1_000, 1)} mi`;
  return `R$ ${fmtDecimal(v, 0)} mil`;
}

export default function GastosPublicosPage() {
  const gastos = getGastos();
  const brasil = gastos.dados.find((d) => d.uf === "Brasil")!;

  const variacao = brasil.total_2023 && brasil.total_2024
    ? +((brasil.total_2024 - brasil.total_2023) / brasil.total_2023 * 100).toFixed(2)
    : undefined;

  const porUF = gastos.dados
    .filter((d) => d.uf !== "Brasil" && d.regiao !== null)
    .sort((a, b) => (b.total_2024 ?? 0) - (a.total_2024 ?? 0));

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <p className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-dim)" }}>Início</a>
          {" / "}
          <span style={{ color: "var(--text)" }}>Gastos Públicos</span>
        </p>

        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Gastos com Segurança Pública
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Investimentos públicos em segurança por Unidade da Federação,
            comparativo 2023–2024. Valores em R$ mil.
          </p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Total Brasil 2024"
            valor={fmtReais(brasil.total_2024)}
            variacao={variacao}
            descricao="gastos consolidados"
            fonte="FBSP · T96"
            inverterCor={false}
          />
          <StatCard
            titulo="Total Brasil 2023"
            valor={fmtReais(brasil.total_2023)}
            descricao="para comparação"
            fonte="FBSP · T96"
          />
          <StatCard
            titulo="Gasto per capita 2024"
            valor={brasil.per_capita_2024 != null ? `R$ ${fmtDecimal(brasil.per_capita_2024, 0)}` : "—"}
            descricao="por habitante no Brasil"
            fonte="FBSP · T96"
          />
          <StatCard
            titulo="Maior gasto per capita"
            valor={(() => {
              const top = [...porUF].sort((a, b) => (b.per_capita_2024 ?? 0) - (a.per_capita_2024 ?? 0))[0];
              return top ? `${top.uf}: R$ ${fmtDecimal(top.per_capita_2024, 0)}` : "—";
            })()}
            descricao="estado com maior gasto per capita"
            fonte="FBSP · T96"
          />
        </section>

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
                  {["UF", "Região", "Total 2023", "Total 2024", "Per capita 2024", "Variação"].map((h) => (
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
                {porUF.map((d) => (
                  <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{d.uf}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{fmtReais(d.total_2023)}</td>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{fmtReais(d.total_2024)}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {d.per_capita_2024 != null ? `R$ ${fmtDecimal(d.per_capita_2024, 0)}` : "—"}
                    </td>
                    <td className="py-2 px-3 font-medium" style={{ color: corVariacaoNeutra(d.variacao_pct), fontFamily: "var(--font-mono)" }}>
                      {fmtVariacao(d.variacao_pct)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T96" />
        </section>

      </main>
      <Footer />
    </>
  );
}
