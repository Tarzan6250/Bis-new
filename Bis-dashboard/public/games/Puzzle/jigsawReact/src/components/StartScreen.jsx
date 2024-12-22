import { motion } from 'framer-motion';
import { popIn } from '../styles/animations';

const StartScreen = ({ onStart }) => {
  return (
    <motion.div 
      className="text-center"
      initial="initial"
      animate="animate"
      variants={popIn}
    >
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Jigsaw Puzzle Challenge
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Complete puzzles, answer quizzes, and challenge yourself!
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-8 rounded-xl 
                 text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow
                 border-2 border-transparent hover:border-purple-300"
        onClick={onStart}
      >
        Start Adventure
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;