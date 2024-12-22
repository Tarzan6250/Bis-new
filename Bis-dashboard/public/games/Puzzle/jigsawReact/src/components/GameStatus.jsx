import { motion } from 'framer-motion';
import { slideUp } from '../styles/animations';

const GameStatus = ({ level, timer }) => {
  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg mb-6 
                 text-white flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="text-lg">
          <span className="font-bold">Level:</span>
          <motion.span 
            key={level}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="ml-2 bg-white text-purple-600 px-3 py-1 rounded-lg font-bold"
          >
            {level + 1}
          </motion.span>
        </div>
        <div className="text-lg">
          <span className="font-bold">Time:</span>
          <span className="ml-2 font-mono">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i <= level ? 'bg-white' : 'bg-purple-300'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GameStatus;