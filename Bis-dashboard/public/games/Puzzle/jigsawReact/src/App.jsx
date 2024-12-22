import { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import PuzzleGrid from './components/PuzzleGrid';
import Quiz from './components/Quiz';
import GameStatus from './components/GameStatus';
import StartScreen from './components/StartScreen';
import SummaryScreen from './components/SummaryScreen';
import Confetti from './components/Confetti';
import { useTimer } from './hooks/useTimer';
import { saveGameTime } from './services/gameService';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [hints, setHints] = useState([
    '/images/level-1.jpeg',
    '/images/level-2.jpeg',
    '/images/level-3.jpeg',
  ]); // Array of hint images for each level

  const timer = useTimer(gameStarted);

  useEffect(() => {
    if (showQuiz) {
      fetchQuiz();
    }
  }, [showQuiz, currentLevel]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/quiz/${currentLevel + 1}`);
      if (response.data.success) {
        setQuiz(response.data.question);
      } else {
        console.error('No quiz data received.');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handlePuzzleSolved = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowQuiz(true);
    }, 2000);
  };

  const handleQuizAnswer = async (answer) => {
    if (quiz && answer === quiz.answer) {
      setShowConfetti(true);
      setTimeout(async () => {
        setShowConfetti(false);
        if (currentLevel < 2) {
          setCurrentLevel((prev) => prev + 1);
          setShowQuiz(false);
        } else {
          try {
            await saveGameTime(timer);
            setGameStarted(false);
            setGameCompleted(true);
          } catch (error) {
            console.error('Error saving time:', error);
          }
        }
      }, 2000);
    }
  };

  const handleRestart = () => {
    setGameCompleted(false);
    setCurrentLevel(0);
    setShowQuiz(false);
    setGameStarted(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8 px-4"
      style={{ backgroundImage: 'url(/images/bg1.jpg)' }}
    >
      <div className="max-w-4xl mx-auto">
        {showConfetti && <Confetti />}
        {!gameStarted ? (
          gameCompleted ? (
            <SummaryScreen timeTaken={timer} onRestart={handleRestart} />
          ) : (
            <StartScreen onStart={() => setGameStarted(true)} />
          )
        ) : (
          <>
            <GameStatus level={currentLevel} timer={timer} />
            <AnimatePresence mode="wait">
              {showQuiz && quiz ? (
                <Quiz key="quiz" quiz={quiz} onAnswer={handleQuizAnswer} />
              ) : (
                <PuzzleGrid
                  key="puzzle"
                  level={currentLevel + 1}
                  hintImage={hints[currentLevel]} // Pass the hint image for the current level
                  onSolved={handlePuzzleSolved}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
