import { profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.4fr_1fr]">
      <p className="section-label">About</p>
      <div className="max-w-2xl">
        <h2 className="display text-4xl leading-tight text-foreground sm:text-5xl">
          Agents, retrieval, and the path from a notebook to production.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">{profile.summary}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          I like work where routing, latency, and data contracts actually matter: LangGraph
          gates, pgvector + BM25, LoRA routers, and the observability that tells you why an
          agent failed.
        </p>
      </div>
    </section>
  );
}
