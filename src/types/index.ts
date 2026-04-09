// ============================================================
// Tipos TypeScript para os JSONs gerados pelo script Python
// Baseados no esquema do Anuário Brasileiro de Segurança Pública
// ============================================================

// ------------------------------------------------------------
// Metadados do anuário
// ------------------------------------------------------------
export interface AnoMeta {
  numero_anuario: number;       // ex: 19
  ano_publicacao: number;       // ex: 2025
  ano_referencia: number;       // ex: 2024 (dados se referem a este ano)
  url_fonte: string;            // URL do PDF/Excel original
  data_extracao: string;        // ISO 8601
}

// ------------------------------------------------------------
// MVI — Mortes Violentas Intencionais
// ------------------------------------------------------------

/** Tabela T02 — MVI por UF, série histórica 2012–2024 */
export interface MviHistoricoItem {
  uf: string;
  regiao: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul" | null;
  absolutos: (number | null)[];  // índice corresponde ao array `anos`
  taxas: (number | null)[];      // taxa por 100k habitantes
}

export interface MviHistorico {
  fonte: string;
  tabela: "T02";
  anos: number[];
  dados: MviHistoricoItem[];
}

/** Tabela T01 — MVI por UF, comparativo 2023–2024 com subcategorias */
export interface MviEstadosItem {
  uf: string;
  regiao: string | null;
  homicidio_doloso_2023: number | null;
  homicidio_doloso_2024: number | null;
  latrocinio_2023: number | null;
  latrocinio_2024: number | null;
  lcfm_2023: number | null;      // Lesão Corporal Seguida de Morte
  lcfm_2024: number | null;
  intervencao_policial_2023: number | null;
  intervencao_policial_2024: number | null;
  mvi_total_2023: number | null;
  mvi_total_2024: number | null;
  taxa_2023: number | null;
  taxa_2024: number | null;
  variacao_pct: number | null;   // variação percentual 2023→2024
}

export interface MviEstados {
  fonte: string;
  tabela: "T01";
  dados: MviEstadosItem[];
}

// ------------------------------------------------------------
// Feminicídio
// ------------------------------------------------------------

/** Tabela T24 — Homicídios de mulheres + feminicídios 2023–2024 por UF */
export interface FeminicidioItem {
  uf: string;
  regiao: string | null;
  homicidios_mulheres_2023: number | null;
  homicidios_mulheres_2024: number | null;
  feminicidios_2023: number | null;
  feminicidios_2024: number | null;
  proporcao_2023: number | null;  // % feminicídios / homicídios de mulheres
  proporcao_2024: number | null;
}

export interface Feminicidio {
  fonte: string;
  tabela: "T24";
  dados: FeminicidioItem[];
}

/** Tabela Q07 — Proporção de feminicídios (%) 2015–2024 por UF */
export interface FeminicidioHistItem {
  uf: string;
  regiao: string | null;
  proporcoes: (number | null)[];  // índice corresponde ao array `anos`
}

export interface FeminicidioHist {
  fonte: string;
  tabela: "Q07";
  anos: number[];
  dados: FeminicidioHistItem[];
}

// ------------------------------------------------------------
// Letalidade Policial
// ------------------------------------------------------------

/** Tabelas T09 + T10 — Mortes por intervenção policial */
export interface LetalidadeItem {
  uf: string;
  regiao: string | null;
  mortes_2023: number | null;
  mortes_2024: number | null;
  proporcao_mvi_2023: number | null;  // % em relação ao total de MVI
  proporcao_mvi_2024: number | null;
  taxa_2023: number | null;           // por 100k habitantes
  taxa_2024: number | null;
}

export interface Letalidade {
  fonte: string;
  tabelas: ["T09", "T10"];
  dados: LetalidadeItem[];
}

// ------------------------------------------------------------
// Violência Sexual
// ------------------------------------------------------------

/** Tabela T34 — Estupro e estupro de vulnerável 2023–2024 por UF */
export interface EstuproItem {
  uf: string;
  regiao: string | null;
  estupro_2023: number | null;
  estupro_2024: number | null;
  estupro_vulneravel_2023: number | null;
  estupro_vulneravel_2024: number | null;
  total_2023: number | null;
  total_2024: number | null;
  taxa_2023: number | null;
  taxa_2024: number | null;
}

export interface Estupro {
  fonte: string;
  tabela: "T34";
  dados: EstuproItem[];
}

// ------------------------------------------------------------
// Sistema Prisional
// ------------------------------------------------------------

/** Tabela T127 — Evolução população prisional Brasil 2000–2024 */
export interface PrisionalItem {
  ano: number;
  total: number;
  condenados: number | null;
  provisorios: number | null;
  taxa_encarceramento: number | null;  // por 100k habitantes
}

export interface Prisional {
  fonte: string;
  tabela: "T127";
  dados: PrisionalItem[];
}

// ------------------------------------------------------------
// Desaparecimentos
// ------------------------------------------------------------

/** Tabela T11 — Desaparecidos 2023–2024 */
export interface DesaparecimentosItem {
  uf: string;
  regiao: string | null;
  desaparecidos_2023: number | null;
  desaparecidos_2024: number | null;
  variacao_pct: number | null;
}

export interface Desaparecimentos {
  fonte: string;
  tabela: "T11";
  dados: DesaparecimentosItem[];
}

// ------------------------------------------------------------
// Patrimônio
// ------------------------------------------------------------

/** Tabelas T12 + T13 — Roubos e furtos de veículos e celulares */
export interface PatrimonioItem {
  uf: string;
  regiao: string | null;
  roubo_veiculo_2023: number | null;
  roubo_veiculo_2024: number | null;
  furto_veiculo_2023: number | null;
  furto_veiculo_2024: number | null;
  roubo_celular_2023: number | null;
  roubo_celular_2024: number | null;
  furto_celular_2023: number | null;
  furto_celular_2024: number | null;
}

export interface Patrimonio {
  fonte: string;
  tabelas: ["T12", "T13"];
  dados: PatrimonioItem[];
}

// ------------------------------------------------------------
// Gastos Públicos
// ------------------------------------------------------------

/** Tabela T96 — Gastos com segurança pública por UF */
export interface GastosItem {
  uf: string;
  regiao: string | null;
  total_2023: number | null;        // R$ mil
  total_2024: number | null;
  variacao_pct: number | null;
  per_capita_2024: number | null;   // R$ por habitante
}

export interface Gastos {
  fonte: string;
  tabela: "T96";
  dados: GastosItem[];
}

// ------------------------------------------------------------
// Suicídios
// ------------------------------------------------------------

/** Tabela T22 — Suicídios por UF */
export interface SuicidiosItem {
  uf: string;
  regiao: string | null;
  total_2023: number | null;
  total_2024: number | null;
  taxa_2023: number | null;
  taxa_2024: number | null;
}

export interface Suicidios {
  fonte: string;
  tabela: "T22";
  dados: SuicidiosItem[];
}

// ------------------------------------------------------------
// Autoria por sexo — Gráfico 48 (dado sensível, sempre exibir com contexto)
// ------------------------------------------------------------

export type CategoriaAutoria =
  | "vitimas_mulheres_feminicidio"
  | "vitimas_mulheres_mvi"
  | "vitimas_homens_mvi";

export interface AutoriaSexoItem {
  categoria: CategoriaAutoria;
  label: string;                       // descrição legível para UI
  apenas_autoras_femininas: number;    // percentual
  apenas_autores_masculinos: number;
  autoria_multipla: number;
}

export interface AutoriaSexo {
  fonte: string;
  grafico: "48";
  tabela_origem: "P07";
  ano_referencia: number;
  /** Texto obrigatório — deve ser renderizado junto ao dado */
  contexto: string;
  dados: AutoriaSexoItem[];
}

// ------------------------------------------------------------
// Helpers de UI — não fazem parte dos JSONs
// ------------------------------------------------------------

export interface StatCardData {
  titulo: string;
  valor: string | number;
  variacao?: number;       // percentual: positivo = aumento, negativo = redução
  ano: number;
  descricao?: string;
  fonte: string;
}

export interface InsightCardData {
  titulo: string;
  dado: string;
  contexto: string;
  fonte: string;
  anoReferencia: number;
  href?: string;
  destaque?: boolean;
}
