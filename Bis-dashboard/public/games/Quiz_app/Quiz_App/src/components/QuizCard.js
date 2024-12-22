import React from "react";
import { motion } from "framer-motion";

const QuizCard = ({ question, options, onNext, answerStatus, isClickable }) => {

  const handleOptionClick = (selectedOption) => {
    if (!isClickable) return;

    onNext(selectedOption);
  };

  return (
    <motion.div
      className={`quiz-card ${answerStatus === "correct" ? "correct" : answerStatus === "incorrect" ? "incorrect" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="question">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(option)}
            className={`${answerStatus === "correct" && option === question.answer ? "correct" : answerStatus === "incorrect" && option !== question.answer ? "incorrect" : ""}`}
            style={{
              pointerEvents: isClickable ? "auto" : "none", // Disable clicking until the next question
            }}
          >
            {option}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default QuizCard;
