"use client";

import type { AutoriaSexo } from "@/types";
import { FonteTag } from "@/components/ui/FonteTag";

const LABELS: Record<string, string> = {
  vitimas_mulheres_feminicidio: "Vítimas mulheres\n(feminicídio)",
  vitimas_mulheres_mvi: "Vítimas mulheres\n(MVI geral)",
  vitimas_homens_mvi: "Vítimas homens\n(MVI geral)",
};

function StackBar({
  feminino,
  masculino,
  multipla,
}: {
  feminino: number;
  masculino: number;
  multipla: number;
}) {
  return (
    <div className="flex rounded overflow-hidden h-8" style={{ fontSize: 11 }}>
      <div
        title={`Autoria feminina: ${feminino}%`}
        style={{
          width: `${feminino}%`,
          backgroundColor: "#a78bfa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {feminino >= 3 ? `${feminino}%` : ""}
      </div>
      <div
        title={`Autoria masculina: ${masculino}%`}
        style={{
          width: `${masculino}%`,
          backgroundColor: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
        }}
      >
        {masculino}%
      </div>
      <div
        title={`Autoria múltipla / não identificada: ${multipla}%`}
        style={{
          width: `${multipla}%`,
          backgroundColor: "var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
        }}
      >
        {multipla >= 3 ? `${multipla}%` : ""}
      </div>
    </div>
  );
}

export function Grafico48({ autoria }: { autoria: AutoriaSexo }) {
  return (
    <figure aria-label="Gráfico 48 — autoria de crimes por sexo do autor">
    <div
      className="rounded-lg p-6"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Cabeçalho com alerta de contexto */}
      <div className="flex items-start gap-3 mb-6">
        <span
          className="text-xs px-2 py-1 rounded shrink-0"
          style={{
            backgroundColor: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--accent-amber)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Gráfico {autoria.grafico}
        </span>
        <div>
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Participação na autoria de MVI por sexo da vítima — {autoria.ano_referencia}
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Apenas casos com autoria conhecida registrada pelas polícias
          </p>
        </div>
      </div>

      {/* Gráfico de barras empilhadas */}
      <div className="flex flex-col gap-5 mb-6">
        {autoria.dados.map((d) => (
          <div key={d.categoria}>
            <p
              className="text-xs mb-2"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {LABELS[d.categoria] ?? d.label}
            </p>
            <StackBar
              feminino={d.apenas_autoras_femininas ?? 0}
              masculino={d.apenas_autores_masculinos ?? 0}
              multipla={d.autoria_multipla ?? 0}
            />
            <div className="flex gap-4 mt-1 text-xs" style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "#a78bfa" }}>■ F: {d.apenas_autoras_femininas}%</span>
              <span style={{ color: "var(--accent)" }}>■ M: {d.apenas_autores_masculinos}%</span>
              <span style={{ color: "var(--text-dim)" }}>■ Múlt.: {d.autoria_multipla}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legenda de cores */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
        <span style={{ color: "#a78bfa" }}>■ Apenas autoras femininas</span>
        <span style={{ color: "var(--accent)" }}>■ Apenas autores masculinos</span>
        <span style={{ color: "var(--text-dim)" }}>■ Autoria múltipla / não identificada</span>
      </div>

      {/* Contexto analítico obrigatório */}
      <div
        className="rounded p-4"
        style={{
          backgroundColor: "var(--surface-2)",
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--accent-amber)",
        }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--accent-amber)", fontFamily: "var(--font-mono)" }}
        >
          Como ler este dado
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {autoria.contexto}
        </p>
      </div>

      <FonteTag
        fonte="Fórum Brasileiro de Segurança Pública"
        tabela={`Gráfico ${autoria.grafico} · ${autoria.tabela_origem}`}
      />
    </div>
      <figcaption className="sr-only">Gráfico 48 — autoria de crimes por sexo do autor</figcaption>
    </figure>
  );
}
