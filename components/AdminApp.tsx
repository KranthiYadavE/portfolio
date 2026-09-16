"use client";

import { useEffect, useState } from "react";
import type { Job, Project, SiteContent } from "@/lib/types";
import {
  ADMIN_USER,
  TOKEN_KEY,
  loadSiteFile,
  saveSiteFile,
  verifyAdmin,
} from "@/lib/github";

const TOKEN_URL =
  "https://github.com/settings/tokens/new?scopes=repo&description=Portfolio%20admin";

type Tab = "profile" | "work" | "projects" | "stack";

const inputClass =
  "w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-acid/50";
const labelClass =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint";

function Field({
  label,
  value,
  onChange,
  multiline,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          className={`${inputClass} resize-y`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Lines({
  label,
  hint,
  values,
  onChange,
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        rows={4}
        className={`${inputClass} resize-y`}
        value={values.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
      {hint ? <span className="mt-1 block text-xs text-faint">{hint}</span> : null}
    </label>
  );
}

function emptyJob(): Job {
  return { company: "", role: "", dates: "", location: "", bullets: [""] };
}

function emptyProject(): Project {
  return {
    featured: false,
    title: "",
    tag: "",
    description: "",
    points: [],
    stack: [],
    href: "",
  };
}

export function AdminApp() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [data, setData] = useState<SiteContent | null>(null);
  const [sha, setSha] = useState("");
  const [tab, setTab] = useState<Tab>("projects");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) void unlock(saved);
  }, []);

  async function unlock(value: string) {
    setBusy(true);
    setError("");
    try {
      const login = await verifyAdmin(value);
      const file = await loadSiteFile(value);
      sessionStorage.setItem(TOKEN_KEY, value);
      setToken(value);
      setUser(login);
      setData(file.data);
      setSha(file.sha);
    } catch (err) {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken("");
      setUser(null);
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!data || !token) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const cleaned = sanitize(data);
      const nextSha = await saveSiteFile(token, cleaned, sha);
      setSha(nextSha);
      setData(cleaned);
      setStatus("Saved. The live site will refresh in about 1–2 minutes.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
    setData(null);
    setTokenInput("");
  }

  if (!user || !data) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-16">
        <p className="section-label mb-4">Private</p>
        <h1 className="display text-4xl text-foreground">Admin</h1>
        <p className="mt-4 text-muted">
          Only @{ADMIN_USER} can publish. Sign in with a GitHub personal access
          token that has <span className="text-foreground">repo</span> access.
          The token stays in this browser tab — it is never stored in the site.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void unlock(tokenInput.trim());
          }}
        >
          <Field
            label="GitHub token"
            type="password"
            value={tokenInput}
            onChange={setTokenInput}
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={busy || !tokenInput.trim()}
            className="rounded-full bg-acid px-5 py-2.5 text-sm font-medium text-acid-ink disabled:opacity-50"
          >
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
        <a
          href={TOKEN_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 text-sm text-copper hover:text-acid"
        >
          Create a token on GitHub →
        </a>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "stack", label: "Stack" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="section-label mb-2">Signed in as @{user}</p>
          <h1 className="display text-3xl text-foreground">Edit site</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void save()}
            disabled={busy}
            className="rounded-full bg-acid px-5 py-2 text-sm font-medium text-acid-ink disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save & publish"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-line px-4 py-2 text-sm text-muted"
          >
            Lock
          </button>
        </div>
      </header>

      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}
      {status ? <p className="mb-4 text-sm text-acid">{status}</p> : null}

      <nav className="mb-8 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] ${
              tab === item.id
                ? "bg-foreground text-background"
                : "border border-line text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "profile" ? (
        <div className="space-y-4">
          <Field label="Name" value={data.profile.name} onChange={(name) => setData({ ...data, profile: { ...data.profile, name } })} />
          <Field label="Short name" value={data.profile.shortName} onChange={(shortName) => setData({ ...data, profile: { ...data.profile, shortName } })} />
          <Field label="Title" value={data.profile.title} onChange={(title) => setData({ ...data, profile: { ...data.profile, title } })} />
          <Field label="Location" value={data.profile.location} onChange={(location) => setData({ ...data, profile: { ...data.profile, location } })} />
          <Field label="Email" value={data.profile.email} onChange={(email) => setData({ ...data, profile: { ...data.profile, email } })} />
          <Field label="GitHub" value={data.profile.github} onChange={(github) => setData({ ...data, profile: { ...data.profile, github } })} />
          <Field label="LinkedIn" value={data.profile.linkedin} onChange={(linkedin) => setData({ ...data, profile: { ...data.profile, linkedin } })} />
          <Field label="Headline" multiline value={data.profile.headline} onChange={(headline) => setData({ ...data, profile: { ...data.profile, headline } })} />
          <Field label="About" multiline value={data.profile.summary} onChange={(summary) => setData({ ...data, profile: { ...data.profile, summary } })} />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.metrics.map((metric, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line p-4">
                <Field label="Value" value={metric.value} onChange={(value) => updateAt(data.metrics, i, { ...metric, value }, (metrics) => setData({ ...data, metrics }))} />
                <Field label="Label" value={metric.label} onChange={(label) => updateAt(data.metrics, i, { ...metric, label }, (metrics) => setData({ ...data, metrics }))} />
                <Field label="Detail" value={metric.detail} onChange={(detail) => updateAt(data.metrics, i, { ...metric, detail }, (metrics) => setData({ ...data, metrics }))} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "work" ? (
        <div className="space-y-6">
          {data.experience.map((job, i) => (
            <article key={i} className="space-y-3 rounded-2xl border border-line bg-panel p-5">
              <div className="flex justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-acid">Job {i + 1}</p>
                <button type="button" className="text-xs text-muted hover:text-red-400" onClick={() => setData({ ...data, experience: data.experience.filter((_, j) => j !== i) })}>
                  Remove
                </button>
              </div>
              <Field label="Company" value={job.company} onChange={(company) => updateAt(data.experience, i, { ...job, company }, (experience) => setData({ ...data, experience }))} />
              <Field label="Role" value={job.role} onChange={(role) => updateAt(data.experience, i, { ...job, role }, (experience) => setData({ ...data, experience }))} />
              <Field label="Dates" value={job.dates} onChange={(dates) => updateAt(data.experience, i, { ...job, dates }, (experience) => setData({ ...data, experience }))} />
              <Field label="Location" value={job.location} onChange={(location) => updateAt(data.experience, i, { ...job, location }, (experience) => setData({ ...data, experience }))} />
              <Lines label="Bullets" hint="One bullet per line" values={job.bullets} onChange={(bullets) => updateAt(data.experience, i, { ...job, bullets }, (experience) => setData({ ...data, experience }))} />
            </article>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, experience: [...data.experience, emptyJob()] })}
            className="rounded-full border border-line px-4 py-2 text-sm text-foreground"
          >
            Add job
          </button>
        </div>
      ) : null}

      {tab === "projects" ? (
        <div className="space-y-6">
          {data.projects.map((project, i) => (
            <article key={i} className="space-y-3 rounded-2xl border border-line bg-panel p-5">
              <div className="flex justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) =>
                      updateAt(
                        data.projects,
                        i,
                        { ...project, featured: e.target.checked },
                        (projects) => setData({ ...data, projects }),
                      )
                    }
                  />
                  Featured
                </label>
                <button type="button" className="text-xs text-muted hover:text-red-400" onClick={() => setData({ ...data, projects: data.projects.filter((_, j) => j !== i) })}>
                  Remove
                </button>
              </div>
              <Field label="Title" value={project.title} onChange={(title) => updateAt(data.projects, i, { ...project, title }, (projects) => setData({ ...data, projects }))} />
              <Field label="Tag" value={project.tag} onChange={(tag) => updateAt(data.projects, i, { ...project, tag }, (projects) => setData({ ...data, projects }))} />
              <Field label="Description" multiline value={project.description} onChange={(description) => updateAt(data.projects, i, { ...project, description }, (projects) => setData({ ...data, projects }))} />
              <Lines label="Highlights" hint="One per line" values={project.points ?? []} onChange={(points) => updateAt(data.projects, i, { ...project, points }, (projects) => setData({ ...data, projects }))} />
              <Lines label="Stack" hint="One tool per line" values={project.stack} onChange={(stack) => updateAt(data.projects, i, { ...project, stack }, (projects) => setData({ ...data, projects }))} />
              <Field label="Link" value={project.href} onChange={(href) => updateAt(data.projects, i, { ...project, href }, (projects) => setData({ ...data, projects }))} />
            </article>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, projects: [...data.projects, emptyProject()] })}
            className="rounded-full border border-line px-4 py-2 text-sm text-foreground"
          >
            Add project
          </button>
        </div>
      ) : null}

      {tab === "stack" ? (
        <div className="space-y-8">
          <div className="space-y-4">
            {data.skills.map((group, i) => (
              <div key={i} className="rounded-xl border border-line p-4">
                <div className="mb-3 flex justify-end">
                  <button type="button" className="text-xs text-muted hover:text-red-400" onClick={() => setData({ ...data, skills: data.skills.filter((_, j) => j !== i) })}>
                    Remove group
                  </button>
                </div>
                <Field label="Group" value={group.group} onChange={(name) => updateAt(data.skills, i, { ...group, group: name }, (skills) => setData({ ...data, skills }))} />
                <div className="mt-3">
                  <Lines label="Items" hint="One per line" values={group.items} onChange={(items) => updateAt(data.skills, i, { ...group, items }, (skills) => setData({ ...data, skills }))} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setData({ ...data, skills: [...data.skills, { group: "", items: [] }] })}
              className="rounded-full border border-line px-4 py-2 text-sm"
            >
              Add skill group
            </button>
          </div>
          <div className="space-y-4">
            <p className="section-label">Education</p>
            {data.education.map((item, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line p-4">
                <Field label="School" value={item.school} onChange={(school) => updateAt(data.education, i, { ...item, school }, (education) => setData({ ...data, education }))} />
                <Field label="Credential" value={item.credential} onChange={(credential) => updateAt(data.education, i, { ...item, credential }, (education) => setData({ ...data, education }))} />
                <Field label="Dates" value={item.dates} onChange={(dates) => updateAt(data.education, i, { ...item, dates }, (education) => setData({ ...data, education }))} />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <p className="section-label">Certifications</p>
            {data.certifications.map((item, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line p-4">
                <Field label="Name" value={item.name} onChange={(name) => updateAt(data.certifications, i, { ...item, name }, (certifications) => setData({ ...data, certifications }))} />
                <Field label="Issuer" value={item.issuer} onChange={(issuer) => updateAt(data.certifications, i, { ...item, issuer }, (certifications) => setData({ ...data, certifications }))} />
                <Field label="Link" value={item.href} onChange={(href) => updateAt(data.certifications, i, { ...item, href }, (certifications) => setData({ ...data, certifications }))} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function updateAt<T>(list: T[], index: number, next: T, apply: (list: T[]) => void) {
  apply(list.map((item, i) => (i === index ? next : item)));
}

function sanitize(data: SiteContent): SiteContent {
  return {
    ...data,
    experience: data.experience.map((job) => ({
      ...job,
      bullets: job.bullets.map((b) => b.trim()).filter(Boolean),
    })),
    projects: data.projects.map((project) => ({
      ...project,
      stack: project.stack.map((s) => s.trim()).filter(Boolean),
      points: (project.points ?? []).map((p) => p.trim()).filter(Boolean),
    })),
    skills: data.skills.map((group) => ({
      ...group,
      items: group.items.map((s) => s.trim()).filter(Boolean),
    })),
  };
}
