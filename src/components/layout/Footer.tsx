export function Footer() {
  const URL_ANUARIO =
    "https://forumseguranca.org.br/wp-content/uploads/2025/09/anuario-2025.xlsx";
  const URL_FORUM = "https://forumseguranca.org.br";

  return (
    <footer
      className="mt-20 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Dados: 19º Anuário Brasileiro de Segurança Pública (2025)
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
          >
            Referência: ano de 2024 · Publicação: 2025
          </p>
        </div>

        <div className="flex gap-4 items-start">
          <a
            href={URL_FORUM}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline underline-offset-2 transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Fórum Brasileiro de Segurança Pública
          </a>
          <a
            href={URL_ANUARIO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline underline-offset-2 transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Baixar Excel original ↓
          </a>
        </div>
      </div>
    </footer>
  );
}
