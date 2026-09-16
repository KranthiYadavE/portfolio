import { metrics } from "@/lib/data";

export function Metrics() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={`px-5 py-8 sm:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } lg:border-l lg:first:border-l-0`}
          >
            <p className="display text-4xl text-foreground sm:text-5xl">{metric.value}</p>
            <p className="mt-2 text-sm text-foreground">{metric.label}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
