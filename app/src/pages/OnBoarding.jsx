import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./OnBoarding.css";

const QUIZ_KEYS = [
  "australopithecusQuizResult",
  "homoHabilisQuizResult",
  "homoErectusQuizResult",
  "homoSapiensQuizResult",
  "modernHumansQuizResult",
];

// ── Dust particle canvas ──────────────────────────────────────────────────────
function useDustCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -Math.random() * 0.18 - 0.04,
      opacity: Math.random() * 0.28 + 0.04,
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,190,155,${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

// ── Birth year from age ───────────────────────────────────────────────────────
const CURRENT_YEAR = 2026;
function getBirthYear(age) {
  const n = parseInt(age, 10);
  if (!n || n < 1 || n > 120) return null;
  return CURRENT_YEAR - n;
}

// ── Ripple helper ─────────────────────────────────────────────────────────────
function spawnRipple(btn, e) {
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ob-ripple";
  const size = Math.max(rect.width, rect.height) * 2.2;
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const canvasRef = useRef(null);
  const nameRef = useRef(null);
  const btnRef = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [ageFocused, setAgeFocused] = useState(false);
  const [dissolving, setDissolving] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const sectionRef = useRef(null);

  useDustCanvas(canvasRef);

  const isValid = name.trim().length > 0 && age !== "" && Number(age) >= 1 && Number(age) <= 120;

  // Glowing orb cursor tracking
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e) => {
      section.style.setProperty("--cx", `${e.clientX}px`);
      section.style.setProperty("--cy", `${e.clientY}px`);
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  // Auto-focus name on mount
  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 800);
    return () => clearTimeout(t);
  }, []);

  const birthYear = getBirthYear(age);

  const handleContinue = useCallback((e) => {
    // Validate
    if (!name.trim()) {
      setValidationMsg("Please enter your name.");
      return;
    }
    if (!age || Number(age) < 1 || Number(age) > 120) {
      setValidationMsg("Please enter a valid age (1–120).");
      return;
    }
    setValidationMsg("");

    // Save user to context + localStorage
    setUser({ username: name.trim(), age: Number(age) });

    // Reset all quiz scores for this new session
    QUIZ_KEYS.forEach((key) => localStorage.removeItem(key));

    if (btnRef.current) spawnRipple(btnRef.current, e);
    setDissolving(true);
    setTimeout(() => navigate("/timeline"), 900);
  }, [name, age, navigate, setUser]);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleContinue(e);
  }, [handleContinue]);

  return (
    <section ref={sectionRef} className={`ob-section${dissolving ? " ob-dissolve" : ""}`}>

      {/* Dust canvas */}
      <canvas ref={canvasRef} className="ob-canvas" />

      {/* Skeleton texture */}
      <div className="absolute inset-0 skeleton-bg" />

      {/* Depth fog layers */}
      <div className="ob-fog ob-fog-1" />
      <div className="ob-fog ob-fog-2" />

      {/* Radial glow behind form */}
      <div className="ob-radial-glow" />

      {/* Faint skull outline */}
      <div className="ob-skull-bg" aria-hidden="true">
        <svg viewBox="0 0 200 240" width="420" height="504" className="ob-skull-svg">
          <ellipse cx="100" cy="100" rx="78" ry="83" fill="none" stroke="rgba(200,180,140,0.045)" strokeWidth="1.2" />
          <path d="M58,135 Q58,205 100,205 Q142,205 142,135" fill="none" stroke="rgba(200,180,140,0.04)" strokeWidth="1" />
          <ellipse cx="70" cy="95" rx="20" ry="24" fill="rgba(0,0,0,0.06)" stroke="rgba(200,180,140,0.04)" strokeWidth="0.8" />
          <ellipse cx="130" cy="95" rx="20" ry="24" fill="rgba(0,0,0,0.06)" stroke="rgba(200,180,140,0.04)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Grain overlay */}
      <div className="hero-grain" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

      {/* ── Content ── */}
      <div className="ob-content">

        {/* Eyebrow */}
        <p className="ob-eyebrow">
          {"THE JOURNEY BEGINS WITH YOU".split("").map((ch, i) => (
            <span key={i} className="ob-eyebrow-letter" style={{ animationDelay: `${0.04 * i + 0.3}s` }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>

        {/* Heading */}
        <h2 className="ob-heading">
          Tell us who is<br />stepping forward.
        </h2>

        {/* Ghosted name echo */}
        {name && (
          <div className="ob-name-echo" aria-hidden="true">
            {name}
          </div>
        )}

        {/* Birth year reveal */}
        {birthYear && (
          <div className="ob-birth-reveal">
            <span className="ob-birth-label">Born</span>
            <span className="ob-birth-year">{birthYear}</span>
          </div>
        )}

        {/* ── Form ── */}
        <form className="ob-form" onSubmit={handleSubmit}>

          {/* Name field */}
          <div className={`ob-field${nameFocused || name ? " ob-field--active" : ""}`}>
            <label className="ob-label">Chosen name</label>
            <input
              ref={nameRef}
              type="text"
              className="ob-input"
              placeholder="e.g. Amina, Kiro, Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              autoComplete="off"
            />
            <div className="ob-field-shimmer" />
          </div>

          {/* Age field */}
          <div className={`ob-field${ageFocused || age ? " ob-field--active" : ""}`}>
            <label className="ob-label">Your age</label>
            <input
              type="number"
              className="ob-input"
              placeholder="e.g. 25"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onFocus={() => setAgeFocused(true)}
              onBlur={() => setAgeFocused(false)}
            />
            <div className="ob-field-shimmer" />
          </div>

          {/* Validation message */}
          {validationMsg && (
            <p style={{ color: "#e8b87a", fontSize: "0.8rem", marginTop: "-8px", marginBottom: "4px", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.03em" }}>
              {validationMsg}
            </p>
          )}

          {/* Continue button */}
          <button
            ref={btnRef}
            type="submit"
            className="ob-continue"
            onClick={handleContinue}
            disabled={!isValid}
            style={!isValid ? { opacity: 0.45, cursor: "not-allowed" } : {}}
          >
            <span className="ob-continue-label">Continue</span>
            <span className="ob-continue-arrow" aria-hidden="true">→</span>
          </button>

        </form>
      </div>
    </section>
  );
}
