---
title: "Il primo articolo di esempio"
date: "2024-06-01"
author: "Matteo Raineri"
excerpt: "Un articolo dimostrativo per mostrare come funziona il sito. Puoi sostituire questo file con le tue ricerche."
tags:
  - Esempio
  - Introduzione
bibliography:
  - author: "Umberto Eco"
    title: "Come si fa una tesi di laurea"
    year: "1977"
    publisher: "Bompiani"
  - author: "Roland Barthes"
    title: "Il piacere del testo"
    year: "1973"
    publisher: "Einaudi"
  - author: "Walter Benjamin"
    title: "L'opera d'arte nell'epoca della sua riproducibilità tecnica"
    year: "1936"
    publisher: "Einaudi"
---

## Introduzione

Questo è un articolo dimostrativo. Ogni ricerca o saggio che vuoi pubblicare va messa come file `.md` nella cartella `content/articles/`.

Il nome del file diventa lo **slug** dell'URL. Ad esempio questo file si chiama `esempio-primo-articolo.md` e sarà accessibile all'indirizzo `/articles/esempio-primo-articolo`.

## Come strutturare un articolo

In cima al file c'è il **frontmatter** in formato YAML, delimitato da `---`. Puoi specificare:

- `title` — il titolo dell'articolo
- `date` — la data in formato `YYYY-MM-DD`
- `author` — il tuo nome
- `excerpt` — un breve riassunto mostrato nella lista
- `tags` — etichette tematiche
- `bibliography` — lista delle fonti citate (vedi sotto)

## La sezione bibliografia

Le fonti che inserisci nel frontmatter vengono automaticamente aggregate nella pagina **Bibliografia** del sito, organizzate per autore. Ogni fonte indica anche da quale articolo proviene.

Per ogni fonte puoi specificare:

```yaml
bibliography:
  - author: "Nome Cognome"
    title: "Titolo dell'opera"
    year: "2024"
    publisher: "Casa editrice"
    url: "https://esempio.com"  # opzionale
```

## Scrittura in Markdown

Puoi usare tutto il markdown standard:

- **grassetto** e *corsivo*
- Elenchi puntati e numerati
- `codice inline`
- Intestazioni H2, H3, H4

> Le citazioni in blocco vengono evidenziate con una linea laterale dorata.

Buona scrittura.
