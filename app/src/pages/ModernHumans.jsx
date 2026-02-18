import "./ModernHumans.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ModernHumans() {
    const navigate = useNavigate();
    const [quizResult, setQuizResult] = useState(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        const data = localStorage.getItem("modernHumansQuizResult");
        if (data) setQuizResult(JSON.parse(data));
    }, []);

    // Scroll-reveal
    useEffect(() => {
        const els = document.querySelectorAll(".detail-block, .detail-wide");
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    // Glowing cursor
    useEffect(() => {
        const el = cursorRef.current;
        if (!el) return;
        const move = (e) => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);


    return (
        <section className="species-page">
            {/* Cursor glow */}
            <div ref={cursorRef} className="cursor-glow" />
            {/* Top Bar */}

            <div className="species-topbar">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back to Timeline
                </button>
                <span className="topbar-title">Modern Humans</span>
            </div>

            {/* Content */}
            <div className="species-content">
                <div className="species-header">
                    <div className="species-icon">👤</div>

                    <div>
                        <h1>Modern Humans</h1>
                        <p className="species-subtitle">Homo sapiens sapiens</p>
                        <p className="species-era">~300,000 Years Ago – Present</p>
                    </div>
                </div>

                <p className="species-description">
                    We are the last surviving species of the genus Homo. Characterized by high intelligence, complex language, art, and the ability to adapt to almost any environment on Earth.
                </p>

                {/* Detailed Information */}
                <div className="species-details">
                    <div className="details-grid">
                        <div className="detail-block">
                            <h3>Physical Characteristics</h3>
                            <ul>
                                <li>High, vertical forehead</li>
                                <li>Distinct chin (unique to us)</li>
                                <li>Light skeletal build</li>
                                <li>Smaller teeth and jaws</li>
                                <li>Large brain volume (~1350cc)</li>
                            </ul>
                        </div>

                        <div className="detail-block">
                            <h3>Cognitive Abilities</h3>
                            <p>
                                Unmatched capability for abstract thought, symbolic language, planning, and creativity. We build complex tools, machines, and social structures.
                            </p>
                        </div>

                        <div className="detail-block">
                            <h3>Diet</h3>
                            <p>
                                Extremely versatile omnivores. We expanded from hunting and gathering to agriculture, radically changing our diet and population size.
                            </p>
                        </div>

                        <div className="detail-block">
                            <h3>Tools & Culture</h3>
                            <ul>
                                <li>Complex composite tools</li>
                                <li>Art, music, and religion</li>
                                <li>Agriculture and urbanization</li>
                                <li>Advanced technology</li>
                            </ul>
                        </div>

                        <div className="detail-block">
                            <h3>Habitat</h3>
                            <p>
                                Global distribution. from the arctic to the deserts, and even short stays in space. We reshape our environment to suit our needs.
                            </p>
                        </div>

                        <div className="detail-block">
                            <h3>Social Structure</h3>
                            <p>
                                Extremely complex and variable, ranging from small tribes to mega-cities with millions of unrelated individuals cooperating.
                            </p>
                        </div>
                    </div>

                    <div className="detail-wide">
                        <h3>Key Achievements</h3>
                        <div className="discoveries">
                            <span>Language</span>
                            <span>Agriculture</span>
                            <span>Writing</span>
                            <span>Space Travel</span>
                        </div>
                    </div>

                    <div className="detail-wide highlight">
                        <h3>The Sole Survivors</h3>
                        <p>
                            Out of the many human species that once walked the Earth, only we remain. Why we survived while others like Neanderthals vanished is one of the greatest mysteries of our history.
                        </p>
                    </div>

                    {/* Quiz Section */}
                    <div className="detail-wide quiz-cta">
                        <div className="quiz-card">
                            <div className="quiz-icon">🧠</div>

                            <h3 className="quiz-title">Test Your Knowledge</h3>

                            <p className="quiz-text">
                                How well do you know your own species? Take a quiz to find out.
                            </p>

                            <button
                                className="quiz-btn"
                                onClick={() => navigate("/quiz/modern-humans")}
                            >
                                {quizResult ? "Retake Quiz" : "Start Quiz"}
                            </button>

                            {quizResult && (
                                <p className="quiz-score">
                                    Score: <strong>{quizResult.score}</strong> / {quizResult.total}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
