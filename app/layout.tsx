import type { Metadata } from "next";
import Provider from "@/components/Provider";

import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Footer from "@/components/landing/Footer";
import { Toaster } from "sonner" ; 
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Quizli | AI-Powered Quiz Platform",
  description:
    "Create, share, and master quizzes with AI. Generate questions instantly, track progress, and make learning engaging with Quizli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` 
        ${spaceGrotesk.variable}
        ${inter.variable}
        ${jetbrainsMono.variable}} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">
         <Provider> {children}</Provider>
          <Toaster richColors position="top-center"/>
        </main>

        <Footer />
      </body>
    </html>
  );
}
