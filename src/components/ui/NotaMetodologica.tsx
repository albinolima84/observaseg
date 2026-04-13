interface NotaMetodologicaProps {
  children: React.ReactNode;
}

/**
 * Bloco de aviso metodológico obrigatório.
 * Usar sempre que a comparação anual não for válida ou o dado
 * exigir contexto de coleta antes de ser interpretado.
 */
export function NotaMetodologica({ children }: NotaMetodologicaProps) {
  return (
    <div
      role="note"
      aria-label="Nota metodológica"
      className="rounded-lg p-4 mb-10 text-sm"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--accent-amber)",
        color: "var(--text-muted)",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "var(--accent-amber)", fontFamily: "var(--font-mono)" }}>
        NOTA METODOLÓGICA
      </p>
      <div>{children}</div>
    </div>
  );
}
