import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <div className="mb-12 flex items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="section-label mb-3">Experience</p>
          <h2 className="display text-4xl text-foreground sm:text-5xl">Selected work</h2>
        </div>
      </div>

      <ol className="divide-y divide-line">
        {experience.map((job) => (
          <li key={job.company} className="grid gap-6 py-10 lg:grid-cols-[0.42fr_1fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                {job.dates}
              </p>
              <h3 className="mt-2 text-xl text-foreground">{job.role}</h3>
              <p className="mt-1 text-copper">{job.company}</p>
              <p className="mt-1 text-sm text-muted">{job.location}</p>
            </div>
            <ul className="space-y-3 text-[15px] leading-relaxed text-muted">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="pl-4 relative before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-acid">
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
