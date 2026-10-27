"use client";

import { useState } from "react";
import Link from "next/link";
import Mascot from "@/components/ui/Mascot";
import ComicBackground from "@/components/ComicBackground";

export default function ResumeViewer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-ink text-fg">
      <ComicBackground />

      {/* Top navigation header */}
      <header className="sticky top-0 z-40 border-b border-fg/10 bg-ink/80 px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-sm tracking-widest text-fg hover:text-accent transition-colors"
          >
            <span className="text-accent transition-transform duration-300 group-hover:rotate-[25deg] group-hover:scale-110">
              <Mascot size={24} />
            </span>
            <span>ABUSALEM M</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-fg/20 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-accent hover:text-accent transition-colors"
            >
              {copied ? "Copied Link!" : "Share Link"}
            </button>
            <a
              href="/resume.pdf"
              download="Abusalem_M_Backend_Platform_Engineer_Resume.pdf"
              className="rounded-full bg-accent px-4 py-1.5 font-display text-xs uppercase tracking-wider text-on-accent hover:opacity-90 transition-opacity"
            >
              Download PDF
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block rounded-full border border-fg/20 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-accent hover:text-accent transition-colors"
            >
              Direct URL
            </a>
          </div>
        </div>
      </header>

      {/* Main viewer container */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 md:p-6 w-full max-w-6xl mx-auto">
        <div className="w-full mb-3 flex items-center justify-between text-xs text-muted font-mono">
          <span>ABUSALEM M — BACKEND SOFTWARE ENGINEER</span>
          <span className="hidden sm:inline">2 PAGES · PDF</span>
        </div>

        <div className="w-full flex-1 min-h-[78vh] md:min-h-[85vh] rounded-2xl border border-fg/15 overflow-hidden bg-ink-soft/90 shadow-2xl shadow-ink">
          <object
            data="/resume.pdf#view=FitH"
            type="application/pdf"
            className="w-full h-full min-h-[78vh] md:min-h-[85vh]"
          >
            <iframe
              src="/resume.pdf#view=FitH"
              title="Abusalem M Resume"
              className="w-full h-full min-h-[78vh] md:min-h-[85vh] border-0"
            >
              <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
                <p className="text-muted">Your browser does not support embedded PDF viewing.</p>
                <a
                  href="/resume.pdf"
                  download="Abusalem_M_Backend_Platform_Engineer_Resume.pdf"
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-on-accent"
                >
                  Download Resume PDF
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </main>
    </div>
  );
}
