import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { getMviHistorico, getMviEstados } from "@/lib/data";
import { fmtInteiro, fmtDecimal, fmtVariacao, corVariacaoMVI } from "@/lib/formatters";
import { MviHistoricoChart } from "./MviHistoricoChart";
import { RankingChart } from "./RankingChart";

export const metadata = {
  title: "Violência Letal",
  description:
    "Mortes Violentas Intencionais no Brasil 2012–2024. Série histórica, ranking por estado e breakdown por categoria.",
};

export default function ViolenciaLetalPage() {
  const hist = getMviHistorico();
  const estados = getMviEstados();

  const brasil = hist.dados.find((d) => d.uf === "Brasil")!;
  const n = hist.anos.length;
  const mvi2024 = brasil.absolutos[n - 1] ?? 0;
  const mvi2023 = brasil.absolutos[n - 2] ?? 0;
  const taxa2024 = brasil.taxas[n - 1] ?? 0;
  const taxa2023 = brasil.taxas[n - 2] ?? 0;

  const brasilEstados = estados.dados.find((d) => d.uf === "Brasil")!;

  // Série histórica Brasil para o gráfico
  const serieBrasil = hist.anos.map((ano, i) => ({
    ano,
    mvi: brasil.absolutos[i] ?? null,
    taxa: brasil.taxas[i] ?? null,
  }));

  // Ranking por taxa 2024 — apenas UFs (sem Brasil e regiões)
  const ranking = estados.dados
    .filter((d) => d.uf !== "Brasil" && d.regiao !== null && d.taxa_2024 !== null)
    .sort((a, b) => (b.taxa_2024 ?? 0) - (a.taxa_2024 ?? 0));

  // Top 10 maiores e 5 menores taxas
  const top10 = ranking.slice(0, 10).map((d) => ({ uf: d.uf, taxa: d.taxa_2024 }));
  const bottom5 = ranking.slice(-5).map((d) => ({ uf: d.uf, taxa: d.taxa_2024 }));

  // Tabela completa — todos os estados, ordenados por taxa
  const tabelaUFs = estados.dados.filter((d) => d.uf !== "Brasil" && d.regiao !== null);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Violência Letal</span>
        </nav>

        {/* ── Hero ── */}
        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Violência Letal
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Mortes Violentas Intencionais (MVI) incluem homicídio doloso,
            latrocínio, lesão corporal seguida de morte e mortes por
            intervenção policial. Série histórica 2012–2024 e comparativo
            por Unidade da Federação.
          </p>
        </header>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="MVI Brasil 2024"
            valor={fmtInteiro(mvi2024)}
            variacao={+((mvi2024 - mvi2023) / mvi2023 * 100).toFixed(2)}
            descricao="Mortes Violentas Intencionais"
            fonte="FBSP · T01"
          />
          <StatCard
            titulo="Taxa MVI 2024"
            valor={fmtDecimal(taxa2024)}
            variacao={+((taxa2024 - taxa2023) / taxa2023 * 100).toFixed(2)}
            descricao="por 100 mil habitantes"
            fonte="FBSP · T01"
          />
          <StatCard
            titulo="Homicídios dolosos"
            valor={fmtInteiro(brasilEstados.homicidio_doloso_2024)}
            variacao={brasilEstados.homicidio_doloso_2023
              ? +((( brasilEstados.homicidio_doloso_2024! - brasilEstados.homicidio_doloso_2023) / brasilEstados.homicidio_doloso_2023 * 100).toFixed(2))
              : undefined}
            descricao="em 2024"
            fonte="FBSP · T01"
          />
          <StatCard
            titulo="Pico histórico"
            valor="64.079"
            descricao="MVI em 2017 — queda de 31% até 2024"
            fonte="FBSP · T02"
          />
        </section>

        {/* ── Gráfico histórico ── */}
        <section
          className="rounded-lg p-6 mb-10"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <MviHistoricoChart data={serieBrasil} />
        </section>

        {/* ── Breakdown por categoria (Brasil) ── */}
        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Composição das MVI — Brasil 2024
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            As MVI são a soma de quatro categorias. A intervenção policial
            representa{" "}
            <strong style={{ color: "var(--text)" }}>
              {brasilEstados.mvi_total_2024
                ? fmtDecimal((brasilEstados.intervencao_policial_2024! / brasilEstados.mvi_total_2024) * 100)
                : "—"}%
            </strong>{" "}
            do total.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                label: "Homicídio Doloso",
                v2024: brasilEstados.homicidio_doloso_2024,
                v2023: brasilEstados.homicidio_doloso_2023,
              },
              {
                label: "Latrocínio",
                v2024: brasilEstados.latrocinio_2024,
                v2023: brasilEstados.latrocinio_2023,
              },
              {
                label: "LCFM",
                v2024: brasilEstados.lcfm_2024,
                v2023: brasilEstados.lcfm_2023,
              },
              {
                label: "Intervenção Policial",
                v2024: brasilEstados.intervencao_policial_2024,
                v2023: brasilEstados.intervencao_policial_2023,
              },
            ].map(({ label, v2024, v2023 }) => {
              const variacao = v2023 && v2024 ? +((v2024 - v2023) / v2023 * 100).toFixed(2) : undefined;
              return (
                <div
                  key={label}
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {label}
                  </p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
                    {fmtInteiro(v2024)}
                  </p>
                  {variacao != null && (
                    <p className="text-sm mt-1" style={{ color: corVariacaoMVI(variacao), fontFamily: "var(--font-mono)" }}>
                      {fmtVariacao(variacao)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T01" />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            titulo="LCFM: o único componente que cresceu em 2024"
            dado="+21,0%"
            contexto="A Lesão Corporal Seguida de Morte (LCFM) passou de 628 para 760 casos — alta de 21% enquanto homicídio doloso (−5,8%), latrocínio (−3,7%) e mortes por intervenção policial (−2,7%) caíram. O LCFM está associado a violência interpessoal e doméstica, sinalizando uma dinâmica de violência que não responde às mesmas políticas que reduziram os homicídios."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T01"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="Queda no MVI nacional mascara pioras regionais"
            dado="−5,0%"
            contexto="O Brasil registrou 44.127 MVI em 2024, queda de 5% frente a 2023. Mas a média nacional esconde trajetórias opostas: estados do Norte e Centro-Oeste concentram as maiores taxas e, em vários casos, registraram alta. A redução é puxada principalmente por Bahia, Pernambuco e São Paulo em volume absoluto."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T01"
            anoReferencia={2024}
          />
        </section>

        {/* ── Ranking por taxa ── */}
        <section
          className="rounded-lg p-6 mb-10"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <RankingChart top10={top10} bottom5={bottom5} />
        </section>

        {/* ── Tabela completa UFs ── */}
        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Comparativo por estado — 2023 vs 2024
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <caption className="sr-only">Comparativo de MVI por estado, 2023 vs 2024, ordenado por taxa</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "MVI 2023", "MVI 2024", "Taxa 2024", "Variação"].map((h) => (
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
                {tabelaUFs
                  .sort((a, b) => (b.taxa_2024 ?? 0) - (a.taxa_2024 ?? 0))
                  .map((d) => (
                    <tr
                      key={d.uf}
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {d.uf}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>
                        {d.regiao}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.mvi_total_2023)}
                      </td>
                      <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.mvi_total_2024)}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtDecimal(d.taxa_2024)}
                      </td>
                      <td
                        className="py-2 px-3 font-medium"
                        style={{
                          color: corVariacaoMVI(d.variacao_pct),
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {fmtVariacao(d.variacao_pct)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T01" />
        </section>

      </main>
      <Footer />
    </>
  );
}
