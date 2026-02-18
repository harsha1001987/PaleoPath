import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./QuizShared.css";

export default function AustralopithecusQuiz() {
    const navigate = useNavigate();
    const species = "australopithecus";

    const questions = [
        {
            q: "Which famous fossil belongs to Australopithecus afarensis?",
            options: ["Ardi", "Lucy", "Turkana Boy", "The Hobbit"],
            correct: 1,
        },
        {
            q: "Australopithecus means...",
            options: ["Southern Ape", "Eastern Man", "Ancient Human", "First Walker"],
            correct: 0,
        },
        {
            q: "A key feature of Australopithecus was...",
            options: ["Large brain", "Making fire", "Bipedalism (Walking on two legs)", "Building houses"],
            correct: 2,
        },
        {
            q: "They lived primarily in...",
            options: ["Africa", "Europe", "Asia", "Australia"],
            correct: 0,
        },
        {
            q: "Did they make complex stone tools?",
            options: ["Yes, advanced ones", "No, they likely used simple unmodified stones/sticks", "Yes, iron tools", "Yes, bronze tools"],
            correct: 1,
        },
    ];

    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    async function handleAnswer(optionIndex) {
        if (isProcessing) return;
        setIsProcessing(true);
        setSelectedOption(optionIndex);

        const isCorrect = optionIndex === questions[index].correct;

        await new Promise(resolve => setTimeout(resolve, 800));

        let newScore = score;
        if (isCorrect) {
            newScore = score + 1;
            setScore(newScore);
        }

        if (index + 1 < questions.length) {
            setIndex(index + 1);
            setSelectedOption(null);
            setIsProcessing(false);
        } else {
            setIsFinished(true);
            localStorage.setItem("australopithecusQuizResult", JSON.stringify({ score: newScore, total: questions.length }));
            navigate(`/species/${species}`);
        }
    }

    const progress = ((index + 1) / questions.length) * 100;

    return (
        <section className="quiz-page">
            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key="quiz-card"
                        className="quiz-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="quiz-header">
                            <div className="quiz-progress-text">
                                Question {index + 1} of {questions.length}
                            </div>
                            <div className="quiz-progress-container">
                                <motion.div
                                    className="quiz-progress-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={questions[index].q}
                                className="quiz-question"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {questions[index].q}
                            </motion.h2>
                        </AnimatePresence>

                        <div className="quiz-options">
                            {questions[index].options.map((opt, i) => {
                                const isSelected = selectedOption === i;
                                const isCorrect = i === questions[index].correct;
                                let feedbackClass = "";
                                if (selectedOption !== null) {
                                    if (isSelected && isCorrect) feedbackClass = "correct";
                                    if (isSelected && !isCorrect) feedbackClass = "wrong";
                                    if (!isSelected && isCorrect && selectedOption !== null) feedbackClass = "correct";
                                }

                                return (
                                    <motion.button
                                        key={i}
                                        className={`quiz-option ${feedbackClass}`}
                                        onClick={() => handleAnswer(i)}
                                        disabled={isProcessing}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                                    >
                                        {opt}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result-card"
                        className="quiz-card quiz-completion"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <div className="quiz-icon" style={{ fontSize: '4rem', marginBottom: '20px' }}>
                                {score === questions.length ? "🦴" : "🐵"}
                            </div>
                        </motion.div>

                        <h2 className="quiz-question" style={{ marginBottom: '10px' }}>Quiz Completed!</h2>

                        <div className="quiz-score-badge">
                            {score} / {questions.length}
                        </div>

                        <p className="quiz-result-message">
                            {score === questions.length
                                ? "Perfect! You know your ancestors well."
                                : "Not bad! Lucy would be impressed."}
                        </p>

                        <motion.button
                            className="quiz-btn-primary"
                            onClick={() => navigate(`/species/${species}`)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back to Species
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
