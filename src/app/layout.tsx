import type { Metadata, Viewport } from "next";
import { Anton, Bangers, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/portfolio";
import { ThemeProvider, themeInitScript } from "@/themes/ThemeProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const bangers = Bangers({ variable: "--font-bangers", subsets: ["latin"], weight: "400" });

const fontVars = [inter, anton, bangers].map((f) => f.variable).join(" ");

export const viewport: Viewport = {
  themeColor: "#e62429",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  generator: "Next.js",
  keywords: [
    "Abusalem M",
    "Backend Software Engineer",
    "Technical Lead",
    "Java",
    "Spring Boot",
    "Elasticsearch",
    "PostgreSQL",
    "GCP",
    "Google Cloud",
    "Distributed Systems",
    "Microservices",
    "Pallet",
    "Twinleaves",
    "JobBeeper",
    "High Scale Systems",
    "Catalog Engine",
    "Tax Engine",
  ],
  creator: site.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Backend Software Engineer & Technical Lead`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Backend Software Engineer & Technical Lead`,
      },
    ],
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain flex min-h-full flex-col text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
