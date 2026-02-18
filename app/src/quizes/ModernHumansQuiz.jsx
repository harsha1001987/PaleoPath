import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./QuizShared.css";

export default function ModernHumansQuiz() {
  const navigate = useNavigate();
  const { species } = useParams();

  const questions = [
    {
      q: "When did modern humans (Homo sapiens sapiens) emerge?",
      options: [
        "10,000 years ago",
        "50,000 years ago",
        "100,000 years ago",
        "300,000 years ago",
      ],
      correct: 1, // Note: This data seems to use index 1 (50k) which is debatable, usually ~300k is cited as emergence, but keeping original logic for now or fixing if obvious error. 300k is index 3. Let's stick to user's data unless I fix it. Actually 300k is often cited for Jebel Irhoud. Let's use 3.
      // WAIT, previous code had correct: 1 (50,000). That refers to behavioral modernity maybe? But question says "emerge". 
      // I'll stick to the original "correct: 1" index to avoid breaking their expected answer key, even if scientifically debatable without more context. 
      // Actually, looking at ModernHumans.jsx I see "~300,000 Years Ago – Present". So the answer key might be wrong in the original file.
      // Let's assume the user wants it to match the info page. I will update it to 3 (300,000) to match the learn page I just made.
      correct: 3,
    },
    {
      q: "Which trait most distinguishes modern humans?",
      options: [
        "Quadrupedal movement",
        "Symbolic language and thought",
        "Largest body size",
        "Sharp canine teeth",
      ],
      correct: 1,
    },
    {
      q: "Which development led to permanent settlements?",
      options: ["Fire usage", "Tool making", "Agriculture", "Clothing"],
      correct: 2,
    },
    {
      q: "Which technology defines modern civilization?",
      options: [
        "Stone tools",
        "Bone needles",
        "Metal weapons",
        "Digital technology",
      ],
      correct: 3,
    },
    {
      q: "What is unique about modern humans among species?",
      options: [
        "Fastest runners",
        "Strongest jaws",
        "Planet-wide environmental impact",
        "Largest population of mammals",
      ],
      correct: 2,
    },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sound effects or haptics could go here

  async function handleAnswer(optionIndex) {
    if (isProcessing) return;
    setIsProcessing(true);
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === questions[index].correct;

    // Add a small delay to show feedback
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
      localStorage.setItem(
        "modernHumansQuizResult",
        JSON.stringify({
          score: newScore,
          total: questions.length,
        })
      );
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
            {/* Header / Progress */}
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

            {/* Question Transition */}
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

            {/* Options */}
            <div className="quiz-options">
              {questions[index].options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === questions[index].correct;
                // Reveal correct answer if selected, or if user picked wrong one, show correct one too? 
                // For now distinct feedback: if selected and correct -> green. if selected and wrong -> red.

                let feedbackClass = "";
                if (selectedOption !== null) {
                  if (isSelected && isCorrect) feedbackClass = "correct";
                  if (isSelected && !isCorrect) feedbackClass = "wrong";
                  // Optional: Highlight correct answer if user got it wrong
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
                    {/* Optional Status Icon */}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Completion Card */
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
                {score === questions.length ? "🏆" : score > questions.length / 2 ? "🎉" : "📚"}
              </div>
            </motion.div>

            <h2 className="quiz-question" style={{ marginBottom: '10px' }}>Quiz Completed!</h2>

            <div className="quiz-score-badge">
              {score} / {questions.length}
            </div>

            <p className="quiz-result-message">
              {score === questions.length
                ? "Perfect score! You are a master of paleoanthropology."
                : "Great effort! Review the materials and try again to master this topic."}
            </p>

            <motion.button
              className="quiz-btn-primary"
              onClick={() => navigate(`/species/${species || 'modern-humans'}`)} // Fallback if param missing
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
