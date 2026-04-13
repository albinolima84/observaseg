import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { NotaMetodologica } from "@/components/ui/NotaMetodologica";
import { getFeminicidio, getFeminicidioHist, getAutoriaSexo } from "@/lib/data";
import { fmtInteiro, fmtPct } from "@/lib/formatters";
import { FeminicidioHistChart } from "./FeminicidioHistChart";
import { Grafico48 } from "./Grafico48";

export const metadata = {
  title: "Feminicídio",
  description:
    "Feminicídio no Brasil 2015–2024. Evolução histórica, proporção em relação a homicídios de mulheres e análise do Gráfico 48.",
};

export default function FeminicidioPage() {
  const fem = getFeminicidio();
  const femHist = getFeminicidioHist();
  const autoria = getAutoriaSexo();

  const brasil = fem.dados.find((d) => d.uf === "Brasil")!;
  const brasilHist = femHist.dados.find((d) => d.uf === "Brasil")!;

  const fem2024 = brasil.feminicidios_2024 ?? 0;
  const hom2024 = brasil.homicidios_mulheres_2024 ?? 0;
  const prop2024 = brasil.proporcao_2024 ?? 0;
  const prop2015 = brasilHist.proporcoes[0] ?? 0;

  // Série para o gráfico histórico
  const serieProp = femHist.anos.map((ano, i) => ({
    ano,
    proporcao: brasilHist.proporcoes[i],
  }));

  // Tabela por UF — ordenada por absolutos
  const porUFAbsoluto = fem.dados
    .filter((d) => d.uf !== "Brasil" && d.regiao !== null)
    .sort((a, b) => (b.feminicidios_2024 ?? 0) - (a.feminicidios_2024 ?? 0));

  // Top 5 por proporção para InsightCard
  const topProporcao = [...porUFAbsoluto]
    .sort((a, b) => (b.proporcao_2024 ?? 0) - (a.proporcao_2024 ?? 0))
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Feminicídio</span>
        </nav>

        {/* ── Hero ── */}
        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Feminicídio
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Análise dos feminicídios registrados no Brasil de 2015 a 2024,
            desde a aprovação da Lei do Feminicídio (Lei 13.104/2015). Inclui
            proporção em relação a homicídios de mulheres e análise de autoria.
          </p>
        </header>

        <NotaMetodologica>
          Os valores absolutos de feminicídio 2024 são derivados: homicídios de
          mulheres (T24) × proporção histórica (T07/Q07). Comparação com 2023 não
          disponível — os dados absolutos de 2023 apresentaram inconsistência na
          extração. A proporção 2023→2024 é exibida usando somente a série histórica
          de percentuais.
        </NotaMetodologica>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Feminicídios 2024"
            valor={fmtInteiro(fem2024)}
            descricao="registros no Brasil (estimado)"
            fonte="FBSP · T24 + Q07"
            inverterCor={false}
          />
          <StatCard
            titulo="Homicídios de mulheres"
            valor={fmtInteiro(hom2024)}
            descricao="total em 2024"
            fonte="FBSP · T24"
          />
          <StatCard
            titulo="Proporção 2024"
            valor={fmtPct(prop2024)}
            descricao="dos homicídios de mulheres são feminicídio"
            fonte="FBSP · Q07"
            inverterCor={false}
          />
          <StatCard
            titulo="Proporção em 2015"
            valor={fmtPct(prop2015)}
            descricao="início da série — Lei 13.104/2015"
            fonte="FBSP · Q07"
          />
        </section>

        {/* ── Gráfico histórico proporção ── */}
        <section
          className="rounded-lg p-6 mb-10"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <FeminicidioHistChart data={serieProp} />
        </section>

        {/* ── Contexto da Lei ── */}
        <section
          className="rounded-lg p-6 mb-14"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--accent-amber)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent-amber)", fontFamily: "var(--font-mono)" }}
          >
            Contexto editorial
          </p>
          <h2
            className="text-lg font-semibold mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            O aumento da proporção não significa aumento proporcional dos crimes
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A proporção de feminicídios em relação a homicídios de mulheres subiu
            de <strong style={{ color: "var(--text)" }}>{fmtPct(prop2015)} em 2015</strong> para{" "}
            <strong style={{ color: "var(--text)" }}>{fmtPct(prop2024)} em 2024</strong>.
            Esse crescimento não indica que os feminicídios multiplicaram por 4 — ele
            reflete principalmente a{" "}
            <strong style={{ color: "var(--text)" }}>melhora progressiva no reconhecimento
            e no registro policial</strong> após a Lei do Feminicídio (Lei 13.104/2015),
            que criou a tipificação específica. Antes de 2015, esses casos eram
            registrados apenas como homicídio doloso, tornando invisível a motivação
            de gênero.
          </p>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="Q07 · T24" />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            destaque
            titulo="SP reconhece 60% dos homicídios de mulheres como feminicídio"
            dado={`${fmtPct(porUFAbsoluto.find(d => d.uf === 'São Paulo')?.proporcao_2024)} — maior proporção entre os grandes estados`}
            contexto="São Paulo reconhece 60,1% dos homicídios de mulheres como feminicídio — a maior proporção entre os estados com alto volume de casos. Com 253 feminicídios em 2024 (o maior absoluto do país), SP mostra que reconhecimento qualificado e volume alto coexistem. DF (65,7%), MS (62,5%) e SC (61,4%) têm proporções ainda maiores, mas em números absolutos menores."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T24 · Q07"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="Bahia: menor proporção entre os mais letais"
            dado={`${fmtPct(porUFAbsoluto.find(d => d.uf === 'Bahia')?.proporcao_2024)} — 3º maior em absolutos`}
            contexto={`Com ${fmtInteiro(porUFAbsoluto.find(d => d.uf === 'Bahia')?.feminicidios_2024)} feminicídios (3º maior absoluto), a Bahia reconhece apenas 28,6% dos homicídios de mulheres como feminicídio — muito abaixo da média nacional de 40,3%. O dado sugere subnotificação ou dificuldade de qualificação do crime pela polícia, não necessariamente menos feminicídios reais.`}
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T24 · Q07"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="4× em 10 anos: crescimento da proporção desde 2015"
            dado={`${fmtPct(prop2015)} em 2015 → ${fmtPct(prop2024)} em 2024`}
            contexto="A evolução de 9,4% para 40,3% em 10 anos é o maior indicador de impacto da Lei 13.104/2015. O crescimento foi contínuo: nenhum ano da série registrou queda na proporção nacional, sugerindo adesão crescente e progressiva ao uso correto da tipificação. O patamar de 40% ainda é considerado baixo pelos especialistas — países com sistemas mais maduros chegam a 60-70%."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="Q07"
            anoReferencia={2024}
          />
          <InsightCard
            titulo={`Top 3 por proporção: ${topProporcao.map(d => d.uf).join(', ')}`}
            dado={topProporcao.map(d => `${d.uf} ${fmtPct(d.proporcao_2024)}`).join(' · ')}
            contexto="Distrito Federal (65,7%), Mato Grosso do Sul (62,5%) e Acre (61,5%) lideram a proporção de reconhecimento. Esses estados têm em comum maior integração entre delegacias especializadas de atendimento à mulher e o sistema de registro — não necessariamente mais violência, mas mais capacidade institucional de identificar e tipificar corretamente."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="Q07"
            anoReferencia={2024}
          />
        </section>

        {/* ── Gráfico 48 — Autoria por sexo ── */}
        <section className="mb-14">
          <Grafico48 autoria={autoria} />
        </section>

        {/* ── Tabela por UF ── */}
        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Feminicídio por estado — 2024
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Ordenado por volume absoluto de feminicídios. Proporção = % dos homicídios de mulheres tipificados como feminicídio.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <caption className="sr-only">Feminicídios e homicídios de mulheres por estado em 2024, ordenados por total</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "Hom. Mulheres", "Feminicídios", "Proporção 2024", "Proporção 2023"].map((h) => (
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
                {porUFAbsoluto.map((d) => (
                  <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {d.uf}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>
                      {d.regiao}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.homicidios_mulheres_2024)}
                    </td>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.feminicidios_2024)}
                    </td>
                    <td className="py-2 px-3 font-medium" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                      {fmtPct(d.proporcao_2024)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {fmtPct(d.proporcao_2023)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T24 · Q07" />
        </section>

      </main>
      <Footer />
    </>
  );
}
