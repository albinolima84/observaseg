import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { getLetalidade } from "@/lib/data";
import { fmtInteiro, fmtDecimal, fmtVariacao, corVariacaoMVI } from "@/lib/formatters";
import { FonteTag } from "@/components/ui/FonteTag";

export const metadata = {
  title: "Letalidade Policial",
  description:
    "Mortes decorrentes de intervenções policiais no Brasil 2024. 6.243 mortes — 14,1% das MVI.",
};

export default function LetalidadePolicialPage() {
  const let_ = getLetalidade();
  const brasil = let_.dados.find((d) => d.uf === "Brasil")!;

  const porUF = let_.dados
    .filter((d) => d.uf !== "Brasil" && d.regiao !== null && d.mortes_2024 != null)
    .sort((a, b) => (b.mortes_2024 ?? 0) - (a.mortes_2024 ?? 0));

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <p className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-dim)" }}>Início</a>
          {" / "}
          <span style={{ color: "var(--text)" }}>Letalidade Policial</span>
        </p>

        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Letalidade Policial
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Mortes Decorrentes de Intervenção Policial (MDIP) em serviço e fora de serviço,
            comparativo 2023–2024 por Unidade da Federação.
          </p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Mortes policiais 2024"
            valor={fmtInteiro(brasil.mortes_2024)}
            variacao={brasil.mortes_2023 && brasil.mortes_2024
              ? +((brasil.mortes_2024 - brasil.mortes_2023) / brasil.mortes_2023 * 100).toFixed(2)
              : undefined}
            descricao="intervenções em serviço e fora de serviço"
            fonte="FBSP · T10"
          />
          <StatCard
            titulo="Mortes policiais 2023"
            valor={fmtInteiro(brasil.mortes_2023)}
            descricao="para comparação"
            fonte="FBSP · T10"
          />
          <StatCard
            titulo="Proporção das MVI 2024"
            valor={`${fmtDecimal(brasil.proporcao_mvi_2024)}%`}
            descricao="das MVI foram mortes por intervenção policial"
            fonte="FBSP · T10"
            inverterCor={false}
          />
          <StatCard
            titulo="Proporção das MVI 2023"
            valor={`${fmtDecimal(brasil.proporcao_mvi_2023)}%`}
            descricao="para comparação"
            fonte="FBSP · T10"
          />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            titulo="São Paulo: letalidade policial avança 61% em um ano"
            dado="+61,1%"
            contexto="São Paulo passou de 504 para 813 mortes por intervenção policial em 2024 — o maior salto absoluto entre todos os estados. A proporção das MVI atribuída à polícia saltou de 14,5% para 21,7%. O estado, que antes se destacava por baixa letalidade relativa, agora se aproxima da média nacional."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T10"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="Bahia concentra 1 em cada 4 mortes por intervenção policial"
            dado="24,9%"
            contexto="Com 1.556 mortes, a Bahia responde por quase um quarto de toda a letalidade policial do país, mesmo tendo reduzido o número em relação a 2023 (1.700). A concentração é estrutural: as 3 UFs com mais mortes (BA, SP, RJ) somam 49% do total nacional de 6.243."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T10"
            anoReferencia={2024}
          />
        </section>

        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Comparativo por estado — 2023 vs 2024
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["UF", "Região", "Mortes 2023", "Mortes 2024", "% das MVI 2024", "Variação"].map((h) => (
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
                  const variacao = d.mortes_2023 && d.mortes_2024
                    ? +((d.mortes_2024 - d.mortes_2023) / d.mortes_2023 * 100).toFixed(2)
                    : null;
                  return (
                    <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {d.uf}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.mortes_2023)}
                      </td>
                      <td className="py-2 px-3 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.mortes_2024)}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtDecimal(d.proporcao_mvi_2024)}%
                      </td>
                      <td className="py-2 px-3 font-medium" style={{ color: corVariacaoMVI(variacao), fontFamily: "var(--font-mono)" }}>
                        {fmtVariacao(variacao)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T10" />
        </section>

      </main>
      <Footer />
    </>
  );
}
