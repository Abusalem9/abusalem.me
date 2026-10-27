import type { Metadata } from "next";
import { Anton, Bangers, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/portfolio";
import { ThemeProvider, themeInitScript } from "@/themes/ThemeProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const bangers = Bangers({ variable: "--font-bangers", subsets: ["latin"], weight: "400" });

const fontVars = [inter, anton, bangers].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
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
