import type { Metadata } from "next";
import ResumeViewer from "./ResumeViewer";

export const metadata: Metadata = {
  title: "Resume — Abusalem M",
  description: "Backend Software Engineer with 4+ years experience. View and download resume.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
