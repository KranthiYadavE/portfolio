import { certifications, education, skills } from "@/lib/data";
import { ArrowUpRight } from "./Icons";

export function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <div className="mb-12 border-b border-line pb-6">
        <p className="section-label mb-3">Stack</p>
        <h2 className="display text-4xl text-foreground sm:text-5xl">Tools I reach for</h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div key={group.group}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-copper">
              {group.group}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {group.items.map((item) => (
                <li key={item} className="text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-2">
        <div>
          <p className="section-label mb-6">Education</p>
          <ul className="space-y-6">
            {education.map((item) => (
              <li key={item.school}>
                <p className="text-lg text-foreground">{item.credential}</p>
                <p className="text-muted">{item.school}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {item.dates}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-label mb-6">Certifications</p>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-2 text-foreground hover:text-acid"
                >
                  <span>{cert.name}</span>
                  <ArrowUpRight className="mt-1 shrink-0 text-muted group-hover:text-acid" />
                </a>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {cert.issuer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
