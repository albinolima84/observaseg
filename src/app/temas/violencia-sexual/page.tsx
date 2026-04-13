import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { NotaMetodologica } from "@/components/ui/NotaMetodologica";
import { getEstupro } from "@/lib/data";
import { fmtInteiro, fmtDecimal } from "@/lib/formatters";

export const metadata = {
  title: "Violência Sexual",
  description:
    "Registros de estupro e estupro de vulnerável no Brasil 2024, por Unidade da Federação.",
};

export default function ViolenciaSexualPage() {
  const estupro = getEstupro();
  const brasil = estupro.dados.find((d) => d.uf === "Brasil")!;

  const porUF = estupro.dados
    .filter((d) => d.uf !== "Brasil" && d.regiao !== null)
    .sort((a, b) => (b.total_2024 ?? 0) - (a.total_2024 ?? 0));

  // Taxa estimada Brasil: total / ~215M * 100k
  const taxaEstimada = brasil.total_2024
    ? +((brasil.total_2024 / 215_316_000) * 100_000).toFixed(1)
    : null;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Violência Sexual</span>
        </nav>

        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Violência Sexual
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Registros de estupro e estupro de vulnerável nas secretarias estaduais
            de segurança pública em 2024, por Unidade da Federação.
          </p>
        </header>

        <NotaMetodologica>
          Os dados refletem registros policiais — não o total de ocorrências. A
          subnotificação é historicamente alta neste tipo de crime: estima-se que
          menos de 10% dos casos são formalmente registrados. Aumentos nos registros
          podem indicar melhora na denúncia, não necessariamente aumento dos crimes.
          Dados de comparação 2023–2024 não disponíveis nesta versão.{" "}
          Estados AC, DF e GO sem dados em 2024.
        </NotaMetodologica>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Total 2024"
            valor={fmtInteiro(brasil.total_2024)}
            descricao="estupro + estupro de vulnerável"
            fonte="FBSP · T34"
            inverterCor={false}
          />
          <StatCard
            titulo="Estupro de vulnerável"
            valor={fmtInteiro(brasil.estupro_vulneravel_2024)}
            descricao={`${brasil.pct_vulneravel_2024}% do total — vítimas < 14 anos ou incapazes`}
            fonte="FBSP · T34"
          />
          <StatCard
            titulo="Estupro simples"
            valor={fmtInteiro(brasil.estupro_simples_2024)}
            descricao={`${brasil.pct_vulneravel_2024 ? (100 - brasil.pct_vulneravel_2024).toFixed(1) : "—"}% do total registrado`}
            fonte="FBSP · T34"
          />
          <StatCard
            titulo="Taxa estimada"
            valor={taxaEstimada ? `${fmtDecimal(taxaEstimada)}` : "—"}
            descricao="por 100 mil habitantes (pop. IBGE 2024)"
            fonte="FBSP · T34"
            inverterCor={false}
          />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            destaque
            titulo="7 em cada 10 vítimas: crianças e adolescentes"
            dado={`${brasil.pct_vulneravel_2024}% dos casos são estupro de vulnerável`}
            contexto="O estupro de vulnerável (vítima com menos de 14 anos ou sem capacidade de consentir) representa 69,7% de todos os registros. São 46.854 casos em 2024 — mais de 128 por dia. Esse dado revela que a violência sexual no Brasil é, em sua maioria, violência contra crianças."
            anoReferencia={2024}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T34"
            href="/temas/violencia-sexual"
          />
          <InsightCard
            titulo="Subnotificação: o dado real é 10× maior"
            dado="67.204 registros — mas ~700 mil estimados"
            contexto="Pesquisas de vitimização estimam que menos de 10% das violências sexuais são registradas em boletins de ocorrência. O Brasil tem cerca de 67 mil registros anuais, mas especialistas estimam entre 500 mil e 1 milhão de casos reais. A subnotificação é ainda maior no interior e em populações vulneráveis."
            anoReferencia={2024}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T34"
          />
        </section>

        {/* ── Tabela por UF ── */}
        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Por estado — 2024
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <caption className="sr-only">Registros de violência sexual por estado em 2024, ordenados por total</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "Total 2024", "Est. Simples", "Est. Vulnerável", "% Vulnerável"].map((h) => (
                    <th
                      key={h}
                      scope="col"
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
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{fmtInteiro(d.total_2024)}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{fmtInteiro(d.estupro_simples_2024)}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{fmtInteiro(d.estupro_vulneravel_2024)}</td>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                      {d.pct_vulneravel_2024 != null ? `${d.pct_vulneravel_2024}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T34" />
        </section>

      </main>
      <Footer />
    </>
  );
}
