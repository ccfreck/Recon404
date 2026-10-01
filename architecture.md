# Architecture

```mermaid
flowchart TD
    subgraph Sources["External Sources"]
        RSS["41 RSS Feeds<br/>(advisories, analysis, news, research)"]
    end

    subgraph Server["Next.js Server (Node)"]
        AGG["aggregator.ts<br/>fetchAll()<br/>- fetch each feed concurrently<br/>- normalize articles<br/>- dedupe + sort newest first"]
        CACHE[("In-memory cache<br/>TTL = 5 minutes")]
        PAGE["page.tsx<br/>Server Component"]
        FEEDS_CFG["feeds.ts<br/>source config<br/>(name, url, category, priority)"]
    end

    subgraph Browser["Browser"]
        UI["Feed.tsx<br/>Client Component<br/>- search (grep)<br/>- category filter<br/>- priority filter"]
    end

    RSS -->|"rss-parser, 15s timeout,<br/>one failure never breaks all"| AGG
    FEEDS_CFG -.->|"feed list"| AGG
    AGG --> CACHE
    CACHE -->|"cached if fresh,<br/>otherwise refetch"| PAGE
    PAGE -->|"HTML render"| UI
    UI -->|"user clicks article link"| PUB["Publisher site"]
```

## How a request flows

1. User opens the app → `page.tsx` calls `getArticles()`.
2. If the in-memory cache is younger than 5 minutes, the cached result is used — no network calls.
3. Otherwise, `aggregator.ts` fetches all 41 feeds concurrently (`Promise.allSettled`), so one dead feed never breaks the page.
4. Each item is normalized into an `Article` (title, link, source, category, priority, date, excerpt), HTML is stripped from excerpts, duplicates are removed, and everything is sorted newest-first.
5. The result is cached for 5 minutes and rendered as a server component.
6. The browser component (`Feed.tsx`) handles search and filtering entirely client-side — no extra requests.

## Failure handling

- A failing feed is logged in the result's `failed` list and the footer shows it as `stale` — the page still renders with the other 40.
- In-flight dedupe: if two requests arrive while a fetch is running, they share the same promise instead of triggering two fetch storms.
