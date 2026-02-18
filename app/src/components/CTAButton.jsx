import React, { useRef, useCallback } from "react";
import "./CTAButton.css";

export default function CTAButton({ children, primary, className = "", onClick, ...props }) {
  const btnRef = useRef(null);

  // Ripple on click
  const handleClick = useCallback(
    (e) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "cta-ripple";
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
      onClick?.(e);
    },
    [onClick]
  );

  if (primary) {
    return (
      <button
        ref={btnRef}
        className={`cta-primary ${className}`}
        onClick={handleClick}
        {...props}
      >
        <span className="cta-label">{children}</span>
        <span className="cta-arrow" aria-hidden="true">→</span>
      </button>
    );
  }

  return (
    <button
      ref={btnRef}
      className={`cta-secondary ${className}`}
      onClick={handleClick}
      {...props}
    >
      {/* Particle swirl dots */}
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="swirl-dot" style={{ "--i": i }} aria-hidden="true" />
      ))}
      <span className="cta-label">{children}</span>
    </button>
  );
}
