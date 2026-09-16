import { profile } from "@/lib/data";
import { ArrowUpRight } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="glow-orb -top-24 -left-24" />
      <div className="glow-orb right-[-180px] top-32 opacity-60" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="section-label mb-6">
            {profile.title} · {profile.location}
          </p>
          <h1 className="display text-[3.1rem] leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[5.4rem]">
            Kranthi
            <br />
            <span className="italic text-acid">Kumar</span>
            <br />
            Elupula
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {profile.headline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Email me
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30"
            >
              GitHub <ArrowUpRight />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30"
            >
              LinkedIn <ArrowUpRight />
            </a>
          </div>
        </div>

        <aside className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="overflow-hidden rounded-[1.5rem] border border-line bg-panel shadow-[0_0_80px_rgba(200,245,66,0.06)]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] tracking-wide text-faint">
                runtime.sh
              </span>
            </div>
            <div className="space-y-4 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
              <p>
                <span className="text-acid">$</span>{" "}
                <span className="text-muted">whoami</span>
                <br />
                <span className="text-foreground">kranthi kumar elupula</span>
              </p>
              <p>
                <span className="text-acid">$</span>{" "}
                <span className="text-muted">cat current_role.txt</span>
                <br />
                <span className="text-foreground">generative ai engineer @ cloud nest it</span>
              </p>
              <p>
                <span className="text-acid">$</span>{" "}
                <span className="text-muted">ls specialized/</span>
                <br />
                <span className="text-copper">inference/</span>{" "}
                <span className="text-copper">rag/</span>{" "}
                <span className="text-copper">agents/</span>
                <br />
                <span className="text-copper">gpu-kernels/</span>{" "}
                <span className="text-copper">k8s/</span>
              </p>
              <p>
                <span className="text-acid">$</span>{" "}
                <span className="text-muted">status --hiring</span>
                <br />
                <span className="text-acid">open · swe / ml engineer</span>
              </p>
              <p className="text-faint">
                <span className="text-acid">▌</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
