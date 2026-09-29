"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type GraphNode = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  angle: number;
  speed: number;
  r: number;
  phase: number;
  hub: boolean;
  label: string;
};

type Pulse = {
  from: GraphNode;
  to: GraphNode;
  t0: number;
  duration: number;
  rgb: string;
};

type Link = { a: GraphNode; b: GraphNode };

const TAU = Math.PI * 2;
const LINK_DIST = 150;
const POINTER_DIST = 200;
const TRACE_RGB = "94,234,212";
const VERDICT_RGB = "245,181,68";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function GraphField({ labels }: { labels: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();
  const labelsRef = useRef(labels);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hubLabels = (labelsRef.current ?? []).slice(0, 14);
    const monoVar = getComputedStyle(document.body).getPropertyValue("--font-mono").trim();
    const mono = monoVar || "ui-monospace, SFMono-Regular, Menlo, monospace";

    let w = 0;
    let h = 0;
    let raf = 0;
    let cancelled = false;
    let visible = true;
    let lastSpawn = 0;
    let scrollY = window.scrollY;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;

    const regulars: GraphNode[] = [];
    const hubs: GraphNode[] = [];
    const all: GraphNode[] = [];
    const links: Link[] = [];
    const pulses: Pulse[] = [];

    function makeNode(hub: boolean, label: string): GraphNode {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        sx: 0,
        sy: 0,
        angle: Math.random() * TAU,
        speed: 0.08 + Math.random() * 0.27,
        r: hub ? 4 + Math.random() * 1.5 : 1.6 + Math.random() * 1.0,
        phase: Math.random() * TAU,
        hub,
        label,
      };
    }

    // (Re)seed nodes; on resize keep existing nodes and scale them proportionally.
    function layout(fresh: boolean, prevW: number, prevH: number) {
      const wantRegular = clamp(Math.round((w * h) / 11000), 45, 140);
      if (fresh) {
        regulars.length = 0;
        hubs.length = 0;
        for (let i = 0; i < wantRegular; i++) regulars.push(makeNode(false, ""));
        for (const label of hubLabels) hubs.push(makeNode(true, label));
      } else {
        const kx = prevW > 0 ? w / prevW : 1;
        const ky = prevH > 0 ? h / prevH : 1;
        for (const n of regulars) {
          n.x *= kx;
          n.y *= ky;
        }
        for (const n of hubs) {
          n.x *= kx;
          n.y *= ky;
        }
        while (regulars.length < wantRegular) regulars.push(makeNode(false, ""));
        if (regulars.length > wantRegular) regulars.length = wantRegular;
      }
      all.length = 0;
      for (const n of regulars) all.push(n);
      for (const n of hubs) all.push(n);
    }

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(animate: boolean, now: number) {
      const t = now / 1000;
      const offset = h > 0 ? (((-scrollY * 0.12) % h) + h) % h : 0;

      if (animate) {
        for (const n of all) {
          n.angle += (Math.random() - 0.5) * 0.12;
          n.x += Math.cos(n.angle) * n.speed;
          n.y += Math.sin(n.angle) * n.speed;
          if (n.x < -40) n.x += w + 80;
          else if (n.x > w + 40) n.x -= w + 80;
          if (n.y < -40) n.y += h + 80;
          else if (n.y > h + 40) n.y -= h + 80;
        }
      }

      for (const n of all) {
        n.sx = n.x;
        n.sy = h > 0 ? (((n.y + offset) % h) + h) % h : n.y;
      }

      if (animate && pointerActive) {
        for (const n of all) {
          const dx = n.sx - pointerX;
          const dy = n.sy - pointerY;
          const d = Math.hypot(dx, dy);
          if (d < 60) {
            const push = (1 - d / 60) * 1.2;
            const ux = d > 0.01 ? dx / d : Math.cos(n.phase);
            const uy = d > 0.01 ? dy / d : Math.sin(n.phase);
            n.x += ux * push;
            n.y += uy * push;
            n.sx = n.x;
            n.sy = h > 0 ? (((n.y + offset) % h) + h) % h : n.y;
          }
        }
      }

      ctx!.clearRect(0, 0, w, h);

      // Regular links on wrapped (drawn) positions.
      links.length = 0;
      ctx!.lineWidth = 1;
      for (let i = 0; i < all.length; i++) {
        const a = all[i];
        for (let j = i + 1; j < all.length; j++) {
          const b = all[j];
          const dx = b.sx - a.sx;
          const dy = b.sy - a.sy;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            links.push({ a, b });
            ctx!.beginPath();
            ctx!.moveTo(a.sx, a.sy);
            ctx!.lineTo(b.sx, b.sy);
            ctx!.strokeStyle = `rgba(${TRACE_RGB},${0.28 * (1 - d / LINK_DIST)})`;
            ctx!.stroke();
          }
        }
      }

      // Hub clusters: each hub links to its 3 nearest regular nodes.
      ctx!.strokeStyle = `rgba(${TRACE_RGB},0.18)`;
      for (const hub of hubs) {
        let b1: GraphNode | null = null;
        let b2: GraphNode | null = null;
        let b3: GraphNode | null = null;
        let d1 = 320;
        let d2 = 320;
        let d3 = 320;
        for (const n of regulars) {
          const d = Math.hypot(n.sx - hub.sx, n.sy - hub.sy);
          if (d <= 320 && d >= d3) continue;
          if (d < d1) {
            d3 = d2;
            b3 = b2;
            d2 = d1;
            b2 = b1;
            d1 = d;
            b1 = n;
          } else if (d < d2) {
            d3 = d2;
            b3 = b2;
            d2 = d;
            b2 = n;
          } else if (d < d3) {
            d3 = d;
            b3 = n;
          }
        }
        const nearest = [b1, b2, b3];
        for (const n of nearest) {
          if (!n) continue;
          ctx!.beginPath();
          ctx!.moveTo(hub.sx, hub.sy);
          ctx!.lineTo(n.sx, n.sy);
          ctx!.stroke();
        }
      }

      // Pointer as a node.
      if (animate && pointerActive) {
        for (const n of all) {
          const dx = n.sx - pointerX;
          const dy = n.sy - pointerY;
          const d = Math.hypot(dx, dy);
          if (d < POINTER_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(pointerX, pointerY);
            ctx!.lineTo(n.sx, n.sy);
            ctx!.strokeStyle = `rgba(${VERDICT_RGB},${0.45 * (1 - d / POINTER_DIST)})`;
            ctx!.stroke();
          }
        }
      }

      for (const n of all) {
        if (n.hub) {
          const r = animate ? n.r * (1 + 0.15 * Math.sin(t * 1.1 + n.phase)) : n.r;
          const g = ctx!.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, 18);
          g.addColorStop(0, "rgba(94,234,212,0.25)");
          g.addColorStop(1, "rgba(94,234,212,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, 18, 0, TAU);
          ctx!.fill();
          ctx!.fillStyle = "#5EEAD4";
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, r, 0, TAU);
          ctx!.fill();
          if (n.label) {
            ctx!.font = `11px ${mono}`;
            ctx!.textAlign = "left";
            ctx!.textBaseline = "middle";
            ctx!.fillStyle = "rgba(231,234,243,0.55)";
            ctx!.fillText(n.label, n.sx + 10, n.sy + 1);
          }
        } else {
          ctx!.fillStyle = "rgba(139,147,167,0.75)";
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, n.r, 0, TAU);
          ctx!.fill();
        }
      }

      if (!animate) return;

      if (now - lastSpawn > 250 && pulses.length < 16 && links.length > 0) {
        const link = links[Math.floor(Math.random() * links.length)];
        pulses.push({
          from: link.a,
          to: link.b,
          t0: now,
          duration: 700 + Math.random() * 600,
          rgb: Math.random() < 0.7 ? TRACE_RGB : VERDICT_RGB,
        });
        lastSpawn = now;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const progress = (now - p.t0) / p.duration;
        if (progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        for (let k = 0; k < 3; k++) {
          const pk = progress - k * 0.045;
          if (pk < 0) continue;
          const x = p.from.sx + (p.to.sx - p.from.sx) * pk;
          const y = p.from.sy + (p.to.sy - p.from.sy) * pk;
          ctx!.beginPath();
          ctx!.arc(x, y, 2.4 - k * 0.6, 0, TAU);
          ctx!.fillStyle = `rgba(${p.rgb},${0.9 - k * 0.3})`;
          ctx!.fill();
        }
      }
    }

    function step() {
      if (cancelled) return;
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(step);
        return;
      }
      draw(true, performance.now());
      raf = requestAnimationFrame(step);
    }

    function onResize() {
      const prevW = w;
      const prevH = h;
      sizeCanvas();
      layout(false, prevW, prevH);
      if (reduced) draw(false, performance.now());
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerActive = true;
    }

    function onPointerGone() {
      pointerX = -9999;
      pointerY = -9999;
      pointerActive = false;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerGone);
    window.addEventListener("blur", onPointerGone);

    sizeCanvas();
    layout(true, 0, 0);
    scrollY = window.scrollY;

    if (reduced) {
      draw(false, performance.now());
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerGone);
      window.removeEventListener("blur", onPointerGone);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="graph-veil pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
