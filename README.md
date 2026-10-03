# Recon404

A threat intelligence aggregator with a Ghostty-style terminal UI. It pulls the latest articles from 41 security RSS feeds across four categories — advisories, analysis, news, and research — and presents them as a single, searchable, filterable feed styled like a terminal window.

## Features

- Unified reverse-chronological feed across all 41 sources
- Filter by category, priority (`CRITICAL` / `HIGH` / `MEDIUM`), and search
- Excerpts beneath each article, per-source health footer
- Disk-persisted article cache — instant first paint, refreshed every 5 minutes

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start   # production
```

## How it works

See [architecture.md](architecture.md). Planned AI summaries are tracked in [next_steps.md](next_steps.md).
