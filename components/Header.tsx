import Link from "next/link"
import { FileText } from "lucide-react"

export default function Header() {
  return (
    < nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/20 px-6 py-4 backdrop-blur-md md:px-12" >
      {/** Navigation */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <Link href="/">
          <span className="text-xl font-bold tracking-tight">ResuMean</span>
        </Link>
      </div>
      <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
        <Link href="/analyze" className="transition-colors hover:text-white">Analyze</Link>
      </div>
      <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
        Get Started
      </button>
    </nav >
  )
}
