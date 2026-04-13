"use client";

import { useState } from "react";
import { GLOSSARIO, type SiglaGlossario } from "@/lib/glossario";

interface TermoProps {
  /** A sigla ou termo a exibir */
  children: string;
  /** Sobrescreve a definição do glossário (opcional) */
  definicao?: string;
}

/**
 * Renderiza uma sigla com tooltip de definição ao hover/focus.
 * Usa <abbr> para semântica correta e acessibilidade.
 *
 * Uso: <Termo>LCFM</Termo>  ou  <Termo definicao="...">outra sigla</Termo>
 */
export function Termo({ children, definicao }: TermoProps) {
  const [visible, setVisible] = useState(false);
  const def = definicao ?? GLOSSARIO[children as SiglaGlossario];

  if (!def) {
    // Sem definição: renderiza só o texto
    return <>{children}</>;
  }

  return (
    <span style={{ position: "relative", display: "inline" }}>
      <abbr
        title=""
        aria-describedby={`tooltip-${children}`}
        style={{
          textDecoration: "underline dotted",
          textUnderlineOffset: "3px",
          cursor: "help",
          fontStyle: "normal",
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
      </abbr>

      {visible && (
        <span
          role="tooltip"
          id={`tooltip-${children}`}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "260px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--accent)",
            borderRadius: "6px",
            padding: "10px 14px",
            fontSize: "12px",
            lineHeight: "1.6",
            color: "var(--text-muted)",
            zIndex: 100,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          <strong
            style={{
              color: "var(--accent)",
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              marginBottom: "4px",
              letterSpacing: "0.05em",
            }}
          >
            {children}
          </strong>
          {def}
        </span>
      )}
    </span>
  );
}
