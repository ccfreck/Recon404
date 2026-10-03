# Next Steps: AI Article Summaries

## Goal
Replace the truncated article excerpt under each source with a short AI-generated summary.

## Decisions
- Summarize only the **top 100** articles per refresh
- Persist summaries keyed by **article link** so only *new* articles get summarized each refresh
- Summarization happens in the background — the page never blocks on it

## Open question: which model?
"The current model" in OpenCode is not callable from the Next.js app. The app needs its own LLM access:
- [ ] API key in `.env.local` (e.g. `OPENAI_API_KEY`, Anthropic, Gemini — use a cheap/fast model)
- [ ] Local model via Ollama (`http://localhost:11434`) — free, slower

## Implementation plan
1. **`src/lib/summarizer.ts`** — call the chosen LLM with the article excerpt; prompt for a ~2-sentence analyst summary
2. **`src/lib/summary-cache.ts`** — JSON store at `.cache/summaries.json`, keyed by article link, persisted across refreshes
3. **In `fetchAll()`**: after sorting, take the top 100; summarize only those missing from the summary cache; bounded concurrency (~5); failures fall back to the truncated excerpt
4. **UI**: article `excerpt` becomes the AI summary; missing/failed summaries keep the old truncated text
5. Run during the background refresh so summaries never block first paint
