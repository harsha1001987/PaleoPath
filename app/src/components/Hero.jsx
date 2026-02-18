import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";
import "./Hero.css";

// ─── Skull particle math ──────────────────────────────────────────────────────
function isInSkull(x, y) {
  const dx = x - 100;
  const dy = y - 100;
  const depthCurve = (dx * dx) / (80 * 80) + (dy * dy) / (85 * 85) <= 1;
  const jaw = y > 135 && Math.abs(dx) < 42 - (y - 135) * 0.3 && y < 205;
  const inSkull = depthCurve || jaw;
  const leftEye = (x - 70) ** 2 / (22 * 22) + (y - 95) ** 2 / (26 * 26) <= 1;
  const rightEye = (x - 130) ** 2 / (22 * 22) + (y - 95) ** 2 / (26 * 26) <= 1;
  const nose = y > 105 && y < 155 && Math.abs(x - 100) < (y - 105) * 0.5;
  return inSkull && !leftEye && !rightEye && !nose;
}

// Early hominid silhouette — broader brow, sloped forehead
function isInHominid(x, y) {
  const dx = x - 100;
  const dy = y - 105;
  const braincase = (dx * dx) / (70 * 70) + (dy * dy) / (75 * 75) <= 1;
  const brow = y > 80 && y < 105 && Math.abs(dx) < 55 - (y - 80) * 0.4;
  const jaw2 = y > 140 && Math.abs(dx) < 38 - (y - 140) * 0.5 && y < 200;
  const inHominid = braincase || brow || jaw2;
  const leftEye2 = (x - 72) ** 2 / (18 * 18) + (y - 100) ** 2 / (20 * 20) <= 1;
  const rightEye2 = (x - 128) ** 2 / (18 * 18) + (y - 100) ** 2 / (20 * 20) <= 1;
  return inHominid && !leftEye2 && !rightEye2;
}

function buildSkullParticles(count = 1800) {
  const particles = [];
  let attempts = 0;
  while (particles.length < count && attempts < count * 40) {
    attempts++;
    const x = Math.random() * 200;
    const y = Math.random() * 240;
    if (isInSkull(x, y)) {
      const dist = Math.sqrt((x - 100) ** 2 + (y - 110) ** 2);
      const brightness = Math.max(0.35, 1.4 - dist / 140);
      particles.push({
        ox: x, oy: y,       // origin
        x, y,               // current
        tx: x, ty: y,       // target
        r: Math.random() * 1.3 + 0.35,
        brightness,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      });
    }
  }
  return particles;
}

function buildHominidTargets(particles) {
  // For each particle find a random hominid position
  const hominidPool = [];
  let att = 0;
  while (hominidPool.length < particles.length && att < particles.length * 30) {
    att++;
    const x = Math.random() * 200;
    const y = Math.random() * 240;
    if (isInHominid(x, y)) hominidPool.push({ x, y });
  }
  return hominidPool;
}

function buildDustParticles(count = 90) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 1920,
    y: Math.random() * 1080,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -Math.random() * 0.22 - 0.05,
    opacity: Math.random() * 0.35 + 0.05,
  }));
}

// Neural network lines inside skull
function buildNeuralLines() {
  const lines = [];
  for (let i = 0; i < 14; i++) {
    let x1, y1, x2, y2;
    let tries = 0;
    do {
      x1 = 60 + Math.random() * 80;
      y1 = 50 + Math.random() * 100;
      x2 = 60 + Math.random() * 80;
      y2 = 50 + Math.random() * 100;
      tries++;
    } while ((!isInSkull(x1, y1) || !isInSkull(x2, y2)) && tries < 200);
    lines.push({ x1, y1, x2, y2, phase: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() });
  }
  return lines;
}

// ─── Headline letters ─────────────────────────────────────────────────────────
const HEADLINE = "Before us, there were many.";

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    hominidTargets: [],
    dust: [],
    neuralLines: [],
    mouse: { x: -9999, y: -9999 },
    parallax: { x: 0, y: 0 },
    mode: "skull",      // skull | disperse | hominid | reform
    morphTimer: 0,
    animFrame: null,
    skullRect: null,
    hovering: false,
    time: 0,
  });

  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // ── Canvas setup & animation loop ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Build data
    s.particles = buildSkullParticles(1800);
    s.hominidTargets = buildHominidTargets(s.particles);
    s.dust = buildDustParticles(90);
    s.neuralLines = buildNeuralLines();

    // Skull canvas-space center (we draw skull at scale 2.2 centered)
    const SCALE = 2.2;
    const SKULL_W = 200 * SCALE;
    const SKULL_H = 240 * SCALE;

    function skullToCanvas(sx, sy) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 - 40;
      return {
        x: cx - SKULL_W / 2 + sx * SCALE + s.parallax.x,
        y: cy - SKULL_H / 2 + sy * SCALE + s.parallax.y,
      };
    }

    function draw(timestamp) {
      s.time = timestamp * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 - 40;

      // ── Volumetric glow behind skull ──
      const grd = ctx.createRadialGradient(
        cx + s.parallax.x, cy + s.parallax.y, 10,
        cx + s.parallax.x, cy + s.parallax.y, 260
      );
      grd.addColorStop(0, "rgba(180,110,50,0.18)");
      grd.addColorStop(0.4, "rgba(120,70,30,0.10)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── Ambient dust ──
      s.dust.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -5) { d.y = canvas.height + 5; d.x = Math.random() * canvas.width; }
        if (d.x < -5) d.x = canvas.width + 5;
        if (d.x > canvas.width + 5) d.x = -5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,200,170,${d.opacity})`;
        ctx.fill();
      });

      // ── Neural network lines ──
      s.neuralLines.forEach((ln) => {
        const flicker = 0.5 + 0.5 * Math.sin(s.time * ln.speed + ln.phase);
        const opacity = flicker * 0.18;
        if (opacity < 0.02) return;
        const p1 = skullToCanvas(ln.x1, ln.y1);
        const p2 = skullToCanvas(ln.x2, ln.y2);
        // breathing offset
        const breathY = Math.sin(s.time * 0.55) * 6;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y + breathY);
        ctx.lineTo(p2.x, p2.y + breathY);
        ctx.strokeStyle = `rgba(160,220,255,${opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
        // tiny node dots
        ctx.beginPath();
        ctx.arc(p1.x, p1.y + breathY, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,220,255,${opacity * 1.5})`;
        ctx.fill();
      });

      // ── Skull particles ──
      const breathY = Math.sin(s.time * 0.55) * 6;
      const breathScale = 1 + Math.sin(s.time * 0.55) * 0.012;

      s.particles.forEach((p) => {
        // Lerp toward target
        const lerpSpeed = s.mode === "disperse" ? 0.04 : s.mode === "reform" || s.mode === "hominid" ? 0.055 : 0.08;
        p.x += (p.tx - p.x) * lerpSpeed;
        p.y += (p.ty - p.y) * lerpSpeed;

        // Mouse repulsion
        const pos = skullToCanvas(p.x, p.y);
        const mdx = pos.x - s.mouse.x;
        const mdy = pos.y - s.mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        let drawX = pos.x;
        let drawY = pos.y + breathY;

        if (mdist < 90 && s.mode === "skull") {
          const force = (90 - mdist) / 90;
          drawX += (mdx / mdist) * force * 22;
          drawY += (mdy / mdist) * force * 22;
        }

        // Breathing scale from skull center
        const skullCX = skullToCanvas(100, 110).x;
        const skullCY = skullToCanvas(100, 110).y;
        drawX = skullCX + (drawX - skullCX) * breathScale;
        drawY = skullCY + (drawY - skullCY) * breathScale;

        // Flicker
        const flicker = 0.75 + 0.25 * Math.sin(s.time * p.speed + p.phase);
        const alpha = p.brightness * flicker;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,230,${Math.min(1, alpha)})`;
        ctx.fill();
      });

      // ── Morph timer logic ──
      if (s.mode === "hominid") {
        s.morphTimer -= 16;
        if (s.morphTimer <= 0) {
          s.mode = "reform";
          s.particles.forEach((p) => { p.tx = p.ox; p.ty = p.oy; });
        }
      }
      if (s.mode === "reform") {
        // Check if mostly reformed
        const settled = s.particles.every((p) => Math.abs(p.x - p.ox) < 3 && Math.abs(p.y - p.oy) < 3);
        if (settled) s.mode = "skull";
      }

      s.animFrame = requestAnimationFrame(draw);
    }

    s.animFrame = requestAnimationFrame(draw);

    // Headline reveal
    setTimeout(() => setHeadlineVisible(true), 200);

    return () => {
      cancelAnimationFrame(s.animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Mouse move ──────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const s = stateRef.current;
    s.mouse.x = e.clientX;
    s.mouse.y = e.clientY;
    // Parallax: shift canvas slightly opposite to cursor
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    s.parallax.x = ((e.clientX - cx) / cx) * -15;
    s.parallax.y = ((e.clientY - cy) / cy) * -10;
  }, []);

  // ── Skull hover ─────────────────────────────────────────────────────────────
  const handleSkullEnter = useCallback(() => {
    const s = stateRef.current;
    if (s.mode !== "skull") return;
    s.hovering = true;
    s.mode = "disperse";
    s.particles.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 80;
      p.tx = p.ox + Math.cos(angle) * dist;
      p.ty = p.oy + Math.sin(angle) * dist;
    });
  }, []);

  const handleSkullLeave = useCallback(() => {
    const s = stateRef.current;
    s.hovering = false;
    if (s.mode === "disperse") {
      s.mode = "reform";
      s.particles.forEach((p) => { p.tx = p.ox; p.ty = p.oy; });
    }
  }, []);

  // ── Click morph ─────────────────────────────────────────────────────────────
  const handleSkullClick = useCallback(() => {
    const s = stateRef.current;
    if (s.mode !== "skull" && s.mode !== "disperse") return;
    s.mode = "hominid";
    s.morphTimer = 2200;
    s.particles.forEach((p, i) => {
      const target = s.hominidTargets[i % s.hominidTargets.length];
      if (target) { p.tx = target.x; p.ty = target.y; }
    });
  }, []);

  // ── Scroll ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headlineStyle = {
    opacity: Math.max(0, 1 - scrollY / 300),
    transform: `scale(${Math.max(0.88, 1 - scrollY / 2000)})`,
    transition: "opacity 0.1s, transform 0.1s",
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      className="hero-section"
      onMouseMove={handleMouseMove}
    >
      {/* Skeleton texture background */}
      <div className="absolute inset-0 skeleton-bg" />

      {/* Grain overlay */}
      <div className="hero-grain" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        onMouseEnter={handleSkullEnter}
        onMouseLeave={handleSkullLeave}
        onClick={handleSkullClick}
      />

      {/* Content */}
      <div className="hero-content">

        {/* Headline */}
        <h1
          className="hero-headline"
          style={headlineStyle}
        >
          {HEADLINE.split("").map((char, i) => (
            <span
              key={i}
              className={`letter-span ${headlineVisible ? "letter-visible" : ""}`}
              style={{ animationDelay: `${0.03 * i}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div className="subtitle-wrapper">
          <p className="hero-subtitle">
            Walk through 7 million years of human evolution — guided, interactive, and unforgettable.
          </p>
          <span className="glow-underline" />
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <CTAButton primary onClick={() => navigate("/begin")}>
            Begin the Journey
          </CTAButton>
          <CTAButton onClick={() => navigate("/timeline")}>
            Explore as Guest
          </CTAButton>
        </div>
      </div>
    </section>
  );
}