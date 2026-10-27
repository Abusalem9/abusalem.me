"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const TRAIL = 16;

type Point = { x: number; y: number };
type Burst = { x: number; y: number; t: number };

/**
 * Spider-Man web cursor:
 * A web strand trails the pointer, spider-sense arcs flare over
 * interactive links, and clicking fires a web THWIP burst.
 *
 * No-ops on touch devices and under prefers-reduced-motion.
 */
export default function ThemeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g: CanvasRenderingContext2D = ctx;

    document.body.dataset.webcursor = "on";

    const css = getComputedStyle(document.documentElement);
    const v = (name: string, fallback: string) =>
      css.getPropertyValue(name).trim() || fallback;
    const ACCENT = v("--accent", "#e62429");
    const FG = v("--fg", "#f2f4ff");

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const target: Point = { x: w / 2, y: h / 2 };
    const trail: Point[] = Array.from({ length: TRAIL }, () => ({
      x: target.x,
      y: target.y,
    }));
    const bursts: Burst[] = [];

    let hot = 0;
    let hovering = false;
    let visible = false;

    let lastCheck = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      trail[0].x = e.clientX;
      trail[0].y = e.clientY;

      if (!visible) {
        visible = true;
        for (let i = 1; i < trail.length; i++) {
          trail[i].x = e.clientX;
          trail[i].y = e.clientY;
        }
      }

      const now = performance.now();
      if (now - lastCheck > 60) {
        lastCheck = now;
        const el = e.target as Element | null;
        hovering = !!el?.closest?.("a, button, input, textarea, [data-spidey]");
      }
    };
    const onDown = (e: PointerEvent) => {
      bursts.push({ x: e.clientX, y: e.clientY, t: 0 });
    };
    const onLeave = () => {
      visible = false;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    function drawWeb() {
      g.lineCap = "round";
      g.lineJoin = "round";

      g.strokeStyle = FG;
      g.globalAlpha = 0.5;
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length - 1; i++) {
        g.quadraticCurveTo(
          trail[i].x,
          trail[i].y,
          (trail[i].x + trail[i + 1].x) / 2,
          (trail[i].y + trail[i + 1].y) / 2,
        );
      }
      g.stroke();
      g.globalAlpha = 1;

      for (let i = 2; i < trail.length - 1; i += 2) {
        const a = trail[i];
        const b = trail[i + 1];
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = -(b.y - a.y) / len;
        const ny = (b.x - a.x) / len;
        const fade = 1 - i / trail.length;
        const size = 8 * fade;
        g.globalAlpha = 0.5 * fade;
        g.beginPath();
        g.moveTo(a.x - nx * size, a.y - ny * size);
        g.lineTo(a.x + nx * size, a.y + ny * size);
        g.stroke();
      }
      g.globalAlpha = 1;

      const { x, y } = trail[0];
      const r = 7 + hot * 12;
      g.strokeStyle = hot > 0.4 ? ACCENT : FG;
      g.lineWidth = 1.6;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.stroke();

      for (let k = 0; k < 4; k++) {
        const ang = (k * Math.PI) / 2 + Math.PI / 4;
        g.beginPath();
        g.moveTo(x + Math.cos(ang) * (r - 3), y + Math.sin(ang) * (r - 3));
        g.lineTo(x + Math.cos(ang) * (r + 5), y + Math.sin(ang) * (r + 5));
        g.stroke();
      }

      if (hot > 0.02) {
        g.globalAlpha = hot * 0.9;
        g.strokeStyle = ACCENT;
        for (let k = 1; k <= 3; k++) {
          const rr = r + k * 7;
          g.beginPath();
          g.arc(x, y, rr, -0.85, 0.85);
          g.stroke();
          g.beginPath();
          g.arc(x, y, rr, Math.PI - 0.85, Math.PI + 0.85);
          g.stroke();
        }
        g.globalAlpha = 1;
      }

      g.fillStyle = ACCENT;
      g.beginPath();
      g.arc(x, y, 2.2, 0, Math.PI * 2);
      g.fill();
    }

    function burstWeb(b: Burst) {
      const SPOKES = 8;
      const eased = 1 - Math.pow(1 - b.t, 3);
      const R = 12 + eased * 72;
      g.globalAlpha = (1 - b.t) * 0.85;
      g.strokeStyle = FG;
      g.lineWidth = 1.2;
      for (let s = 0; s < SPOKES; s++) {
        const ang = (s / SPOKES) * Math.PI * 2;
        g.beginPath();
        g.moveTo(b.x, b.y);
        g.lineTo(b.x + Math.cos(ang) * R, b.y + Math.sin(ang) * R);
        g.stroke();
      }
      for (let ring = 1; ring <= 3; ring++) {
        const rr = (R * ring) / 3.2;
        g.beginPath();
        for (let s = 0; s <= SPOKES; s++) {
          const ang = (s / SPOKES) * Math.PI * 2;
          const px = b.x + Math.cos(ang) * rr;
          const py = b.y + Math.sin(ang) * rr;
          if (s === 0) g.moveTo(px, py);
          else g.lineTo(px, py);
        }
        g.closePath();
        g.stroke();
      }
      g.globalAlpha = 1;
    }

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      g.clearRect(0, 0, w, h);
      if (!visible) return;

      trail[0].x = target.x;
      trail[0].y = target.y;

      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.45;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.45;
      }
      hot += ((hovering ? 1 : 0) - hot) * 0.25;

      drawWeb();

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.t += 0.045;
        if (b.t >= 1) {
          bursts.splice(i, 1);
          continue;
        }
        burstWeb(b);
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      delete document.body.dataset.webcursor;
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-70 hidden [@media(pointer:fine)]:block"
    />
  );
}
