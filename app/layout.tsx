import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sumit Gupta — ML Systems & High-Performance Runtimes",
  description:
    "Portfolio of Sumit Gupta. Computer Science engineer specializing in speculative LLM decoding runtimes, custom CUDA attention kernels, and distributed consensus logs.",
  keywords: [
    "Machine Learning",
    "Systems Engineer",
    "CUDA",
    "Speculative Decoding",
    "Three.js",
    "Next.js",
    "Creative Developer",
  ],
  authors: [{ name: "Sumit Gupta" }],
  openGraph: {
    title: "Sumit Gupta — ML Systems & High-Performance Runtimes",
    description:
      "Interactive 3D portfolio and architectural systems showcase featuring speculative decoding pipelines, Three.js spatial globe, and Matter.js physics.",
    url: "https://sumitgupta.dev",
    siteName: "Sumit Gupta Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${geist.variable} font-body antialiased bg-theme-bg text-theme-text selection:bg-theme-accent selection:text-theme-bg`}
      >
        <ThemeProvider>
          <InteractiveBackground />
          <SmoothScroll>
            <Cursor />
            <Header />
            <main className="w-full relative z-10">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
