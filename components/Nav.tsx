"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "./Icons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open
          ? "border-b border-line bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-[13px] tracking-wide text-foreground">
          KE<span className="text-acid">/</span>26
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:kranthiyadav1997@gmail.com"
            className="rounded-full bg-acid px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-acid-ink transition-opacity hover:opacity-85"
          >
            Hire me
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.18em] text-muted"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:kranthiyadav1997@gmail.com"
              className="w-fit rounded-full bg-acid px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-acid-ink"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
