import { projects } from "@/lib/data";
import { ArrowUpRight } from "./Icons";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-12 border-b border-line pb-6">
        <p className="section-label mb-3">Projects</p>
        <h2 className="display text-4xl text-foreground sm:text-5xl">Things I built</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {featured.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-acid/40 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-acid">
                {project.tag}
              </p>
              <ArrowUpRight className="mt-0.5 text-muted transition-colors group-hover:text-acid" />
            </div>
            <h3 className="display mt-4 text-3xl text-foreground">{project.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>
            {project.points && (
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-copper" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint"
                >
                  {item}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {rest.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-acid/40"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-acid">
                {project.tag}
              </p>
              <ArrowUpRight className="text-muted group-hover:text-acid" />
            </div>
            <h3 className="mt-3 text-lg text-foreground">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint"
                >
                  {item}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
