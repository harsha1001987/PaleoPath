import { useNavigate } from "react-router-dom";
import "./survival-mode.css";

export default function SurvivalMode() {
  const navigate = useNavigate();

  return (
    <section className="survival-page">
      <button className="back-btn" onClick={() => navigate("/timeline")}>
        ← Back to timeline
      </button>

      <h1 className="survival-title">Survival Mode</h1>
      <p className="survival-subtitle">
        Experience life as different human species throughout evolution. Face
        real survival dilemmas, make critical decisions, and discover how your
        choices shape humanity&apos;s future. Which ancestor will you become?
      </p>
    
      <div className="species-grid">
        <div onClick={() => navigate("/survival/australopithecus")}>
        <SpeciesCard
          title="Australopithecus"
          era="4 Million Years Ago - African Savanna"
          desc="Experience the African savanna as our earliest ancestors. Navigate dangerous predators, find water sources, and survive through instinct and observation."
          icon="🌄"
        />
        </div>
      <div onClick={() => navigate("/survival/homo-habilis")}>
        <SpeciesCard
          title="Homo habilis"
          era="2.4 Million Years Ago - Early Tool Users"
          desc="Pioneer tool-making technology. Discover how innovation and strategic thinking changed survival forever. Create, adapt, and lead your people forward."
          icon="🛠️"
        />
        </div>
<div onClick={() => navigate("/survival/homo-erectus")}>
        <SpeciesCard
          title="Homo erectus"
          era="1.9 Million Years Ago - Master of Fire"
          desc="Master fire and explore new lands. Face ice ages, hunt mega-fauna, and establish the first settlements. Witness humanity's global expansion."
          icon="🔥"
          onClick={() => navigate("/survival/homo-erectus")}
        />
        </div>
   <div onClick={() => navigate("/survival/homo-sapiens")}>
        <SpeciesCard
          title="Homo sapiens"
          era="300,000 Years Ago - The Thinking Species"
          desc="Think, create, and innovate. Develop language, art, and spirituality. Your decisions shape culture, tradition, and the future of human consciousness."
          icon="🧠"
          
          
        />
        </div>
        
      </div>

      <div className="how-to-play">
        <h2>How to Play</h2>
        <ol>
          <li>Choose a species and era to experience</li>
          <li>Read the survival scenario and understand your situation</li>
          <li>Make a decision from the available choices</li>
          <li>Experience the consequences and learn from history</li>
          <li>Face new challenges and test your survival instincts</li>
        </ol>
      </div>
    </section>
  );
}

function SpeciesCard({ title, era, desc, icon, sapiens }) {
  return (
    <div className={`species-card ${sapiens ? "sapiens" : ""}`}>
      <span className="species-icon">{icon}</span>
      <h3>{title}</h3>
      <span className="era">{era}</span>
      <p>{desc}</p>
      <button className="play-btn">▶ Play Now</button>
    </div>
  );
}
