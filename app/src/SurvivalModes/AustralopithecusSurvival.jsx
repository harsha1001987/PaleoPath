import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Zap, Brain, AlertTriangle } from "lucide-react";
import savannaBg from "../assets/savanna-bg.png";
import australopithecus from "../assets/australopithecus.png";

const scenarios = [
  {
    id: 1,
    title: "Morning on the Plains",
    description:
      "The sun rises over the African grasslands. Your group is hungry. You spot fruit trees in the distance, but also hear the calls of predators nearby. What do you do?",
    decisions: [
      {
        id: "forage",
        text: "Forage for fruit in the trees",
        consequence: "You lead your group to the trees, keeping watch for danger.",
        healthChange: 5,
        energyChange: -10,
        wisdomChange: 10,
        nextStage: 2,
      },
      {
        id: "wait",
        text: "Wait until it's safer",
        consequence: "You stay hidden, but hunger grows.",
        healthChange: -5,
        energyChange: -5,
        wisdomChange: 5,
        nextStage: 2,
      },
      {
        id: "scout",
        text: "Scout the area for threats",
        consequence: "You spot a predator and warn your group in time.",
        healthChange: 0,
        energyChange: -10,
        wisdomChange: 15,
        nextStage: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Predator Approaches",
    description:
      "A large cat prowls nearby. Your group is nervous. How do you respond?",
    decisions: [
      {
        id: "climb",
        text: "Climb trees for safety",
        consequence: "Most of your group escapes, but some struggle to climb.",
        healthChange: -5,
        energyChange: -10,
        wisdomChange: 10,
        nextStage: 3,
      },
      {
        id: "group-up",
        text: "Group together and make noise",
        consequence: "You scare the predator away with loud calls.",
        healthChange: 0,
        energyChange: -15,
        wisdomChange: 15,
        nextStage: 3,
      },
      {
        id: "hide",
        text: "Hide in the tall grass",
        consequence: "You stay hidden, but the tension is high.",
        healthChange: 0,
        energyChange: -5,
        wisdomChange: 5,
        nextStage: 3,
      },
    ],
  },
  {
    id: 3,
    title: "Rainstorm",
    description:
      "A sudden rainstorm soaks the plains. Shelter is needed. What is your plan?",
    decisions: [
      {
        id: "seek-cave",
        text: "Seek shelter in a cave",
        consequence: "You find a dry cave and keep your group safe.",
        healthChange: 10,
        energyChange: -10,
        wisdomChange: 10,
        nextStage: 4,
      },
      {
        id: "huddle",
        text: "Huddle together under trees",
        consequence: "You stay somewhat dry, but it's cold.",
        healthChange: -5,
        energyChange: -5,
        wisdomChange: 5,
        nextStage: 4,
      },
      {
        id: "keep-moving",
        text: "Keep moving to stay warm",
        consequence: "You avoid the cold, but use up energy.",
        healthChange: 0,
        energyChange: -15,
        wisdomChange: 10,
        nextStage: 4,
      },
    ],
  },
  {
    id: 4,
    title: "Nightfall",
    description:
      "The day ends. Your group gathers together. How do you prepare for tomorrow?",
    decisions: [
      {
        id: "share",
        text: "Share food and stories",
        consequence: "You strengthen social bonds and teach the young.",
        healthChange: 10,
        energyChange: 10,
        wisdomChange: 20,
        nextStage: -1,
      },
      {
        id: "guard",
        text: "Set a night watch",
        consequence: "You keep your group safe through the night.",
        healthChange: 5,
        energyChange: 5,
        wisdomChange: 25,
        nextStage: -1,
      },
      {
        id: "rest",
        text: "Rest and recover",
        consequence: "Everyone sleeps, ready for a new day.",
        healthChange: 20,
        energyChange: 25,
        wisdomChange: 5,
        nextStage: -1,
      },
    ],
  },
];

const quizQuestions = [
  {
    question: "What is Australopithecus best known for?",
    options: ["First use of fire", "Walking upright", "Making stone tools", "Building shelters"],
    answer: "Walking upright",
  },
  {
    question: "Where did Australopithecus mainly live?",
    options: ["Asia", "Europe", "Africa", "North America"],
    answer: "Africa",
  },
  {
    question: "What was a key adaptation of Australopithecus?",
    options: ["Language", "Bipedalism", "Farming", "Art"],
    answer: "Bipedalism",
  },
];

const AustralopithecusSurvival = () => {
  const [gameState, setGameState] = useState({
    health: 100,
    energy: 100,
    wisdom: 0,
    stage: 1,
    outcome: null,
  });
  const [showConsequence, setShowConsequence] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const currentScenario = scenarios.find((s) => s.id === gameState.stage);

  const handleDecision = (decision) => {
    setShowConsequence(decision.consequence);
    setIsTransitioning(true);

    setTimeout(() => {
      const newHealth = Math.max(0, Math.min(100, gameState.health + decision.healthChange));
      const newEnergy = Math.max(0, Math.min(100, gameState.energy + decision.energyChange));
      const newWisdom = gameState.wisdom + decision.wisdomChange;

      if (decision.nextStage === -1) {
        let outcome = "";
        if (newWisdom >= 60) {
          outcome = "A true pioneer! Your adaptability helps your group survive.";
        } else if (newHealth >= 70) {
          outcome = "A resilient survivor! Your caution keeps your group safe.";
        } else {
          outcome = "You survived another day. The journey continues...";
        }
        setGameState({ ...gameState, health: newHealth, energy: newEnergy, wisdom: newWisdom, outcome });
        setShowQuiz(true);
      } else {
        setGameState({
          health: newHealth,
          energy: newEnergy,
          wisdom: newWisdom,
          stage: decision.nextStage,
          outcome: null,
        });
      }

      setShowConsequence(null);
      setIsTransitioning(false);
    }, 2000);
  };

  const resetGame = () => {
    setGameState({ health: 100, energy: 100, wisdom: 0, stage: 1, outcome: null });
    setShowQuiz(false);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
  };

  const handleQuizAnswer = (option) => {
    setQuizAnswered(true);
    if (option === quizQuestions[quizIndex].answer) {
      setQuizScore(quizScore + 1);
    }
    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setQuizAnswered(false);
      } else {
        setShowQuiz(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0704' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .prehistoric-container { font-family: 'Lora', serif; color: #f5e6d3; }
        .title-font { font-family: 'Cinzel', serif; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
        .subtitle-font { font-family: 'Cinzel', serif; font-weight: 400; letter-spacing: 0.15em; }
        .bg-savanna { position: fixed; inset: 0; background-image: url(${savannaBg}); background-size: cover; background-position: center; filter: brightness(0.7) contrast(1.1); }
        .bg-overlay { position: fixed; inset: 0; background: linear-gradient(to bottom, rgba(20, 15, 10, 0.85) 0%, rgba(35, 25, 15, 0.75) 50%, rgba(15, 10, 5, 0.95) 100%); }
        .grain-texture { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"); pointer-events: none; z-index: 1; mix-blend-mode: overlay; }
        .stat-card { background: linear-gradient(135deg, rgba(40, 30, 20, 0.9) 0%, rgba(30, 20, 15, 0.95) 100%); border: 2px solid rgba(180, 140, 90, 0.3); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
        .stat-card:hover { border-color: rgba(220, 170, 100, 0.6); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15); }
        .progress-bar { background: rgba(60, 45, 30, 0.8); border-radius: 10px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5); }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--bar-color-start), var(--bar-color-end)); transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px var(--bar-glow); position: relative; }
        .progress-fill::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%); animation: shimmer 2s infinite; }
        @keyframes shimmer { 0%, 100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
        .scenario-panel { background: linear-gradient(135deg, rgba(25, 18, 12, 0.95) 0%, rgba(35, 25, 18, 0.98) 100%); border: 3px solid rgba(180, 140, 90, 0.4); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1); position: relative; overflow: hidden; }
        .scenario-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(220, 170, 100, 0.5), transparent); }
        .decision-button { background: linear-gradient(135deg, rgba(60, 45, 30, 0.6) 0%, rgba(40, 30, 20, 0.8) 100%); border: 2px solid rgba(180, 140, 90, 0.25); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
        .decision-button::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(220, 170, 100, 0) 0%, rgba(220, 170, 100, 0.1) 100%); opacity: 0; transition: opacity 0.3s ease; }
        .decision-button:hover::before { opacity: 1; }
        .decision-button:hover { border-color: rgba(220, 170, 100, 0.6); transform: translateX(4px); box-shadow: -4px 0 12px rgba(220, 170, 100, 0.3), 0 4px 20px rgba(0, 0, 0, 0.5); }
        .decision-button:disabled { opacity: 0.5; cursor: not-allowed; }
        .character-image { filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9)); animation: idle 6s ease-in-out infinite; }
        @keyframes idle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .scale-in { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .back-link { color: rgba(220, 170, 100, 0.9); text-decoration: none; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 0.5rem; }
        .back-link:hover { color: rgba(245, 200, 130, 1); gap: 0.75rem; }
        .glow-text { text-shadow: 0 0 20px rgba(220, 170, 100, 0.5); }
      `}</style>

      {/* Background Layers */}
      <div className="bg-savanna" />
      <div className="bg-overlay" />
      <div className="grain-texture" />

      {/* Content */}
      <div className="prehistoric-container relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <Link to="/survival" className="back-link subtitle-font text-sm">
            <ArrowLeft className="w-4 h-4" />
            RETURN TO SPECIES
          </Link>
        </header>

        {/* Main Game Area */}
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-7xl mx-auto px-2 md:px-8">
          {/* Stats Row */}
          <div className="flex flex-row gap-8 w-full max-w-2xl justify-center mb-8 mt-2">
            <StatBar
              icon={Heart}
              label="HEALTH"
              value={gameState.health}
              colorStart="#dc2626"
              colorEnd="#ef4444"
              glow="#ef4444"
            />
            <StatBar
              icon={Zap}
              label="ENERGY"
              value={gameState.energy}
              colorStart="#eab308"
              colorEnd="#fbbf24"
              glow="#fbbf24"
            />
            <StatBar
              icon={Brain}
              label="WISDOM"
              value={gameState.wisdom}
              colorStart="#d97706"
              colorEnd="#f59e0b"
              glow="#f59e0b"
              isScore
            />
          </div>

          {/* Main Content Row */}
          <div className="flex flex-col lg:flex-row gap-12 w-full items-center justify-center">
            {/* Left Side - Character */}
            <div className="flex items-end justify-center w-full lg:w-1/2 xl:w-1/3">
              <img
                src={australopithecus}
                alt="Australopithecus"
                className="character-image w-72 md:w-80 lg:w-full h-auto object-contain"
                style={{ maxHeight: '320px' }}
              />
            </div>

            {/* Right Side - Scenario Panel */}
            <div className="flex-1 w-full max-w-2xl">
              {gameState.outcome && showQuiz ? (
                // Quiz Panel
                <div className="scenario-panel p-8 rounded-2xl scale-in h-full">
                  <h2 className="title-font text-3xl md:text-4xl mb-6 glow-text" style={{ color: '#f59e0b' }}>
                    Australopithecus Quiz
                  </h2>
                  <div className="mb-8">
                    <div className="subtitle-font text-lg mb-4" style={{ color: '#f5e6d3' }}>
                      {quizQuestions[quizIndex].question}
                    </div>
                    <div className="space-y-3">
                      {quizQuestions[quizIndex].options.map((option, idx) => (
                        <button
                          key={option}
                          onClick={() => handleQuizAnswer(option)}
                          disabled={quizAnswered}
                          className={`decision-button w-full text-left px-6 py-4 rounded-xl fade-in stagger-${idx + 1}`}
                          style={{ fontSize: '1.1rem', fontWeight: 500 }}
                        >
                          <span className="subtitle-font" style={{ color: '#f5e6d3' }}>
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                    {quizAnswered && (
                      <div className="mt-4 text-lg subtitle-font" style={{ color: '#f59e0b' }}>
                        {option === quizQuestions[quizIndex].answer ? "Correct!" : "Answer submitted."}
                      </div>
                    )}
                  </div>
                  {quizIndex === quizQuestions.length - 1 && !showQuiz && (
                    <div className="mb-8">
                      <div className="title-font text-2xl glow-text" style={{ color: '#f59e0b' }}>
                        Quiz Complete
                      </div>
                      <div className="subtitle-font text-lg mt-2" style={{ color: '#f5e6d3' }}>
                        Score: {quizScore} / {quizQuestions.length}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={resetGame}
                    className="decision-button px-8 py-4 rounded-lg w-full md:w-auto"
                  >
                    <span className="subtitle-font text-sm md:text-base" style={{ color: '#f5e6d3' }}>
                      PLAY AGAIN
                    </span>
                  </button>
                </div>
              ) : gameState.outcome ? (
                // Game Complete
                <div className="scenario-panel p-8 rounded-2xl scale-in h-full">
                  <h2 className="title-font text-3xl md:text-4xl mb-6 glow-text" style={{ color: '#f59e0b' }}>
                    Journey Complete
                  </h2>
                  <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                    {gameState.outcome}
                  </p>
                  <div className="flex gap-8 mb-8">
                    <div>
                      <div className="title-font text-3xl md:text-4xl glow-text" style={{ color: '#f59e0b' }}>
                        {gameState.wisdom}
                      </div>
                      <div className="subtitle-font text-xs md:text-sm opacity-60 mt-1">WISDOM GAINED</div>
                    </div>
                    <div>
                      <div className="title-font text-3xl md:text-4xl" style={{ color: '#f5e6d3' }}>
                        {gameState.health}%
                      </div>
                      <div className="subtitle-font text-xs md:text-sm opacity-60 mt-1">FINAL HEALTH</div>
                    </div>
                  </div>
                  <button
                    onClick={resetGame}
                    className="decision-button px-8 py-4 rounded-lg w-full md:w-auto"
                  >
                    <span className="subtitle-font text-sm md:text-base" style={{ color: '#f5e6d3' }}>
                      PLAY AGAIN
                    </span>
                  </button>
                </div>
              ) : showConsequence ? (
                // Consequence
                <div className="scenario-panel p-8 rounded-2xl fade-in h-full" style={{ borderColor: 'rgba(245, 158, 11, 0.6)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <AlertTriangle className="w-8 h-8 flex-shrink-0" style={{ color: '#f59e0b' }} />
                    <h3 className="title-font text-xl md:text-2xl glow-text" style={{ color: '#f59e0b' }}>
                      CONSEQUENCE
                    </h3>
                  </div>
                  <p className="text-lg md:text-xl italic leading-relaxed opacity-90">
                    {showConsequence}
                  </p>
                </div>
              ) : currentScenario ? (
                // Scenario
                <div className={`scenario-panel p-8 rounded-2xl h-full ${isTransitioning ? 'opacity-50' : 'fade-in'}`}>
                  <h2 className="title-font text-3xl md:text-4xl mb-4 glow-text" style={{ color: '#f5e6d3' }}>
                    {currentScenario.title}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed mb-8 opacity-90">
                    {currentScenario.description}
                  </p>
                  <div className="space-y-4">
                    {currentScenario.decisions.map((decision, index) => (
                      <button
                        key={decision.id}
                        onClick={() => handleDecision(decision)}
                        disabled={isTransitioning}
                        className={`decision-button w-full text-left px-6 py-5 rounded-xl fade-in stagger-${index + 1}`}
                        style={{ fontSize: '1.25rem', fontWeight: 500 }}
                      >
                        <span className="subtitle-font" style={{ color: '#f5e6d3' }}>
                          {decision.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBar = ({ icon: Icon, label, value, colorStart, colorEnd, glow, isScore }) => {
  return (
    <div className="stat-card px-4 py-2.5 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" style={{ color: colorEnd }} />
        <div className="subtitle-font text-xs tracking-widest opacity-70">
          {label}
        </div>
        <div className="ml-auto flex items-center gap-3">
          {!isScore && (
            <div className="progress-bar h-2 w-32">
              <div
                className="progress-fill"
                style={{
                  width: `${value}%`,
                  '--bar-color-start': colorStart,
                  '--bar-color-end': colorEnd,
                  '--bar-glow': glow,
                }}
              />
            </div>
          )}
          <div className="title-font text-xl min-w-[3rem] text-right" style={{ color: '#f5e6d3' }}>
            {isScore ? value : `${value}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AustralopithecusSurvival;
