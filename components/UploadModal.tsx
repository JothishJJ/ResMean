"use client";

import { FileText, Upload, X } from "lucide-react";
import { useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 transition-colors hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">Upload Your Resume</h2>
        <p className="mb-8 text-zinc-400">
          Upload your resume in PDF format to get an AI-powered analysis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
              file ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 hover:border-white/20"
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center gap-4"
            >
              <div className={`rounded-full p-4 ${file ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-zinc-400"}`}>
                {file ? <FileText className="h-8 w-8" /> : <Upload className="h-8 w-8" />}
              </div>
              <div className="text-center">
                <p className="font-semibold">{file ? file.name : "Click to upload or drag and drop"}</p>
                <p className="mt-1 text-xs text-zinc-500">PDF (max. 5MB)</p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={!file}
            className={`w-full rounded-full py-4 font-bold transition-all ${
              file
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Analyze Resume
          </button>
        </form>
      </div>
    </div>
  );
}
