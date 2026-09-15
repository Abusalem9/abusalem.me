"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/themes/ThemeProvider";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import weeklyDataRaw from "@/content/timelineData.json";

interface WeekEntry {
  year: number;
  week: number;
  dateRange: string;
  title: string;
  domains: string[];
  accomplishments: string[];
}

const allWeeks: WeekEntry[] = weeklyDataRaw as WeekEntry[];

export default function Timeline() {
  const { theme } = useTheme();
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const years = ["all", ...Array.from(new Set(allWeeks.map((w) => String(w.year))))];

  const filteredWeeks = allWeeks.filter((w) => {
    if (selectedYear === "all") return true;
    return String(w.year) === selectedYear;
  });

  const displayedWeeks = filteredWeeks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWeeks.length;

  return (
    <Section id="timeline">
      <SectionHeading kicker={`${theme.kicker} 06`} sfx={theme.sfx.timeline ?? "CHRONO!"}>
        {theme.headings.timeline ?? "THE TIMELINE"}
      </SectionHeading>

      {/* Intro Subtitle & Year Filter */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between border-b border-fg/10 pb-6">
        <div>
          <p className="max-w-2xl text-base text-muted md:text-lg leading-relaxed">
            A week-by-week executive summary of systems engineered, architectures scaled, 
            and platform milestones delivered at Pallet / Twinleaves.
          </p>
        </div>

        {/* Year Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {years.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => {
                setSelectedYear(yr);
                setVisibleCount(8);
              }}
              className={`rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                selectedYear === yr
                  ? "bg-accent text-on-accent font-bold"
                  : "border border-fg/20 text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {yr === "all" ? "All Time" : yr}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative ml-2 md:ml-4 border-l-2 border-fg/15 pl-6 md:pl-10 space-y-10">
        <AnimatePresence mode="popLayout">
          {displayedWeeks.map((entry, idx) => (
            <motion.div
              key={`${entry.year}-W${entry.week}-${entry.dateRange}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.04 }}
              data-spidey
              className="relative group"
            >
              {/* Timeline dot node */}
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: (idx % 3) * 0.4 }}
                className="absolute -left-[31px] md:-left-[47px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ink bg-accent shadow-[0_0_10px_var(--color-accent)] transition-transform duration-300 group-hover:scale-150"
              />

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="panel-light bg-ink-soft/85 p-6 md:p-7 rounded-2xl border border-fg/15 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-[8px_8px_0_0_var(--color-accent)]"
              >
                {/* Header: Date Range & Week Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                  <span className="font-display text-lg uppercase tracking-wide text-accent md:text-xl">
                    {entry.dateRange}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted font-medium">
                    Week {entry.week} · {entry.year}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="font-display text-xl uppercase tracking-wide text-fg md:text-2xl mt-1">
                  {entry.title}
                </h3>

                {/* Domain Badges */}
                {entry.domains && entry.domains.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.domains.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-fg/10 border border-fg/15 px-2.5 py-0.5 font-mono text-[10px] text-accent2 uppercase tracking-wide"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                {/* Executive Accomplishment Summary */}
                {entry.accomplishments && entry.accomplishments.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-fg/10 pt-3">
                    {entry.accomplishments.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="relative pl-4 text-sm text-muted leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="rounded-full bg-accent px-8 py-3 font-display text-sm uppercase tracking-wider text-on-accent transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
          >
            Show More Weeks ({filteredWeeks.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </Section>
  );
}
