import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
          © {new Date().getFullYear()} {profile.shortName} Kumar Elupula
        </p>
        <p className="text-faint">{profile.location} · Hosted on GitHub Pages.</p>
      </div>
    </footer>
  );
}
