import type { Metadata } from "next";
import "./globals.css";
import GradientBG from "./components/GradientBG";
import Navbar from "./components/layout/Navbar";
import TransitionLayout from "./components/gsap/TransitionLayout";

export const metadata: Metadata = {
  title: "Infinite Verse",
  description: "A beginner-friendly Bible reading app built with Next.js and Bible API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <GradientBG />
        <Navbar />
        <TransitionLayout>{children}</TransitionLayout>
      </body>
    </html>
  );
}
