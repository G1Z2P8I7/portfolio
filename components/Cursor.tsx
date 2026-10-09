"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { sound } from "@/lib/audio";
import { MessageSquare, X } from "lucide-react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [postedMessages, setPostedMessages] = useState<
    Array<{ id: number; text: string; x: number; y: number }>
  >([]);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device - if so, don't hijack with custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08,
          ease: "none",
        });
      }
    };

    // Smooth ring damping loop
    let rafId: number;
    const updateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(updateRing);
    };

    rafId = requestAnimationFrame(updateRing);
    window.addEventListener("mousemove", onMouseMove);

    // Global Key Listener for Figma Cursor Chat ("/")
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isChatOpen) {
        // Prevent typing '/' into other inputs
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        setIsChatOpen(true);
        sound.playClick(960);
        setTimeout(() => chatInputRef.current?.focus(), 50);
      } else if (e.key === "Escape" && isChatOpen) {
        setIsChatOpen(false);
        sound.playClick(600);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // Global Hover Delegate for interactive links and project cards
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        if (type === "view") {
          setCursorText("VIEW");
          setIsHovered(true);
        } else if (type === "drag") {
          setCursorText("DRAG");
          setIsHovered(true);
        } else if (type === "pointer") {
          setIsHovered(true);
        }
      } else {
        const isClickable = (e.target as HTMLElement).closest("a, button, [role='button']");
        if (isClickable) {
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isChatOpen]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    sound.playClick(1100);
    setPostedMessages((prev) => [
      ...prev.slice(-4), // keep last 5
      {
        id: Date.now(),
        text: chatMessage.trim(),
        x: mousePos.current.x + 20,
        y: mousePos.current.y + 10,
      },
    ]);
    setChatMessage("");
    setIsChatOpen(false);
  };

  return (
    <>
      {/* 1. Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-theme-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />

      {/* 2. Inertial Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-200 ease-out flex items-center justify-center hidden md:flex ${
          isHovered
            ? cursorText
              ? "w-16 h-16 bg-theme-accent/20 border-theme-accent shadow-[0_0_25px_var(--accent-glow)]"
              : "w-10 h-10 bg-theme-accent/10 border-theme-accent"
            : "w-7 h-7 border-theme-border/60"
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] tracking-widest text-theme-text font-bold">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Figma Cursor Chat Input Bubble */}
      {isChatOpen && (
        <form
          onSubmit={handleSendChat}
          style={{
            position: "fixed",
            left: `${mousePos.current.x + 16}px`,
            top: `${mousePos.current.y + 16}px`,
          }}
          className="z-[10000] flex items-center gap-1.5 p-1 rounded-full bg-theme-surface border border-theme-accent shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="w-5 h-5 rounded-full bg-theme-accent/20 flex items-center justify-center text-theme-accent ml-1">
            <MessageSquare className="w-3 h-3" />
          </div>
          <input
            ref={chatInputRef}
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type a note & Enter..."
            className="bg-transparent text-xs text-theme-text placeholder:text-theme-muted/50 outline-none px-2 py-1 w-48 font-mono"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setIsChatOpen(false)}
            className="text-theme-muted hover:text-theme-text p-1 pr-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {/* 4. Floating Chat Sticky Notes on Canvas */}
      {postedMessages.map((msg) => (
        <div
          key={msg.id}
          style={{ left: `${msg.x}px`, top: `${msg.y}px` }}
          className="fixed z-[9990] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-card/90 border border-theme-accent/40 text-theme-text font-mono text-xs shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-ping" />
          <span>{msg.text}</span>
        </div>
      ))}
    </>
  );
}
