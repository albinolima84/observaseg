# Scripts de extração de dados

## Pré-requisitos

```bash
pip install -r requirements.txt
```

## Adicionando um novo anuário

1. **Baixe o Excel** do Fórum Brasileiro de Segurança Pública:
   ```
   https://forumseguranca.org.br/wp-content/uploads/{ANO}/09/anuario-{ANO}.xlsx
   ```

2. **Salve** em `scripts/raw/{ANO}/anuario-{ANO}.xlsx`  
   _(este diretório está no .gitignore — não versione o Excel)_

3. **Rode o script**:
   ```bash
   python scripts/extract_data.py --year {ANO}
   ```

4. Os JSONs serão gerados em `data/{ANO}/`.

5. **Verifique** os JSONs antes de commitar:
   - Todos os 13 arquivos criados?
   - `mvi_historico.json` tem 28 entradas (Brasil + 27 UFs)?
   - `prisional.json` tem dados desde 2000?

6. **Commite apenas os JSONs** (não o Excel):
   ```bash
   git add data/{ANO}/
   git commit -m "feat: add data for anuário {ANO}"
   ```

## Problemas comuns

### "Aba X não encontrada"
O Fórum pode renomear abas entre edições. Abra o Excel e localize a aba
com o conteúdo esperado. Ajuste o nome no script e documente a mudança.

### Valores inesperadamente None
Verifique se a estrutura da aba mudou (colunas adicionadas/removidas,
cabeçalho em linha diferente). Use `print(rows[:10])` dentro da função
de extração para inspecionar as primeiras linhas.

### Excel lento para carregar
O arquivo é grande (~15MB). Normal demorar 30–60s. Não use `read_only=True`
pois isso impede a leitura de células mescladas corretamente.

## Estrutura dos JSONs gerados

| Arquivo               | Aba    | Conteúdo                                  |
|-----------------------|--------|-------------------------------------------|
| `meta.json`           | —      | Metadados do anuário                      |
| `mvi_historico.json`  | T02    | MVI série histórica 2012–N por UF         |
| `mvi_estados.json`    | T01    | MVI comparativo 2023–2024 por UF          |
| `feminicidio.json`    | T24    | Feminicídio + homicídios mulheres         |
| `feminicidio_hist.json`| Q07   | Proporção feminicídio 2015–N por UF       |
| `letalidade.json`     | T09+T10| Mortes por intervenção policial           |
| `estupro.json`        | T34    | Estupro e estupro de vulnerável           |
| `prisional.json`      | T127   | Evolução população prisional 2000–N       |
| `desaparecimentos.json`| T11   | Desaparecidos 2023–2024                   |
| `patrimonio.json`     | T12+T13| Roubos e furtos (veículos e celulares)    |
| `gastos.json`         | T96    | Gastos com segurança pública              |
| `suicidios.json`      | T22    | Suicídios por UF                          |
| `autoria_sexo.json`   | P07    | Gráfico 48 — autoria por sexo da vítima   |
