import "./HomoHabilis.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomoHabilis() {
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("homoHabilisQuizResult");
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
        <span className="topbar-title">Homo habilis</span>
      </div>

      {/* Content */}
      <div className="species-content">
        <div className="species-header">
          <div className="species-icon">🪓</div>

          <div>
            <h1>Homo habilis</h1>
            <p className="species-subtitle">Handy Human</p>
            <p className="species-era">~2.4 – 1.4 Million Years Ago</p>
          </div>
        </div>

        <p className="species-description">
          Homo habilis is one of the earliest members of the genus Homo. Known as the "handy man," they are credited with some of the first stone tool use and represent a key step in human evolution.
        </p>

        {/* Detailed Information */}
        <div className="species-details">
          <div className="details-grid">
            <div className="detail-block">
              <h3>Physical Characteristics</h3>
              <ul>
                <li>Smaller face and teeth than Australopithecus</li>
                <li>Slightly larger braincase (510–600 cc)</li>
                <li>Long arms, moderate body size</li>
                <li>Still somewhat ape-like body proportions</li>
                <li>Fully bipedal locomotion</li>
              </ul>
            </div>

            <div className="detail-block">
              <h3>Cognitive Abilities</h3>
              <p>
                Showed increased brain size and evidence of planning, tool use, and possibly basic communication.
              </p>
            </div>

            <div className="detail-block">
              <h3>Diet</h3>
              <p>
                Omnivorous, including meat, plants, and possibly scavenged animal remains. Used tools to process food.
              </p>
            </div>

            <div className="detail-block">
              <h3>Tools & Culture</h3>
              <ul>
                <li>Oldowan stone tools (simple flakes and choppers)</li>
                <li>Earliest evidence of systematic tool use</li>
                <li>Possible use of animal bones as tools</li>
              </ul>
            </div>

            <div className="detail-block">
              <h3>Habitat</h3>
              <p>
                Lived in eastern and southern Africa, in woodland and grassland environments.
              </p>
            </div>

            <div className="detail-block">
              <h3>Social Structure</h3>
              <p>
                Likely lived in small groups, with some cooperation in food gathering and protection.
              </p>
            </div>
          </div>

          <div className="detail-wide">
            <h3>Extinction & Legacy</h3>
            <p>
              Homo habilis eventually went extinct, but their tool use and adaptations paved the way for later Homo species.
            </p>
          </div>

          <div className="detail-wide">
            <h3>Key Discoveries</h3>
            <div className="discoveries">
              <span>Olduvai Gorge fossils (Tanzania)</span>
              <span>Koobi Fora remains (Kenya)</span>
              <span>Stone tools (Oldowan industry)</span>
            </div>
          </div>

          <div className="detail-wide highlight">
            <h3>Evolutionary Significance</h3>
            <p>
              Homo habilis marks a major evolutionary step with the development of tool use, larger brains, and more human-like body structure.
            </p>
          </div>

          {/* Quiz Section */}
          <div className="detail-wide quiz-cta">
            <div className="quiz-card">
              <div className="quiz-icon">🧪</div>

              <h3 className="quiz-title">Test Your Knowledge</h3>

              <p className="quiz-text">
                Take a short quiz on Homo habilis and see how well you understand their evolution, tools, and lifestyle.
              </p>

              <button
                className="quiz-btn"
                onClick={() => navigate("/quiz/homo-habilis")}
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
