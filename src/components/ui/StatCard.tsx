import React from "react";
import { fmtVariacao, corVariacaoMVI } from "@/lib/formatters";

interface StatCardProps {
  titulo: React.ReactNode;
  valor: string | number;
  variacao?: number;
  descricao?: React.ReactNode;
  fonte: string;
  /** Se true, usa corVariacaoMVI (queda = verde). Padrão: true */
  inverterCor?: boolean;
}

export function StatCard({
  titulo,
  valor,
  variacao,
  descricao,
  fonte,
  inverterCor = true,
}: StatCardProps) {
  return (
    <div
      className="rounded-lg p-5 flex flex-col gap-1"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <p
        className="text-xs uppercase tracking-widest"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
      >
        {titulo}
      </p>

      <p
        className="text-3xl font-bold leading-none mt-1"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}
      >
        {valor}
      </p>

      {variacao != null && (
        <p
          className="text-sm font-medium"
          style={{
            color: inverterCor
              ? corVariacaoMVI(variacao)
              : variacao >= 0
              ? "var(--accent)"
              : "var(--accent-green)",
          }}
        >
          {fmtVariacao(variacao)} vs ano anterior
        </p>
      )}

      {descricao && (
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {descricao}
        </p>
      )}

      <p
        className="text-xs mt-2 pt-2"
        style={{
          color: "var(--text-dim)",
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {fonte}
      </p>
    </div>
  );
}
