const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for game image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/games');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all games
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find();
    res.json({ games });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
});

// Add new game
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, link, category, difficulty } = req.body;
    const imagePath = req.file ? `/uploads/games/${req.file.filename}` : '';

    const game = new Game({
      title,
      description,
      image: imagePath,
      link,
      category,
      difficulty,
      playCount: 0,
      rating: 0
    });

    await game.save();
    res.status(201).json({ game });
  } catch (error) {
    res.status(400).json({ message: 'Error creating game' });
  }
});

// Update game
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, link, category, difficulty } = req.body;
    const updateData = {
      title,
      description,
      link,
      category,
      difficulty
    };

    if (req.file) {
      updateData.image = `/uploads/games/${req.file.filename}`;
    }

    const game = await Game.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json({ game });
  } catch (error) {
    res.status(400).json({ message: 'Error updating game' });
  }
});

// Delete game
router.delete('/:id', auth, async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game' });
  }
});

// Track game play
router.post('/:id/play', auth, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json({ game });
  } catch (error) {
    res.status(500).json({ message: 'Error updating play count' });
  }
});

// Rate game
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update rating (simple average for now)
    game.rating = (game.rating + rating) / 2;
    await game.save();

    res.json({ game });
  } catch (error) {
    res.status(500).json({ message: 'Error rating game' });
  }
});

module.exports = router;
