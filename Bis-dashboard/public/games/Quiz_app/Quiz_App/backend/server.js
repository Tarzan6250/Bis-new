const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Joi = require("joi");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/teamCollaboration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Question Schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const quizLevelSchema = new mongoose.Schema({
  levelName: { type: String, required: true },
  duration: { type: Number, required: true },
  questions: [questionSchema],
});

const QuizLevel = mongoose.model("QuizLevel", quizLevelSchema);

// Team Score Schema with Array of Individual Names
const teamScoreSchema = new mongoose.Schema({
  teamCode: { type: String, required: true },
  leaderName: { type: String, required: true },
  collegeName: { type: String, required: true },
  individualNames: { type: [String], required: true }, // Array of individual names
  totalScore: { type: Number, required: true },
  dateSubmitted: { type: Date, default: Date.now },
});

const TeamScore = mongoose.model("TeamScore", teamScoreSchema);

// API Route to fetch quiz levels and questions
app.get("/api/quiz-levels", async (req, res) => {
  try {
    const quizLevels = await QuizLevel.find();

    const formattedQuizLevels = quizLevels.map((level) => ({
      levelName: level.levelName,
      duration: level.duration,
      questions: level.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        })),
        answer: question.options.find((option) => option.isCorrect)?.optionText, // Return the correct option text
      })),
    }));

    res.status(200).json({ quizLevels: formattedQuizLevels });
  } catch (error) {
    console.error("Error fetching quiz levels:", error);
    res.status(500).json({ success: false, message: "Error fetching quiz levels." });
  }
});

// API Route to store results or update team with new name and score
app.post("/api/team-scores", async (req, res) => {
  try {
    const { teamCode, leaderName, collegeName, individualName, totalScore } = req.body;

    // Validate that individualName is a string
    if (typeof individualName !== "string") {
      return res.status(400).json({ success: false, message: "individualName must be a string." });
    }

    // Check if the team with the given teamCode exists
    const existingTeam = await TeamScore.findOne({ teamCode });

    if (existingTeam) {
      // If the team exists, add the new user's name to the individualNames array (if not already added)
      if (!existingTeam.individualNames.includes(individualName)) {
        existingTeam.individualNames.push(individualName);
      }

      // Add the current total score to the existing team's score
      existingTeam.totalScore += totalScore;

      // Save the updated team
      await existingTeam.save();

      res.status(200).json({ success: true, message: "Name added and score updated for the existing team." });
    } else {
      // If the team doesn't exist, create a new team with the provided details
      const newTeamScore = new TeamScore({
        teamCode,
        leaderName,
        collegeName,
        individualNames: [individualName], // Start with the provided individual name
        totalScore,
      });

      // Save the new team
      await newTeamScore.save();

      res.status(201).json({ success: true, message: "New team created and name added." });
    }
  } catch (error) {
    console.error("Error saving results:", error);
    res.status(500).json({ success: false, message: "Error saving results." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
