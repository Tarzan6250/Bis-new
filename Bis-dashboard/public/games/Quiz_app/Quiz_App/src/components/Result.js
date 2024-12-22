import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTrophy } from "@fortawesome/free-solid-svg-icons";

const Result = ({ score, totalQuestions, onRetry }) => {
  return (
    <div className="result">
      <h1>
        <FontAwesomeIcon icon={faTrophy} /> Quiz Completed!
      </h1>
      <p>
        You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>.
      </p>
      <button onClick={onRetry}>
        <FontAwesomeIcon icon={faRedo} /> Retry
      </button>
    </div>
  );
};

export default Result;
