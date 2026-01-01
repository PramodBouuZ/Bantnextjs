
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertCircle, MessageSquare } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BantConfirm | India's #1 B2B AI Marketplace",
  description: "BantConfirm connects Indian MSMEs with verified top-tier IT and Telecom vendors using AI-driven BANT qualified leads.",
  openGraph: {
    title: "BantConfirm - B2B AI Marketplace",
    description: "Find enterprise-grade IT, Software, and Telecom solutions verified by AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-slate-900 overflow-x-hidden`}>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />

          {/* Floating Action Buttons */}
          <div className="fixed bottom-10 right-10 flex flex-col space-y-4 z-50">
            <button 
              title="Help & Support"
              className="bg-[#6366f1] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-white/20"
            >
              <AlertCircle size={28} />
            </button>
            <button 
              title="Live Chat"
              className="bg-[#22c55e] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-white/20"
            >
              <MessageSquare size={28} />
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
