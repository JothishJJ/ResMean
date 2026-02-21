import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Background Blobs for Glassmorphism Context */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute top-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-pink-600/10 blur-[100px]" />


      <main className="relative z-10 flex flex-col items-center pt-32 pb-20">
        <Header />

        {/* Hero Section */}
        <section className="container flex flex-col items-center px-6 text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Resume Analysis</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
            Stop Sending Your Resume Into <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              The Black Hole.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl leading-relaxed">
            Recruiters spend only 6 seconds on your resume. Most applications are rejected by AI before a human even sees them. We help you beat the system and land the interview you deserve.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/analyze" className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:scale-[1.02]">
              Analyze My Resume Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-md transition-colors hover:bg-white/10">
              View Sample Report
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-[#050505] bg-zinc-800" />
              ))}
            </div>
            <p>Joined by 10,000+ job seekers this month</p>
          </div>
        </section>

        {/* Visual Mockup Section (Glassmorphism Card) */}
        <section className="container mt-24 px-6">
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl shadow-2xl md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between rounded-xl bg-black/40 p-6 border border-white/5">
                  <div>
                    <p className="text-sm text-zinc-400">Match Score</p>
                    <h3 className="text-4xl font-bold text-green-400">84%</h3>
                  </div>
                  <TrendingUp className="h-10 w-10 text-green-400 opacity-50" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-zinc-200">Critical Improvements</h4>
                  {[
                    "Quantify your impact in the Google role",
                    "Missing key skills: System Design, AWS",
                    "Strengthen your executive summary"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-white/5 p-3 text-sm text-zinc-300 border border-white/5">
                      <Zap className="mt-0.5 h-4 w-4 text-yellow-500" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-black/40 p-6 border border-white/5 overflow-hidden">
                <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-zinc-500">resume_v2_final.pdf</span>
                </div>
                <div className="space-y-4 opacity-60">
                  <div className="h-4 w-3/4 rounded bg-zinc-800" />
                  <div className="h-4 w-1/2 rounded bg-zinc-800" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-zinc-900" />
                    <div className="h-3 w-full rounded bg-zinc-900" />
                    <div className="h-3 w-2/3 rounded bg-zinc-900" />
                  </div>
                  <div className="mt-6 rounded-lg bg-purple-500/10 p-4 border border-purple-500/20">
                    <p className="text-xs font-mono text-purple-300">
                      {`// AI Suggestion: Replace "Handled team tasks" with "Spearheaded cross-functional initiatives for 12+ engineers..."`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -right-6 -bottom-6 hidden h-32 w-48 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-3xl md:block shadow-2xl">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Success Rate</p>
              <p className="mt-2 text-2xl font-bold">+42%</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-800">
                <div className="h-full w-2/3 rounded-full bg-blue-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Emotion-Focused Features */}
        <section className="container mt-32 px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl">Your career deserves more <br /> than a &quot;No-Reply&quot; email.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Stop Guessing",
                desc: "Know exactly why you aren't getting callbacks. Our AI identifies the gaps in your experience that recruiters are looking for.",
                icon: <Zap className="h-6 w-6 text-purple-400" />
              },
              {
                title: "Beat the ATS",
                desc: "Applicant Tracking Systems reject 75% of resumes before they reach a human. We optimize your resume to sail right through.",
                icon: <CheckCircle2 className="h-6 w-6 text-blue-400" />
              },
              {
                title: "Confidence Restored",
                desc: "Apply with the certainty that your resume is at its absolute best. No more anxiety every time you hit &apos;Submit&apos;.",
                icon: <Sparkles className="h-6 w-6 text-pink-400" />
              }
            ].map((feature, i) => (
              <div key={i} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.05] hover:border-white/10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="container mt-40 px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-12 text-center border border-white/10 backdrop-blur-sm">
            <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <h2 className="text-4xl font-bold md:text-5xl">Ready to get hired?</h2>
            <p className="mt-4 text-zinc-300">Join thousands of successful candidates who used ResuMean to land their dream roles.</p>
            <Link href="/analyze" className="inline-block mt-10 rounded-full bg-white px-10 py-4 text-lg font-bold text-black transition-transform hover:scale-105 active:scale-95">
              Start Free Analysis
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black py-12 px-6 text-center text-sm text-zinc-500">
        <p>&copy; 2026 ResuMean AI. Built for the modern job seeker.</p>
      </footer>
    </div>
  );
}
