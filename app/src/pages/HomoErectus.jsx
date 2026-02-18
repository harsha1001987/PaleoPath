import "./HomoErectus.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomoErectus() {
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("homoErectusQuizResult");
    if (data) setQuizResult(JSON.parse(data));
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".detail-block, .detail-wide");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);


  return (
    <section className="species-page">
      {/* Top Bar */}
      <div className="species-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Timeline
        </button>
        <span className="topbar-title">Homo erectus</span>
      </div>

      {/* Content */}
      <div className="species-content">
        <div className="species-header">
          <div className="species-icon">🦴</div>

          <div>
            <h1>Homo erectus</h1>
            <p className="species-subtitle">Upright Human</p>
            <p className="species-era">~1.9 Million – 110,000 Years Ago</p>
          </div>
        </div>

        <p className="species-description">
          Homo erectus was one of the longest-surviving human species, first appearing in Africa and spreading across Asia and Europe. They were pioneers in tool use, fire mastery, and migration.
        </p>

        {/* Detailed Information */}
        <div className="species-details">
          <div className="details-grid">
            <div className="detail-block">
              <h3>Physical Characteristics</h3>
              <ul>
                <li>Long, low skull with prominent brow ridges</li>
                <li>No chin</li>
                <li>Large teeth and jaws</li>
                <li>Robust skeletal build</li>
                <li>Fully bipedal locomotion</li>
              </ul>
            </div>

            <div className="detail-block">
              <h3>Cognitive Abilities</h3>
              <p>
                Developed basic tool-making skills, learned to control fire, and showed early signs of social cooperation and communication.
              </p>
            </div>

            <div className="detail-block">
              <h3>Diet</h3>
              <p>
                Omnivorous diet including meat, roots, fruits, and possibly cooked foods. Hunting and gathering were key survival strategies.
              </p>
            </div>

            <div className="detail-block">
              <h3>Tools & Culture</h3>
              <ul>
                <li>Hand axes and cleavers (Acheulean tools)</li>
                <li>Simple wooden tools</li>
                <li>Earliest evidence of fire use</li>
                <li>Basic shelters</li>
              </ul>
            </div>

            <div className="detail-block">
              <h3>Habitat</h3>
              <p>
                Originated in Africa, migrated to Asia and Europe. Adapted to savannas, woodlands, and temperate regions.
              </p>
            </div>

            <div className="detail-block">
              <h3>Social Structure</h3>
              <p>
                Lived in small groups, likely with basic social organization and cooperation for hunting and protection.
              </p>
            </div>
          </div>

          <div className="detail-wide">
            <h3>Extinction & Legacy</h3>
            <p>
              Homo erectus eventually went extinct, but their innovations in tool use and fire paved the way for later human species.
            </p>
          </div>

          <div className="detail-wide">
            <h3>Key Discoveries</h3>
            <div className="discoveries">
              <span>Java Man (Indonesia)</span>
              <span>Peking Man (China)</span>
              <span>Turkana Boy (Kenya)</span>
              <span>Dmanisi fossils (Georgia)</span>
            </div>
          </div>

          <div className="detail-wide highlight">
            <h3>Evolutionary Significance</h3>
            <p>
              Homo erectus was a trailblazer in migration, tool use, and fire mastery, setting the stage for the evolution of later human species.
            </p>
          </div>

          {/* Quiz Section */}
          <div className="detail-wide quiz-cta">
            <div className="quiz-card">
              <div className="quiz-icon">🧪</div>

              <h3 className="quiz-title">Test Your Knowledge</h3>

              <p className="quiz-text">
                Take a short quiz on Homo erectus and see how well you understand their evolution, culture, and technology.
              </p>

              <button
                className="quiz-btn"
                onClick={() => navigate("/quiz/homo-erectus")}
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
