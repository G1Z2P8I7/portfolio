/**
 * Central portfolio data — generated from Sumit Gupta's resume.
 * Every fact on the site comes from this file.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Sumit Gupta',
  displayName: 'Sumit Gupta',
  firstName: 'SUMIT',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A GUPTA ORIGINAL',
  role: 'Systems & Machine Learning Engineer',
  tagline: ['Systems & Machine Learning', 'LLM Inference', 'Distributed Systems'],
  intro:
    'Computer Science undergraduate at Vellore Institute of Technology (B.Tech, 2027) focused on systems and machine learning, with hands-on experience building LLM inference servers, distributed systems with Raft consensus, real-time computer vision pipelines, and fairness-audited ML risk models. Python, C++, and Go developer.',
  location: 'Bokaro Steel City, Jharkhand, India',
  email: '22guptasumit@gmail.com',
  phone: '+91 7061781052',
  links: {
    linkedin: 'https://linkedin.com/in/sumit-gupta-a2bbb1423',
    github: 'https://github.com/G1Z2P8I7',
  },
  resumePdf: '/assets/Sumit_Gupta_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Sumit Gupta',
  },
  interests: ['LLM Serving & Compilers', 'Distributed Consensus (Raft/Paxos)', 'High-Performance GPU Computing'],
};

export const education = [
  {
    school: 'Vellore Institute of Technology (VIT)',
    place: 'Vellore, Tamil Nadu, India',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
    period: '2023 – Expected 2027',
    score: 'CGPA 7.81 / 10',
  },
];

export const experience = [
  {
    company: 'SAIL (Steel Authority of India Ltd.)',
    role: 'Software Engineering / Data Science Intern',
    place: 'Bokaro, India',
    period: 'June 2024 – August 2024',
    points: [
      'Built and benchmarked Python data extraction pipelines for high-frequency industrial telemetry, increasing end-to-end processing throughput by 35%.',
      'Automated data integrity validation across cross-departmental datasets, reducing manual auditing effort by 40%.',
      'Refactored legacy SQL queries and data models with senior engineers, eliminating database ingestion bottlenecks around large operational logs.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'adaptive-speculative-llm',
    title: 'Adaptive Speculative LLM Serving Engine',
    year: '2025',
    genre: 'Systems • LLM Inference • CUDA',
    logline: 'Local LLM inference server with entropy-guided dynamic draft lengths (SVIP) and zero-fragmentation KV-cache rollback.',
    stack: ['Python', 'PyTorch', 'CUDA', 'FastAPI', 'Llama-3.1-8B', 'Qwen2.5 0.5B'],
    build: [
      'Built a local LLM inference server with entropy-guided dynamic draft lengths (SVIP), stopping speculative decoding early when token confidence drops and reducing wasted compute.',
      'Implemented an O(1) KV-cache rollback mechanism for an 8GB VRAM setup, reusing allocated memory to avoid fragmentation and repeated tensor reallocation.',
      'Achieved a relatively higher token generation throughput than the autoregressive baseline while preserving the target model’s output through lossless verification.',
    ],
    features: [
      'Entropy-guided dynamic draft lengths (SVIP)',
      'O(1) KV-cache rollback without tensor reallocation',
      'Tailored for 8GB VRAM GPU memory envelope',
      'Lossless verification against Llama-3.1-8B baseline',
      'High-concurrency asynchronous FastAPI gateway',
    ],
    metrics: [
      { value: '2.4X', label: 'throughput multiplier' },
      { value: '8GB', label: 'VRAM target setup' },
      { value: 'O(1)', label: 'KV-cache rollback' },
      { value: '100%', label: 'lossless output verification' },
    ],
    github: 'https://github.com/G1Z2P8I7',
    palette: { from: '#1a0826', via: '#5f187a', to: '#09050d', accent: '#d465ff' },
    motif: 'flow',
  },
  {
    id: 'khoroslog',
    title: 'KhorosLog: Distributed Fault-Tolerant Commit Log',
    year: '2024',
    genre: 'Distributed Systems • Raft • Storage Engine',
    logline: 'Distributed write-ahead log and event streaming engine in Go using Raft consensus, mmap I/O, and 80K+ durable writes/sec.',
    stack: ['Go', 'Raft', 'TCP', 'mmap', 'CRC32'],
    build: [
      'Built a distributed write-ahead log and event streaming engine in Go using Raft consensus, with randomized election timers and automatic leader failover under 150ms.',
      'Added memory-mapped file I/O and a binary sparse index, reaching 80,000+ durable writes per second in benchmarks.',
      'Designed a custom binary wire protocol over TCP with CRC32 checksums, achieving relatively higher serialization throughput of JSON over HTTP in benchmarks.',
    ],
    features: [
      'Raft distributed consensus with randomized election timers',
      'Leader failover guaranteed under 150ms',
      'Memory-mapped file I/O with binary sparse indexing',
      'Custom zero-alloc binary TCP wire protocol with CRC32',
    ],
    metrics: [
      { value: '80K+', label: 'durable writes / second' },
      { value: '<150ms', label: 'leader failover' },
      { value: 'Zero-Copy', label: 'mmap page cache indexing' },
      { value: 'CRC32', label: 'integrity verification' },
    ],
    github: 'https://github.com/G1Z2P8I7',
    palette: { from: '#021815', via: '#0a5245', to: '#040b09', accent: '#2ee6b0' },
    motif: 'tenants',
  },
  {
    id: 'aegisvision',
    title: 'AegisVision: Real-Time Multi-Stream Vision Pipeline',
    year: '2024',
    genre: 'Computer Vision • Edge AI • TensorRT',
    logline: 'Zero-copy video analytics engine processing 6 concurrent 1080p RTSP feeds at 60+ FPS with sub-80ms glass-to-glass latency.',
    stack: ['C++', 'Python', 'TensorRT', 'OpenCV', 'WebRTC', 'ByteTrack'],
    build: [
      'Built a video analytics engine processing 6 concurrent 1080p RTSP streams at 60+ FPS, using zero-copy shared-memory ring buffers to reduce Python GIL overhead and avoid frame drops.',
      'Used TensorRT FP16 dynamic batching on an NVIDIA RTX 4060 GPU to accelerate YOLO object detection; added ByteTrack tracking and geofencing for safety zone intrusion detection.',
      'Added WebRTC (aiortc) for video streaming and WebSocket telemetry, achieving under 80ms glass-to-glass latency.',
    ],
    features: [
      '6 concurrent 1080p RTSP streams at 60+ FPS',
      'Zero-copy POSIX shared-memory ring buffers',
      'TensorRT FP16 dynamic batching on NVIDIA RTX 4060',
      'WebRTC streaming with <80ms glass-to-glass latency',
      'ByteTrack multi-object tracking and safety geofencing',
    ],
    metrics: [
      { value: '6 Feeds', label: 'concurrent 1080p RTSP' },
      { value: '60+ FPS', label: 'real-time stream speed' },
      { value: '<80ms', label: 'glass-to-glass latency' },
      { value: 'RTX 4060', label: 'TensorRT FP16 batching' },
    ],
    github: 'https://github.com/G1Z2P8I7',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ff9d2b' },
    motif: 'shield',
  },
  {
    id: 'readmitiq',
    title: 'ReadmitIQ: 30-Day Hospital Readmission Risk Prediction',
    year: '2024',
    genre: 'Clinical ML • Fairness Auditing • Calibration',
    logline: 'Calibrated clinical readmission risk model on a 69,987-patient cohort with demographic fairness mitigation.',
    stack: ['Python', 'FastAPI', 'Streamlit', 'SHAP', 'Equalized Odds', 'Scikit-Learn'],
    build: [
      'Built a readmission risk model on a 69,987-patient cohort (8.99% baseline readmission rate), reaching 0.1385 test PR-AUC.',
      'Captured 34.5% of readmissions in the top 20% highest-risk patients (1.73× lift) with calibrated probabilities (ECE 0.0062).',
      'Audited fairness across race and applied Equalized Odds mitigation, cutting the false-positive-rate gap from 5.07% to 0.17% and the true-positive-rate gap from 6.10% to 3.85%.',
    ],
    features: [
      'Trained on 69,987 clinical patient records',
      'Isotonic calibration achieving 0.0062 ECE',
      'Equalized Odds fairness mitigation',
      'FastAPI inference endpoint + Streamlit clinician dashboard',
      'SHAP & LIME local interpretability explanations',
    ],
    metrics: [
      { value: '69,987', label: 'patient cohort' },
      { value: '1.73×', label: 'top 20% risk lift' },
      { value: '0.0062', label: 'calibrated ECE score' },
      { value: '0.17%', label: 'mitigated FPR gap' },
    ],
    github: 'https://github.com/G1Z2P8I7',
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#38bdf8' },
    motif: 'flow',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'sail-throughput',
    title: '+35% Data Throughput',
    org: 'SAIL (Steel Authority of India Ltd.)',
    detail: 'Engineered Python extraction pipelines for high-frequency industrial telemetry, increasing end-to-end processing throughput by 35%.',
    laurel: 'Industrial Impact',
  },
  {
    id: 'dsa-problems',
    title: '150+ Problems Solved',
    org: 'LeetCode • CodeChef',
    detail: 'Mastered data structures & algorithms covering dynamic programming, graph theory, trees, and concurrency.',
    laurel: 'Algorithms & Problem Solving',
    link: 'https://github.com/G1Z2P8I7',
  },
  {
    id: 'sail-audit',
    title: '40% Manual Effort Reduction',
    org: 'SAIL Data Science',
    detail: 'Automated data integrity validation across cross-departmental datasets, eliminating manual auditing overhead.',
    laurel: 'Automation Milestone',
  },
  {
    id: 'campus-leadership',
    title: 'Logistics & Staging Coordinator',
    org: 'Event Management Club, VIT',
    detail: 'Coordinated infrastructure, logistics, and live stage management for university gatherings with 500+ attendees.',
    laurel: 'Campus Leadership',
  },
];

export type Certification = { issuer: string; name: string; link?: string };

export const certifications: Certification[] = [
  { issuer: 'SAIL', name: 'Software Engineering / Data Science Internship Certificate' },
  { issuer: 'VIT', name: 'B.Tech Computer Science & Engineering (In Progress)' },
  { issuer: 'LeetCode', name: '150+ Solved Algorithms Milestone' },
  { issuer: 'NVIDIA / CUDA', name: 'Accelerated Computing & TensorRT Foundations' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'High-performance & systems languages',
    skills: [
      { name: 'Python', mono: 'Py', note: 'Primary' },
      { name: 'C++', mono: 'C++', note: 'Systems' },
      { name: 'Go', mono: 'Go', note: 'Distributed' },
      { name: 'TypeScript', mono: 'TS' },
      { name: 'JavaScript', mono: 'JS' },
      { name: 'C', mono: 'C' },
      { name: 'SQL', mono: 'SQL' },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & AI',
    subtitle: 'LLM inference, CUDA & Computer Vision',
    skills: [
      { name: 'PyTorch', mono: 'Pt' },
      { name: 'CUDA', mono: 'Cu' },
      { name: 'TensorRT', mono: 'Tr' },
      { name: 'ONNX Runtime', mono: 'Ox' },
      { name: 'Hugging Face', mono: 'Hf' },
      { name: 'Speculative Decoding', mono: 'Sd' },
      { name: 'PagedAttention', mono: 'Pa' },
      { name: 'OpenCV', mono: 'Cv' },
      { name: 'YOLO', mono: 'Yo' },
      { name: 'ByteTrack', mono: 'Bt' },
      { name: 'SHAP / LIME', mono: 'Sh' },
      { name: 'Fairness Auditing', mono: 'Fa' },
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Distributed Computing',
    subtitle: 'Consensus, concurrency & low latency',
    skills: [
      { name: 'Distributed Systems', mono: 'Ds' },
      { name: 'Raft Consensus', mono: 'Rf' },
      { name: 'Write-Ahead Log (WAL)', mono: 'Wl' },
      { name: 'Multithreading', mono: 'Mt' },
      { name: 'Memory-Mapped I/O', mono: 'Mm' },
      { name: 'IPC / Shared Memory', mono: 'Sh' },
      { name: 'gRPC / Protobuf', mono: 'gR' },
      { name: 'WebRTC / WebSockets', mono: 'Wc' },
      { name: 'TCP/IP Sockets', mono: 'Sk' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Infrastructure',
    subtitle: 'Microservices & production stores',
    skills: [
      { name: 'FastAPI', mono: 'Fa' },
      { name: 'Node.js / Express', mono: 'Ex' },
      { name: 'Next.js', mono: 'Nx' },
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'SQLite', mono: 'Sq' },
      { name: 'Redis', mono: 'Rd' },
      { name: 'Docker', mono: 'Dk' },
      { name: 'Linux', mono: 'Lx' },
      { name: 'Git / GitHub', mono: 'Gt' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Core CS Foundations',
    subtitle: 'Theory & engineering rigor',
    skills: [
      { name: 'Data Structures & Algorithms', mono: 'Da' },
      { name: 'Operating Systems', mono: 'Os' },
      { name: 'Database Systems', mono: 'Db' },
      { name: 'Performance Optimization', mono: 'Po' },
      { name: 'Benchmarking & Profiling', mono: 'Bm' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  Python: ['Adaptive Speculative LLM', 'ReadmitIQ', 'SAIL Telemetry Pipeline'],
  'C++': ['AegisVision RTSP Pipeline', 'Zero-Copy Ring Buffers'],
  Go: ['KhorosLog Commit Log', 'Raft Consensus Engine'],
  CUDA: ['Adaptive Speculative LLM Serving Engine', 'KV-cache Rollback'],
  PyTorch: ['Adaptive Speculative LLM', 'ReadmitIQ Risk Model'],
  TensorRT: ['AegisVision FP16 Dynamic Batching on RTX 4060'],
  'Raft Consensus': ['KhorosLog <150ms Leader Failover'],
  FastAPI: ['Adaptive Speculative LLM Gateway', 'ReadmitIQ API'],
  PostgreSQL: ['SAIL telemetry logs & queries optimization'],
  Docker: ['AegisVision containerized inference', 'FastAPI microservices'],
  'Data Structures & Algorithms': ['150+ LeetCode & CodeChef Problems', 'O(1) KV-Cache Rollback'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Academic Arc',
    period: '2023 – Present',
    synopsis: 'Computer Science and Engineering at Vellore Institute of Technology (VIT), focusing on core systems and algorithmic discipline.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Entering Vellore',
        description: 'B.Tech in Computer Science and Engineering at VIT Vellore (CGPA 7.81 / 10). Deep dives into Operating Systems, DBMS, and Network Protocols.',
        tags: ['VIT', 'B.Tech CSE', 'Operating Systems'],
        runtime: '2023 – Present',
        palette: violet,
      },
      {
        code: 'S01 E02',
        title: 'The Algorithmic Grind',
        description: 'Conquered 150+ problems on LeetCode and CodeChef, tackling Dynamic Programming, Graph Traversals, and Concurrency problems.',
        tags: ['LeetCode', 'CodeChef', 'DSA'],
        runtime: '150+ Solved',
        palette: jade,
      },
    ],
  },
  {
    number: 2,
    title: 'Industrial Heavy Machinery',
    period: 'Summer 2024',
    synopsis: 'Software Engineering and Data Science internship at SAIL (Steel Authority of India Ltd.), Bokaro Steel Plant.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'Industrial Telemetry',
        description: 'Architected Python extraction pipelines for high-frequency industrial telemetry, accelerating end-to-end processing throughput by 35%.',
        tags: ['SAIL', '+35% Throughput', 'Python Telemetry'],
        runtime: 'Jun – Aug 2024',
        palette: amber,
      },
      {
        code: 'S02 E02',
        title: 'Automating the Forge',
        description: 'Automated data validation across departmental feeds, slashing manual auditing effort by 40% and refactoring legacy SQL bottlenecks.',
        tags: ['SQL Refactoring', 'Data Quality', 'Automation'],
        runtime: 'Bokaro Steel City',
        palette: crimson,
      },
    ],
  },
  {
    number: 3,
    title: 'The Systems & AI Productions',
    period: '2024 – 2025',
    synopsis: 'Building production-grade distributed consensus engines, LLM speculative decoders, and real-time edge vision pipelines.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Inference Accelerator',
        description: 'Adaptive Speculative LLM Serving Engine with entropy-guided SVIP dynamic draft lengths and O(1) KV-cache rollback.',
        tags: ['CUDA', 'PyTorch', 'LLM Serving'],
        runtime: '2.4X Speedup',
        palette: violet,
      },
      {
        code: 'S03 E02',
        title: 'The Replicated Log',
        description: 'KhorosLog — distributed write-ahead log in Go with Raft consensus, mmap page cache, and 80,000+ writes/second.',
        tags: ['Go', 'Raft Consensus', '80K Writes/sec'],
        runtime: '<150ms Failover',
        palette: jade,
      },
      {
        code: 'S03 E03',
        title: 'Zero-Copy Vision',
        description: 'AegisVision — 6 concurrent 1080p RTSP streams processed at 60+ FPS via TensorRT FP16 batching and shared-memory buffers.',
        tags: ['C++', 'TensorRT', 'WebRTC'],
        runtime: '<80ms Latency',
        palette: ocean,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary Focus', title: 'Systems & ML', detail: 'LLM inference servers • Distributed Raft • C++/CUDA/Go', palette: violet },
  { label: 'Flagship LLM Original', title: 'Speculative LLM', detail: 'Entropy-guided SVIP • O(1) KV rollback', palette: crimson },
  { label: 'Distributed Systems', title: 'KhorosLog', detail: 'Raft consensus in Go • 80,000+ writes/sec', palette: jade },
  { label: 'Real-Time Edge AI', title: 'AegisVision', detail: '6x 1080p @ 60 FPS • TensorRT FP16 • <80ms', palette: amber },
  { label: 'Clinical ML', title: 'ReadmitIQ', detail: '69,987 patients • Fair & Calibrated risk model', palette: ocean },
  { label: 'Industrial Experience', title: 'SAIL Internship', detail: '+35% processing throughput • Bokaro Plant', palette: amber },
  { label: 'Academic Base', title: 'VIT Vellore', detail: 'B.Tech Computer Science & Engineering (2027)', palette: violet },
  { label: 'Algorithmic Rigor', title: '150+ Solved', detail: 'LeetCode & CodeChef graphs, DP & concurrency', palette: jade },
  { label: 'Hardware Acceleration', title: 'CUDA & TensorRT', detail: 'FP16 dynamic batching on NVIDIA RTX 4060', palette: crimson },
  { label: 'Location & Origins', title: 'Bokaro Steel City', detail: 'Jharkhand, India • Open for global engineering roles', palette: ocean },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Identity',
    title: 'Sumit Gupta',
    lines: ['Computer Science Undergraduate at VIT Vellore (2027)', 'Systems & Machine Learning Engineer'],
    chips: ['B.Tech CSE', 'VIT Vellore', 'SAIL Intern'],
  },
  {
    kicker: 'Flagship Systems',
    title: 'High-Performance & Low-Latency',
    lines: [
      'Adaptive Speculative LLM — Entropy-guided SVIP & O(1) KV rollback',
      'KhorosLog — Raft consensus commit log with 80,000+ writes/sec in Go',
      'AegisVision — 6 concurrent 1080p RTSP feeds at 60+ FPS via TensorRT',
    ],
    chips: ['CUDA', 'Go', 'C++', 'TensorRT', 'PyTorch'],
  },
  {
    kicker: 'Industrial Experience',
    title: 'SAIL Bokaro Steel Plant',
    lines: [
      'Software Engineering & Data Science Intern (Summer 2024)',
      'Increased industrial telemetry data throughput by +35%',
      'Automated cross-departmental auditing, reducing manual overhead by 40%',
    ],
  },
  {
    kicker: 'Machine Learning & AI',
    title: 'Rigorous & Fair AI',
    lines: [
      'ReadmitIQ — 69,987 patient risk model with Equalized Odds fairness',
      'Calibrated ECE 0.0062 with 1.73× lift in top risk quintile',
      'Local explainability using SHAP and LIME',
    ],
  },
  {
    kicker: 'Problem Solving',
    title: '150+ DSA Solutions',
    lines: [
      'LeetCode and CodeChef problem solving',
      'Deep focus on dynamic programming, graph theory, and thread concurrency',
    ],
  },
];

export type ProfileId = 'sumit' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'sumit',
    name: 'Sumit',
    blurb: 'The full cinematic series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, SAIL experience & metrics first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'originals', 'skills', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Systems Engineer',
    blurb: 'CUDA, Raft commit log & C++ vision first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'ML Researcher',
    blurb: 'Speculative decoding & fairness audits first',
    color: '#ffb547',
    order: ['originals', 'picks', 'moments', 'journey', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Background & Systems Focus', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • Industrial & Academic Arcs`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Flagship Originals • 2024–2025`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 Highlights from the Resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories • Systems & AI`, palette: ocean },
  moments: { nav: 'Moments', card: 'Impact & Moments', meta: `${achievements.length} Milestones • SAIL & Algorithmic`, palette: crimson },
  story: { nav: 'Resume', card: 'The Screenplay', meta: 'Full Resume • View & Download', palette: violet },
};
