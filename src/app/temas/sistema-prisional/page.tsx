import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { getPrisional } from "@/lib/data";
import { fmtInteiro, fmtDecimal } from "@/lib/formatters";
import { PrisionalChart } from "./PrisionalChart";

export const metadata = {
  title: "Sistema Prisional",
  description:
    "Evolução da população prisional brasileira 2000–2024. De 232 mil a 909 mil pessoas — crescimento de 291%.",
};

export default function SistemaPrisionalPage() {
  const prisional = getPrisional();

  const primeiro = prisional.dados[0];     // 2000
  const ultimo = prisional.dados.at(-1)!;  // 2024
  const pico = [...prisional.dados].sort((a, b) => (b.total ?? 0) - (a.total ?? 0))[0];

  const crescimento = primeiro.total && ultimo.total
    ? +((ultimo.total - primeiro.total) / primeiro.total * 100).toFixed(1)
    : null;

  // Série para o gráfico
  const serie = prisional.dados.map((d) => ({
    ano: d.ano,
    total: d.total,
    sistema: d.sistema_penitenciario,
    custodia: d.custodia_policia,
  }));

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Sistema Prisional</span>
        </nav>

        {/* ── Hero ── */}
        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Sistema Prisional
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            O Brasil encarcerou em ritmo acelerado nas últimas décadas, tornando-se
            a 3ª maior população carcerária do mundo, sem redução proporcional
            da violência. Evolução 2000–2024.
          </p>
        </header>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Presos em 2024"
            valor={fmtInteiro(ultimo.total)}
            descricao="total de pessoas encarceradas"
            fonte="FBSP · T127"
          />
          <StatCard
            titulo="Presos em 2000"
            valor={fmtInteiro(primeiro.total)}
            descricao="ponto de partida da série histórica"
            fonte="FBSP · T127"
          />
          <StatCard
            titulo="Crescimento 2000–2024"
            valor={crescimento != null ? `+${fmtDecimal(crescimento, 1)}%` : "—"}
            descricao={`de ${fmtInteiro(primeiro.total)} para ${fmtInteiro(ultimo.total)}`}
            fonte="FBSP · T127"
            inverterCor={false}
          />
          <StatCard
            titulo="No sistema penitenciário"
            valor={fmtInteiro(ultimo.sistema_penitenciario)}
            descricao={`${fmtDecimal(
              ultimo.total && ultimo.sistema_penitenciario
                ? (ultimo.sistema_penitenciario / ultimo.total) * 100
                : null
            )}% do total em 2024`}
            fonte="FBSP · T127"
          />
        </section>

        {/* ── Gráfico histórico ── */}
        <section
          className="rounded-lg p-6 mb-14"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <PrisionalChart data={serie} />
        </section>

        {/* ── Contexto analítico ── */}
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
            Encarceramento em massa sem queda proporcional da violência
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
            Em 2000, o Brasil tinha{" "}
            <strong style={{ color: "var(--text)" }}>{fmtInteiro(primeiro.total)} pessoas presas</strong>.
            Em 2024, são{" "}
            <strong style={{ color: "var(--text)" }}>{fmtInteiro(ultimo.total)}</strong> —
            um crescimento de{" "}
            <strong style={{ color: "var(--text)" }}>{crescimento}%</strong> em 25 anos.
            O país tem a{" "}
            <strong style={{ color: "var(--text)" }}>3ª maior população carcerária do mundo</strong>,
            atrás apenas dos EUA e da China.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            No mesmo período, as Mortes Violentas Intencionais tiveram variações
            que não acompanharam proporcionalmente o crescimento do encarceramento,
            o que alimenta o debate sobre a efetividade do modelo de encarceramento
            em massa como política de segurança pública.
          </p>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T127" />
        </section>

        {/* ── Tabela ano a ano ── */}
        <section className="mb-14">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Série histórica completa — 2000 a 2024
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <caption className="sr-only">Evolução da população carcerária brasileira, série histórica 2000 a 2024</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Ano", "Total encarcerado", "Sistema penitenciário", "Custódia das polícias"].map((h) => (
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
                {[...prisional.dados].reverse().map((d) => (
                  <tr key={d.ano} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td
                      className="py-2 px-3 font-medium"
                      style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
                    >
                      {d.ano}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.total)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.sistema_penitenciario)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.custodia_policia)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T127" />
        </section>

      </main>
      <Footer />
    </>
  );
}
