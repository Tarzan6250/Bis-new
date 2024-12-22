import React, { useState, useEffect } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="timer">
      <div className="progress-bar" style={{ width: `${(timeLeft / duration) * 100}%` }}></div>
      <div>{timeLeft}s</div>
    </div>
  );
};

export default Timer;
