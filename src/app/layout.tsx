import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "react-hot-toast";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md. Tomal Hossen | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, Express.js, and PostgreSQL. Building scalable web applications with clean code and great UX.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Portfolio", "Tomal Hossen"],
  authors: [{ name: "Md. Tomal Hossen" }],
  icons: {
    icon: [
      { url: "https://i.ibb.co.com/xtbCsNXy/Tomal-githubprofile-removebg-preview.png", type: "image/jpeg" },
    ],
    apple: "https://i.ibb.co.com/mVqnxghS/1000027089.jpg",
  },
  openGraph: {
    title: "Md. Tomal Hossen | Full Stack Developer",
    description: "Full Stack Developer crafting modern, scalable web applications.",
    type: "website",
    images: ["https://i.ibb.co.com/mVqnxghS/1000027089.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        <CustomCursor />
        <WhatsAppWidget />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0c1628",
              color: "#d4e8f8",
              border: "1px solid rgba(0,180,220,0.2)",
              borderRadius: "12px",
              fontSize: "0.875rem",
              padding: "12px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            },
            success: {
              iconTheme: { primary: "#22c55e", secondary: "#0c1628" },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "#0c1628" },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
