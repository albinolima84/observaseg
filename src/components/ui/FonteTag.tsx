interface FonteTagProps {
  fonte: string;
  tabela?: string;
  /** URL do PDF/Excel original */
  url?: string;
}

/**
 * Sempre visível abaixo de qualquer dado ou visualização.
 * Regra do projeto: nenhum número aparece sem FonteTag.
 */
export function FonteTag({ fonte, tabela, url }: FonteTagProps) {
  const texto = tabela ? `${fonte} · ${tabela}` : fonte;

  return (
    <p
      className="text-xs mt-3"
      style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
    >
      Fonte:{" "}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          {texto}
        </a>
      ) : (
        texto
      )}
    </p>
  );
}
