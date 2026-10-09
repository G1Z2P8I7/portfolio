<div align="center">

# ⚡ Architectural Systems Portfolio // Sumit Gupta

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

**Production Artifacts · Machine Learning Infrastructure · Distributed Runtimes · Low-Level Kernels**

[Explore Projects](#3-projects-featured) • [System Architecture](#2-system-architecture--key-features) • [Tech Stack](#4-tech-stack--dependencies) • [Quick Start](#5-quick-start--local-development)

---

</div>

## 📌 Overview

This portfolio is an interactive technical artifact reflecting core software engineering and systems performance principles. Rather than relying on generic static layouts, the application integrates client-side WebGL spatial computing, rigid-body physics, procedural zero-asset audio haptics, and a brutalist design system.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SYSTEM ARCHITECTURE                             │
│                                                                             │
│   [ Three.js 3D Lattice ] ───► [ Dynamic Canvas HUD ] ───► [ React Portal ] │
│             │                                                     │         │
│             ▼                                                     ▼         │
│   [ Matter.js 2D Physics ]   [ Web Audio Synthesizer ]   [ Live Telemetry ] │
│   (Gravity Invertible)       (Zero-Asset Haptics)        (Benchmark Runner) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Technical Highlights

| Feature | Tech Stack | Engineering Highlights |
| :--- | :--- | :--- |
| **3D Fibonacci Spatial Lattice** | Three.js / GLSL | Mathematical spherical distribution ($N=8$, Golden Ratio $\phi$), dynamic canvas texture synthesis, raycasted hover expansion, momentum inertia tracking. |
| **Zero-Asset Procedural Audio** | Web Audio API | Client-side DSP synthesis generating micro-burst sine waves, ADSR envelopes, and collision frequencies with 0 KB asset download footprint. |
| **2D Rigid-Body Physics Lab** | Matter.js | Interactive physics sandbox with momentum grab/fling dynamics, wall collision audio synthesis, and dynamic gravity vector inversion ($\pm g_y$). |
| **Portal-Isolated Telemetry** | React Portals | Modal dialogs mounted at `z-[99999]` into `document.body` to eliminate parent stacking context conflicts and header overlap. |
| **Dynamic 5-Palette Design System** | Tailwind CSS / CSS Vars | Theme token architecture supporting 5 brutalist modes with real-time SVG favicon re-rendering and Three.js material synchronization. |

---

## 🛠️ Featured Systems & Projects

### `01` Speculative Decoding Engine
`CUDA` `C++20` `vLLM` `FlashAttention-2` `PyTorch`
- **Metric**: `+58.4% TTFT // 2.4X Throughput Multiplier`
- Accelerated transformer inference on NVIDIA A100 via a 1.3B drafter model verified in single-pass greedy-$K$ tree validation.
- Custom fused CUDA kernels eliminating host-to-device memory stalls.

### `02` AegisVision Edge Pipeline
`TensorRT` `C++` `POSIX Shm` `GStreamer` `OpenCV`
- **Metric**: `11.2ms E2E Latency // 16 Synchronized 1080p Feeds`
- Multi-camera object detection and telemetry system with dynamic INT8 precision calibration on NVIDIA Jetson AGX Orin.
- Zero-copy ring buffers utilizing POSIX shared memory for frame passing.

### `03` KhorosLog Distributed Commit Log
`Go` `Raft` `Linux io_uring` `gRPC` `Protobuf`
- **Metric**: `1.2M OPS/SEC // <180ms Leader Failover`
- Replicated write-ahead log bypassing kernel `fsync` lock contention using asynchronous Linux `io_uring` submission queues.
- Vectorized quorum replication over raw TCP ring buffers with CRC32 integrity validation.

### `04` AxiomBox Micro-VM Sandbox
`Rust` `Seccomp-BPF` `Cgroups v2` `KVM` `Linux Namespaces`
- **Metric**: `46ms Cold Start // Rootless Micro-VM Isolation`
- Rootless multi-tenant execution runtime restricting untrusted binaries to 12 deterministic POSIX system calls.

---

## 💻 Tech Stack & Dependencies

```
Runtime:         Next.js 15.1.7 (App Router, Turbopack Ready)
UI Layer:        React 19.0.0, TypeScript 5.7.3
Styling:         Tailwind CSS 3.4.17, PostCSS, Custom Design Tokens
Spatial Graphics: Three.js 0.173.0 (WebGL Frustum Raycasting, Instancing)
Physics Engine:  Matter.js 0.20.0 (2D Rigid-Body Dynamics)
Audio Synthesis: Web Audio API (Native OscillatorNode, GainNode ADSR)
Smooth Scroll:   Lenis 1.1.18 (Scroll-Lock Compatible)
Icons:           Lucide React 0.468.0
```

---

## 🎨 Brutalist Theme Palettes

The portfolio includes an instant theme engine with synchronized SVG browser favicons:

- 🟣 **01 Carbon // Midnight** — Electric Violet (`#8B5CF6`)
- ⚪ **02 Concrete // Brutalist** — Monolithic Platinum (`#E2E8F0`)
- 🟠 **03 Rust // Terracotta** — Warm Ochre (`#F97316`)
- 🟢 **04 Emerald // Cybernetic** — Cyan Emerald (`#10B981`)
- 🔴 **05 Crimson // High-Contrast** — Vivid Scarlet (`#EF4444`)

---

## ⚡ Quick Start & Local Development

### Prerequisites
- Node.js `18.x` or higher
- `pnpm` (recommended) or `npm`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/G1Z2P8I7/portfolio.git
cd portfolio

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and optimize production build
pnpm build

# Run production server
pnpm start
```

---

## 👤 Author

**Sumit Gupta**  
*Computer Science & Engineering // Vellore Institute of Technology (Class of 2027)*

- **GitHub**: [@G1Z2P8I7](https://github.com/G1Z2P8I7)
- **LinkedIn**: [Sumit Gupta](https://www.linkedin.com/in/sumit-gupta-a2bbb1423/)
- **Email**: `22guptasumit@gmail.com`

---

<div align="center">
<sub>Engineered with Next.js 15, Three.js, Matter.js & Web Audio API. Draft 1.</sub>
</div>
