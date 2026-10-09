# Architectural Systems Portfolio // Sumit Gupta

> **High-Performance Systems & Machine Learning Infrastructure Portfolio**  
> *Production Artifacts, Distributed Runtimes, Real-Time Edge Vision, and Low-Level Kernels.*

---

## 1. Executive Summary & Design Philosophy

This portfolio is engineered as a high-density, interactive technical artifact reflecting core software engineering and systems performance principles. Rather than relying on generic templates, the application features custom WebGL spatial visualizations, rigid-body physics, procedural Web Audio haptics, and a dynamic multi-palette brutalist design system.

- **Zero Asset Overhead**: Audio effects, mathematical lattices, and animations are procedurally generated in client code without external audio files or heavy 3D asset bundles.
- **Microsecond Tactility**: Interactive mechanical clicks, sweeps, and hover ticks synthesized in real time via the Web Audio API.
- **True Stacking Isolation**: High-priority modal dialogs leverage React Portals (`createPortal`) at `z-[99999]` to guarantee complete independence from parent DOM stacking contexts.
- **Fluid Continuity**: State transitions (e.g., color scheme switching, inertial drag momentum, modal scaling) preserve rotational angles and canvas states seamlessly.

---

## 2. Tech Stack & Dependencies

### Core Framework & Runtimes
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `15.1.7` | React server/client framework, App Router, static generation |
| **React & React DOM** | `^19.0.0` | Declarative UI layer, Portal rendering, concurrent rendering |
| **TypeScript** | `^5.7.3` | Strict type safety across components, 3D math, and event models |
| **Tailwind CSS** | `^3.4.17` | Utility-first CSS engine driven by custom CSS theme variables |

### Graphics, Physics & Audio
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Three.js** | `^0.173.0` | WebGL 3D scene: Fibonacci golden spiral, raycasting, dynamic canvas textures |
| **Matter.js** | `^0.20.0` | 2D rigid-body engine: grab/fling dynamics, wall collisions, gravity inversion |
| **Web Audio API** | Native Browser | Custom procedural synthesizer (`lib/audio.ts`) for zero-asset haptics |
| **Lenis** | `^1.1.18` | Smooth momentum scrolling engine with nested modal scroll trapping |
| **Lucide React** | `^0.468.0` | Monochromatic technical iconography |

---

## 3. What Was Implemented & How It Works

### A. Dynamic Theme Engine (`lib/theme.tsx`)
- **Architecture**: A centralized React context provider (`ThemeProvider`) orchestrates 5 brutalist theme palettes via CSS custom properties on `document.documentElement` (`data-theme`):
  1. `01 Carbon // Midnight`: Electric Violet (`#8B5CF6`)
  2. `02 Concrete // Brutalist`: Monolithic Platinum (`#E2E8F0`)
  3. `03 Rust // Terracotta`: Warm Ochre (`#F97316`)
  4. `04 Emerald // Cybernetic`: Cyan Emerald (`#10B981`)
  5. `05 Crimson // High-Contrast`: Vivid Scarlet (`#EF4444`)
- **Real-Time Synchronizations**:
  - Dynamically injects an inline SVG data URI into `<link rel="icon">` so the browser tab's favicon color and number badge update instantaneously.
  - Persists the selected mode across sessions using `localStorage`.
  - Re-tints Three.js point lights, geodesic wireframe rings, orbital geometry, and 2D canvas card textures on the fly.

### B. 3D Fibonacci Sphere Showcase (`components/GlobeShowcase.tsx`)
- **Mathematical Distribution**: Project cards are positioned along a spherical surface of radius $R = 5.25$ using the Fibonacci Golden Spiral:
  $$\phi = \pi (\sqrt{5} - 1), \quad y_i = 1 - \frac{2i}{N-1}, \quad r_i = \sqrt{1 - y_i^2}, \quad \theta_i = \phi \cdot i$$
  $$x_i = r_i \cos(\theta_i), \quad z_i = r_i \sin(\theta_i)$$
- **Inertial Trackball Controller**: Custom pointer event listeners compute drag displacement $\Delta x, \Delta y$, translating movement into angular velocity with exponential friction damping ($0.94$). Orientation is preserved across theme changes via `globeRotationRef`.
- **Procedural Canvas Textures (`createCardTexture`)**:
  - **Idle State**: High-definition translucent dark glass HUD displaying the theme accent border, serial pill, category, and build year.
  - **Hover State**: High-contrast glowing border, full bold typography, key performance metrics, and stack pills.
- **Deep Raycasting**: A `THREE.Raycaster` projects NDC mouse coordinates through the camera frustum, distinguishing front-facing cards ($z > -0.5$) and interpolating scale ($+22\%$) with tactile hover sound feedback.

### C. Case Study Modal with Interactive Telemetry
- **Stacking Independence**: Mounted directly to `document.body` via `createPortal` with `z-[99999]`, preventing underlap behind the floating header.
- **Clean Dismissal**: Removed manual cross buttons in favor of standard web behavior—clicking anywhere on the backdrop closes the tile (`e.stopPropagation()` on modal contents) alongside `Escape` key listening.
- **3-Tab Architectural Module**:
  1. `01 Architecture`: Project description, architecture bullet points, interactive stack badges with click feedback.
  2. `02 Live Simulator`: Real-time interactive benchmark consoles tailored to each project:
     - *Speculative Decoding*: Slider adjusting draft token window $K \in [2, 8]$ calculating throughput speedup and acceptance rates.
     - *AegisVision*: Edge ingest toggles (FP32 baseline, FP16, calibrated INT8) simulating E2E latencies and thermal dissipation.
     - *KhorosLog*: Workload scenarios (100K batch appends, node partition failovers, io_uring SQPOLL).
     - *AxiomBox*: Sandboxing profile selector (Seccomp-BPF + Cgroup v2 vs. Micro-VM KVM).
     - *TensorMesh*: Instanced spatial node slider (10K–50K nodes on WebGPU).
     - *QuantaCache*: Concurrency threads selector (16 to 128 workers) measuring lock-free QPS.
     - *AetherSynth*: **4 Real Web Audio trigger pads** (Sub Sweep 120Hz, Tactile Pop 440Hz, Cyber Pulse 880Hz, Mechanical Relay 1200Hz) that synthesize real audio tones directly through the browser's audio context.
     - *Nebula Sched*: Cluster topology optimization selector.
  3. `03 Kernel Spec`: Monospace source code terminal displaying actual runtime code (CUDA, C++, Rust, Go, WGSL) with an interactive **COPY CODE** button.

### D. Procedural Audio Engine (`lib/audio.ts`)
- **Zero Asset Strategy**: Employs browser-native `AudioContext` and procedural sine wave oscillators with exponential ADSR gain curves:
  - `playClick(freq)`: Synthesizes high-frequency mechanical tactile pulses (default: 820Hz).
  - `playHover()`: Micro-burst frequency ramp from 1400Hz to 800Hz in 15ms.
  - `playWhoosh(speed)`: Low-frequency resonant frequency sweep accompanying inertial sphere rotation.
  - `playClink(intensity)`: High-resonance collision clicks triggered on Matter.js rigid-body impacts.
- **Audio State Safety**: Handles auto-unlock on first user interaction, muted preference persistence in `localStorage`, and master gain clamping.

### E. Matter.js Physics Lab (`components/PhysicsLab.tsx`)
- **Rigid-Body Simulation**: Interactive 2D sandbox containing skill pills enclosed within static boundary walls.
- **Mouse Constraint & Sound**: Users can grab, toss, and fling badges. Every body collision calculates relative kinetic energy and triggers `sound.playClink()`.
- **Integrated Gravity Inversion**: The `Invert Gravity: UP / DOWN` control button is integrated directly into the container HUD bar, reversing the gravitational vector $g_y$ across the simulation on click.

### F. Hero, Dossier & Interactive Résumé
- **Isolated Hitboxes**: Headline hover triggers are isolated to target elements (`w-fit`), preventing false aura activations when hovering nearby text.
- **Medium-Sized Résumé Modal**: Integrated directly into the dossier and contact sections. Contains full academic credentials (VIT Class of 2027), production experience, research publications, and skills, equipped with independent scroll trapping (`data-lenis-prevent="true"`).
- **Verified Contacts**: Integrated verified contact channels:
  - Email: `22guptasumit@gmail.com`
  - GitHub: [G1Z2P8I7](https://github.com/G1Z2P8I7)
  - LinkedIn: [Sumit Gupta](https://www.linkedin.com/in/sumit-gupta-a2bbb1423/)

---

## 4. Directory & Project Structure

```
F:\Portfolio\
├── app/
│   ├── favicon.ico
│   ├── globals.css           # Global typography, color token variables, scrollbar styling
│   ├── layout.tsx            # Root layout wrapped in ThemeProvider with Lenis scroll
│   └── page.tsx              # Main orchestrator mounting all sections
├── components/
│   ├── Cursor.tsx            # Custom mouse follower and drag/view aura
│   ├── Footer.tsx            # Monochromatic telemetry footer
│   ├── GlobeShowcase.tsx     # 3D Fibonacci sphere, cards, and interactive case study modals
│   ├── Header.tsx            # Fixed glassmorphism navigation, IST clock, theme & audio controls
│   ├── Hero.tsx              # Primary statement, bio, quick CTAs, and telemetry tags
│   ├── InteractiveBackground.tsx # Ambient canvas grid particle field
│   ├── PhysicsLab.tsx        # Matter.js 2D sandbox with gravity inversion
│   ├── SmoothScroll.tsx      # Lenis smooth-scrolling wrapper
│   ├── TechnicalMatrix.tsx   # Architectural capabilities & 10-node experiment matrix
│   └── TerminalContact.tsx   # Contact form, direct links, and scrollable Résumé modal
├── lib/
│   ├── audio.ts              # Procedural Web Audio API sound controller
│   └── theme.tsx             # 5-palette theme engine, localStorage sync, dynamic favicon
├── public/                   # Static public assets
├── package.json              # Project dependencies & build scripts
├── tailwind.config.ts        # Custom font families, theme color mappings, and keyframes
└── tsconfig.json             # TypeScript configuration
```

---

## 5. Development & Build Commands

```powershell
# 1. Install dependencies
pnpm install

# 2. Run local development server (http://localhost:3000)
pnpm dev

# 3. Compile optimized production build
pnpm build

# 4. Preview production build
pnpm start
```

---

*Compiled for Draft 1 // Sumit Gupta Portfolio.*
