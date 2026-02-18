import "./HomoSapiens.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomoSapiens() {
    const navigate = useNavigate();
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("homoSapiensQuizResult");
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
                <span className="topbar-title">Homo sapiens</span>
            </div>

            {/* Content */}
            <div className="species-content">
                <div className="species-header">
                    <div className="species-icon">🧠</div>

                    <div>
                        <h1>Homo sapiens</h1>
                        <p className="species-subtitle">The Wise Human</p>
                        <p className="species-era">~300,000 Years Ago – Present</p>
                    </div>
                </div>

                <p className="species-description">
                    Emerging in Africa, Homo sapiens are distinguished by their lighter build and large, complex brains. They eventually spread out of Africa, encountering and interbreeding with other hominins like Neanderthals.
                </p>

                {/* Detailed Information */}
                <div className="species-details">
                    <div className="details-grid">
                        <div className="detail-block">
                            <h3>Physical Characteristics</h3>
                            <ul>
                                <li>High, rounded skull</li>
                                <li>Small brow ridges</li>
                                <li>Prominent chin</li>
                                <li>Lighter skeleton than Neanderthals</li>
                            </ul>
                        </div>

                        <div className="detail-block">
                            <h3>Cognitive Abilities</h3>
                            <p>
                                Advanced ability for symbolic thought, art, and complex language allowed for rapid cultural evolution and adaptation.
                            </p>
                        </div>

                        <div className="detail-block">
                            <h3>Diet</h3>
                            <p>
                                Hunter-gatherers initially, exploiting a wide range of resources including marine life, plants, and game.
                            </p>
                        </div>

                        <div className="detail-block">
                            <h3>Tools & Culture</h3>
                            <ul>
                                <li>Blade technology</li>
                                <li>Bone and antler tools</li>
                                <li>Cave art (Lascaux, Altamira)</li>
                                <li>Personal ornamentation</li>
                            </ul>
                        </div>

                        <div className="detail-block">
                            <h3>Habitat</h3>
                            <p>
                                Originated in Africa. Successfully adapted to diverse climates as they migrated across the globe.
                            </p>
                        </div>

                        <div className="detail-block">
                            <h3>Social Structure</h3>
                            <p>
                                Larger social networks than previous humans, allowing for trade and exchange of ideas over long distances.
                            </p>
                        </div>
                    </div>

                    <div className="detail-wide">
                        <h3>Key Sites</h3>
                        <div className="discoveries">
                            <span>Jebel Irhoud (Morocco)</span>
                            <span>Omo Kibish (Ethiopia)</span>
                            <span>Skhul/Qafzeh (Israel)</span>
                            <span>Cro-Magnon (France)</span>
                        </div>
                    </div>

                    <div className="detail-wide highlight">
                        <h3>The Great Migration</h3>
                        <p>
                            Around 60,000-90,000 years ago, a major wave of Homo sapiens left Africa, eventually replacing all other human species and populating the entire planet.
                        </p>
                    </div>

                    {/* Quiz Section */}
                    <div className="detail-wide quiz-cta">
                        <div className="quiz-card">
                            <div className="quiz-icon">🎨</div>

                            <h3 className="quiz-title">Test Your Knowledge</h3>

                            <p className="quiz-text">
                                How much do you know about the early days of our species?
                            </p>

                            <button
                                className="quiz-btn"
                                onClick={() => navigate("/quiz/homo-sapiens")}
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
