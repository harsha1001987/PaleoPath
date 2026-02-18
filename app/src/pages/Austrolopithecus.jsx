import "./ModernHumans.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Austrolopithecus() {
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("australopithecusQuizResult");
    if (data) {
      setQuizResult(JSON.parse(data));
    }
  }, []);

  return (
    <section className="species-page">
      {/* Top Bar */}
      <div className="species-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Timeline
        </button>
        <span className="topbar-title">Australopithecus</span>
      </div>

      {/* Content */}
      <div className="species-content">
        <div className="species-header">
          <div className="species-icon">🦍</div>

          <div>
            <h1>Australopithecus</h1>
            <p className="species-subtitle">Southern Ape</p>
            <p className="species-era">~4 – 2 Million Years Ago</p>
          </div>
        </div>

        <p className="species-description">
          Australopithecus is a genus of early hominins that lived in Africa. They are among the best-known ancestors of the genus Homo and provide key evidence for the evolution of bipedalism.
        </p>

        {/* Detailed Information */}
        <div className="species-details">
          <div className="details-grid">
            <div className="detail-block">
              <h3>Physical Characteristics</h3>
              <ul>
                <li>Small braincase (350–550 cc)</li>
                <li>Large face and teeth</li>
                <li>Long arms, short legs</li>
                <li>Curved fingers and toes</li>
                <li>Partially adapted for climbing</li>
                <li>Fully bipedal locomotion</li>
              </ul>
            </div>

            <div className="detail-block">
              <h3>Cognitive Abilities</h3>
              <p>
                Limited tool use, basic problem-solving, and social behaviors. No evidence of complex language.
              </p>
            </div>

            <div className="detail-block">
              <h3>Diet</h3>
              <p>
                Primarily plant-based: fruits, leaves, seeds, tubers, and occasional small animals or insects.
              </p>
            </div>

            <div className="detail-block">
              <h3>Tools & Culture</h3>
              <ul>
                <li>Possible use of sticks and stones as tools</li>
                <li>No evidence of systematic tool-making</li>
                <li>Simple social groups</li>
              </ul>
            </div>

            <div className="detail-block">
              <h3>Habitat</h3>
              <p>
                Lived in eastern and southern Africa, in woodland, savanna, and forest-edge environments.
              </p>
            </div>

            <div className="detail-block">
              <h3>Social Structure</h3>
              <p>
                Likely lived in small groups, with social bonds for protection and food sharing.
              </p>
            </div>
          </div>

          <div className="detail-wide">
            <h3>Extinction & Legacy</h3>
            <p>
              Australopithecus species eventually went extinct, but their adaptations for bipedalism paved the way for later hominins.
            </p>
          </div>

          <div className="detail-wide">
            <h3>Key Discoveries</h3>
            <div className="discoveries">
              <span>"Lucy" (A. afarensis, Ethiopia)</span>
              <span>Taung Child (A. africanus, South Africa)</span>
              <span>Laetoli footprints (Tanzania)</span>
            </div>
          </div>

          <div className="detail-wide highlight">
            <h3>Evolutionary Significance</h3>
            <p>
              Australopithecus is crucial for understanding the origins of upright walking and the transition from ape-like ancestors to the genus Homo.
            </p>
          </div>

          {/* Quiz Section */}
          <div className="detail-wide quiz-cta">
            <div className="quiz-card">
              <div className="quiz-icon">🧪</div>

              <h3 className="quiz-title">Test Your Knowledge</h3>

              <p className="quiz-text">
                Take a short quiz on Australopithecus and see how well you understand their evolution, adaptations, and discoveries.
              </p>

              <button
                className="quiz-btn"
                onClick={() => navigate("/quiz/australopithecus")}
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
