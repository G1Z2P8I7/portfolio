"use client";

import React, { useState } from "react";
import { sound } from "@/lib/audio";
import { Copy, Check, Terminal, ExternalLink, Activity, ArrowUpRight, FileText, X, Download, Sparkles, Award } from "lucide-react";

export default function TerminalContact() {
  const [copied, setCopied] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const email = "22guptasumit@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    sound.playClick(1150);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailAction = () => {
    sound.playClick(1000);
    window.location.href = `mailto:${email}?subject=Software%20Engineering%20%2F%20ML%20Role%20Inquiry`;
  };

  const openResume = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick(1100);
    setIsResumeOpen(true);
  };

  return (
    <section id="contact" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-theme-border">
      <div className="relative rounded-3xl bg-theme-surface/85 border border-theme-border p-8 sm:p-14 overflow-hidden backdrop-blur-2xl shadow-2xl">
        {/* Glow Ambient Corner */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-theme-accent/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-8">
          {/* Header & Exact User Copy */}
          <div className="flex flex-col gap-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 font-mono text-xs text-theme-accent uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OPEN TO WORK // CLASS OF 2027</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tighter text-theme-text">
              LET&apos;S BUILD SOMETHING REMARKABLE
            </h2>

            {/* Body */}
            <p className="font-body text-theme-muted text-base sm:text-lg max-w-3xl leading-relaxed pt-2">
              I&apos;m a Computer Science student at VIT looking for a Software Engineering or Machine Learning role, entry-level. I build performance-critical systems: an LLM serving engine, a Raft-based distributed log, and a real-time edge vision pipeline. If your team works on ML infrastructure, backend systems, or full-stack products, I&apos;d love to hear from you.
            </p>
          </div>

          {/* Action Button & Under-Button Quick Links */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary Get in touch CTA */}
              <button
                onClick={handleEmailAction}
                className="px-8 py-4 rounded-full bg-theme-accent text-theme-bg font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_var(--accent-glow)] hover:opacity-95 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Quick Copy Email Option */}
              <button
                onClick={handleCopyEmail}
                className="px-6 py-4 rounded-full bg-theme-card hover:bg-theme-hover border border-theme-border text-theme-text font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "EMAIL COPIED!" : "COPY EMAIL"}</span>
              </button>
            </div>

            {/* Under the button (small, muted) line */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-theme-muted pt-1">
              <a
                href={`mailto:${email}`}
                className="text-theme-text hover:text-theme-accent transition-colors underline decoration-theme-border hover:decoration-theme-accent"
              >
                {email}
              </a>
              <span className="text-theme-dim">·</span>
              <a
                href="https://github.com/G1Z2P8I7"
                target="_blank"
                rel="noreferrer"
                className="text-theme-muted hover:text-theme-text transition-colors"
              >
                GitHub
              </a>
              <span className="text-theme-dim">·</span>
              <a
                href="https://www.linkedin.com/in/sumit-gupta-a2bbb1423/"
                target="_blank"
                rel="noreferrer"
                className="text-theme-muted hover:text-theme-text transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-theme-dim">·</span>
              <button
                onClick={openResume}
                className="text-theme-accent hover:underline transition-colors font-semibold"
              >
                Résumé
              </button>
            </div>
          </div>

          {/* Direct Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-theme-border-subtle">
            <a
              href="https://github.com/G1Z2P8I7"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(850)}
              className="p-5 rounded-2xl bg-theme-card/60 border border-theme-border hover:border-theme-accent transition-all flex items-center justify-between group"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-theme-muted uppercase tracking-widest">
                  CODE REPOSITORY
                </span>
                <span className="font-mono text-xs text-theme-text group-hover:text-theme-accent transition-colors font-bold">
                  [GITHUB: /G1Z2P8I7]
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-theme-muted group-hover:text-theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="https://www.linkedin.com/in/sumit-gupta-a2bbb1423/"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(880)}
              className="p-5 rounded-2xl bg-theme-card/60 border border-theme-border hover:border-theme-accent transition-all flex items-center justify-between group"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-theme-muted uppercase tracking-widest">
                  PROFESSIONAL NETWORK
                </span>
                <span className="font-mono text-xs text-theme-text group-hover:text-theme-accent transition-colors font-bold">
                  [LINKEDIN: /in/sumit-gupta-a2bbb1423]
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-theme-muted group-hover:text-theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <button
              onClick={openResume}
              className="p-5 rounded-2xl bg-theme-card/60 border border-theme-border hover:border-theme-accent transition-all flex items-center justify-between group text-left"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-theme-muted uppercase tracking-widest">
                  VERIFIED DOSSIER
                </span>
                <span className="font-mono text-xs text-theme-text group-hover:text-theme-accent transition-colors font-bold">
                  [VIEW RESUME TILE]
                </span>
              </div>
              <FileText className="w-4 h-4 text-theme-accent group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Telemetry Footer */}
          <div className="pt-4 border-t border-theme-border-subtle flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-theme-muted">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-theme-accent" />
              <span>DIRECT DISPATCH: 22guptasumit@gmail.com</span>
            </div>
            <span className="text-emerald-400 font-bold">AVAILABLE FOR ENTRY-LEVEL / FRESHER ROLES</span>
          </div>
        </div>
      </div>

      {/* Medium-Sized Resume Viewer Modal Tile */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-theme-surface border border-theme-accent/40 shadow-[0_0_60px_rgba(139,92,246,0.3)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Top Bar */}
            <div className="p-5 sm:p-6 border-b border-theme-border flex items-center justify-between bg-theme-card/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-theme-accent/15 border border-theme-accent/40 flex items-center justify-center text-theme-accent">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-theme-accent font-bold uppercase tracking-wider">
                    VERIFIED CURRICULUM VITAE // 2025
                  </span>
                  <h3 className="font-display text-lg font-bold text-theme-text">
                    Sumit Gupta — Software &amp; ML Systems Engineer
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick(600);
                    setIsResumeOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-theme-hover border border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-text transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Medium Dossier Content with Lenis Bypass */}
            <div
              data-lenis-prevent="true"
              className="p-6 sm:p-8 overflow-y-auto overscroll-contain flex-1 font-body text-xs sm:text-sm text-theme-muted leading-relaxed space-y-6 select-text"
              style={{
                maxHeight: "calc(85vh - 140px)",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--accent) transparent",
              }}
            >
              {/* Header Bio Card */}
              <div className="p-4 rounded-2xl bg-theme-card/60 border border-theme-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div>
                  <span className="text-theme-text font-bold block text-sm">SUMIT GUPTA</span>
                  <span className="text-theme-muted">Bokaro Steel City, Jharkhand, India</span>
                </div>
                <div className="flex flex-col sm:text-right text-theme-dim">
                  <span className="text-theme-accent font-bold">22guptasumit@gmail.com</span>
                  <span>+91 7061781052</span>
                </div>
              </div>

              {/* Education */}
              <div>
                <span className="font-mono text-xs text-theme-text font-bold uppercase tracking-wider block mb-2 text-theme-accent">
                  01 // EDUCATION
                </span>
                <div className="p-4 rounded-xl bg-theme-card/40 border border-theme-border-subtle">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-theme-text font-bold">Vellore Institute of Technology (VIT)</span>
                    <span className="text-theme-muted">Expected 2027</span>
                  </div>
                  <p className="text-theme-muted text-xs mt-1">
                    B.Tech in Computer Science and Engineering • CGPA: 7.81 / 10
                  </p>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <span className="font-mono text-xs text-theme-text font-bold uppercase tracking-wider block mb-2 text-theme-accent">
                  02 // WORK EXPERIENCE
                </span>
                <div className="p-4 rounded-xl bg-theme-card/40 border border-theme-border-subtle space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-theme-text font-bold">Software Engineering / Data Science Intern</span>
                    <span className="text-theme-muted">June 2024 – Aug 2024</span>
                  </div>
                  <span className="font-mono text-[11px] text-theme-accent block">
                    Steel Authority of India Ltd. (SAIL) — Bokaro, India
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-theme-muted text-xs">
                    <li>Developed &amp; benchmarked Python telemetry pipelines, increasing data throughput by 35%.</li>
                    <li>Automated cross-departmental data integrity checks, reducing manual auditing by 40%.</li>
                    <li>Refactored legacy SQL schemas &amp; ingestion bottlenecks with senior engineers.</li>
                  </ul>
                </div>
              </div>

              {/* Key Projects */}
              <div>
                <span className="font-mono text-xs text-theme-text font-bold uppercase tracking-wider block mb-2 text-theme-accent">
                  03 // VERIFIED PRODUCTION PROJECTS
                </span>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-theme-card/40 border border-theme-border-subtle">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-theme-text font-bold">Adaptive Speculative LLM Serving Engine</span>
                      <span className="text-emerald-400">2.5X Speedup</span>
                    </div>
                    <p className="text-theme-muted text-xs mt-1">
                      Python, PyTorch, CUDA, FastAPI, Llama-3.1-8B, Qwen2.5-0.5B • Entropy-guided dynamic draft length (SVIP) reducing wasted compute by 45%.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-theme-card/40 border border-theme-border-subtle">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-theme-text font-bold">KhorosLog: Fault-Tolerant Commit Log</span>
                      <span className="text-emerald-400">80K+ Writes/sec</span>
                    </div>
                    <p className="text-theme-muted text-xs mt-1">
                      Go, Raft Consensus, TCP, mmap • Sub-150ms leader failover with custom binary wire protocol over TCP.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-theme-card/40 border border-theme-border-subtle">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-theme-text font-bold">AegisVision: Real-Time Edge Vision Pipeline</span>
                      <span className="text-emerald-400">&lt;80ms Latency</span>
                    </div>
                    <p className="text-theme-muted text-xs mt-1">
                      C++, Python, TensorRT, OpenCV, WebRTC • 6 concurrent 1080p RTSP feeds at 60+ FPS with zero frame drops on RTX 4060 GPU.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-theme-card/40 border border-theme-border-subtle">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-theme-text font-bold">AxiomBox: Sandboxed Remote Code Execution</span>
                      <span className="text-emerald-400">&lt;25ms Cold Start</span>
                    </div>
                    <p className="text-theme-muted text-xs mt-1">
                      Go, C++, Win32 API, WebSockets • 40x faster than Docker container startup with Windows Job Objects memory ceilings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Skills Summary */}
              <div>
                <span className="font-mono text-xs text-theme-text font-bold uppercase tracking-wider block mb-2 text-theme-accent">
                  04 // CORE SKILLS
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {["Python", "C++", "Go", "TypeScript", "PyTorch", "CUDA", "TensorRT", "Raft Consensus", "io_uring", "Docker", "Linux", "PostgreSQL"].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded bg-theme-hover border border-theme-border text-theme-text">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Footer */}
            <div className="p-4 sm:p-5 border-t border-theme-border flex items-center justify-between bg-theme-card/90">
              <span className="font-mono text-xs text-theme-muted hidden sm:inline">
                STATUS: READY TO INTERVIEW // ENTRY-LEVEL
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${email}?subject=Interview%20Invitation%20%2F%20Software%20Engineer%20Role`}
                  className="px-5 py-2.5 rounded-full bg-theme-accent text-theme-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                >
                  Contact Candidate
                </a>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="px-4 py-2.5 rounded-full bg-theme-hover border border-theme-border font-mono text-xs text-theme-muted hover:text-theme-text transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
