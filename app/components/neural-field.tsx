"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId: number;
    let running = true;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      r: number;
      isAgent: boolean;
    }

    interface Pulse {
      progress: number;
      from: Node;
      to: Node;
      startTime: number;
      duration: number;
    }

    const nodes: Node[] = [];
    const pulses: Pulse[] = [];
    let pointerX = -9999;
    let pointerY = -9999;
    let lastPulseTime = 0;

    function init() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes.length = 0;
      const area = width * height;
      const count = Math.min(Math.max(Math.floor(area / 16000), 28), 90);

      for (let i = 0; i < count; i++) {
        const baseVx = (Math.random() - 0.5) * 0.2 + 0.05;
        const baseVy = (Math.random() - 0.5) * 0.2 + 0.05;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          r: 1 + Math.random() * 0.8,
          isAgent: Math.random() < 0.12,
        });
      }
    }

    function draw(animate: boolean) {
      ctx!.clearRect(0, 0, width, height);

      if (animate) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;

          const dx = pointerX - n.x;
          const dy = pointerY - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 170 && dist > 0) {
            const force = 0.6 * (1 - dist / 170);
            const nudgeX = (dx / dist) * force;
            const nudgeY = (dy / dist) * force;
            n.x += nudgeX;
            n.y += nudgeY;
          }

          if (n.x < 0) {
            n.x = 0;
            n.vx = Math.abs(n.vx);
          } else if (n.x > width) {
            n.x = width;
            n.vx = -Math.abs(n.vx);
          }
          if (n.y < 0) {
            n.y = 0;
            n.vy = Math.abs(n.vy);
          } else if (n.y > height) {
            n.y = height;
            n.vy = -Math.abs(n.vy);
          }

          const speed = Math.hypot(n.vx, n.vy);
          if (speed > 0.25) {
            n.vx = (n.vx / speed) * 0.25;
            n.vy = (n.vy / speed) * 0.25;
          }

          n.vx += (n.baseVx - n.vx) * 0.02;
          n.vy += (n.baseVy - n.vy) * 0.02;
        }

        const now = performance.now();
        if (now - lastPulseTime > 700 && pulses.length < 6) {
          const links: Array<{ from: Node; to: Node; dist: number }> = [];
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[j].x - nodes[i].x;
              const dy = nodes[j].y - nodes[i].y;
              const dist = Math.hypot(dx, dy);
              if (dist < 140) links.push({ from: nodes[i], to: nodes[j], dist });
            }
          }
          if (links.length > 0) {
            const link = links[Math.floor(Math.random() * links.length)];
            pulses.push({
              progress: 0,
              from: link.from,
              to: link.to,
              startTime: now,
              duration: 900,
            });
            lastPulseTime = now;
          }
        }

        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          const elapsed = now - p.startTime;
          p.progress = Math.min(elapsed / p.duration, 1);
          const x = p.from.x + (p.to.x - p.from.x) * p.progress;
          const y = p.from.y + (p.to.y - p.from.y) * p.progress;
          ctx!.beginPath();
          ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx!.fillStyle = "#F5B544";
          ctx!.fill();
          if (p.progress >= 1) pulses.splice(i, 1);
        }
      }

      const linkAlphaBase = 0.1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const pdx = pointerX - (a.x + b.x) * 0.5;
            const pdy = pointerY - (a.y + b.y) * 0.5;
            const pDist = Math.hypot(pdx, pdy);
            const brighten = pDist < 170 ? 1 + (1 - pDist / 170) * 2 : 1;
            const alpha = linkAlphaBase * (1 - dist / 140) * brighten;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(94, 234, 212, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        if (n.isAgent) {
          const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r + 6);
          grad.addColorStop(0, "rgba(94, 234, 212, 0.15)");
          grad.addColorStop(1, "rgba(94, 234, 212, 0)");
          ctx!.fillStyle = grad;
          ctx!.fill();
          ctx!.fillStyle = "#5EEAD4";
        } else {
          ctx!.fillStyle = "rgba(139, 147, 167, 0.5)";
        }
        ctx!.fill();
      }
    }

    function step() {
      if (!running) return;

      if (!visibleRef.current || document.hidden) {
        rafId = requestAnimationFrame(step);
        return;
      }

      draw(true);
      rafId = requestAnimationFrame(step);
    }

    function onResize() {
      init();
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const rect = canvas!.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    }

    function onPointerLeave() {
      pointerX = -9999;
      pointerY = -9999;
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    window.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);

    init();

    if (reduced) {
      running = false;
      draw(false);
    } else {
      rafId = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      canvas!.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}