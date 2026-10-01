"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/lib/aggregator";
import type { Category, Priority } from "@/lib/feeds";

const CATEGORIES: (Category | "all")[] = ["all", "advisories", "analysis", "news", "research"];
const PRIORITIES: (Priority | "all")[] = ["all", "CRITICAL", "HIGH", "MEDIUM"];

const priorityColor: Record<Priority, string> = {
  CRITICAL: "text-red-400",
  HIGH: "text-yellow-400",
  MEDIUM: "text-cyan-400",
};

function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Feed({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [priority, setPriority] = useState<Priority | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        (category === "all" || a.category === category) &&
        (priority === "all" || a.priority === priority) &&
        (!q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.source.toLowerCase().includes(q)),
    );
  }, [articles, category, priority, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <label className="text-emerald-400">
          $ grep <span className="text-zinc-500">--query</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='"ransomware"'
            className="ml-2 w-64 bg-transparent text-zinc-200 placeholder:text-zinc-700 outline-none border-b border-zinc-800 focus:border-zinc-600"
          />
        </label>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-zinc-600">--category</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={c === category ? "text-emerald-400" : "text-zinc-600 hover:text-zinc-400"}
            >
              {c === category ? `[${c}]` : c}
            </button>
          ))}
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-600">--priority</span>
          {PRIORITIES.map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={p === priority ? "text-emerald-400" : "text-zinc-600 hover:text-zinc-400"}
            >
              {p === priority ? `[${p}]` : p === "all" ? "ALL" : p}
            </button>
          ))}
        </div>
        <p className="text-zinc-700"># {filtered.length} results</p>
      </div>

      <ul className="flex flex-col divide-y divide-zinc-900">
        {filtered.slice(0, 200).map((a) => (
          <li key={a.id} className="py-3">
            <div className="flex items-baseline gap-2 text-sm">
              <span className={priorityColor[a.priority]}>[{a.priority}]</span>
              <span className="text-zinc-600 w-16 shrink-0">{relTime(a.publishedAt)}</span>
              <span className="text-emerald-500 shrink-0">{a.source}</span>
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-100 hover:text-emerald-300 hover:underline truncate"
              >
                {a.title}
              </a>
            </div>
            {a.excerpt && <p className="mt-1 text-xs text-zinc-600 line-clamp-2">{a.excerpt}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
