"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const TEMAS = [
  {
    href: "/temas/violencia-letal",
    label: "Violência Letal",
    desc: "MVI histórico e ranking por estado",
  },
  {
    href: "/temas/feminicidio",
    label: "Feminicídio",
    desc: "Série histórica e Gráfico 48",
  },
  {
    href: "/temas/letalidade-policial",
    label: "Letalidade Policial",
    desc: "Mortes por intervenção policial",
  },
  {
    href: "/temas/violencia-sexual",
    label: "Violência Sexual",
    desc: "Estupro e estupro de vulnerável",
  },
  {
    href: "/temas/sistema-prisional",
    label: "Sistema Prisional",
    desc: "Evolução da população carcerária",
  },
  {
    href: "/temas/gastos-publicos",
    label: "Gastos Públicos",
    desc: "Investimento em segurança por UF",
  },
  {
    href: "/temas/suicidios",
    label: "Suicídios",
    desc: "16.446 mortes — a violência invisível",
  },
  {
    href: "/temas/desaparecimentos",
    label: "Desaparecimentos",
    desc: "81.873 registros em 2024",
  },
  {
    href: "/temas/violencia-patrimonial",
    label: "Violência Patrimonial",
    desc: "Roubos de veículos e celulares",
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Fecha ao pressionar Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="sticky top-0 z-40">
      {/* ── Barra principal ── */}
      <header
        className="border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-semibold text-sm tracking-tight shrink-0"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Anuário Seg. Pública
          </Link>

          <div className="flex items-center gap-3">
            {/* Botão Temas */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-temas"
              aria-label="Abrir menu de temas"
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                color: open ? "var(--text)" : "var(--text-muted)",
                backgroundColor: open ? "var(--surface)" : "transparent",
                border: "1px solid",
                borderColor: open ? "var(--border)" : "transparent",
                cursor: "pointer",
              }}
            >
              Temas
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  transition: "transform 0.15s",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Badge */}
            <span
              className="text-xs shrink-0 px-2 py-1 rounded"
              style={{
                color: "var(--accent)",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
              }}
            >
              19º / 2025
            </span>
          </div>
        </div>
      </header>

      {/* ── Painel dropdown ── */}
      {open && (
        <div
          className="border-b"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <nav id="nav-temas" aria-label="Temas do anuário">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
              {TEMAS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 px-3 py-3 rounded-md transition-colors"
                  style={{ textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}
                  >
                    {t.label}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
                  >
                    {t.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          </nav>
        </div>
      )}
    </div>
  );
}
