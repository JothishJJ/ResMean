"use client";

import { useState } from "react";
import { FileText, ArrowLeft, TrendingUp, Zap, Sparkles, CheckCircle2, Upload } from "lucide-react";
import UploadModal from "@/components/UploadModal";
import Link from "next/link";

export default function AnalyzePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: number } | null>(null);

  const handleUpload = (file: File) => {
    setFileDetails({
      name: file.name,
      size: Math.round(file.size / 1024), // size in KB
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/20 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <Link href="/">
            <span className="text-xl font-bold tracking-tight">ResuMean</span>
          </Link>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <Link href="#" className="transition-colors hover:text-white">Templates</Link>
          <Link href="#" className="transition-colors hover:text-white">Pricing</Link>
        </div>
        <Link href="/" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
          Go Back
        </Link>
      </nav>

      <main className="relative z-10 flex flex-col items-center pt-32 pb-20">
        <div className="container px-6">
          {!fileDetails ? (
            <section className="flex flex-col items-center text-center">
              <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ready for Analysis</span>
              </div>
              <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-6xl">
                Analyze Your <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Dream Resume.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl leading-relaxed">
                Upload your resume to receive a comprehensive analysis of its performance against top recruiters&apos; standards.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-12 group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-5 text-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:scale-[1.02]"
              >
                Upload PDF Resume
                <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </button>
            </section>
          ) : (
            <section className="mx-auto max-w-5xl">
              <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold md:text-4xl">Analysis Results</h2>
                  <p className="mt-2 text-zinc-400">Analysis for {fileDetails.name} ({fileDetails.size} KB)</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  <Upload className="h-4 w-4" />
                  Upload Different File
                </button>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-1">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-zinc-400">Match Score</p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-6xl font-black text-white">82<span className="text-2xl text-zinc-500">/100</span></h3>
                  <p className="mt-4 text-sm text-green-400 font-medium">Strong match for Senior Developer roles</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-2">
                  <h4 className="mb-6 text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    Key Improvements
                  </h4>
                  <div className="space-y-4">
                    {[
                      "Quantify achievements in your current role with data-driven metrics",
                      "Ensure consistent formatting for bullet points throughout the document",
                      "Optimize for ATS by including missing keywords like 'Cloud Infrastructure'"
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-black/40 p-4 border border-white/5">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <p className="text-zinc-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-3">
                  <h4 className="mb-6 text-xl font-bold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Summary
                  </h4>
                  <p className="text-zinc-400 leading-relaxed">
                    This is a placeholder for the AI analysis summary. In a real application, our advanced AI would evaluate your resume based on industry benchmarks, readability, and ATS compatibility to provide personalized feedback and actionable advice to improve your hiring chances.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
      
      <footer className="border-t border-white/5 bg-black py-12 px-6 text-center text-sm text-zinc-500">
        <p>&copy; 2026 ResuMean AI. Built for the modern job seeker.</p>
      </footer>
    </div>
  );
}
