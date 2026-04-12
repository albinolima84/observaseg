import Link from "next/link";

const TEMAS = [
  { href: "/temas/violencia-letal", label: "Violência Letal" },
  { href: "/temas/feminicidio", label: "Feminicídio" },
  { href: "/temas/letalidade-policial", label: "Letalidade Policial" },
  { href: "/temas/violencia-sexual", label: "Violência Sexual" },
  { href: "/temas/sistema-prisional", label: "Sistema Prisional" },
  { href: "/temas/gastos-publicos", label: "Gastos Públicos" },
];

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        {/* Logo / nome */}
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight shrink-0"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Anuário Seg. Pública
        </Link>

        {/* Navegação — oculta em mobile, scroll horizontal em tablet */}
        <nav className="hidden md:flex items-center gap-5 overflow-x-auto">
          {TEMAS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-xs whitespace-nowrap transition-colors hover:opacity-80"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        {/* Badge do anuário */}
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
    </header>
  );
}
