import React from "react";
import { FonteTag } from "./FonteTag";

interface InsightCardProps {
  titulo: React.ReactNode;
  dado: React.ReactNode;
  contexto: React.ReactNode;
  fonte: string;
  tabela?: string;
  anoReferencia: number;
  href?: string;
  /** Card maior na home */
  destaque?: boolean;
}

export function InsightCard({
  titulo,
  dado,
  contexto,
  fonte,
  tabela,
  anoReferencia,
  href,
  destaque = false,
}: InsightCardProps) {
  return (
    <div
      className={`rounded-lg p-6 flex flex-col gap-3 ${destaque ? "md:col-span-2" : ""}`}
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Ano de referência */}
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        Dados {anoReferencia}
      </span>

      {/* Título */}
      <h3
        className={`font-semibold leading-snug ${destaque ? "text-xl" : "text-base"}`}
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        {titulo}
      </h3>

      {/* Dado em destaque */}
      <p
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
      >
        {dado}
      </p>

      {/* Contexto analítico — obrigatório */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {contexto}
      </p>

      {/* Link para aprofundamento */}
      {href && (
        <a
          href={href}
          className="text-sm font-medium self-start mt-1 transition-opacity hover:opacity-70"
          style={{ color: "var(--text)" }}
        >
          Ver análise completa →
        </a>
      )}

      <FonteTag fonte={fonte} tabela={tabela} />
    </div>
  );
}
