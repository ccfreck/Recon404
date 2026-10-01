import Parser from "rss-parser";
import { FEEDS, type Category, type Priority } from "./feeds";

export interface Article {
  id: string;
  title: string;
  link: string;
  source: string;
  category: Category;
  priority: Priority;
  publishedAt: string; // ISO
  excerpt: string;
}

export interface AggregateResult {
  articles: Article[];
  healthy: number;
  total: number;
  failed: string[];
  fetchedAt: string;
}

const TTL_MS = 5 * 60 * 1000;
let cache: { data: AggregateResult; expires: number } | null = null;
let inflight: Promise<AggregateResult> | null = null;

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "Recon404/0.1 (+threat-intel-aggregator)" },
});

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchAll(): Promise<AggregateResult> {
  const results = await Promise.allSettled(
    FEEDS.map(async (src) => {
      const feed = await parser.parseURL(src.url);
      return feed.items.slice(0, 40).map((item): Article => {
        const raw = item.contentSnippet ?? item.content ?? item.summary ?? "";
        return {
          id: item.guid ?? item.link ?? `${src.name}-${item.title}`,
          title: (item.title ?? "(untitled)").trim(),
          link: item.link ?? src.url,
          source: src.name,
          category: src.category,
          priority: src.priority,
          publishedAt: item.isoDate ?? new Date().toISOString(),
          excerpt: stripHtml(raw).slice(0, 240),
        };
      });
    }),
  );

  const articles: Article[] = [];
  const failed: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") articles.push(...r.value);
    else failed.push(FEEDS[i].name);
  });

  const seen = new Set<string>();
  const deduped = articles.filter((a) => {
    const k = a.link || a.id;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  deduped.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return {
    articles: deduped,
    healthy: FEEDS.length - failed.length,
    total: FEEDS.length,
    failed,
    fetchedAt: new Date().toISOString(),
  };
}

export async function getArticles(): Promise<AggregateResult> {
  const now = Date.now();
  if (cache && cache.expires > now) return cache.data;
  if (inflight) return inflight;
  inflight = fetchAll()
    .then((data) => {
      cache = { data, expires: Date.now() + TTL_MS };
      return data;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
