import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { MviBrasilChart } from "./MviBrasilChart";
import {
  getHomeStats,
  getMviBrasilSerie,
  getFeminicidioHist,
  getAutoriaSexo,
  getSuicidios,
  getMviEstados,
  getLetalidade,
} from "@/lib/data";
import { fmtInteiro } from "@/lib/formatters";
import { Termo } from "@/components/ui/Termo";

export const metadata = {
  title: "Anuário Segurança Pública — Dados e Insights",
};

export default function Home() {
  const stats = getHomeStats();
  const mviBrasilSerie = getMviBrasilSerie();
  const femHist = getFeminicidioHist();
  const autoria = getAutoriaSexo();

  const brasilFem = femHist.dados.find((d) => d.uf === "Brasil");
  const autoriaHomens = autoria.dados.find(
    (d) => d.categoria === "vitimas_homens_mvi"
  );

  // Dados para insights novos
  const suicidios = getSuicidios();
  const mviEstados = getMviEstados();
  const let_ = getLetalidade();
  const brasilSuicidio = suicidios.dados.find((d) => d.uf === "Brasil")!;
  const brasilMvi = mviEstados.dados.find((d) => d.uf === "Brasil")!;
  const brasilLet = let_.dados.find((d) => d.uf === "Brasil")!;
  const somaTresComp = (brasilMvi.latrocinio_2024 ?? 0) + (brasilMvi.lcfm_2024 ?? 0) + (brasilLet.mortes_2024 ?? 0);
  const fatorSuicidio = brasilSuicidio.total_2024 && somaTresComp
    ? +(brasilSuicidio.total_2024 / somaTresComp).toFixed(1)
    : null;

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* ── Hero ── */}
        <header className="mb-12">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            19º Anuário Brasileiro de Segurança Pública · Dados 2024
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            O Brasil em dados de violência
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Visualizações interativas com contexto analítico baseadas no{" "}
            <span style={{ color: "var(--accent)" }}>
              19º Anuário Brasileiro
            </span>{" "}
            de Segurança Pública, publicado pelo Fórum Brasileiro de Segurança
            Pública com dados de 2024.
          </p>
        </header>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <StatCard key={s.titulo} {...s} />
          ))}
        </section>

        {/* ── Gráfico principal ── */}
        <section className="mb-16">
          <MviBrasilChart data={mviBrasilSerie} />
        </section>

        {/* ── Insights Editoriais ── */}
        <section className="mb-16">
          <h2
            className="text-xl font-semibold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            Insights editoriais
          </h2>
          <p
            className="text-sm mb-8 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Dados de violência exigem contexto. Estes cards apresentam
            números que merecem interpretação cuidadosa antes de virar
            manchete.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Insight 1 — Gráfico 48 */}
            <InsightCard
              destaque
              titulo="Mulheres como autoras: o que os dados realmente mostram"
              dado={`${autoriaHomens?.apenas_autoras_femininas ?? "—"}% nos casos com vítimas homens`}
              contexto={autoria.contexto}
              anoReferencia={autoria.ano_referencia}
              fonte="Fórum Brasileiro de Segurança Pública"
              tabela={`Gráfico ${autoria.grafico} · ${autoria.tabela_origem}`}
              href="/temas/feminicidio"
            />

            {/* Insight 2 — Proporção feminicídio */}
            {brasilFem && (
              <InsightCard
                titulo="Feminicídio: de 9,4% a 40,3% em 10 anos"
                dado={`${brasilFem.proporcoes[brasilFem.proporcoes.length - 1]}% em 2024`}
                contexto="A proporção de feminicídios em relação a homicídios de mulheres cresceu muito desde 2015 — não porque os crimes aumentaram na mesma proporção, mas porque a Lei do Feminicídio (Lei 13.104/2015) criou a tipificação. O aumento reflete melhora no reconhecimento e no registro policial."
                anoReferencia={2024}
                fonte="Fórum Brasileiro de Segurança Pública"
                tabela="Q07"
                href="/temas/feminicidio"
              />
            )}

            {/* Insight 3 — Pico em 2017 */}
            <InsightCard
              titulo="O Brasil matou mais em 2017, não em 2024"
              dado="64.079 MVI em 2017 — pico histórico"
              contexto="O pico de mortes violentas foi em 2017, com taxa de 31,2/100k hab. Em 2024, o número é 44.127 (20,76/100k) — queda de 31%. O desafio agora é a sustentabilidade dessa redução e as disparidades regionais: o Nordeste ainda registra taxas muito acima da média nacional."
              anoReferencia={2024}
              fonte="Fórum Brasileiro de Segurança Pública"
              tabela="T02"
              href="/temas/violencia-letal"
            />

            {/* Insight 4 — Sistema prisional */}
            <InsightCard
              titulo="Sistema prisional: 4× em 25 anos"
              dado="909.594 pessoas presas em 2024"
              contexto="O Brasil tinha 232.755 pessoas presas em 2000. Em 2024 são 909.594 — crescimento de 291% sem redução proporcional da violência. O país tem a 3ª maior população carcerária do mundo, o que questiona a efetividade do modelo de encarceramento em massa."
              anoReferencia={2024}
              fonte="Fórum Brasileiro de Segurança Pública"
              tabela="T127"
              href="/temas/sistema-prisional"
            />

            {/* Insight 5 — Suicídio vs MVI */}
            <InsightCard
              titulo={<>Suicídio mata mais que latrocínio, <Termo>LCFM</Termo> e letalidade policial juntos</>}
              dado={fatorSuicidio ? `${fatorSuicidio}× a soma — ${fmtInteiro(brasilSuicidio.total_2024)} mortes` : "16.446 mortes em 2024"}
              contexto={<>Em 2024, suicídio ({fmtInteiro(brasilSuicidio.total_2024)}) supera em {fatorSuicidio}× a soma de latrocínio ({fmtInteiro(brasilMvi.latrocinio_2024)}), <Termo>LCFM</Termo> ({fmtInteiro(brasilMvi.lcfm_2024)}) e mortes por intervenção policial ({fmtInteiro(brasilLet.mortes_2024)}). É um fenômeno de saúde pública que raramente aparece no debate de segurança.</>}
              anoReferencia={2024}
              fonte="Fórum Brasileiro de Segurança Pública"
              tabela="T22 · T01"
              href="/temas/suicidios"
            />

            {/* Insight 6 — Tendência estadual RN */}
            <InsightCard
              titulo="RN duplicou a taxa de violência em 12 anos"
              dado="+102,6% — de 11,93 para 24,17/100k (2012→2024)"
              contexto="Enquanto o Brasil reduziu 25% na taxa de MVI entre 2012 e 2024, o Rio Grande do Norte dobrou a sua — passando de 11,93 para 24,17 por 100 mil habitantes. Amapá (+84,5%) e Piauí (+23,2%) também tiveram altas expressivas. Na direção oposta, DF (−72,3%) e Goiás (−54%) registraram as maiores quedas do período."
              anoReferencia={2024}
              fonte="Fórum Brasileiro de Segurança Pública"
              tabela="T02"
              href="/temas/violencia-letal"
            />
          </div>
        </section>

        {/* ── Navegação por tema ── */}
        <section>
          <h2
            className="text-xl font-semibold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            Explorar por tema
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                href: "/temas/violencia-letal",
                titulo: "Violência Letal",
                desc: "MVI histórico, ranking por estado, tendências regionais",
              },
              {
                href: "/temas/feminicidio",
                titulo: "Feminicídio",
                desc: "Evolução 2015–2024, Gráfico 48 com contexto analítico",
              },
              {
                href: "/temas/letalidade-policial",
                titulo: "Letalidade Policial",
                desc: "6.243 mortes em intervenções policiais em 2024",
              },
              {
                href: "/temas/violencia-sexual",
                titulo: "Violência Sexual",
                desc: "Estupro e estupro de vulnerável por estado",
              },
              {
                href: "/temas/sistema-prisional",
                titulo: "Sistema Prisional",
                desc: "De 232k para 909k presos — evolução 2000–2024",
              },
              {
                href: "/temas/gastos-publicos",
                titulo: "Gastos Públicos",
                desc: "R$ 153 bi em segurança pública — análise por UF",
              },
              {
                href: "/temas/suicidios",
                titulo: "Suicídios",
                desc: "16.446 mortes em 2024 — a violência invisível nos dados de segurança",
              },
              {
                href: "/temas/desaparecimentos",
                titulo: "Desaparecimentos",
                desc: "81.873 pessoas desaparecidas em 2024 — primeiro levantamento nacional",
              },
              {
                href: "/temas/violencia-patrimonial",
                titulo: "Violência Patrimonial",
                desc: "374 mil roubos de celular e 126 mil roubos de veículo em 2024",
              },
            ].map((tema) => (
              <Link
                key={tema.href}
                href={tema.href}
                aria-label={`${tema.titulo}: ${tema.desc}`}
                className="block rounded-lg p-5 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                }}
              >
                <h3
                  className="font-semibold mb-1"
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {tema.titulo}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {tema.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
