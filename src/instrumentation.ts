export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warmup } = await import("@/lib/aggregator");
    warmup();
  }
}
