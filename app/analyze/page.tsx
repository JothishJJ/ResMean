"use client";

import { useState } from "react";
import {
  FileText,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle2,
  AlertCircle,
  Target,
  Search,
  RefreshCw
} from "lucide-react";
import UploadModal from "@/components/UploadModal";
import Header from "@/components/Header";

interface AnalysisResult {
  score: number;
  matchLevel: string;
  summary: string;
  improvements: string[];
  strengths: string[];
  atsOptimization: {
    score: number;
    feedback: string;
  };
  keywordSuggestions: string[];
}

export default function AnalyzePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: number } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setFileDetails({
      name: file.name,
      size: Math.round(file.size / 1024),
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
      setFileDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setFileDetails(null);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      {/* Background Blobs - matching Home Page */}
      <div className="fixed top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed top-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-pink-600/5 blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <Header />

      <main className="relative z-10 flex flex-col items-center pt-24 pb-20">
        <div className="container px-6 max-w-6xl">
          {!fileDetails && !isLoading ? (
            <section className="flex flex-col items-center text-center py-20">
              <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-xl animate-pulse">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ready for Deep Analysis</span>
              </div>
              <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl leading-tight">
                Analyze Your <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Dream Resume.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl leading-relaxed">
                Upload your resume to receive a comprehensive analysis of its performance against top recruiters&apos; standards and AI screening systems.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-12 group flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-5 text-xl font-bold transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:scale-[1.02] active:scale-95"
              >
                Upload PDF Resume
                <ArrowLeft className="h-6 w-6 rotate-180 transition-transform group-hover:translate-x-1" />
              </button>
            </section>
          ) : isLoading ? (
            <section className="flex flex-col items-center justify-center py-32 text-center">
              <div className="relative mb-8">
                <div className="h-24 w-24 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-purple-400 animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Analyzing Your Resume...</h2>
              <p className="text-zinc-400 max-w-md">Our AI is currently scanning your experience, skills, and formatting to provide detailed feedback.</p>
              <div className="mt-8 w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-[loading_2s_ease-in-out_infinite]" />
              </div>
            </section>
          ) : analysisResult && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Analysis Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest">
                      Analysis Complete
                    </div>
                    <span className="text-zinc-500 text-sm">{fileDetails?.name}</span>
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight">Your Resume Report</h1>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-bold hover:bg-white/10 transition-all active:scale-95"
                >
                  <RefreshCw className="h-4 w-4" />
                  New Analysis
                </button>
              </div>

              {/* Top Section: Score and Summary */}
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Score Card */}
                <div className="lg:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all hover:border-purple-500/30">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-purple-600/10 blur-3xl group-hover:bg-purple-600/20 transition-colors" />

                  <div className="relative flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-6">Overall Match Score</p>

                    <div className="relative flex items-center justify-center">
                      <svg className="h-48 w-48 -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          className="text-white/5"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={552.92}
                          strokeDashoffset={552.92 - (552.92 * analysisResult.score) / 100}
                          className="text-purple-500 transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black">{analysisResult.score}%</span>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <Target className="h-4 w-4 text-purple-400" />
                      <span className="font-semibold text-purple-200">{analysisResult.matchLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
                  <div className="flex items-center gap-2 mb-6 text-zinc-400">
                    <FileText className="h-5 w-5" />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Executive Summary</h3>
                  </div>
                  <p className="text-xl text-zinc-200 leading-relaxed italic">
                    &quot;{analysisResult.summary}&quot;
                  </p>

                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-black/40 p-5 border border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">ATS Readiness</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-green-400">{analysisResult.atsOptimization.score}%</span>
                        <div className="h-1.5 w-24 rounded-full bg-zinc-800">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: `${analysisResult.atsOptimization.score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-black/40 p-5 border border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Key Strengths</span>
                      </div>
                      <span className="text-xl font-bold text-zinc-200">{analysisResult.strengths.length} Identified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Feedback Section */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Improvements */}
                <div className="rounded-3xl border border-red-500/10 bg-red-500/5 p-8 backdrop-blur-2xl transition-all hover:bg-red-500/[0.07] hover:border-red-500/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                      <AlertCircle className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Critical Improvements</h3>
                      <p className="text-sm text-zinc-400">Actionable steps to improve your score</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {analysisResult.improvements.map((item, i) => (
                      <div key={i} className="group flex items-start gap-4 rounded-2xl bg-black/40 p-4 border border-white/5 transition-all hover:translate-x-1">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                          {i + 1}
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="rounded-3xl border border-green-500/10 bg-green-500/5 p-8 backdrop-blur-2xl transition-all hover:bg-green-500/[0.07] hover:border-green-500/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Key Strengths</h3>
                      <p className="text-sm text-zinc-400">What you&apos;re doing well</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {analysisResult.strengths.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-2xl bg-black/40 p-4 border border-white/5 transition-all hover:translate-x-1">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Section: Keywords and ATS */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Keywords */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-bold">Keyword Optimization</h3>
                  </div>
                  <p className="mb-6 text-zinc-400 text-sm">Include these relevant keywords to improve your visibility in searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywordSuggestions.map((keyword, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ATS Detailed */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-bold">ATS Feedback</h3>
                  </div>
                  <div className="rounded-2xl bg-purple-500/5 border border-purple-500/10 p-5">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {analysisResult.atsOptimization.feedback}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Format OK</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Parser Friendly</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Contact Info Found</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 text-center border border-white/5">
                <h3 className="text-2xl font-bold mb-3">Want a second opinion?</h3>
                <p className="text-zinc-400 mb-6">You can re-upload an edited version of your resume to see how your score improves.</p>
                <button
                  onClick={resetAnalysis}
                  className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
                >
                  Analyze New Version
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />

      <footer className="border-t border-white/5 bg-black py-12 px-6 text-center text-sm text-zinc-500">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
              <FileText className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-white font-bold tracking-tight">ResuMean</span>
          </div>
          <p>&copy; 2026 ResuMean AI. Built for the modern job seeker.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
