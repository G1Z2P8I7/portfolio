"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Play, Sparkles, Cpu, Activity, ArrowDown } from "lucide-react";

export default function Hero() {
  const [simulationPrompt, setSimulationPrompt] = useState("optimize_speculative_stream()");
  const [isRunning, setIsRunning] = useState(false);
  const [acceptedTokens, setAcceptedTokens] = useState<string[]>([
    "const",
    "cuda_stream",
    "=",
    "alloc_pinned",
  ]);
  const [rejectedToken, setRejectedToken] = useState<string>("host_buffer");
  const [specRatio, setSpecRatio] = useState("2.41X");
  const [latency, setLatency] = useState("1.84ms");

  const runSimulation = (promptText = simulationPrompt) => {
    setIsRunning(true);
    sound.playClick(900);

    const samplePipelines = [
      {
        tokens: ["const", "cuda_stream", "=", "alloc_pinned"],
        rej: "host_buffer",
        ratio: "2.41X",
        lat: "1.84ms",
      },
      {
        tokens: ["fused_kernel", ">>", "shared_mem", "async"],
        rej: "slow_mutex",
        ratio: "3.12X",
        lat: "1.12ms",
      },
      {
        tokens: ["vllm_engine", "dispatch", "paged_attn", "fp8"],
        rej: "full_kv_cache",
        ratio: "2.85X",
        lat: "1.42ms",
      },
    ];

    const pick = samplePipelines[Math.floor(Math.random() * samplePipelines.length)];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      sound.playHover();
      if (step >= 4) {
        clearInterval(interval);
        setAcceptedTokens(pick.tokens);
        setRejectedToken(pick.rej);
        setSpecRatio(pick.ratio);
        setLatency(pick.lat);
        setIsRunning(false);
        sound.playClick(1200);
      }
    }, 120);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between border-b border-theme-border">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-25 bg-grid-schematic" />

      {/* Top Telemetry Header Stream */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-theme-muted border-b border-theme-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-theme-text font-bold tracking-widest uppercase">
            CORE // 0x7F4A99
          </span>
          <span className="text-theme-dim">/</span>
          <span className="text-theme-accent">CYCLE: LOW_LATENCY_RUNNING</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-theme-dim">
          <span>ARCH: AARCH64 + AVX-512</span>
          <span>COMPILER: CLANG_LLVM_20</span>
          <span className="text-theme-text font-bold">SPEC_RATIO: {specRatio}</span>
        </div>
      </div>

      {/* Center: Massive Metallic Editorial Headline */}
      <div className="py-8 sm:py-14 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-theme-accent bg-theme-accent/10 px-3 py-1 rounded-full border border-theme-accent/30">
            SYS.ML_ENGINEER
          </span>
          <span className="font-mono text-xs text-theme-muted hidden md:inline">
            // SPECIALIZATION: SPECULATIVE LLM RUNTIMES & DISTRIBUTED PLATFORMS
          </span>
        </div>

        <h1 className="font-display text-[12vw] sm:text-[10vw] lg:text-[8vw] leading-[0.88] font-black tracking-tighter uppercase select-none">
          <span className="block text-theme-text">SUMIT</span>
          <div className="w-fit">
            <span className="block text-theme-muted hover:text-theme-text transition-colors duration-200 cursor-default">
              GUPTA
            </span>
          </div>
          <span className="block text-theme-accent">ML &amp; SYSTEMS</span>
          <span className="block text-theme-text">ENGINEER</span>
        </h1>
      </div>

      {/* Interactive Speculative Decoding Stream Simulation Panel */}
      <div className="rounded-3xl bg-theme-surface/90 border border-theme-border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-theme-border-subtle pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-theme-text font-bold">
              INTERACTIVE_LLM_DECODE_SIMULATION // VERIFIER: GREEDY_K
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-theme-muted">LATENCY: {latency} / tok</span>
            <button
              onClick={() => runSimulation()}
              disabled={isRunning}
              className="px-3 py-1 rounded-full bg-theme-accent text-theme-bg font-bold uppercase tracking-wider text-[10px] hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? "DECODING..." : "RE-RUN PIPELINE"}</span>
            </button>
          </div>
        </div>

        {/* Live Token Pipeline Display */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-4 text-lg sm:text-2xl font-mono tracking-tight text-theme-text">
          <span className="text-theme-muted">TARGET_70B:</span>
          {acceptedTokens.map((tok, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-theme-card border border-emerald-500/40 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in-95 duration-200"
            >
              <span>{tok}</span>
              <span className="text-[9px] font-mono text-emerald-400 opacity-80">[ack]</span>
            </span>
          ))}

          {/* Rejected Speculative Draft Token with Red Line-Through */}
          <div className="relative inline-flex items-center">
            <span className="px-3 py-1 rounded-lg bg-red-950/40 border border-red-500/40 text-red-400 font-bold line-through">
              {rejectedToken}
            </span>
            <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest ml-1.5">
              {"[rej -> rollback]"}
            </span>
          </div>

          {/* Streaming Cursor */}
          <span className="inline-block w-2.5 h-6 bg-theme-accent animate-pulse" />
        </div>

        {/* Telemetry Progress Bar */}
        <div className="mt-6 pt-4 border-t border-theme-border-subtle flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-theme-muted">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">● SPECULATIVE ACCELERATOR ENGAGED</span>
            <span>|</span>
            <span>ACCEPTANCE RATE: 78.4%</span>
          </div>
          <div className="text-theme-accent">ENERGY SAVINGS: 42.6% // ZERO MEMSTALLS</div>
        </div>
      </div>

      {/* Bottom Traversal Cue */}
      <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-theme-muted">
        <p className="max-w-xl text-theme-muted leading-relaxed font-body">
          Specializing in hardware-efficient ML acceleration, custom CUDA attention kernels, and
          distributed fault-tolerant commit logs.
        </p>
        <a
          href="#archive"
          onClick={() => sound.playClick(600)}
          className="inline-flex items-center gap-2 text-theme-text hover:text-theme-accent transition-colors uppercase tracking-widest"
        >
          <span>EXPLORE 3D ARCHIVE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
