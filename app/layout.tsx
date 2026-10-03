import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kranthi Kumar Elupula — AI Engineer",
  description:
    "AI Engineer / Software Engineer in Charlotte, NC. Multi-agent systems, RAG, and production backends. Cloud Nest IT, Aviva, Amazon, Cyient. MS CS, Texas A&M–Corpus Christi.",
  openGraph: {
    title: "Kranthi Kumar Elupula — AI Engineer",
    description:
      "Multi-agent systems, RAG pipelines, and production ML backends. Open to AI Engineer and Software Engineer roles.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
