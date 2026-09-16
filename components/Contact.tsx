"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="rounded-[1.75rem] border border-line bg-panel px-6 py-14 sm:px-12">
        <p className="section-label mb-5">Contact</p>
        <h2 className="display max-w-3xl text-4xl leading-tight text-foreground sm:text-6xl">
          Open to Software Engineer and ML Engineer roles.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted">
          If you are hiring for inference, RAG, or backend ML — send a note. I reply fast.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-acid px-5 py-2.5 text-sm font-medium text-acid-ink transition-opacity hover:opacity-85"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-line px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/30"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
