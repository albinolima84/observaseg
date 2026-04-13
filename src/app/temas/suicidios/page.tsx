import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { getSuicidios, getMviEstados, getLetalidade } from "@/lib/data";
import { fmtInteiro, fmtDecimal } from "@/lib/formatters";
import { Termo } from "@/components/ui/Termo";

export const metadata = {
  title: "Suicídios",
  description:
    "Mortes por suicídio no Brasil 2024. 16.446 casos — 7,74 por 100 mil habitantes.",
};

export default function SuicidiosPage() {
  const suicidios = getSuicidios();
  const mviEstados = getMviEstados();
  const let_ = getLetalidade();

  const brasil = suicidios.dados.find((d) => d.uf === "Brasil")!;
  const mvi = mviEstados.dados.find((d) => d.uf === "Brasil")!;
  const brasilLet = let_.dados.find((d) => d.uf === "Brasil")!;

  // Proporção suicídio / MVI total
  const proporcaoMVI = mvi.mvi_total_2024
    ? +((brasil.total_2024! / mvi.mvi_total_2024) * 100).toFixed(1)
    : null;

  // Comparação cruzada: suicídio vs outros componentes violentos
  const latrocinio = mvi.latrocinio_2024 ?? 0;
  const lcfm = mvi.lcfm_2024 ?? 0;
  const letalidadePolicial = brasilLet.mortes_2024 ?? 0;
  const somaTresComponentes = latrocinio + lcfm + letalidadePolicial;
  const fatorVsSoma = brasil.total_2024 && somaTresComponentes
    ? +(brasil.total_2024 / somaTresComponentes).toFixed(1)
    : null;

  const porUF = suicidios.dados
    .filter((d) => d.regiao !== null && d.taxa_2024 != null)
    .sort((a, b) => (b.taxa_2024 ?? 0) - (a.taxa_2024 ?? 0));

  const top5 = porUF.slice(0, 5);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Suicídios</span>
        </nav>

        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Suicídios
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Mortes por suicídio por Unidade da Federação, 2024.
            Dado do Sistema de Informação sobre Mortalidade (SIM/MS), consolidado
            pelo Fórum Brasileiro de Segurança Pública. Comparação com 2023 não
            disponível nesta edição do Anuário.
          </p>
        </header>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Suicídios 2024"
            valor={fmtInteiro(brasil.total_2024)}
            descricao="mortes por suicídio no Brasil"
            fonte="FBSP · T22"
          />
          <StatCard
            titulo="Taxa 2024"
            valor={`${fmtDecimal(brasil.taxa_2024)}/100k`}
            descricao="por 100 mil habitantes"
            fonte="FBSP · T22"
          />
          <StatCard
            titulo="Proporção do MVI"
            valor={proporcaoMVI != null ? `${fmtDecimal(proporcaoMVI)}%` : "—"}
            descricao="das mortes violentas intencionais"
            fonte="FBSP · T22"
            inverterCor={false}
          />
          <StatCard
            titulo="Maior taxa"
            valor={top5[0] ? `${top5[0].uf}: ${fmtDecimal(top5[0].taxa_2024)}/100k` : "—"}
            descricao="estado com maior taxa de suicídio"
            fonte="FBSP · T22"
            inverterCor={false}
          />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            destaque
            titulo={<>Suicídio mata mais que latrocínio, <Termo>LCFM</Termo> e letalidade policial juntos</>}
            dado={fatorVsSoma ? `${fatorVsSoma}× a soma dos três componentes` : `${fmtInteiro(brasil.total_2024)} mortes`}
            contexto={<>Em 2024: latrocínio ({fmtInteiro(latrocinio)}), <Termo>LCFM</Termo> ({fmtInteiro(lcfm)}) e letalidade policial ({fmtInteiro(letalidadePolicial)}) somam {fmtInteiro(somaTresComponentes)} mortes. O suicídio ({fmtInteiro(brasil.total_2024)}) supera essa soma em {fatorVsSoma}×. São três fenômenos que dominam o debate de segurança pública — mas o suicídio, que raramente aparece nesse debate, é maior do que todos eles combinados.</>}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T22 · T01"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="Suicídio: a violência invisível nos dados de segurança"
            dado={proporcaoMVI != null ? `${fmtDecimal(proporcaoMVI)}% das MVI` : "~37% das MVI"}
            contexto={<>Com {fmtInteiro(brasil.total_2024)} mortes em 2024, o suicídio representa {proporcaoMVI != null ? fmtDecimal(proporcaoMVI) + "%" : "cerca de 37%"} de todas as <Termo>MVI</Termo>. É um fenômeno de saúde pública que raramente aparece nas estatísticas de segurança, mas que supera em escala feminicídio, latrocínio e <Termo>LCFM</Termo> somados.</>}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T22"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="RS e SC: quase 2× a média nacional"
            dado="RS: 13,5/100k · SC: 13,0/100k (média: 7,74)"
            contexto="Rio Grande do Sul (13,5) e Santa Catarina (13,0) lideram o ranking nacional de taxa de suicídio — quase o dobro da média nacional de 7,74/100k. Dois estados do Sul figuram entre os piores: isso coloca a região em contexto único no debate de saúde pública, pois são estados com alto IDH mas elevada mortalidade por suicídio."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T22"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="Cada 32 minutos, uma morte por suicídio no Brasil"
            dado="16.446 mortes em 2024 — 45 por dia"
            contexto="O suicídio mata em média 45 pessoas por dia no Brasil — mais do que homicídios dolosos em vários estados inteiros. Apesar disso, o tema recebe menos atenção em políticas de segurança pública do que crimes patrimoniais com muito menor impacto em vidas. O Anuário de 2025 é uma das raras publicações de segurança a incluir esse dado."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T22"
            anoReferencia={2024}
          />
        </section>

        {/* ── Ranking top 5 ── */}
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Estados com maior taxa de suicídio — 2024
          </h2>

          <div className="space-y-3">
            {top5.map((d, i) => {
              const pct = brasil.taxa_2024 ? (d.taxa_2024! / brasil.taxa_2024) * 100 : 0;
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
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: "var(--accent)",
                      }}
                    />
                  </div>
                  <span
                    className="text-sm w-20 text-right shrink-0"
                    style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
                  >
                    {fmtDecimal(d.taxa_2024)}/100k
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-xs" style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            Barra proporcional à média nacional ({fmtDecimal(brasil.taxa_2024)}/100k)
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T22" />
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
              <caption className="sr-only">Mortes por suicídio por estado, 2024</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "Total", "Taxa /100k"].map((h) => (
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
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {d.uf}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.total_2024)}
                    </td>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtDecimal(d.taxa_2024)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T22" />
        </section>

      </main>
      <Footer />
    </>
  );
}
