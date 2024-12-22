import React from 'react';
import { motion } from 'framer-motion';

const SummaryScreen = ({ timeTaken, onRestart }) => {
  return (
    <motion.div
      className="text-center bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl font-bold mb-4 text-green-600">
        Congratulations!
      </h2>
      <p className="text-lg font-medium mb-6">
        You've completed all levels in <span className="font-bold">{timeTaken} seconds</span>!
      </p>
      <p className="text-sm text-gray-600">Your result has been saved.</p>
      <button
        onClick={onRestart}
        className="mt-6 px-6 py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600"
      >
        Restart Adventure
      </button>
    </motion.div>
  );
};

export default SummaryScreen;
