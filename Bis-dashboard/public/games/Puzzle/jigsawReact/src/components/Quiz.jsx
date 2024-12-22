import { motion } from 'framer-motion';
import { slideUp } from '../styles/animations';

const Quiz = ({ quiz, onAnswer }) => {
  if (!quiz) {
    return (
      <motion.div
        className="flex items-center justify-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xl text-gray-600 font-semibold">Loading quiz...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg max-w-2xl mx-auto
                 border-2 border-purple-100"
    >
      <motion.h2 
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 
                   text-transparent bg-clip-text"
      >
        {quiz.question}
      </motion.h2>
      <div className="grid grid-cols-1 gap-4">
        {quiz.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, backgroundColor: '#4F46E5' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 } 
            }}
            className="bg-indigo-500 text-white py-4 px-6 rounded-xl hover:bg-indigo-600 
                     transition-colors shadow-md hover:shadow-lg font-semibold
                     border-2 border-transparent hover:border-indigo-300"
            onClick={() => onAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Quiz;
