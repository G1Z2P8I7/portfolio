"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { sound } from "@/lib/audio";
import { useTheme } from "@/lib/theme";
import {
  Globe,
  LayoutGrid,
  ArrowUpRight,
  Sparkles,
  Layers,
  Shield,
  Activity,
  Code2,
  Play,
  Copy,
  Check,
  Terminal,
  Volume2,
  Cpu,
} from "lucide-react";

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  metrics: string;
  tech: string[];
  description: string;
  details: string[];
  github?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "speculative-engine",
    number: "01",
    title: "Speculative Decoding Engine",
    tagline: "Adaptive LLM Serving & Inference Optimization",
    category: "LLM RUNTIMES // CUDA",
    year: "2025",
    metrics: "+58.4% TTFT // 2.4X Throughput",
    tech: ["PyTorch", "CUDA", "vLLM", "FlashAttention-2", "C++20"],
    description:
      "High-throughput speculative execution pipeline accelerating transformer decoding by 2.4x via lightweight drafter model verification, custom CUDA attention kernels, and zero-allocation pinned memory pools.",
    details: [
      "Lightweight 1.3B drafter model executes 5 speculative tokens per cycle.",
      "70B target model verifies draft tokens in a single batch forward pass via greedy-K tree verification.",
      "Custom CUDA fused kernels for KV-cache index permutation eliminating Host-to-Device transfer stalls.",
      "Tested on NVIDIA A100 SXM4 80GB with sustained 120 tokens/sec across 64 concurrent streams.",
    ],
    github: "https://github.com/G1Z2P8I7/speculative-llm-engine",
  },
  {
    id: "aegis-vision",
    number: "02",
    title: "AegisVision",
    tagline: "Real-time Multi-Stream Edge Vision Pipeline",
    category: "COMPUTER VISION // EDGE",
    year: "2024",
    metrics: "11.2ms E2E // 16 Sync Feeds",
    tech: ["TensorRT", "C++", "POSIX Shm", "GStreamer", "OpenCV"],
    description:
      "Sub-12ms multi-camera object detection and telemetry system with dynamic INT8 quantization, zero-copy POSIX shared memory streaming, and custom tracker associations.",
    details: [
      "Parallel RTSP ingest pipeline consuming 16 high-definition 1080p feeds simultaneously.",
      "TensorRT engine execution with dynamic batching and calibrated INT8 precision.",
      "Zero-copy frame transfer between capture daemon and inference worker via POSIX shm ring buffers.",
      "Deployed on NVIDIA Jetson AGX Orin with sub-15W thermal envelope.",
    ],
    github: "https://github.com/G1Z2P8I7/aegis-vision",
  },
  {
    id: "khoros-log",
    number: "03",
    title: "KhorosLog",
    tagline: "Distributed Commit Log with Raft Consensus",
    category: "DISTRIBUTED SYSTEMS // WAL",
    year: "2024",
    metrics: "1.2M OPS/SEC // <180ms Failover",
    tech: ["Go", "Raft", "Linux io_uring", "gRPC", "Protobuf"],
    description:
      "High-durability fault-tolerant replicated write-ahead log with leader election, vectorized quorum replication, and zero disk stalls utilizing Linux io_uring and custom memory-mapped segments.",
    details: [
      "Custom implementation of Raft consensus protocol with pipelined log append entries.",
      "Asynchronous storage engine bypassing standard kernel fsync locks using Linux io_uring submission queues.",
      "Zero-copy network serialization over raw TCP ring buffers with CRC32 frame checksums.",
      "Survives network partitioning and node loss with sub-180ms automatic leader re-election.",
    ],
    github: "https://github.com/G1Z2P8I7/khoros-log",
  },
  {
    id: "axiom-box",
    number: "04",
    title: "AxiomBox",
    tagline: "Sandboxed Remote Code Execution Runtime",
    category: "KERNEL & SECURITY",
    year: "2026",
    metrics: "46ms Cold Start // Rootless Micro-VM",
    tech: ["Rust", "Seccomp-BPF", "Cgroups v2", "Linux Namespaces", "KVM"],
    description:
      "Ephemeral, rootless micro-VM isolation engine executing untrusted Python and C++ binaries with sub-50ms cold starts, strict seccomp-bpf syscall filtering, and cgroup v2 resource limits.",
    details: [
      "Custom rootless container isolation utilizing Linux user, mount, and network namespaces.",
      "Strict Seccomp-BPF syscall filter allowing only 12 deterministic POSIX system calls.",
      "Strict Cgroups v2 enforcement for CPU quota throttling and hard 256MB memory ceilings.",
      "Zero-egress virtual network bridges preventing unauthorized socket transmission.",
    ],
    github: "https://github.com/G1Z2P8I7/axiom-box",
  },
  {
    id: "tensor-mesh",
    number: "05",
    title: "TensorMesh WebGL",
    tagline: "Volumetric 3D Neural Architecture Inspector",
    category: "3D SPATIAL // WEBGPU",
    year: "2024",
    metrics: "120 FPS // 50K Instanced Nodes",
    tech: ["Three.js", "WebGPU", "WGSL", "GLSL", "TypeScript"],
    description:
      "Interactive 3D graph visualization rendering massive transformer layer activations and attention heads directly in the browser with compute shader matrix simulations.",
    details: [
      "Instanced mesh rendering of 50,000 spatial attention nodes calculated directly on the GPU.",
      "Custom raymarching volumetric shader for activation density heatmaps.",
      "Seamless integration with PyTorch export telemetry via WebSockets.",
    ],
    github: "https://github.com",
  },
  {
    id: "quanta-cache",
    number: "06",
    title: "QuantaCache",
    tagline: "Lock-Free NVMe Persistent KV Store",
    category: "LOW-LEVEL SYSTEMS",
    year: "2024",
    metrics: "3.4M Read QPS // 4μs P99",
    tech: ["C++20", "Lock-Free Atomics", "Direct I/O", "HugePages"],
    description:
      "Ultra-low latency in-memory and persistent key-value cache designed for high-concurrency real-time recommendation engines and feature stores.",
    details: [
      "Cache-conscious hash table using robin-hood hashing and 64-byte bucket alignments.",
      "Linux 2MB HugePages allocation eliminating TLB miss overhead under heavy random access.",
      "Direct I/O O_DIRECT disk writes for crash-resilient write log persistence.",
    ],
    github: "https://github.com",
  },
  {
    id: "aether-audio",
    number: "07",
    title: "AetherSynth Audio FX",
    tagline: "Procedural Web Audio Haptics Engine",
    category: "CREATIVE SOUND // WEB AUDIO",
    year: "2025",
    metrics: "0ms Asset Overhead // Zero Latency",
    tech: ["Web Audio API", "Biquad Filters", "DSP", "Canvas 2D"],
    description:
      "Zero-asset procedural sound generation engine synthesizing mechanical clicks, aerodynamic whooshes, and spatial reverberation waves in mathematical code.",
    details: [
      "Procedural envelope generators (ADSR) calculating micro-burst sine waves for tactile feedback.",
      "Real-time FFT spectrum analyzer visualizer rendering responsive waveforms.",
      "Zero network bandwidth requirement with instantaneous offline capability.",
    ],
    github: "https://github.com",
  },
  {
    id: "nebula-cluster",
    number: "08",
    title: "Nebula Sched",
    tagline: "Heterogeneous GPU Cluster Workload Allocator",
    category: "CLOUD ORCHESTRATION",
    year: "2023",
    metrics: "94% Cluster Saturation",
    tech: ["Go", "Kubernetes CRD", "Prometheus", "NVIDIA DCGM"],
    description:
      "Kubernetes custom resource controller orchestrating GPU multi-instance allocation (MIG), topology-aware node placement, and spot instance preemption recovery.",
    details: [
      "NVLink and PCIe topology-aware scheduler assigning co-located GPUs to reduce all-reduce overhead.",
      "Dynamic MIG slicing allocating fractional A100 partitions based on live VRAM telemetry.",
      "Automated checkpointing on spot termination warnings saving 85% of training progress.",
    ],
    github: "https://github.com",
  },
];

// Helper to create crisp, high-definition card canvas textures
// Idle: Ultra-clean, translucent HUD matching the globe accent with serial number & category
// Hover: Card grows, vibrant glow accents ignite, and the full title & metrics appear
function createCardTexture(
  project: ProjectData,
  accentColor: string,
  isHovered = false
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    if (!isHovered) {
      // --- IDLE STATE: Perfectly matches the translucent architectural globe ---
      ctx.fillStyle = "rgba(11, 10, 18, 0.55)";
      ctx.fillRect(0, 0, 512, 320);

      // Fine architectural grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 32; x < 512; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 320); ctx.stroke();
      }
      for (let y = 32; y < 320; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
      }

      // Thin ethereal border matching the theme wireframe
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, 504, 312);
      ctx.globalAlpha = 1.0;

      // Corner markers
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3;
      const cl = 16;
      ctx.beginPath(); ctx.moveTo(4, 4 + cl); ctx.lineTo(4, 4); ctx.lineTo(4 + cl, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(508 - cl, 4); ctx.lineTo(508, 4); ctx.lineTo(508, 4 + cl); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, 316 - cl); ctx.lineTo(4, 316); ctx.lineTo(4 + cl, 316); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(508 - cl, 316); ctx.lineTo(508, 316); ctx.lineTo(508, 316 - cl); ctx.stroke();

      // Serial Tag Pill
      ctx.fillStyle = accentColor;
      ctx.globalAlpha = 0.22;
      ctx.fillRect(24, 24, 72, 26);
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = accentColor;
      ctx.font = "bold 13px monospace";
      ctx.fillText(`// ${project.number}`, 32, 42);

      // Category
      ctx.fillStyle = "rgba(226, 232, 240, 0.6)";
      ctx.font = "bold 12px monospace";
      ctx.fillText(project.category, 108, 42);

      // Divider Line
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(24, 64); ctx.lineTo(488, 64); ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Minimalist Idle Monogram / Code Identifier
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "bold 22px monospace";
      ctx.fillText(`SYS_NODE // 0x${project.number}F`, 24, 120);

      // Subtle pulsating scan telemetry
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.font = "14px monospace";
      ctx.fillText(`STATUS: ONLINE // ${project.year}`, 24, 175);

      // Bottom telemetry
      ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
      ctx.font = "12px monospace";
      ctx.fillText(`BUILD // v${project.year}`, 24, 275);
    } else {
      // --- HOVER / EXPAND STATE: Vibrant illuminated card revealing title & metrics ---
      const grad = ctx.createLinearGradient(0, 0, 512, 320);
      grad.addColorStop(0, "#1a1a24");
      grad.addColorStop(1, "#0d0d12");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 320);

      // High-contrast glowing border in active theme accent
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 508, 316);

      // Accent Corner Brackets
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 6;
      const cl = 26;
      ctx.beginPath(); ctx.moveTo(4, 4 + cl); ctx.lineTo(4, 4); ctx.lineTo(4 + cl, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(508 - cl, 4); ctx.lineTo(508, 4); ctx.lineTo(508, 4 + cl); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, 316 - cl); ctx.lineTo(4, 316); ctx.lineTo(4 + cl, 316); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(508 - cl, 316); ctx.lineTo(508, 316); ctx.lineTo(508, 316 - cl); ctx.stroke();

      // Header Tag: Solid Accent Pill
      ctx.fillStyle = accentColor;
      ctx.fillRect(24, 24, 84, 28);
      ctx.fillStyle = "#0a0a0d";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`// ${project.number}`, 32, 43);

      ctx.fillStyle = "#F3F4F6";
      ctx.font = "bold 13px monospace";
      ctx.fillText(project.category, 120, 43);

      // Divider Line
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(24, 66); ctx.lineTo(488, 66); ctx.stroke();
      ctx.globalAlpha = 1.0;

      // REVEALED TITLE: Bright White Bold Display
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 33px sans-serif";
      ctx.fillText(project.title, 24, 116);

      // Tagline
      ctx.fillStyle = "#D1D5DB";
      ctx.font = "16px sans-serif";
      ctx.fillText(project.tagline, 24, 152);

      // Metric Badge Box
      ctx.fillStyle = "rgba(52, 211, 153, 0.14)";
      ctx.fillRect(24, 182, 464, 48);
      ctx.strokeStyle = "#34D399";
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 182, 464, 48);

      ctx.fillStyle = "#34D399";
      ctx.font = "bold 17px monospace";
      ctx.fillText(`⚡ ${project.metrics}`, 40, 213);

      // Primary tech
      ctx.fillStyle = "#E5E7EB";
      ctx.font = "13px monospace";
      const primaryTech = project.tech.slice(0, 2).map((t) => `[${t}]`).join(" ");
      ctx.fillText(primaryTech, 24, 282);

      // Action Pill
      ctx.fillStyle = accentColor;
      ctx.fillRect(324, 256, 164, 38);
      ctx.fillStyle = "#0a0a0d";
      ctx.font = "bold 13px monospace";
      ctx.fillText("SPECIFICATION ↗", 338, 280);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

interface ProjectSpec {
  filename: string;
  lang: string;
  code: string;
  controlType: "slider" | "options" | "audio";
  controlTitle: string;
  options?: string[];
  sliderConfig?: { min: number; max: number; step: number; unit: string; default: number };
  audioPads?: { name: string; freq: number; desc: string }[];
  defaultPrimary: string;
  defaultSecondary: string;
  getResults: (input: any) => {
    primary: string;
    secondary: string;
    logs: string[];
  };
}

const PROJECT_SPECS: Record<string, ProjectSpec> = {
  "speculative-engine": {
    filename: "engine/drafter_verification.cu",
    lang: "CUDA C++",
    code: `__global__ void greedy_verify_kernel(
    const int32_t* __restrict__ draft_tokens,
    const float* __restrict__ target_logits,
    int32_t* __restrict__ accepted_mask,
    int k_speculative_tokens
) {
    int tid = blockIdx.x * blockDim.x + threadIdx.x;
    if (tid >= k_speculative_tokens) return;
    
    // Fast warp-level argmax reduction over target vocabulary
    int target_token = argmax_warp_reduce(target_logits + tid * VOCAB_SIZE);
    accepted_mask[tid] = (target_token == draft_tokens[tid]) ? 1 : 0;
}`,
    controlType: "slider",
    controlTitle: "Speculative Draft Window (K Tokens per Forward Pass)",
    sliderConfig: { min: 2, max: 8, step: 1, unit: "tokens", default: 5 },
    defaultPrimary: "2.42X Throughput Speedup",
    defaultSecondary: "Acceptance Rate: 78.4% // TTFT: 14.8ms",
    getResults: (val: number) => ({
      primary: `${(1.3 + val * 0.22).toFixed(2)}X Throughput Speedup`,
      secondary: `Acceptance Rate: ${Math.min(94, Math.max(60, 88 - val * 3.4)).toFixed(1)}% // TTFT: ${(22 - val * 1.4).toFixed(1)}ms`,
      logs: [
        `[DRAFTER] 1.3B lightweight drafter emitted ${val} candidate tokens in 3.1ms`,
        `[TARGET] 70B target model verified all ${val} tokens in single batch forward pass`,
        `[CUDA] Custom KV-cache permutation kernel completed with 0.00ms Host-to-Device stalls`,
      ],
    }),
  },
  "aegis-vision": {
    filename: "pipeline/trt_inference_shm.cpp",
    lang: "C++20 / TensorRT",
    code: `void EdgePipeline::process_frame_shm(int channel_id, const uint8_t* raw_nv12) {
    auto& ring = shm_rings_[channel_id];
    uint32_t slot = ring.acquire_write_slot();
    
    // Zero-copy direct transfer into GPU CUDA stream memory
    cudaMemcpyAsync(gpu_buffers_[slot], raw_nv12, FRAME_SIZE, cudaMemcpyDefault, stream_);
    trt_context_->enqueueV3(stream_);
    ring.commit_slot(slot);
}`,
    controlType: "options",
    controlTitle: "Edge Ingestion & Precision Profile",
    options: ["4 Feeds // FP32 Baseline", "8 Feeds // FP16 TensorRT", "16 Feeds // INT8 Calibrated"],
    defaultPrimary: "11.2ms E2E Latency",
    defaultSecondary: "16 Streams Synchronized @ 60 FPS // 13.8W Thermal",
    getResults: (opt: string) => {
      if (opt.includes("INT8")) {
        return {
          primary: "11.2ms E2E Latency",
          secondary: "16 Synchronized Feeds @ 60 FPS // 13.8W Envelope",
          logs: [
            "[POSIX] 16 NV12 ring buffers mapped into kernel shared memory",
            "[TensorRT] Calibrated INT8 engine executed across Jetson Orin DLA + Tensor cores",
            "[TELEMETRY] Zero dropped frames across 100,000 sustained input cycles",
          ],
        };
      }
      if (opt.includes("FP16")) {
        return {
          primary: "15.4ms E2E Latency",
          secondary: "8 Feeds @ 60 FPS // 18.2W Envelope",
          logs: [
            "[TensorRT] Half-precision FP16 tensor core acceleration active",
            "[SHM] 8 RTSP camera streams ingested with zero kernel copy overhead",
            "[DETECTION] Multi-class bounding boxes tracked with 99.4% association",
          ],
        };
      }
      return {
        primary: "24.6ms E2E Latency",
        secondary: "4 Feeds // Standard FP32 Profile",
        logs: [
          "[WARN] High latency baseline observed without INT8 dynamic calibration",
          "[INGEST] 4 RTSP feeds operating within safe memory bounds",
        ],
      };
    },
  },
  "khoros-log": {
    filename: "consensus/raft_wal_uring.go",
    lang: "Go / Linux io_uring",
    code: `func (r *RaftNode) AppendEntriesParallel(entries []LogEntry) error {
    sqe := r.ring.GetSQE()
    data := serializeEntriesBatch(entries)
    
    // Linux io_uring asynchronous disk submission bypassing kernel locks
    io_uring.PrepWrite(sqe, r.walFd, data, r.walOffset)
    r.ring.Submit()
    
    return r.replicateQuorumAsync(entries)
}`,
    controlType: "options",
    controlTitle: "Consensus Workload Simulation",
    options: ["Batch Append 100K Records", "Simulate Node Partition Failover", "io_uring SQPOLL Benchmark"],
    defaultPrimary: "1,240,000 Ops/Sec Replicated",
    defaultSecondary: "P99 Latency: 0.38ms // Zero Fsync Stalls",
    getResults: (opt: string) => {
      if (opt.includes("Failover")) {
        return {
          primary: "172ms Leader Election Recovery",
          secondary: "Vectorized Quorum Restored (3/3 Nodes)",
          logs: [
            "[RAFT] Node 2 heartbeat timeout triggered under simulated network drop",
            "[ELECTION] Node 1 voted Leader in term 48 with unanimous majority",
            "[WAL] Uncommitted tail log reconciled across surviving nodes with CRC32 pass",
          ],
        };
      }
      if (opt.includes("SQPOLL")) {
        return {
          primary: "1.42M IOPS Sustained",
          secondary: "Zero Syscall Overhead (Kernel Polling Thread Active)",
          logs: [
            "[io_uring] Submission queue polling thread active on dedicated isolated core",
            "[STORAGE] Direct I/O ring buffer write: 0.12ms disk barrier latency",
            "[QUORUM] Replicated commit acknowledgments dispatched via raw TCP",
          ],
        };
      }
      return {
        primary: "1,240,000 Ops/Sec Replicated",
        secondary: "P99 Latency: 0.38ms // Zero Fsync Stalls",
        logs: [
          "[WAL] Batched 4,096 entries into single io_uring submission ring",
          "[RAFT] Quorum ACK received in 0.88ms over 10GbE network fabric",
          "[DISK] Vectorized page write completed without fsync lock contention",
        ],
      };
    },
  },
  "axiom-box": {
    filename: "runtime/sandbox_seccomp.rs",
    lang: "Rust / Linux Namespaces",
    code: `pub fn apply_strict_seccomp_filter() -> Result<(), SandboxError> {
    let mut filter = SeccompFilter::new(Action::KillProcess)?;
    
    // Strict whitelist: permit only 12 deterministic POSIX system calls
    for syscall in [SYS_read, SYS_write, SYS_exit_group, SYS_futex, SYS_clock_gettime] {
        filter.allow_syscall(syscall)?;
    }
    filter.load()?;
    Ok(())
}`,
    controlType: "options",
    controlTitle: "Micro-VM Isolation & Sandbox Policy",
    options: ["Strict Seccomp-BPF + Cgroup v2", "Rootless Namespaces Only", "Full Micro-VM KVM Isolation"],
    defaultPrimary: "46ms Cold Start Boot Time",
    defaultSecondary: "Forbidden Syscalls Trapped: 18 // Leak: 0.00%",
    getResults: (opt: string) => ({
      primary: opt.includes("KVM") ? "42ms Micro-VM Cold Start" : "46ms Sandboxed Execution",
      secondary: "Syscalls Permitted: 12 // Hard RAM Clamp: 256MB",
      logs: [
        "[CGROUPS] Memory ceiling enforced via memory.high; CPU quota throttled",
        "[SECCOMP-BPF] Blocked unauthorized socket() and ptrace() invocation attempts",
        "[NETWORK] Zero-egress virtual bridge: 100% network packets dropped at boundary",
      ],
    }),
  },
  "tensor-mesh": {
    filename: "shaders/attention_matrix.wgsl",
    lang: "WGSL / WebGPU",
    code: `@compute @workgroup_size(16, 16)
fn compute_attention_nodes(@builtin(global_invocation_id) id: vec3<u32>) {
    let node_idx = id.x + id.y * 256u;
    if (node_idx >= total_attention_nodes) { return; }
    
    // Volumetric spatial coordinate simulation
    let q = query_weights[node_idx];
    let k = key_weights[node_idx];
    activation_grid[node_idx] = dot(q, k) * inverse_sqrt_d;
}`,
    controlType: "slider",
    controlTitle: "Spatial Attention Node Count (WebGPU Instancing)",
    sliderConfig: { min: 10000, max: 50000, step: 10000, unit: "nodes", default: 50000 },
    defaultPrimary: "120 FPS Sustained Volumetric Render",
    defaultSecondary: "Compute Pass: 6.4ms // 50,000 Spatial Nodes",
    getResults: (n: number) => ({
      primary: `${n >= 40000 ? "120" : "144"} FPS Sustained WebGPU`,
      secondary: `Compute Pass: ${(4.2 + (n / 50000) * 3.8).toFixed(1)}ms // ${n.toLocaleString()} Nodes`,
      logs: [
        `[WebGPU] Dispatched compute shader across ${Math.ceil(n / 256)} parallel workgroups`,
        `[RAYMARCH] Volumetric density heatmap generated directly on GPU`,
        `[VRAM] Total instanced GPU buffer footprint: ${(n * 0.0013 + 3.2).toFixed(1)}MB`,
      ],
    }),
  },
  "quanta-cache": {
    filename: "storage/lockfree_robinhood.cpp",
    lang: "C++20 Atomics",
    code: `template <typename K, typename V>
bool LockFreeTable<K, V>::put(const K& key, const V& val) {
    uint64_t hash = xxhash3_64(key);
    uint32_t bucket = hash & (capacity_ - 1);
    
    // Robin Hood displacement with atomic compare-exchange
    for (uint32_t dist = 0; dist < MAX_PROBE; ++dist) {
        Entry expected = empty_entry_;
        Entry new_entry = { key, val, dist };
        if (buckets_[bucket].compare_exchange_strong(expected, new_entry)) {
            return true;
        }
        bucket = (bucket + 1) & (capacity_ - 1);
    }
    return false;
}`,
    controlType: "options",
    controlTitle: "Concurrency Saturation Profile",
    options: ["16 Concurrent Workers", "64 Parallel Workers", "128 Threads (High Saturation)"],
    defaultPrimary: "3,420,000 Read QPS",
    defaultSecondary: "P99 Latency: 4.1μs // Lock Contention: 0%",
    getResults: (opt: string) => ({
      primary: opt.includes("128") ? "3,840,000 Read QPS" : "3,420,000 Read QPS",
      secondary: "P99 Latency: 4.1μs // Lock Contention: 0.0%",
      logs: [
        "[HUGEPAGES] Linux 2MB HugePages allocation: 0 TLB misses verified",
        "[DIRECT_IO] O_DIRECT bypasses standard kernel page cache overhead",
        "[ROBIN_HOOD] Average probe distance: 1.18 bucket hops under 90% load",
      ],
    }),
  },
  "aether-audio": {
    filename: "dsp/procedural_synthesizer.ts",
    lang: "TypeScript / Web Audio",
    code: `export function synthesizeClick(ctx: AudioContext, freq: number = 1150) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.045);
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}`,
    controlType: "audio",
    controlTitle: "Procedural Web Audio Haptic Synthesizer Pads",
    audioPads: [
      { name: "Sub Sweep", freq: 120, desc: "Low Bass Sine Burst" },
      { name: "Tactile Pop", freq: 440, desc: "A4 Pitch Tactile Impulse" },
      { name: "Cyber Pulse", freq: 880, desc: "Harmonic High-Pass Sine" },
      { name: "Mechanical Relay", freq: 1200, desc: "Micro-Burst Relay Click" },
    ],
    defaultPrimary: "0ms Network Overhead // Pure Math DSP",
    defaultSecondary: "Buffer Latency: <1.2ms // 44.1kHz Float32",
    getResults: (pad: any) => ({
      primary: `Synthesized ${pad.freq}Hz Frequency Waveform`,
      secondary: `${pad.desc} // 0 Bytes Network Load`,
      logs: [
        `[DSP] Web Audio oscillator triggered at ${pad.freq}Hz with ADSR envelope`,
        `[ENVELOPE] Exponential gain decay clamped to 0.001 within 45ms`,
        `[DAC] Audio PCM frames routed directly to client audio destination`,
      ],
    }),
  },
  "nebula-cluster": {
    filename: "controller/topology_scheduler.go",
    lang: "Go / Kubernetes Controller",
    code: `func (s *Scheduler) AllocateMIGSlices(pod *corev1.Pod) (*Allocation, error) {
    nodes := s.informer.GetActiveGPUNodes()
    
    // Prioritize co-located intra-node NVLink interconnects over PCIe
    sort.Slice(nodes, func(i, j int) bool {
        return s.calculateNVLinkAffinity(nodes[i]) > s.calculateNVLinkAffinity(nodes[j])
    })
    
    return s.sliceMIGProfile(nodes[0], pod.Spec.Resources)
}`,
    controlType: "options",
    controlTitle: "GPU Scheduling & Topology Policy",
    options: ["NVLink Co-location Priority", "MIG Dynamic Slicing", "Spot Preemption Rebalance"],
    defaultPrimary: "94.2% Sustained GPU Saturation",
    defaultSecondary: "All-Reduce Cross-Node Stalls Reduced By 38%",
    getResults: (opt: string) => ({
      primary: "94.2% Cluster Saturation",
      secondary: "Interconnect Overhead Reduced by 38%",
      logs: [
        "[CRD] 128x NVIDIA A100 SXM4 nodes evaluated via real-time DCGM telemetry",
        "[NVLink] High-bandwidth NVLink pairs assigned to distributed training jobs",
        "[PREEMPTION] Pre-flight checkpoints triggered on 2 spot reclaim notifications",
      ],
    }),
  },
};

export default function GlobeShowcase() {
  const { theme, config } = useTheme();
  const [viewMode, setViewMode] = useState<"globe" | "grid">("globe");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeExpandingMesh = useRef<{ mesh: THREE.Mesh; initialScale: THREE.Vector3; start: number } | null>(null);
  const globeRotationRef = useRef({ x: 0, y: 0 });

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"architecture" | "simulator" | "code">("architecture");
  const [sliderVal, setSliderVal] = useState<number>(5);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [simResults, setSimResults] = useState<{ primary: string; secondary: string; logs: string[] } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync interactive state when a project is selected
  useEffect(() => {
    if (selectedProject) {
      setActiveTab("architecture");
      const spec = PROJECT_SPECS[selectedProject.id];
      if (spec) {
        if (spec.sliderConfig) {
          setSliderVal(spec.sliderConfig.default);
        }
        if (spec.options && spec.options.length > 0) {
          setSelectedOption(spec.options[0]);
        }
        setSimResults({
          primary: spec.defaultPrimary,
          secondary: spec.defaultSecondary,
          logs: [
            `[STATUS] System initialized with ${spec.lang} runtime`,
            `[READY] Interactive benchmark pipeline awaiting dispatch`,
          ],
        });
      }
      setCopiedCode(false);
      setIsSimulating(false);
    }
  }, [selectedProject]);

  // Global ESC key listener to dismiss tile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        sound.playClick(600);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleRunSimulation = () => {
    if (!selectedProject) return;
    const spec = PROJECT_SPECS[selectedProject.id];
    if (!spec) return;
    setIsSimulating(true);
    sound.playClick(1050);

    setTimeout(() => {
      let input: any = sliderVal;
      if (spec.controlType === "options") input = selectedOption;
      const res = spec.getResults(input);
      setSimResults(res);
      setIsSimulating(false);
      sound.playClick(1200);
    }, 300);
  };

  const handleTriggerAudioPad = (pad: { name: string; freq: number; desc: string }) => {
    sound.playClick(pad.freq);
    if (!selectedProject) return;
    const spec = PROJECT_SPECS[selectedProject.id];
    if (!spec) return;
    const res = spec.getResults(pad);
    setSimResults(res);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    sound.playClick(1250);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  useEffect(() => {
    if (viewMode !== "globe") return;
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights with dynamic theme accent
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const themeColor = new THREE.Color(config.accent);

    const pointLight = new THREE.PointLight(themeColor, 2.5, 30);
    pointLight.position.set(5, 8, 12);
    scene.add(pointLight);

    // 3. Central Globe Group (restoring previous rotation so theme switch feels seamless)
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = globeRotationRef.current.x;
    globeGroup.rotation.y = globeRotationRef.current.y;
    scene.add(globeGroup);

    // Core Spherical Body (Ultra-transparent architectural dark glass sphere)
    const coreRadius = 4.8;
    const coreGeo = new THREE.SphereGeometry(coreRadius, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x07060b,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.38, // Significantly more transparent
      depthWrite: false, // Ensures cards inside or behind blend cleanly
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreSphere);

    // Delicate Wireframe Latitude & Longitude Geodesic Rings in theme accent
    const wireMat = new THREE.MeshBasicMaterial({
      color: themeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wireSphere = new THREE.Mesh(new THREE.SphereGeometry(coreRadius + 0.04, 32, 32), wireMat);
    globeGroup.add(wireSphere);

    // Orbit Ring Accents in theme accent
    for (let r = 0; r < 2; r++) {
      const ringGeo = new THREE.TorusGeometry(coreRadius + 0.15, 0.012, 16, 90);
      const ringMat = new THREE.MeshBasicMaterial({
        color: themeColor,
        transparent: true,
        opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (r * Math.PI) / 6;
      ringMesh.rotation.y = (r * Math.PI) / 4;
      globeGroup.add(ringMesh);
    }

    // 4. Distribute Project Cards via Fibonacci Golden Spiral
    // Card geometry is compact and small (1.65 x 1.03) compared to the sphere (radius 5.25)
    const cardPlacementRadius = 5.25;
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden angle
    const cardMeshes: THREE.Mesh[] = [];

    // Pre-cache idle and hover textures with active theme accent for instant 60fps transitions
    const textureMap = new Map<string, { idle: THREE.CanvasTexture; hover: THREE.CanvasTexture }>();
    PROJECTS.forEach((proj) => {
      textureMap.set(proj.id, {
        idle: createCardTexture(proj, config.accent, false),
        hover: createCardTexture(proj, config.accent, true),
      });
    });

    PROJECTS.forEach((proj, i) => {
      const y = 1 - (i / (PROJECTS.length - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const textures = textureMap.get(proj.id)!;
      const geo = new THREE.PlaneGeometry(1.65, 1.03);
      const mat = new THREE.MeshBasicMaterial({
        map: textures.idle,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.82,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x * cardPlacementRadius, y * cardPlacementRadius, z * cardPlacementRadius);

      // Orient mesh facing outward from sphere center
      mesh.lookAt(mesh.position.clone().multiplyScalar(2));
      mesh.userData = {
        project: proj,
        hoverProgress: 0,
        isHovered: false,
      };

      globeGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    // 5. Trackball Inertia Controller & Click Logic
    let isDragging = false;
    let startPointerPos = { x: 0, y: 0, time: 0 };
    let prevMouse = { x: 0, y: 0 };
    const velocity = { x: 0.0018, y: 0.0006 };
    const damping = 0.94;
    let hoveredMesh: THREE.Mesh | null = null;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startPointerPos = { x: e.clientX, y: e.clientY, time: Date.now() };
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) {
        // Raycasting for card hover
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersects = raycaster.intersectObjects(cardMeshes);

        let newHovered: THREE.Mesh | null = null;
        if (intersects.length > 0) {
          const hitCard = intersects[0].object as THREE.Mesh;
          const worldPos = new THREE.Vector3();
          hitCard.getWorldPosition(worldPos);

          // Front-facing cards only
          if (worldPos.z > -0.5) {
            newHovered = hitCard;
          }
        }

        if (newHovered !== hoveredMesh) {
          if (hoveredMesh) {
            // Restore idle texture
            const prevProj = hoveredMesh.userData.project;
            const textures = textureMap.get(prevProj.id);
            if (textures) {
              (hoveredMesh.material as THREE.MeshBasicMaterial).map = textures.idle;
              (hoveredMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
            }
            hoveredMesh.userData.isHovered = false;
          }

          if (newHovered) {
            // Swap to illuminated hover texture revealing title
            const newProj = newHovered.userData.project;
            const textures = textureMap.get(newProj.id);
            if (textures) {
              (newHovered.material as THREE.MeshBasicMaterial).map = textures.hover;
              (newHovered.material as THREE.MeshBasicMaterial).needsUpdate = true;
            }
            newHovered.userData.isHovered = true;
            sound.playHover();
          }

          hoveredMesh = newHovered;
        }

        container.style.cursor = hoveredMesh ? "pointer" : "grab";
        return;
      }

      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;

      velocity.x = dx * 0.0035;
      velocity.y = dy * 0.0035;

      prevMouse = { x: e.clientX, y: e.clientY };

      if (Math.abs(dx) > 10) {
        sound.playWhoosh(Math.abs(dx) / 25);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const dragDist = Math.hypot(e.clientX - startPointerPos.x, e.clientY - startPointerPos.y);
      const dragTime = Date.now() - startPointerPos.time;

      // Click detected if mouse moved less than 12px in under 600ms
      if (dragDist < 12 && dragTime < 600) {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersects = raycaster.intersectObjects(cardMeshes);

        // Find front-facing clicked card
        const frontHits = intersects.filter((hit) => {
          const wp = new THREE.Vector3();
          hit.object.getWorldPosition(wp);
          return wp.z > -1.0;
        });

        if (frontHits.length > 0) {
          const hitCard = frontHits[0].object as THREE.Mesh;
          const proj = hitCard.userData.project;
          if (proj) {
            // Ensure card shows full title & hover texture during the expansion burst
            const textures = textureMap.get(proj.id);
            if (textures) {
              (hitCard.material as THREE.MeshBasicMaterial).map = textures.hover;
              (hitCard.material as THREE.MeshBasicMaterial).needsUpdate = true;
            }

            // Trigger visual 3D card expansion pulse
            activeExpandingMesh.current = {
              mesh: hitCard,
              initialScale: hitCard.scale.clone(),
              start: Date.now(),
            };
            sound.playClick(1150);

            // Smoothly open expanded case study window after expansion burst
            setTimeout(() => {
              setSelectedProject(proj);
            }, 300);
          }
        }
      }

      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 6. Animation Loop with Depth Scaling, Hover Zoom & Smooth Expansion
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Apply rotation inertia
      globeGroup.rotation.y += velocity.x;
      globeGroup.rotation.x += velocity.y;

      if (!isDragging) {
        velocity.x *= damping;
        velocity.y *= damping;
        // Subtle continuous ambient spin
        if (Math.abs(velocity.x) < 0.0008) velocity.x = 0.0012;
      }

      const now = Date.now();

      // Update cards
      cardMeshes.forEach((mesh) => {
        // Smooth hover interpolation (lerp hoverProgress toward 1 if hovered, 0 otherwise)
        const targetHover = mesh.userData.isHovered ? 1.0 : 0.0;
        mesh.userData.hoverProgress += (targetHover - mesh.userData.hoverProgress) * 0.15;

        // If this mesh is currently undergoing an expansion click animation:
        if (activeExpandingMesh.current && activeExpandingMesh.current.mesh === mesh) {
          const elapsed = (now - activeExpandingMesh.current.start) / 1000;
          if (elapsed < 0.35) {
            // Smoothly swell the card out from 1.0 to 1.9x
            const progress = elapsed / 0.35;
            const easeOut = Math.sin((progress * Math.PI) / 2);
            const expandScale = 1.2 + easeOut * 0.75;
            mesh.scale.set(expandScale, expandScale, expandScale);
            return;
          }
        }

        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);

        // Base depth ratio
        const depthRatio = Math.max(0, Math.min(1, (worldPos.z + 5.25) / 10.5));
        const baseScale = 0.82 + depthRatio * 0.32;

        // Hover scale bonus: Grows in size slightly when hovered (+22%)
        const hoverBonus = mesh.userData.hoverProgress * 0.24;
        const finalScale = baseScale + hoverBonus;

        mesh.scale.set(finalScale, finalScale, finalScale);

        const mat = mesh.material as THREE.MeshBasicMaterial;
        // Idle opacity matches translucent globe, front card is bright, hover card is 100% solid
        if (mesh.userData.isHovered) {
          mat.opacity = 1.0;
        } else {
          mat.opacity = worldPos.z > -0.5 ? 0.85 : Math.max(0.2, depthRatio * 0.75);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      globeRotationRef.current = { x: globeGroup.rotation.x, y: globeGroup.rotation.y };
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode, theme, config.accent]);

  return (
    <section id="archive" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-theme-border">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-theme-border-subtle pb-8 mb-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-theme-accent">
            01 // COMPILED PRODUCTION ARTIFACTS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-theme-text">
            FEATURED WORKS
          </h2>
        </div>

        {/* Dual Mode Switcher Pill */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-theme-surface border border-theme-border shadow-lg">
          <button
            onClick={() => {
              setViewMode("globe");
              sound.playClick(850);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === "globe"
                ? "bg-theme-accent text-theme-bg shadow-[0_0_15px_var(--accent-glow)]"
                : "text-theme-muted hover:text-theme-text"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Sphere View</span>
          </button>
          <button
            onClick={() => {
              setViewMode("grid");
              sound.playClick(920);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === "grid"
                ? "bg-theme-accent text-theme-bg shadow-[0_0_15px_var(--accent-glow)]"
                : "text-theme-muted hover:text-theme-text"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* 1. GLOBE VIEW (Three.js 3D Spherical Showcase) */}
      {viewMode === "globe" && (
        <div className="relative w-full h-[650px] rounded-3xl bg-theme-surface/70 border border-theme-border overflow-hidden backdrop-blur-md shadow-2xl flex flex-col justify-between p-6">
          {/* Top HUD Telemetry */}
          <div className="flex items-center justify-between font-mono text-xs text-theme-muted z-10 pointer-events-none">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-theme-text font-bold">SPHERICAL 3D PROJECTION</span>
            </span>
            <span className="text-theme-dim hidden sm:inline">INERTIAL DYNAMICS</span>
          </div>

          {/* Three.js Container */}
          <div
            ref={containerRef}
            data-cursor="drag"
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
          />

          {/* Bottom Telemetry */}
          <div className="flex items-center justify-between font-mono text-[11px] text-theme-dim z-10 pointer-events-none">
            <span>FIBONACCI DISTRIBUTION N={PROJECTS.length} // ORBIT RADIUS: 5.25</span>
            <span>CARD SCALE: 1.65×1.03 // MOMENTUM ACTIVE</span>
          </div>
        </div>
      )}

      {/* 2. GRID VIEW (Architectural 2D Cards) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              onClick={() => {
                setSelectedProject(proj);
                sound.playClick(950);
              }}
              data-cursor="view"
              className="p-8 rounded-3xl bg-theme-surface/80 border border-theme-border hover:border-theme-accent/60 shadow-xl backdrop-blur-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[380px]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between font-mono text-xs text-theme-muted">
                  <span className="text-theme-accent font-bold">
                    REF: {proj.number} // {proj.category}
                  </span>
                  <span>{proj.year}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-theme-text group-hover:text-theme-accent transition-colors">
                  {proj.title}
                </h3>

                <p className="font-body text-theme-muted text-sm leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-6 border-t border-theme-border-subtle flex flex-col gap-4">
                <div className="p-3 rounded-xl bg-theme-card border border-theme-border-subtle flex items-center justify-between font-mono text-xs">
                  <span className="text-emerald-400 font-bold">{proj.metrics}</span>
                  <span className="text-theme-dim uppercase">PRODUCTION READY</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-theme-hover font-mono text-[10px] text-theme-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-theme-accent font-mono text-xs uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                    <span>INSPECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Case Study Modal Window mounted in React Portal to avoid header overlap */}
      {mounted && selectedProject && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => {
            setSelectedProject(null);
            sound.playClick(600);
          }}
        >
          <div
            className="relative w-full max-w-3xl my-auto rounded-3xl bg-theme-surface border border-theme-accent/50 p-6 sm:p-8 shadow-[0_0_60px_var(--accent-glow)] flex flex-col max-h-[86vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Modal Header */}
            <div className="border-b border-theme-border-subtle pb-6 mb-6">
              <span className="font-mono text-xs text-theme-accent font-bold uppercase tracking-widest block mb-1">
                CASE STUDY // {selectedProject.number}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-theme-text">
                {selectedProject.title}
              </h3>
              <span className="text-theme-muted font-body text-sm block mt-1">
                {selectedProject.tagline}
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-theme-card border border-theme-border-subtle mb-6">
              <button
                onClick={() => {
                  setActiveTab("architecture");
                  sound.playClick(900);
                }}
                className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                  activeTab === "architecture"
                    ? "bg-theme-accent text-theme-bg shadow-sm"
                    : "text-theme-muted hover:text-theme-text"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>01 Architecture</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("simulator");
                  sound.playClick(950);
                }}
                className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                  activeTab === "simulator"
                    ? "bg-theme-accent text-theme-bg shadow-sm"
                    : "text-theme-muted hover:text-theme-text"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>02 Live Simulator</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("code");
                  sound.playClick(1000);
                }}
                className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                  activeTab === "code"
                    ? "bg-theme-accent text-theme-bg shadow-sm"
                    : "text-theme-muted hover:text-theme-text"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>03 Kernel Spec</span>
              </button>
            </div>

            {/* TAB 1: Architecture Highlights */}
            {activeTab === "architecture" && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Metrics Ribbon with Quick Simulation jump */}
                <div
                  onClick={() => {
                    setActiveTab("simulator");
                    sound.playClick(950);
                  }}
                  className="p-4 rounded-2xl bg-theme-card border border-emerald-500/30 hover:border-emerald-500/60 font-mono text-sm text-emerald-400 font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>KEY PERFORMANCE: {selectedProject.metrics}</span>
                  </span>
                  <span className="text-xs text-theme-accent font-mono flex items-center gap-1 group-hover:underline">
                    <span>Live Simulator</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Detailed Description */}
                <div className="font-body text-theme-muted text-sm leading-relaxed">
                  <p>{selectedProject.description}</p>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-3 pt-2">
                  <span className="font-mono text-xs text-theme-text font-bold uppercase tracking-wider">
                    Engineering Architecture &amp; Key Highlights:
                  </span>
                  <ul className="space-y-2 font-mono text-xs text-theme-muted">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-theme-accent">▸</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-mono text-xs text-theme-text font-bold uppercase tracking-wider">
                    Target Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <button
                        key={t}
                        onClick={() => sound.playClick(1200)}
                        className="px-3 py-1 rounded-lg bg-theme-card hover:bg-theme-hover border border-theme-border-subtle font-mono text-xs text-theme-accent transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Live Benchmark & Simulator */}
            {activeTab === "simulator" && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Control Panel */}
                {PROJECT_SPECS[selectedProject.id] && (() => {
                  const spec = PROJECT_SPECS[selectedProject.id];
                  return (
                    <div className="p-5 rounded-2xl bg-theme-card border border-theme-border flex flex-col gap-4">
                      <div className="flex items-center justify-between font-mono text-xs text-theme-muted">
                        <span className="text-theme-text font-bold uppercase">{spec.controlTitle}</span>
                        <span className="text-theme-dim uppercase">REAL-TIME</span>
                      </div>

                      {/* Slider Control */}
                      {spec.controlType === "slider" && spec.sliderConfig && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-theme-muted">Parameter:</span>
                            <span className="text-theme-accent font-bold">
                              {sliderVal} {spec.sliderConfig.unit}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={spec.sliderConfig.min}
                            max={spec.sliderConfig.max}
                            step={spec.sliderConfig.step}
                            value={sliderVal}
                            onChange={(e) => {
                              setSliderVal(Number(e.target.value));
                              sound.playHover();
                            }}
                            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-theme-border rounded-lg"
                          />
                        </div>
                      )}

                      {/* Option Selector Control */}
                      {spec.controlType === "options" && spec.options && (
                        <div className="flex flex-wrap gap-2">
                          {spec.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setSelectedOption(opt);
                                sound.playClick(980);
                              }}
                              className={`px-3 py-2 rounded-xl font-mono text-xs font-medium border transition-all ${
                                selectedOption === opt
                                  ? "bg-theme-accent text-theme-bg border-theme-accent font-bold shadow-md"
                                  : "bg-theme-hover border-theme-border text-theme-muted hover:text-theme-text"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Audio Synthesizer Trigger Pads */}
                      {spec.controlType === "audio" && spec.audioPads && (
                        <div className="grid grid-cols-2 gap-3">
                          {spec.audioPads.map((pad) => (
                            <button
                              key={pad.name}
                              onClick={() => handleTriggerAudioPad(pad)}
                              className="p-3 rounded-xl bg-theme-hover hover:bg-theme-surface border border-theme-border hover:border-theme-accent transition-all text-left flex flex-col gap-1 group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-theme-text group-hover:text-theme-accent">
                                  {pad.name}
                                </span>
                                <Volume2 className="w-3.5 h-3.5 text-theme-accent" />
                              </div>
                              <span className="font-mono text-[11px] text-theme-muted">{pad.desc}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Run Simulation Action Button */}
                      {spec.controlType !== "audio" && (
                        <button
                          onClick={handleRunSimulation}
                          disabled={isSimulating}
                          className="mt-2 py-3 px-6 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                        >
                          <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? "animate-spin" : ""}`} />
                          <span>{isSimulating ? "Executing Workload..." : "Execute Benchmark Run ▶"}</span>
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Real-time Telemetry Terminal Output */}
                {simResults && (
                  <div className="p-5 rounded-2xl bg-[#0a0a0d] border border-theme-border-subtle flex flex-col gap-3 font-mono">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>SYSTEM TELEMETRY // REAL-TIME METRICS</span>
                      </div>
                      <span className="text-white/40 text-[10px]">P99 LATENCY ENGINE</span>
                    </div>

                    <div className="flex flex-col gap-1 py-1">
                      <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        ⚡ {simResults.primary}
                      </span>
                      <span className="text-xs text-white/70">
                        {simResults.secondary}
                      </span>
                    </div>

                    {/* Telemetry Log Stream */}
                    <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-1 text-[11px] text-white/60">
                      {simResults.logs.map((log, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400">›</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Kernel Spec */}
            {activeTab === "code" && PROJECT_SPECS[selectedProject.id] && (() => {
              const spec = PROJECT_SPECS[selectedProject.id];
              return (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  {/* Code Terminal Box */}
                  <div className="rounded-2xl bg-[#0a0a0d] border border-theme-border-subtle overflow-hidden">
                    {/* Terminal Top Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-white/10 font-mono text-xs">
                      <div className="flex items-center gap-2 text-white/80">
                        <Terminal className="w-3.5 h-3.5 text-theme-accent" />
                        <span className="font-bold">{spec.filename}</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-theme-muted uppercase">
                          {spec.lang}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(spec.code)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors text-xs font-mono"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY CODE</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Code Body */}
                    <pre className="p-4 sm:p-5 overflow-x-auto text-xs font-mono text-emerald-300/90 leading-relaxed max-h-[350px] overflow-y-auto">
                      <code>{spec.code}</code>
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-theme-border-subtle flex items-center justify-between">
              <a
                href={selectedProject.github || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-theme-accent text-theme-bg font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>View Source Repository</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="font-mono text-xs text-theme-muted">
                RELEASE // {selectedProject.year}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
