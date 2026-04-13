# Observaseg

Visualizações interativas do **Anuário Brasileiro de Segurança Pública**, publicado pelo [Fórum Brasileiro de Segurança Pública](https://forumseguranca.org.br/). O projeto apresenta dados oficiais sobre violência e segurança pública no Brasil com contexto editorial e análise crítica.

## Edição atual

**19º Anuário (2025)** — dados de referência: 2024

| Indicador | Valor |
|-----------|-------|
| MVI Brasil | 44.127 mortes |
| Taxa MVI | 20,76/100 mil hab. |
| Feminicídios | 1.461 |
| Intervenções policiais | 6.243 mortes |
| População carcerária | 909.594 |
| Gastos com segurança pública | R$ 153 bilhões |

## Tecnologias

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript
- **Visualizações:** Recharts 3
- **Estilos:** Tailwind CSS 4
- **Pipeline de dados:** Python 3 + Pandas + OpenPyXL

## Primeiros passos

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

O site roda em `http://localhost:3000`.

## Estrutura do projeto

```
observaseg/
├── data/
│   └── 2025/              # JSONs extraídos do Anuário
├── scripts/
│   ├── extract_data.py    # Script de extração (Excel → JSON)
│   ├── requirements.txt   # Dependências Python
│   └── README.md          # Documentação do pipeline
├── src/
│   ├── app/               # Páginas (Next.js App Router)
│   │   ├── page.tsx       # Home
│   │   └── temas/         # 6 seções temáticas
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/            # StatCard, InsightCard, FonteTag
│   │   ├── layout/        # Header, Footer
│   │   └── charts/        # LineChart, BarChart (wrappers Recharts)
│   ├── lib/
│   │   ├── data.ts        # Loaders de dados (JSON estático)
│   │   └── formatters.ts  # Formatação de números e moeda
│   └── types/
│       └── index.ts       # Interfaces TypeScript para todos os datasets
└── public/
    └── fonts/
```

## Seções temáticas

| Rota | Tema |
|------|------|
| `/temas/violencia-letal` | Violência letal (MVI histórico + ranking por estado) |
| `/temas/feminicidio` | Feminicídio (série histórica + proporção) |
| `/temas/letalidade-policial` | Letalidade policial (mortes em intervenções) |
| `/temas/violencia-sexual` | Violência sexual (estupros por estado) |
| `/temas/sistema-prisional` | Sistema prisional (evolução 2000–2024) |
| `/temas/gastos-publicos` | Gastos públicos em segurança |

## Atualizar os dados (novo Anuário)

1. Baixe o Excel do Anuário em [forumseguranca.org.br](https://forumseguranca.org.br/)
2. Coloque o arquivo em `scripts/raw/{ANO}/anuario-{ANO}.xlsx`
3. Instale as dependências Python:
   ```bash
   pip install -r scripts/requirements.txt
   ```
4. Execute o script de extração:
   ```bash
   python scripts/extract_data.py --year {ANO}
   ```
5. Os JSONs extraídos ficam em `data/{ANO}/`
6. Atualize as referências de ano em `src/lib/data.ts`
7. Faça commit apenas dos JSONs (o Excel é ignorado pelo `.gitignore`)

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Verificação ESLint |

## Licença

Os dados são de domínio público, originados do Fórum Brasileiro de Segurança Pública. O código-fonte deste projeto está sob a licença MIT.
