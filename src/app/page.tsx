import { getArticles } from "@/lib/aggregator";
import Feed from "@/components/Feed";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getArticles();
  const refreshedMin = Math.max(
    0,
    Math.floor((Date.now() - new Date(data.fetchedAt).getTime()) / 60000),
  );

  return (
    <div className="flex flex-1 justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-lg border border-zinc-800 bg-[#0c0c0e] shadow-2xl">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 text-center text-xs text-zinc-600">
            recon404 — ~/threat-intel — zsh
          </span>
        </div>

        <div className="p-6 font-mono text-sm">
          <pre className="mb-4 text-[10px] leading-tight text-emerald-500 sm:text-sm lg:text-base">{`
██████╗ ███████╗ ██████╗ ██████╗ ███╗   ██╗██╗  ██╗ ██████╗ ██╗  ██╗
██╔══██╗██╔════╝██╔════╝██╔═══██╗████╗  ██║██║  ██║██╔═████╗██║  ██║
██████╔╝█████╗  ██║     ██║   ██║██╔██╗ ██║███████║██║██╔██║███████║
██╔══██╗██╔══╝  ██║     ██║   ██║██║╚██╗██║╚════██║████╔╝██║╚════██║
██║  ██║███████╗╚██████╗╚██████╔╝██║ ╚████║     ██║╚██████╔╝     ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═╝  ╚═════╝      ╚═╝
`}</pre>
          <p className="mb-6 text-zinc-600">
            <span className="text-emerald-400">$</span> recon404 --aggregate
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-zinc-400" />
          </p>

          <Feed articles={data.articles} />

          <footer className="mt-8 border-t border-zinc-900 pt-3 text-xs text-zinc-700">
            {data.healthy}/{data.total} sources healthy // {data.articles.length} articles //
            refreshed {refreshedMin === 0 ? "just now" : `${refreshedMin}m ago`}
            {data.failed.length > 0 && (
              <span className="text-red-900"> // stale: {data.failed.join(", ")}</span>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
