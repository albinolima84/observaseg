import { getMeta } from "@/lib/data";

export function Footer() {
  const meta = getMeta();
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
            Dados: {meta.numero_anuario}º Anuário Brasileiro de Segurança Pública ({meta.ano_publicacao})
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Referência: ano de {meta.ano_referencia} · Extração:{" "}
            {new Date(meta.data_extracao).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
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
            href={meta.url_fonte}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Baixar planilha do ${meta.numero_anuario}º Anuário em formato Excel`}
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
