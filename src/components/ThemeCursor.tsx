"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/themes/ThemeProvider";

const TRAIL = 16;

type Point = { x: number; y: number };
type Burst = { x: number; y: number; t: number };

/**
 * Replaces the mouse pointer with something in keeping with the theme:
 *
 *   web     — a web strand trails the pointer, spider-sense arcs flare over
 *             links, and clicking fires a THWIP burst.
 *   ink     — a brush nib that lays down a tapering ink stroke and splats
 *             on click.
 *   goggle  — a minion goggle whose pupil leans into the direction of travel,
 *             with a bouncy ring on click.
 *
 * No-ops on touch devices and under prefers-reduced-motion; the normal
 * system cursor stays put in both cases.
 */
export default function ThemeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const mode = theme.cursor;

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    // hoisted non-null so the nested draw helpers keep the narrowing
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g: CanvasRenderingContext2D = ctx;

    document.body.dataset.webcursor = "on";

    // Palette comes from the CSS variables, so it follows the active theme.
    const css = getComputedStyle(document.documentElement);
    const v = (name: string, fallback: string) =>
      css.getPropertyValue(name).trim() || fallback;
    const ACCENT = v("--accent", "#e62429");
    const ACCENT2 = v("--accent2", "#3f5bd9");
    const FG = v("--fg", "#f2f4ff");
    const INK = v("--ink", "#08080d");

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

    let hot = 0; // eased 0→1 hover state
    let hovering = false;
    let visible = false;
    let vx = 0;
    let vy = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        for (const p of trail) {
          p.x = e.clientX;
          p.y = e.clientY;
        }
      }
      const el = e.target as Element | null;
      hovering = !!el?.closest?.("a, button, input, textarea, [data-spidey]");
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

    // ── web ────────────────────────────────────────────────
    function drawWeb() {
      g.lineCap = "round";
      g.lineJoin = "round";

      // canvas has no color-mix; fade with globalAlpha instead
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

    // ── ink ────────────────────────────────────────────────
    function drawInk() {
      g.lineCap = "round";
      g.lineJoin = "round";

      // A stroke that thins toward the tail, like a brush lifting off.
      for (let i = 0; i < trail.length - 1; i++) {
        const fade = 1 - i / trail.length;
        g.globalAlpha = 0.55 * fade * fade;
        g.strokeStyle = ACCENT;
        g.lineWidth = 10 * fade * fade + 0.6;
        g.beginPath();
        g.moveTo(trail[i].x, trail[i].y);
        g.lineTo(trail[i + 1].x, trail[i + 1].y);
        g.stroke();
      }
      g.globalAlpha = 1;

      const { x, y } = trail[0];
      const nib = 6 + hot * 8;

      // brush nib, squashed along the direction of travel
      const speed = Math.min(Math.hypot(vx, vy) / 22, 1);
      const ang = Math.atan2(vy, vx);
      g.save();
      g.translate(x, y);
      g.rotate(ang);
      g.fillStyle = hot > 0.4 ? ACCENT : FG;
      g.beginPath();
      g.ellipse(0, 0, nib * (1 + speed * 0.7), nib * (1 - speed * 0.35), 0, 0, Math.PI * 2);
      g.fill();
      g.restore();

      // jade ring blooms over anything clickable
      if (hot > 0.02) {
        g.globalAlpha = hot * 0.85;
        g.strokeStyle = ACCENT2;
        g.lineWidth = 2;
        g.beginPath();
        g.arc(x, y, nib + 10 + hot * 6, 0, Math.PI * 2);
        g.stroke();
        g.globalAlpha = 1;
      }
    }

    function burstInk(b: Burst) {
      const eased = 1 - Math.pow(1 - b.t, 3);
      g.globalAlpha = (1 - b.t) * 0.7;
      g.fillStyle = ACCENT;
      g.beginPath();
      g.arc(b.x, b.y, 6 + eased * 26, 0, Math.PI * 2);
      g.fill();
      // droplets flung outward
      for (let k = 0; k < 7; k++) {
        const a = (k / 7) * Math.PI * 2 + b.t * 1.4;
        const d = 14 + eased * 60 + (k % 3) * 9;
        g.beginPath();
        g.arc(
          b.x + Math.cos(a) * d,
          b.y + Math.sin(a) * d,
          Math.max(0.5, 4 * (1 - b.t) - (k % 3) * 0.6),
          0,
          Math.PI * 2,
        );
        g.fill();
      }
      g.globalAlpha = 1;
    }

    // ── goggle ─────────────────────────────────────────────
    function drawGoggle() {
      const { x, y } = trail[0];
      const r = 13 + hot * 5;

      // strap trailing behind
      g.strokeStyle = INK;
      g.lineWidth = 5;
      g.globalAlpha = 0.5;
      g.beginPath();
      g.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < 6; i++) g.lineTo(trail[i].x, trail[i].y);
      g.stroke();
      g.globalAlpha = 1;

      // rim
      g.fillStyle = INK;
      g.beginPath();
      g.arc(x, y, r + 4, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = ACCENT;
      g.lineWidth = 3;
      g.beginPath();
      g.arc(x, y, r + 2.5, 0, Math.PI * 2);
      g.stroke();

      // eyeball
      g.fillStyle = "#ffffff";
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();

      // pupil leans into the direction of travel
      const lean = Math.min(Math.hypot(vx, vy) / 14, 1) * (r * 0.42);
      const a = Math.atan2(vy, vx);
      const px = x + Math.cos(a) * lean;
      const py = y + Math.sin(a) * lean;
      g.fillStyle = "#5a3a1a";
      g.beginPath();
      g.arc(px, py, r * 0.46, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = INK;
      g.beginPath();
      g.arc(px, py, r * 0.26, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.9)";
      g.beginPath();
      g.arc(px - r * 0.16, py - r * 0.18, r * 0.11, 0, Math.PI * 2);
      g.fill();
    }

    function burstGoggle(b: Burst) {
      // a bouncy overshooting ring
      const eased = 1 - Math.pow(1 - b.t, 4);
      const R = 10 + eased * 60;
      g.globalAlpha = (1 - b.t) * 0.9;
      g.strokeStyle = ACCENT;
      g.lineWidth = 4 * (1 - b.t) + 1;
      g.beginPath();
      g.arc(b.x, b.y, R, 0, Math.PI * 2);
      g.stroke();
      g.strokeStyle = ACCENT2;
      g.lineWidth = 2;
      g.beginPath();
      g.arc(b.x, b.y, R * 0.62, 0, Math.PI * 2);
      g.stroke();
      g.globalAlpha = 1;
    }

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      g.clearRect(0, 0, w, h);
      if (!visible) return;

      const prevX = trail[0].x;
      const prevY = trail[0].y;
      trail[0].x += (target.x - trail[0].x) * 0.38;
      trail[0].y += (target.y - trail[0].y) * 0.38;
      vx = trail[0].x - prevX;
      vy = trail[0].y - prevY;
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.32;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.32;
      }
      hot += ((hovering ? 1 : 0) - hot) * 0.16;

      if (mode === "web") drawWeb();
      else if (mode === "ink") drawInk();
      else drawGoggle();

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.t += 0.045;
        if (b.t >= 1) {
          bursts.splice(i, 1);
          continue;
        }
        if (mode === "web") burstWeb(b);
        else if (mode === "ink") burstInk(b);
        else burstGoggle(b);
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
  }, [reduced, mode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-70 hidden [@media(pointer:fine)]:block"
    />
  );
}
