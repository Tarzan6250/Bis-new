import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import QuizCard from "../components/QuizCard";
import Timer from "../components/Timer";
import Result from "../components/Result";
import CertificateCanvas from "../components/CertificateCanvas";
import correctSound from "../components/assets/correct.mp3";
import incorrectSound from "../components/assets/wrong.mp3";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [levelScores, setLevelScores] = useState([0, 0, 0]);
  const [answerStatus, setAnswerStatus] = useState("");
  const [audio] = useState(new Audio());
  const [isClickable, setIsClickable] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showLevelResult, setShowLevelResult] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [leaderName, setleaderName] = useState(""); // Changed to Team Name
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [levels, setLevels] = useState([]);
  const [showQuizPage, setShowQuizPage] = useState(true); // State to control page visibility
  const canvasRef = useRef(null);

  // Fetch quiz levels and questions from the backend
  const fetchQuizData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quiz-levels");
      const quizLevels = response.data.quizLevels;

      // Map the data to match the frontend structure
      const formattedLevels = quizLevels.map(level => ({
        ...level,
        questions: level.questions.map(question => ({
          question: question.questionText,
          options: question.options.map(option => option.optionText),
          answer: question.options.find(option => option.isCorrect)?.optionText, // Use the correct answer text
        })),
      }));
      setLevels(formattedLevels);
    } catch (error) {
      console.error("Error fetching quiz levels:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  // Send results to backend
  const sendResultsToBackend = async () => {
    try {
      // Send user's individual score to the backend (including the name)
      const totalScore = levelScores.reduce((acc, score) => acc + score, 0);
      
      const response = await axios.post("http://localhost:5000/api/team-scores", {
        teamCode,
        leaderName, // Now sending leaderName instead of leaderName
        collegeName: college,
        individualName: name, // Send individual name as well
        totalScore,
      });

      console.log("Data sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleNextQuestion = (selectedOption) => {
    if (!isClickable) return;

    setIsClickable(false);

    const correctAnswer = levels[currentLevel].questions[currentQuestion].answer;

    // Log for debugging
    console.log("Selected Option:", selectedOption);
    console.log("Correct Answer:", correctAnswer);

    // Check the selected option with the correct answer
    if (selectedOption === correctAnswer) {
      const newScores = [...levelScores];
      newScores[currentLevel] += 1;
      setLevelScores(newScores);
      setAnswerStatus("correct");
      audio.src = correctSound;
    } else {
      setAnswerStatus("incorrect");
      audio.src = incorrectSound;
    }

    audio.play();

    setTimeout(() => {
      setAnswerStatus("");
      if (currentQuestion + 1 < levels[currentLevel].questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowLevelResult(true);
      }
      setIsClickable(true);
    }, 1000);
  };

  const handleNextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setCurrentQuestion(0);
    setShowLevelResult(false);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setLevelScores([0, 0, 0]);
    setAnswerStatus("");
    setIsClickable(true);
    setShowLevelResult(false);
  };

  const handleRedirectToDashboard = () => {
    // Reset quiz states before redirecting
    setName("");
    setCollege("");
    setTeamCode("");
    setleaderName("");
    setIsQuizStarted(false);
    setCurrentQuestion(0);
    setCurrentLevel(0);
    setLevelScores([0, 0, 0]);
    setAnswerStatus("");
    setIsClickable(true);
    setShowLevelResult(false);
  };

  const handleStartQuiz = () => {
    if (name && college && teamCode && leaderName) { // Check for team name instead of leader name
      setIsQuizStarted(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleCertificateDownload = async () => {
    setShowCertificate(true);

    // Send results to the backend
    await sendResultsToBackend();

    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "certificate.png";
      link.click();
    } else {
      console.log("Canvas not found");
    }

    // Navigate to certificate page
    setShowQuizPage(false);
  };

  const handleRedirectToQuizPage = () => {
    setShowQuizPage(true);
    setShowCertificate(false); // Hide certificate page
  };

  if (showCertificate) {
    return (
      <div id="certificate-canvas-container">
        <CertificateCanvas 
          name={name} 
          college={college} 
          score={levelScores.reduce((acc, score) => acc + score, 0)} 
          canvasRef={canvasRef} 
        />
        <button onClick={handleRedirectToQuizPage}>Back to Quiz</button>
      </div>
    );
  }

  if (!isQuizStarted) {
    return (
      <div className="start-quiz">
        <h1>Welcome to the Quiz</h1>
        <form>
          <div>
            <label>
              Full Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              College Name:
              <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Team Code:
              <input type="text" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Team Name:
              <input type="text" value={leaderName} onChange={(e) => setleaderName(e.target.value)} required />  {/* Changed to Team Name */}
            </label>
          </div>
          <button type="button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </form>
      </div>
    );
  }

  if (currentLevel >= levels.length) {
    return (
      <Result
        score={levelScores.reduce((acc, score) => acc + score, 0)}
        totalQuestions={levels.reduce((acc, level) => acc + level.questions.length, 0)}
        onRetry={handleRetry}
      />
    );
  }

  if (showLevelResult) {
    const isPass = levelScores[currentLevel] >= 3; // Threshold for passing

    return (
      <div className="quiz-page">
        <h1>{levels[currentLevel].levelName} Result</h1>
        <p>
          You scored {levelScores[currentLevel]} out of {levels[currentLevel].questions.length}.
        </p>
        {isPass ? (
          <>
            <p>Congratulations! You passed {levels[currentLevel].levelName}.</p>
            {currentLevel + 1 < levels.length ? (
              <button onClick={handleNextLevel}>Next Level</button>
            ) : (
              <>
                <button onClick={handleRetry}>Restart Quiz</button>
                <button onClick={handleCertificateDownload}>Download Certificate</button>
                <button onClick={handleRedirectToDashboard}>Go to Dashboard</button>
              </>
            )}
          </>
        ) : (
          <>
            <p>Sorry, you failed {levels[currentLevel].levelName}.</p>
            <button onClick={handleRetry}>Retry Level</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1>{levels[currentLevel].levelName}</h1>
      <Timer duration={levels[currentLevel].duration} onTimeUp={() => setShowLevelResult(true)} />
      <QuizCard
        question={levels[currentLevel].questions[currentQuestion].question}
        options={levels[currentLevel].questions[currentQuestion].options}
        onNext={handleNextQuestion}
        answerStatus={answerStatus}
        isClickable={isClickable}
      />
    </div>
  );
};

export default QuizPage;
