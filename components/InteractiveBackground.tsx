"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates in window space (smoothed)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    // Generate responsive ambient floating neural nodes
    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      const count = Math.min(75, Math.floor((width * height) / 20000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.35 + 0.15,
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth mouse interpolation (spring inertia)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. COMPACT SUBTLE CURSOR SPOTLIGHT
      // Soft, localized halo strictly centered around the pointer without washing out distant text
      const maxSpotlightRadius = Math.min(220, Math.min(width, height) * 0.28);
      const auroraGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        maxSpotlightRadius
      );
      auroraGradient.addColorStop(0, "rgba(139, 92, 246, 0.12)");
      auroraGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.04)");
      auroraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. SECONDARY AMBIENT FLOATING COLOR ORBS (Deep aesthetic breathing)
      const time = Date.now() * 0.0006;
      const orb1X = width * 0.25 + Math.sin(time) * 120;
      const orb1Y = height * 0.35 + Math.cos(time * 0.8) * 90;
      const orbGrad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, width * 0.45);
      orbGrad1.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      orbGrad1.addColorStop(0.8, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orbGrad1;
      ctx.fillRect(0, 0, width, height);

      const orb2X = width * 0.75 + Math.cos(time * 0.9) * 140;
      const orb2Y = height * 0.65 + Math.sin(time * 0.7) * 110;
      const orbGrad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, width * 0.45);
      orbGrad2.addColorStop(0, "rgba(139, 92, 246, 0.07)");
      orbGrad2.addColorStop(0.8, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orbGrad2;
      ctx.fillRect(0, 0, width, height);

      // 3. INTERACTIVE NEURAL CONSTELLATION NODES & CONNECTORS
      const maxConnectDist = 120;
      const cursorDistMax = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Mouse gentle deflection
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < cursorDistMax && distMouse > 1) {
          const force = (1 - distMouse / cursorDistMax) * 0.3;
          p.x += (dxMouse / distMouse) * force;
          p.y += (dyMouse / distMouse) * force;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const proximityBoost = distMouse < cursorDistMax ? (1 - distMouse / cursorDistMax) * 0.4 : 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.baseAlpha + proximityBoost)})`;
        ctx.fill();

        // Connect nearby nodes only to each other (no laser line attached to the mouse pointer)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Architectural Dot Matrix Overlay */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 mix-blend-screen" />
    </div>
  );
}
