import type { Metadata } from "next";
import {
  Anton,
  Bangers,
  Caveat,
  Inter,
  Luckiest_Guy,
  Yeseva_One,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/portfolio";
import { ThemeProvider, themeInitScript } from "@/themes/ThemeProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Spider-Man
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const bangers = Bangers({ variable: "--font-bangers", subsets: ["latin"], weight: "400" });

// Kung Fu Panda
const yeseva = Yeseva_One({
  variable: "--font-yeseva",
  subsets: ["latin"],
  weight: "400",
});
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

// Minions
const luckiest = Luckiest_Guy({
  variable: "--font-luckiest",
  subsets: ["latin"],
  weight: "400",
});

const fontVars = [inter, anton, bangers, yeseva, caveat, luckiest]
  .map((f) => f.variable)
  .join(" ");

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
        {/* Applies the saved theme before first paint, so a Panda visitor
            never gets a red flash on the way in. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain flex min-h-full flex-col text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
