import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/ui/StatCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { FonteTag } from "@/components/ui/FonteTag";
import { NotaMetodologica } from "@/components/ui/NotaMetodologica";
import { getPatrimonio } from "@/lib/data";
import { fmtInteiro } from "@/lib/formatters";

export const metadata = {
  title: "Violência Patrimonial",
  description:
    "Roubos de veículos e celulares no Brasil 2024. 126.675 roubos de veículo e 374.688 roubos de celular.",
};

export default function ViolenciaPatrimonialPage() {
  const patrimonio = getPatrimonio();

  const brasil = patrimonio.dados.find((d) => d.uf === "Brasil")!;

  const porUF = patrimonio.dados.filter((d) => d.regiao !== null);

  const porRouboVeiculo = [...porUF]
    .filter((d) => d.roubo_veiculo_2024 != null)
    .sort((a, b) => (b.roubo_veiculo_2024 ?? 0) - (a.roubo_veiculo_2024 ?? 0));

  const porRouboCelular = [...porUF]
    .filter((d) => d.roubo_celular_2024 != null)
    .sort((a, b) => (b.roubo_celular_2024 ?? 0) - (a.roubo_celular_2024 ?? 0));

  const top3Veiculo = porRouboVeiculo.slice(0, 3);
  const top3Celular = porRouboCelular.slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">

        <nav aria-label="Navegação estrutural" className="text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "var(--text-muted)" }}>Início</a>
          {" / "}
          <span aria-current="page" style={{ color: "var(--text)" }}>Violência Patrimonial</span>
        </nav>

        <header className="mb-6">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Violência Patrimonial
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Roubos de veículos (T12) e celulares (T13) por Unidade da Federação, 2024.
            Dados de registros policiais consolidados pelo Fórum Brasileiro de Segurança Pública.
          </p>
        </header>

        <NotaMetodologica>
          <p>
            Esta página apresenta apenas dados de <strong style={{ color: "var(--text)" }}>roubos</strong> (crime com violência ou ameaça).
            Os dados de furtos (sem violência) desta edição do Anuário não estão disponíveis em formato comparável entre estados.
            A comparação entre 2023 e 2024 também não é apresentada, pois os registros de 2023 são parciais.
          </p>
        </NotaMetodologica>

        {/* ── StatCards ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <StatCard
            titulo="Roubos de veículo 2024"
            valor={fmtInteiro(brasil.roubo_veiculo_2024)}
            descricao="registros nacionais"
            fonte="FBSP · T12"
            inverterCor={false}
          />
          <StatCard
            titulo="Roubos de celular 2024"
            valor={fmtInteiro(brasil.roubo_celular_2024)}
            descricao="registros nacionais"
            fonte="FBSP · T13"
            inverterCor={false}
          />
          <StatCard
            titulo="Lider em roubo de veículo"
            valor={top3Veiculo[0]?.uf ?? "—"}
            descricao={top3Veiculo[0] ? `${fmtInteiro(top3Veiculo[0].roubo_veiculo_2024)} registros` : ""}
            fonte="FBSP · T12"
            inverterCor={false}
          />
          <StatCard
            titulo="Lider em roubo de celular"
            valor={top3Celular[0]?.uf ?? "—"}
            descricao={top3Celular[0] ? `${fmtInteiro(top3Celular[0].roubo_celular_2024)} registros` : ""}
            fonte="FBSP · T13"
            inverterCor={false}
          />
        </section>

        {/* ── Insights ── */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <InsightCard
            titulo="SP concentra 31% dos roubos de celular do país"
            dado="118.181"
            contexto="São Paulo registrou 118.181 roubos de celular em 2024 — quase um terço dos 374.688 nacionais. O estado também lidera roubos de veículo com 31.696 casos, seguido pelo Rio de Janeiro (30.930). Juntos, SP e RJ respondem por metade de todos os roubos de veículo registrados no Brasil."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T13"
            anoReferencia={2024}
          />
          <InsightCard
            titulo="Celular: o alvo preferencial dos roubos urbanos"
            dado="374.688"
            contexto="Os roubos de celular (374.688) superam em quase 3 vezes os roubos de veículo (126.675) em volume nacional. A alta liquidez do produto e o crescimento de mercados de revenda explicam a preferência dos assaltantes. O dado reforça a necessidade de políticas de rastreamento e bloqueio de IMEI."
            fonte="Fórum Brasileiro de Segurança Pública"
            tabela="T13"
            anoReferencia={2024}
          />
        </section>

        {/* ── Tabelas lado a lado ── */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">

          {/* Roubo de veículo */}
          <section>
            <h2
              className="text-xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Roubo de veículo — 2024
            </h2>
            <div className="space-y-2 mb-4">
              {top3Veiculo.map((d, i) => {
                const pct = brasil.roubo_veiculo_2024
                  ? ((d.roubo_veiculo_2024 ?? 0) / brasil.roubo_veiculo_2024) * 100
                  : 0;
                return (
                  <div key={d.uf} className="flex items-center gap-3">
                    <span className="text-xs w-4 text-right shrink-0" style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                      {i + 1}
                    </span>
                    <span className="text-sm w-28 shrink-0" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {d.uf}
                    </span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--surface-2)" }}>
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${pct * 3}%`, backgroundColor: "var(--accent)" }}
                      />
                    </div>
                    <span className="text-sm w-20 text-right shrink-0" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.roubo_veiculo_2024)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <caption className="sr-only">Roubos de veículo por estado, 2024</caption>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["UF", "Região", "Registros"].map((h) => (
                      <th key={h} scope="col" className="text-left py-2 px-2 text-xs uppercase tracking-wide"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {porRouboVeiculo.map((d) => (
                    <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-2 px-2 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{d.uf}</td>
                      <td className="py-2 px-2" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                      <td className="py-2 px-2" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.roubo_veiculo_2024)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T12" />
          </section>

          {/* Roubo de celular */}
          <section>
            <h2
              className="text-xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Roubo de celular — 2024
            </h2>
            <div className="space-y-2 mb-4">
              {top3Celular.map((d, i) => {
                const pct = brasil.roubo_celular_2024
                  ? ((d.roubo_celular_2024 ?? 0) / brasil.roubo_celular_2024) * 100
                  : 0;
                return (
                  <div key={d.uf} className="flex items-center gap-3">
                    <span className="text-xs w-4 text-right shrink-0" style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                      {i + 1}
                    </span>
                    <span className="text-sm w-28 shrink-0" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {d.uf}
                    </span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--surface-2)" }}>
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${pct * 3}%`, backgroundColor: "var(--accent-amber)" }}
                      />
                    </div>
                    <span className="text-sm w-20 text-right shrink-0" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                      {fmtInteiro(d.roubo_celular_2024)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <caption className="sr-only">Roubos de celular por estado, 2024</caption>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["UF", "Região", "Registros"].map((h) => (
                      <th key={h} scope="col" className="text-left py-2 px-2 text-xs uppercase tracking-wide"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {porRouboCelular.map((d) => (
                    <tr key={d.uf} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-2 px-2 font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{d.uf}</td>
                      <td className="py-2 px-2" style={{ color: "var(--text-muted)" }}>{d.regiao}</td>
                      <td className="py-2 px-2" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                        {fmtInteiro(d.roubo_celular_2024)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <FonteTag fonte="Fórum Brasileiro de Segurança Pública" tabela="T13" />
          </section>

        </div>

      </main>
      <Footer />
    </>
  );
}
