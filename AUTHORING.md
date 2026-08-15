# Authoring rules for HerbVerdict content

Articles in `/content/**/*.mdx` are rendered by a small purpose-built converter in
`lib/content.js`, not by a full MDX toolchain. It supports a deliberately small
set of markdown. Anything outside that set must be written as raw HTML.

## Single source of truth

**Verdict and study counts live in article frontmatter and nowhere else.**
`lib/herbs.js` holds presentation metadata only (icon, tagline). The homepage and
`/herbs` both read verdicts through `getHerbsIndex()`. Never hardcode a verdict,
a study count, or a section count in a page component — they will drift.

## Supported markdown

| Syntax | Renders as |
| --- | --- |
| `## Heading` | `<h2>` |
| `### Heading` | `<h3>` |
| `#### Heading` | `<h4>` |
| `- item` or `* item` | `<ul><li>` |
| `1. item` | `<ol><li>` |
| `> quoted line` | `<blockquote>` |
| `**bold**` | `<strong>` |
| `*italic*` | `<em>` |
| `` `code` `` | `<code>` |
| `[label](/href)` | `<a href="/href">` |
| blank-line-separated text | `<p>` |

A lead-in line immediately followed by list items is handled correctly, e.g.

```
Across the trials I reviewed:
- 250 to 500 mg/day was the most common dose
- Older trials used higher doses
```

## Not supported — write raw HTML instead

- Tables (use `<table>`)
- Nested or indented sub-lists
- Images (use `<img>` with explicit `width`, `height`, and `alt`)
- Footnotes, definition lists, setext headings, horizontal rules
- `#` H1 via markdown — the H1 is written as raw HTML inside the hero block

## Required frontmatter

Every article:

```yaml
title:            # editorial headline, may be long
seoTitle:         # <= 63 chars, used for <title>
metaDescription:  # <= 155 chars, used for meta description
description:      # longer summary, used for schema and cards
author: "Ash"
authorRole: "Research Editor"
publishDate: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
category:         # shown as the card label
ogImage: "/og/<slug>.png"
```

Herb scorecards additionally require:

```yaml
verdict:                 # PROVEN | PROMISING | LIMITED
totalStudiesReviewed:    # integer, must match the trials actually cited
herbCommonName:
herbBotanicalName:
```

## Structured data

- The schema `headline` is extracted from the **visible H1** at build time.
  Do not set headline anywhere else; changing the H1 changes the schema.
- FAQ JSON-LD must list the same questions and answers as the visible FAQ.
  If you edit one, edit the other in the same commit.
- `schemaType` in frontmatter overrides the per-section default only when there
  is a real reason. Defaults: herbs `MedicalWebPage`, research `NewsArticle`,
  everything else `Article`.

## OG images

Every article needs `/public/og/<slug>.png` at 1200x630. Regenerate with
`scripts/generate-og.py` after adding or retitling an article. If the file is
missing, the site falls back to `/og/default.png` rather than shipping a
broken card.

## Editorial constraints

These are non-negotiable and apply to taglines and card copy as well as body text:

1. Report, never prescribe. No dosing instruction in HerbVerdict's own voice —
   describe what trials used.
2. Always state limitations. Sample size, duration, funding, and what was not
   measured.
3. Disclaimer on every article page.

Comparative treatment claims ("comparable to NSAIDs", "fewer side effects") must
not appear in listing taglines or card copy where the citation cannot travel with
the claim.
