import type { Metadata } from "next";
import "./globals.css";
import GradientBG from "./components/GradientBG";
import Navbar from "./components/layout/Navbar";
import TransitionLayout from "./components/gsap/TransitionLayout";
import { AuthProvider } from "./components/auth/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Infinite Verse",
    template: "%s | Infinite Verse",
  },
  description:
    "Infinite Verse is a beginner-friendly Bible reading app for exploring translations, books, chapters, and verses with a clean reading experience.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Infinite Verse",
    description:
      "Infinite Verse is a beginner-friendly Bible reading app for exploring translations, books, chapters, and verses with a clean reading experience.",
    images: [
      {
        url: "/ogmeta.jpg",
        width: 1200,
        height: 630,
        alt: "Infinite Verse preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinite Verse",
    description:
      "Infinite Verse is a beginner-friendly Bible reading app for exploring translations, books, chapters, and verses with a clean reading experience.",
    images: ["/ogmeta.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <GradientBG />
          <Navbar />
          <TransitionLayout>{children}</TransitionLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
