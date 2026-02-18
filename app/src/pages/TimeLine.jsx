import { useNavigate } from "react-router-dom";
import "./timeline.css";

export default function HumanTimeline() {
  const navigate = useNavigate();

  const stages = [
    { label: "Australopithecus", position: "top", locked: false, route: "australopithecus" },
    { label: "Homo habilis", position: "top", locked: false, route: "homo-habilis" },
    { label: "Homo erectus", position: "top", locked: false, route: "homo-erectus" },
    { label: "Homo sapiens", position: "bottom", locked: false, route: "homo-sapiens" },
    { label: "Modern Humans", position: "bottom", locked: false, route: "modern-humans" },
  ];

  const handleStageClick = (stage) => {
    if (!stage.locked) {
      navigate(`/species/${stage.route}`);
    }
  };

  // Calculate position for all items
  const getPosition = (index) => {
    const totalSpace = 100;
    const step = totalSpace / (stages.length - 1);
    return `${step * index}%`;
  };

  return (
    <> <section className="timeline-section">
      <h1 className="timeline-title">The Human Timeline</h1>
      <p className="timeline-subtitle">
        Evolution isn't a straight line. It's a story. You'll uncover it.
      </p>

      <div className="timeline-wrapper">
        <div className="timeline-line" />

        {stages.map((item, i) => {
          const position = getPosition(i);
          const style = position ? { left: position } : {};

          return (
            <div
              key={i}
              className={`timeline-point ${item.position} ${item.locked ? "locked" : ""}`}
              style={style}
              onClick={() => handleStageClick(item)}
            >
              <span className="dot" />
              <span className={`label ${item.locked ? "locked" : ""}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="timeline-description" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Hover over the timeline to explore different eras. Your journey through human
        evolution starts with the earliest ancestors and progresses through each era.
        Unlock new periods as you discover and learn about our species' remarkable story.
      </p>
    </section>
      <section className="basics-section">
        <h2 className="basics-title">Want to learn the basics?</h2>
        <p className="basics-subtitle">
          Dive deep into the ancient world of paleontology.
        </p>

        <div className="basics-grid">
          <div
            className="basics-card"
            onClick={() => navigate("/learn-paleontology", { state: { activeTab: 'paleontology' } })}
            style={{ cursor: "pointer" }}
          >
            <div className="basics-icon green">📖</div>
            <h3>Paleontology Basics</h3>
          </div>

          <div
            className="basics-card"
            onClick={() => navigate("/learn-paleontology", { state: { activeTab: 'rocks' } })}
            style={{ cursor: "pointer" }}
          >
            <div className="basics-icon orange">⛏</div>
            <h3>Rocks & Minerals</h3>
          </div>

          <div
            className="basics-card"
            onClick={() => navigate("/learn-paleontology", { state: { activeTab: 'fossils' } })}
            style={{ cursor: "pointer" }}
          >
            <div className="basics-icon yellow">🌀</div>
            <h3>Fossils & Traces</h3>
          </div>

          <div
            className="basics-card"
            onClick={() => navigate("/learn-paleontology", { state: { activeTab: 'eras' } })}
            style={{ cursor: "pointer" }}
          >
            <div className="basics-icon brown">⛰</div>
            <h3>Geological Eras</h3>
          </div>
        </div>

        <button
          className="basics-btn"
          onClick={() => navigate("/learn-paleontology")}
        >
          Start Exploring →
        </button>
      </section>
      <section className="survival-cta">
        <div className="survival-card">
          <div className="survival-text">
            <h2>Experience Survival</h2>
            <p>
              Don&apos;t just learn about human evolution — live it. Step into
              the shoes of our ancestors and face the real survival challenges
              they encountered. Make critical decisions that determined
              humanity&apos;s fate.
            </p>

            <ul>
              <li>Face authentic survival dilemmas</li>
              <li>Make decisions that shape destiny</li>
              <li>Experience different eras firsthand</li>
            </ul>
          </div>

          <button
            className="survival-btn"
            onClick={() => navigate("/survival")}
          >
            ⚡ Survival Mode →
          </button>
        </div>
      </section>
    </>
  );
}