import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { getGastos, getMviEstados, getPopulacaoUF } from "@/lib/data";
import { fmtDecimal, fmtVariacao, corVariacaoNeutra } from "@/lib/formatters";
import { GastoMviScatter } from "./GastoMviScatter";
import { Termo } from "@/components/ui/Termo";

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

// Formata R$/habitante
function fmtPerCapita(v: number | null | undefined): string {
  if (v == null) return "—";
  return `R$ ${fmtDecimal(v, 0)}/hab`;
}

export default function GastosPublicosPage() {
  const gastos = getGastos();
  const mviEstados = getMviEstados();
  const pop = getPopulacaoUF();

  const porUF = gastos.dados
    .filter((d) => d.regiao !== null)
    .sort((a, b) => (b.total_2024 ?? 0) - (a.total_2024 ?? 0));

  // Per capita correto: total_2024 (R$) / pop_2024 (hab)
  const porUFComPerCapita = porUF.map((d) => ({
    ...d,
    pop2024: pop.dados[d.uf] ?? null,
    perCapitaReal: pop.dados[d.uf] && d.total_2024
      ? +(d.total_2024 / pop.dados[d.uf]).toFixed(2)
      : null,
  }));

  // Brasil per capita total
  const popBrasil = pop.dados["Brasil"];
  const brasilTotal2024 = porUF.reduce((s, d) => s + (d.total_2024 ?? 0), 0);

  const total2024 = porUF.reduce((s, d) => s + (d.total_2024 ?? 0), 0);
  const total2023 = porUF.reduce((s, d) => s + (d.total_2023 ?? 0), 0);
  const variacao = total2023 > 0
    ? +((total2024 - total2023) / total2023 * 100).toFixed(2)
    : undefined;
  const brasilPerCapita = popBrasil && brasilTotal2024
    ? +(brasilTotal2024 / popBrasil).toFixed(2)
    : null;

  // Dados para scatter: cruzar gasto com taxa MVI por estado
  const scatterDados = porUFComPerCapita.flatMap((g) => {
    const mvi = mviEstados.dados.find((m) => m.uf === g.uf);
    if (!g.total_2024 || !mvi?.taxa_2024) return [];
    return [{ uf: g.uf, gasto: g.total_2024, taxa: mvi.taxa_2024 }];
  });

  const mediaGasto = scatterDados.length
    ? scatterDados.reduce((s, d) => s + d.gasto, 0) / scatterDados.length
    : 0;
  const mediaTaxa = scatterDados.length
    ? scatterDados.reduce((s, d) => s + d.taxa, 0) / scatterDados.length
    : 0;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Gastos Públicos</span>
        </nav>

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
            valor={fmtReais(total2024)}
            variacao={variacao}
            descricao="gastos consolidados"
            fonte="FBSP · T96"
            inverterCor={false}
          />
          <StatCard
            titulo="Total Brasil 2023"
            valor={fmtReais(total2023)}
            descricao="para comparação"
            fonte="FBSP · T96"
          />
          <StatCard
            titulo="Per capita Brasil 2024"
            valor={brasilPerCapita ? fmtPerCapita(brasilPerCapita) : "—"}
            descricao={<>gasto médio por habitante (<Termo>IBGE</Termo> 2024)</>}
            fonte="FBSP · T96 · IBGE"
            inverterCor={false}
          />
          <StatCard
            titulo="Maior gasto per capita"
            valor={(() => {
              const top = [...porUFComPerCapita]
                .filter(d => d.perCapitaReal != null)
                .sort((a, b) => (b.perCapitaReal ?? 0) - (a.perCapitaReal ?? 0))[0];
              return top ? `${top.uf}: ${fmtPerCapita(top.perCapitaReal)}` : "—";
            })()}
            descricao="estado com maior investimento per capita em 2024"
            fonte="FBSP · T96 · IBGE"
            inverterCor={false}
          />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            titulo="Gastar mais não garante menos violência"
            dado="Correlação fraca"
            contexto={<>Estados com os maiores orçamentos absolutos (SP, PR, RS) não são necessariamente os mais seguros. Bahia e Pernambuco gastam volumes expressivos e ainda registram taxas <Termo>MVI</Termo> acima da média. O gráfico abaixo mostra que a relação entre investimento e taxa de violência é difusa — outros fatores estruturais dominam o resultado.</>}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T96"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="São Paulo: maior gasto, taxa abaixo da média"
            dado="R$ 14,6 bi"
            contexto={<>Com R$ 14,6 bilhões em gastos de segurança — quase 10 vezes mais que o segundo colocado —, São Paulo é um caso à parte. Sua taxa <Termo>MVI</Termo> de 6,9/100k fica bem abaixo da média nacional (20,8/100k). Mas isolar o efeito do investimento é difícil: SP também tem maior PIB, maior urbanização e estrutura policial mais consolidada.</>}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T96"
            anoReferencia={2024}
          />
        </section>

        {/* ── Scatter gasto vs. MVI ── */}
        <section
          className="rounded-lg p-6 mb-14"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <GastoMviScatter
            dados={scatterDados}
            mediaGasto={mediaGasto}
            mediaTaxa={mediaTaxa}
          />
          <div className="mt-4">
            <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T96 · T01" />
          </div>
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
              <caption className="sr-only">Gastos com segurança pública por estado, 2023 vs 2024</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "Total 2023", "Total 2024", "Per capita real", "Variação"].map((h) => (
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
                {porUFComPerCapita.map((d) => (
                  <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{d.uf}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{fmtReais(d.total_2023)}</td>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{fmtReais(d.total_2024)}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtPerCapita(d.perCapitaReal)}
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
