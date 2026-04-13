/**
 * Glossário de siglas e termos técnicos usados no portal.
 * Usado pelo componente <Termo> para exibir tooltips contextuais.
 */

export const GLOSSARIO = {
  MVI: "Mortes Violentas Intencionais — soma de homicídios dolosos, latrocínios, lesões corporais seguidas de morte (LCFM) e mortes por intervenção policial.",
  LCFM: "Lesão Corporal Seguida de Morte — morte que decorre de agressão física sem intenção homicida explícita. Uma das quatro subcategorias das MVI.",
  MDIP: "Mortes Decorrentes de Intervenção Policial — inclui ações de policiais em serviço e fora de serviço.",
  FBSP: "Fórum Brasileiro de Segurança Pública — organização que publica anualmente o Anuário Brasileiro de Segurança Pública.",
  SIM: "Sistema de Informação sobre Mortalidade (Ministério da Saúde) — base de dados usada para registros de causas de morte, incluindo suicídios.",
  IBGE: "Instituto Brasileiro de Geografia e Estatística — responsável pelos dados populacionais usados para cálculo de taxas por 100 mil habitantes.",
  BO: "Boletim de Ocorrência — registro oficial de crime lavrado na delegacia de polícia.",
} as const;

export type SiglaGlossario = keyof typeof GLOSSARIO;
