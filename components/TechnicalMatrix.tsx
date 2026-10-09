"use client";

import React from "react";
import { sound } from "@/lib/audio";
import { Terminal, Cpu, Layers, GitBranch, ArrowUpRight, Award, BookOpen } from "lucide-react";

export default function TechnicalMatrix() {
  const skillsCategories = [
    {
      title: "01 LANGUAGES & COMPILERS",
      skills: ["C++ (20/23)", "Python (3.12+)", "Go", "Rust", "TypeScript", "CUDA C", "SQL"],
    },
    {
      title: "02 ML SYSTEMS & INFERENCE",
      skills: ["PyTorch", "TensorRT", "vLLM", "FlashAttention", "Triton Server", "SHAP / XAI", "Quantization (FP8/INT8)"],
    },
    {
      title: "03 LOW-LEVEL & DISTRIBUTED",
      skills: ["Linux io_uring", "POSIX Shm", "Raft Consensus", "eBPF", "Docker / k8s", "gRPC / Protobuf", "Zero-Copy Buffers"],
    },
    {
      title: "04 GRAPHICS & FRONTEND",
      skills: ["Three.js", "WebGPU / WGSL", "GLSL Shaders", "Next.js 15", "GSAP 3", "Tailwind CSS", "Web Audio API"],
    },
  ];

  const moodBoardCards = [
    { id: "01", tag: "DAG_EXEC", title: "Comp. Graph Optimization", detail: "Topological Sort & Fusion" },
    { id: "02", tag: "TOKEN_STREAM", title: "Speculative Token Verifier", detail: "Greedy-K Drafting" },
    { id: "03", tag: "GEMM_TILE", title: "Fused Attention 16x16", detail: "SRAM Stride Cache" },
    { id: "04", tag: "WGSL_RAY", title: "Compute Raymarcher", detail: "SDF Distance Field" },
    { id: "05", tag: "AUDIO_FFT", title: "Web Audio DSP Engine", detail: "Real-time FFT Biquad" },
    { id: "06", tag: "WARP_SCHED", title: "CUDA Occupancy 100%", detail: "Zero Register Spill" },
    { id: "07", tag: "ROOFLINE", title: "Compute Bounded Model", detail: "19.5 TFLOPS FP16" },
    { id: "08", tag: "L1/L2_CACHE", title: "Cache-Conscious Tables", detail: "98.4% Hit Rate" },
    { id: "09", tag: "SPSC_RING", title: "Lock-Free Ring Buffer", detail: "Zero-Contention CAS" },
    { id: "10", tag: "BITONIC_NET", title: "Parallel Bitonic Sort", detail: "O(log² n) Depth" },
  ];

  return (
    <section id="arsenal" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-theme-border">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-theme-border-subtle pb-8 mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-theme-accent">
          03 // ARSENAL &amp; CAPABILITIES MATRIX
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-theme-text">
          SYSTEM PRIMITIVES
        </h2>
      </div>

      {/* 4 Category Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {skillsCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-theme-surface/70 border border-theme-border backdrop-blur-xl shadow-xl flex flex-col gap-4"
          >
            <span className="font-mono text-xs text-theme-accent font-bold tracking-widest">
              {cat.title}
            </span>
            <div className="flex flex-wrap gap-2 pt-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  onMouseEnter={() => sound.playHover()}
                  className="px-3.5 py-1.5 rounded-xl bg-theme-card border border-theme-border-subtle font-mono text-xs text-theme-text hover:border-theme-accent hover:text-theme-accent transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Experience & Education Dossier */}
      <div id="dossier" className="pt-12 border-t border-theme-border-subtle grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-xs text-theme-accent font-bold uppercase tracking-widest">
            04 // TRAJECTORY &amp; BACKGROUND
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-theme-text">
            EXPERIENCE &amp; EDUCATION
          </h3>
          <p className="font-body text-theme-muted text-sm leading-relaxed pt-2">
            Focused on the convergence of low-level systems programming, GPU kernel acceleration, and production machine learning runtimes.
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col divide-y divide-theme-border-subtle">
          {/* Item 1 */}
          <div className="py-6 flex flex-col gap-2 group hover:bg-theme-surface/40 transition-colors rounded-2xl px-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-theme-accent font-bold">2024</span>
              <span className="text-theme-muted uppercase tracking-wider">INDUSTRY INTERNSHIP</span>
            </div>
            <h4 className="font-display text-xl font-bold text-theme-text group-hover:text-theme-accent transition-colors">
              Software Engineering &amp; Data Science Intern
            </h4>
            <span className="font-mono text-xs text-theme-muted">
              Steel Authority of India Limited (SAIL)
            </span>
            <p className="font-body text-theme-muted text-sm pt-1">
              Engineered predictive telemetry pipelines and distributed sensor data processing engines for industrial scale smelting infrastructure. Reduced sensor ingestion jitter by 34%.
            </p>
          </div>

          {/* Item 2 */}
          <div className="py-6 flex flex-col gap-2 group hover:bg-theme-surface/40 transition-colors rounded-2xl px-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-theme-accent font-bold">2023 — 2027</span>
              <span className="text-theme-muted uppercase tracking-wider">ACADEMIA</span>
            </div>
            <h4 className="font-display text-xl font-bold text-theme-text group-hover:text-theme-accent transition-colors">
              B.Tech in Computer Science &amp; Engineering
            </h4>
            <span className="font-mono text-xs text-theme-muted">
              Vellore Institute of Technology (VIT)
            </span>
            <p className="font-body text-theme-muted text-sm pt-1">
              Coursework &amp; Research: Distributed Consensus, OS Internals, Compiler Design, Heterogeneous Accelerated Computing, and Machine Learning Systems.
            </p>
          </div>

          {/* Item 3 */}
          <div className="py-6 flex flex-col gap-2 group hover:bg-theme-surface/40 transition-colors rounded-2xl px-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-theme-accent font-bold">2024 — PRESENT</span>
              <span className="text-theme-muted uppercase tracking-wider">OPEN SOURCE</span>
            </div>
            <h4 className="font-display text-xl font-bold text-theme-text group-hover:text-theme-accent transition-colors">
              Systems Researcher &amp; Contributor
            </h4>
            <span className="font-mono text-xs text-theme-muted">
              High-Performance ML &amp; Rust Ecosystem
            </span>
            <p className="font-body text-theme-muted text-sm pt-1">
              Prototyping speculative LLM decoding engines, micro-benchmarking Linux io_uring asynchronous WAL queues, and contributing to open-source systems libraries.
            </p>
          </div>
        </div>
      </div>

      {/* 10-Node Architectural Mood Board */}
      <div className="pt-12 border-t border-theme-border-subtle flex flex-col gap-6">
        <div className="flex items-center justify-between font-mono text-xs text-theme-muted">
          <span className="text-theme-accent font-bold uppercase tracking-widest">
            CONCEPTUAL NODES // EXPERIMENT MATRIX
          </span>
          <span className="hidden sm:inline text-theme-dim">10 ACTIVE NODES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {moodBoardCards.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => sound.playHover()}
              className="p-4 rounded-2xl bg-theme-surface/60 border border-theme-border hover:border-theme-accent/60 transition-all duration-300 group flex flex-col justify-between h-36 backdrop-blur-md"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-theme-muted">
                <span>#{card.id}</span>
                <span className="text-theme-accent font-bold group-hover:underline">
                  {card.tag}
                </span>
              </div>

              <div className="flex flex-col gap-1 my-auto">
                <span className="font-display text-xs font-bold text-theme-text group-hover:text-theme-accent transition-colors">
                  {card.title}
                </span>
                <span className="font-mono text-[9px] text-theme-muted">
                  {card.detail}
                </span>
              </div>

              <div className="w-full bg-theme-hover h-1 rounded-full overflow-hidden">
                <div className="bg-theme-accent h-full w-2/3 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
