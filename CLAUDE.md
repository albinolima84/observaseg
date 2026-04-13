# CLAUDE.md — Observaseg

Guia para Claude Code trabalhar neste projeto.

## Visão geral

Dashboard Next.js para visualização do Anuário Brasileiro de Segurança Pública (Fórum Brasileiro de Segurança Pública). Dados estáticos: Python extrai Excel → JSON → importado em build time pelo Next.js. Sem banco de dados, sem API em runtime.

## Stack

- Next.js 14 App Router + React 18 + TypeScript (strict)
- Tailwind CSS v4 + PostCSS
- Recharts 3 para gráficos
- Python 3 + Pandas + OpenPyXL para extração de dados

## Arquitetura de dados

**Fluxo:** Excel (Anuário) → `scripts/extract_data.py` → `data/{ANO}/*.json` → `src/lib/data.ts` → páginas

- JSONs ficam em `data/2025/` (13 arquivos)
- `src/lib/data.ts` os importa via `require()` — resolvido em build time
- `src/types/index.ts` define as interfaces TypeScript que espelham os JSONs exatamente
- Nunca usar `fetch()` para carregar dados locais — é tudo estático

## Sistema de design

**Tokens CSS** definidos em `src/app/globals.css`:

```css
--bg: #0f0f0f          /* fundo principal */
--surface: #1a1a1a     /* superfícies de card */
--surface-2: #222222   /* superfície secundária */
--border: #2a2a2a      /* bordas */
--text: #e8e8e8        /* texto primário */
--text-muted: #888888  /* texto secundário */
--accent: #e63946      /* vermelho — violência/alerta */
--accent-green: #2a9d8f /* verde — redução/positivo */
--accent-amber: #e9c46a /* âmbar — neutro */
```

**Semântica de cor:**
- Vermelho (`--accent`): aumento de violência, situações preocupantes
- Verde (`--accent-green`): redução de violência, tendências positivas
- Âmbar (`--accent-amber`): dados neutros, informativos

**Tipografia:**
- Display/títulos: Playfair Display (serif)
- Corpo: IBM Plex Sans
- Dados/mono: IBM Plex Mono

## Componentes

| Componente | Uso |
|------------|-----|
| `StatCard` | Métricas principais com indicador de variação |
| `InsightCard` | Análise editorial com dado, fonte e contexto |
| `FonteTag` | Atribuição de fonte (tabela do Anuário) |
| `LineChart` | Wrapper Recharts para séries temporais |
| `BarChart` | Wrapper Recharts para comparações |
| `Header` | Navegação sticky com links para temas |
| `Footer` | Rodapé minimal |

Componentes de gráfico específicos de cada página ficam junto à página (ex: `MviHistoricoChart.tsx` em `/temas/violencia-letal/`), não em `components/charts/`.

## Adicionando um novo tema

1. Criar pasta `src/app/temas/{slug}/`
2. Criar `page.tsx` com Server Component que carrega dados via `src/lib/data.ts`
3. Criar componentes de gráfico específicos na mesma pasta
4. Adicionar link no `Header` e na grade da home

## Regras críticas de dados

**Dado `autoria_sexo` (Gráfico 48):** SEMPRE exibir aviso obrigatório de contexto ao apresentar dados de autoria por sexo. Este dado é frequentemente mal interpretado. O aviso deve explicar que a maioria dos crimes tem autoria desconhecida e que o gráfico representa apenas casos com autoria identificada.

**Atribuição de fonte:** Todo dado exibido ao usuário deve ter a tabela de origem do Anuário citada via `FonteTag`. Não omitir fontes.

**Variações percentuais:** Usar `formatters.ts` para exibição consistente. Vermelho para aumento, verde para redução — exceto em contextos onde aumento é positivo (ex: investimento em segurança).

## Convenções de código

- Componentes de página são Server Components por padrão (sem `"use client"`)
- `"use client"` apenas em componentes de gráfico interativo (Recharts precisa do DOM)
- Path alias `@/*` aponta para `src/`
- Formatação de números: sempre usar `src/lib/formatters.ts`, nunca formatar manualmente
- Interfaces TypeScript: definir em `src/types/index.ts`, nunca tipos inline em componentes

## Comandos úteis

```bash
npm run dev          # desenvolvimento (http://localhost:3000)
npm run build        # build de produção
npm run lint         # ESLint

# Extração de dados (requer Python + deps em scripts/requirements.txt)
python scripts/extract_data.py --year 2025
```

## Estrutura de arquivos chave

```
src/
  app/
    layout.tsx           # Root layout (fontes, metadados globais)
    page.tsx             # Home page
    globals.css          # Design tokens + estilos globais
    temas/               # Páginas temáticas
  components/
    ui/                  # Componentes de UI reutilizáveis
    layout/              # Header, Footer
    charts/              # Wrappers genéricos de gráfico
  lib/
    data.ts              # Loaders de JSON
    formatters.ts        # Formatadores de número/moeda
  types/
    index.ts             # Todas as interfaces TypeScript
data/
  2025/                  # JSONs do 19º Anuário (2025)
scripts/
  extract_data.py        # Pipeline Python de extração
```
