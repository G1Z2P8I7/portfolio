"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { sound } from "@/lib/audio";
import { Sparkles, RotateCcw, Hand } from "lucide-react";

interface BadgeItem {
  id: string;
  label: string;
  category: string;
  bg: string;
  color: string;
  border: string;
  width: number;
  height: number;
}

const BADGES: BadgeItem[] = [
  { id: "cuda", label: "CUDA C++", category: "GPU", bg: "#161b22", color: "#38bdf8", border: "#0284c7", width: 140, height: 44 },
  { id: "pytorch", label: "PyTorch", category: "ML", bg: "#1f1412", color: "#fb923c", border: "#ea580c", width: 130, height: 44 },
  { id: "threejs", label: "Three.js 3D", category: "Graphics", bg: "#181424", color: "#c084fc", border: "#9333ea", width: 150, height: 44 },
  { id: "iouring", label: "Linux io_uring", category: "Kernel", bg: "#111827", color: "#34d399", border: "#059669", width: 165, height: 44 },
  { id: "nextjs", label: "Next.js 15", category: "Frontend", bg: "#171717", color: "#f5f5f5", border: "#525252", width: 135, height: 44 },
  { id: "webgpu", label: "WebGPU / WGSL", category: "Compute", bg: "#0d1b1a", color: "#2dd4bf", border: "#0d9488", width: 165, height: 44 },
  { id: "tensorrt", label: "TensorRT", category: "Inference", bg: "#1c1917", color: "#a3e635", border: "#65a30d", width: 140, height: 44 },
  { id: "raft", label: "Raft Consensus", category: "Distributed", bg: "#1e1b4b", color: "#818cf8", border: "#4f46e5", width: 160, height: 44 },
  { id: "gsap", label: "GSAP Motion", category: "Animation", bg: "#141c14", color: "#4ade80", border: "#16a34a", width: 145, height: 44 },
  { id: "webaudio", label: "Web Audio DSP", category: "Acoustics", bg: "#261318", color: "#f472b6", border: "#db2777", width: 160, height: 44 },
  { id: "rust", label: "Rust Systems", category: "Runtimes", bg: "#1f1812", color: "#fdba74", border: "#c2410c", width: 150, height: 44 },
  { id: "docker", label: "Docker / k8s", category: "Infra", bg: "#0f172a", color: "#60a5fa", border: "#2563eb", width: 145, height: 44 },
];

export default function PhysicsLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; angle: number }>>({});
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [gravityDirection, setGravityDirection] = useState<"down" | "up">("down");

  const initPhysics = () => {
    const container = containerRef.current;
    if (!container) return;

    if (runnerRef.current && engineRef.current) {
      Matter.Runner.stop(runnerRef.current);
      Matter.Engine.clear(engineRef.current);
    }

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: gravityDirection === "down" ? 1 : -0.8, scale: 0.001 },
    });
    engineRef.current = engine;
    const world = engine.world;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Invisible boundary walls
    const wallThickness = 120;
    const wallOptions = { isStatic: true, restitution: 0.7, friction: 0.2 };

    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // Create physics bodies for badges with staggered drop positions
    const bodyMap = new Map<string, Matter.Body>();

    BADGES.forEach((badge, index) => {
      const startX = width * 0.15 + (Math.random() * (width * 0.7));
      const startY = 30 + (index * 45) % (height * 0.6);

      const body = Bodies.rectangle(startX, startY, badge.width, badge.height, {
        chamfer: { radius: badge.height / 2 },
        restitution: 0.75, // Playful rubbery bounce
        friction: 0.15,
        frictionAir: 0.015,
        density: 0.002,
        label: badge.id,
      });

      bodyMap.set(badge.id, body);
      Composite.add(world, body);
    });

    // Mouse & Touch Drag Constraint
    const mouse = Mouse.create(container);
    // Allow page scrolling on wheel without hijacking
    try {
      const internalMouse = mouse as unknown as { mousewheel: EventListener };
      if (internalMouse.mousewheel) {
        mouse.element.removeEventListener("mousewheel", internalMouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", internalMouse.mousewheel);
      }
    } catch {}

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });

    Composite.add(world, mouseConstraint);

    // Collision sound trigger
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        const vx = bodyA.velocity.x - (bodyB.velocity ? bodyB.velocity.x : 0);
        const vy = bodyA.velocity.y - (bodyB.velocity ? bodyB.velocity.y : 0);
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > 1.2) {
          sound.playCollision(speed);
        }
      }
    });

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    let animationFrameId: number;
    const updatePositions = () => {
      const next: Record<string, { x: number; y: number; angle: number }> = {};
      bodyMap.forEach((body, id) => {
        next[id] = {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
        };
      });
      setPositions(next);
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => {
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  };

  useEffect(() => {
    const cleanup = initPhysics();
    return () => {
      if (cleanup) cleanup();
    };
  }, [gravityDirection]);

  const toggleGravity = () => {
    sound.playClick(900);
    setGravityDirection((prev) => (prev === "down" ? "up" : "down"));
  };

  return (
    <section id="lab" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-theme-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-theme-border-subtle pb-8 mb-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-theme-accent">
            02 // R&amp;D INTERACTIVE SANDBOX
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-theme-text">
            PHYSICS &amp; LAB
          </h2>
        </div>
      </div>

      {/* Physics Interactive Container */}
      <div className="relative w-full rounded-3xl bg-theme-surface/70 border border-theme-border overflow-hidden backdrop-blur-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-xs text-theme-muted pb-4 border-b border-theme-border-subtle">
          <div className="flex items-center gap-2">
            <Hand className="w-4 h-4 text-theme-accent animate-pulse" />
            <span>MATTER.JS 2D RIGID-BODY ENGINE</span>
          </div>

          <button
            onClick={toggleGravity}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-surface hover:bg-theme-hover border border-theme-border hover:border-theme-accent/60 text-theme-text font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-theme-accent" />
            <span>Invert Gravity: {gravityDirection.toUpperCase()}</span>
          </button>
        </div>

        {/* Physics Canvas Stage */}
        <div
          ref={containerRef}
          className="relative w-full h-[460px] overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing"
        >
          {BADGES.map((badge) => {
            const pos = positions[badge.id];
            if (!pos) return null;

            return (
              <div
                key={badge.id}
                className="absolute flex items-center justify-between px-3.5 rounded-full font-mono text-xs font-bold shadow-lg pointer-events-auto border transition-shadow hover:shadow-2xl hover:brightness-110"
                style={{
                  width: `${badge.width}px`,
                  height: `${badge.height}px`,
                  backgroundColor: badge.bg,
                  color: badge.color,
                  borderColor: badge.border,
                  left: 0,
                  top: 0,
                  transform: `translate3d(${pos.x - badge.width / 2}px, ${
                    pos.y - badge.height / 2
                  }px, 0) rotate(${pos.angle}rad)`,
                  willChange: "transform",
                }}
              >
                <span>{badge.label}</span>
                <span className="text-[9px] opacity-70">#{badge.category}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Telemetry */}
        <div className="pt-4 border-t border-theme-border-subtle flex items-center justify-between font-mono text-[11px] text-theme-dim">
          <span>RESTITUTION: 0.75 // RUBBERY BOUNCE</span>
          <span>FRICTION AIR: 0.015</span>
        </div>
      </div>
    </section>
  );
}
