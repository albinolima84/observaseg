// Home — painel geral
// Dados reais virão dos JSONs em data/2025/ após rodar o script Python.
// Por ora, exibe a estrutura com placeholders para desenvolvimento.

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <p
          className="text-sm uppercase tracking-widest mb-3"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          19º Anuário Brasileiro de Segurança Pública · Dados 2024
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          O Brasil em dados de violência
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>
          Visualizações interativas baseadas no{" "}
          <span style={{ color: "var(--accent)" }}>19º Anuário Brasileiro</span>{" "}
          de Segurança Pública, publicado pelo Fórum Brasileiro de Segurança
          Pública com dados de 2024.
        </p>
      </header>

      {/* StatCards — serão alimentados pelos JSONs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { titulo: "MVI Brasil 2024", valor: "44.127", variacao: -4.97, desc: "Mortes Violentas Intencionais" },
          { titulo: "Taxa MVI", valor: "20,76", variacao: -5.4, desc: "por 100 mil habitantes" },
          { titulo: "Feminicídios", valor: "1.492", variacao: 1.15, desc: "em 2024" },
          { titulo: "Mortes policiais", valor: "6.243", variacao: 3.2, desc: "por intervenção" },
        ].map((card) => (
          <div
            key={card.titulo}
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {card.titulo}
            </p>
            <p
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}
            >
              {card.valor}
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: card.variacao < 0 ? "var(--accent-green)" : "var(--accent)" }}
            >
              {card.variacao > 0 ? "+" : ""}{card.variacao}%
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{card.desc}</p>
          </div>
        ))}
      </section>

      {/* Navegação por tema */}
      <section>
        <h2
          className="text-xl font-semibold mb-6"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Explorar por tema
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/temas/violencia-letal", titulo: "Violência Letal", desc: "MVI histórico, ranking por estado, tendências" },
            { href: "/temas/feminicidio", titulo: "Feminicídio", desc: "Evolução 2015–2024 e análise do Gráfico 48" },
            { href: "/temas/letalidade-policial", titulo: "Letalidade Policial", desc: "Mortes em intervenções policiais por estado" },
            { href: "/temas/violencia-sexual", titulo: "Violência Sexual", desc: "Estupro e estupro de vulnerável" },
            { href: "/temas/sistema-prisional", titulo: "Sistema Prisional", desc: "Evolução 2000–2024: de 232k para 909k presos" },
            { href: "/temas/gastos-publicos", titulo: "Gastos Públicos", desc: "R$ 153 bi em segurança pública" },
          ].map((tema) => (
            <a
              key={tema.href}
              href={tema.href}
              className="block rounded-lg p-5 transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <h3
                className="font-semibold mb-1"
                style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
              >
                {tema.titulo}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{tema.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-20 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
          Fonte: Fórum Brasileiro de Segurança Pública · 19º Anuário Brasileiro de Segurança Pública (2025) ·
          Dados referentes ao ano de 2024.
        </p>
      </footer>
    </main>
  );
}
