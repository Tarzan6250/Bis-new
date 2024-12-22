const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  college: { type: String },
  profilePic: { type: String },
  points: { type: Number, default: 0 },
  completedTasks: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads', 'profiles'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, age, college } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      age: age || null,
      college: college || null
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        email: user.email,
        username: user.username,
        age: user.age,
        college: user.college,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        email: user.email,
        username: user.username,
        age: user.age,
        college: user.college,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Get user profile
app.get('/api/user/profile/:email', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        email: user.email,
        username: user.username,
        age: user.age,
        college: user.college,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
app.put('/api/user/profile/:email', authenticateToken, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email.toLowerCase();
    if (req.body.age) user.age = parseInt(req.body.age);
    if (req.body.college) user.college = req.body.college;

    // Handle password update
    if (req.body.currentPassword && req.body.newPassword) {
      const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      user.password = await bcrypt.hash(req.body.newPassword, 10);
    }

    // Handle profile picture
    if (req.file) {
      if (user.profilePic) {
        const oldPicPath = path.join(__dirname, user.profilePic);
        if (fs.existsSync(oldPicPath)) {
          fs.unlinkSync(oldPicPath);
        }
      }
      user.profilePic = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();

    res.json({
      user: {
        email: user.email,
        username: user.username,
        age: user.age,
        college: user.college,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Complete task and update points
app.post('/api/tasks/complete', authenticateToken, async (req, res) => {
  try {
    const { taskId, taskTitle, points } = req.body;
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if task is already completed
    if (user.completedTasks.includes(taskId)) {
      return res.status(400).json({ message: 'Task already completed' });
    }

    // Update user points and mark task as completed
    user.points += points;
    user.completedTasks.push(taskId);
    await user.save();

    // Get updated leaderboard data
    const leaderboard = await User.find({}, 'username points')
      .sort({ points: -1 })
      .limit(10);

    const leaderboardWithRanks = leaderboard.map((user, index) => ({
      username: user.username,
      points: user.points,
      rank: index + 1
    }));

    res.json({
      message: 'Task completed successfully',
      points: user.points,
      leaderboard: leaderboardWithRanks
    });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ message: 'Error completing task' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', authenticateToken, async (req, res) => {
  try {
    const leaderboard = await User.find({}, 'username points')
      .sort({ points: -1 })
      .limit(10);

    const leaderboardWithRanks = leaderboard.map((user, index) => ({
      username: user.username,
      points: user.points,
      rank: index + 1
    }));

    res.json({ leaderboard: leaderboardWithRanks });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bisDashboard');
    console.log('Connected to MongoDB');

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads');
    }
    if (!fs.existsSync('./uploads/profiles')) {
      fs.mkdirSync('./uploads/profiles');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try these solutions:`);
        console.error('1. Kill the process using the port');
        console.error('2. Use a different port by setting the PORT environment variable');
        process.exit(1);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
