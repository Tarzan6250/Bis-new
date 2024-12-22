import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const confettiCount = 50;
  const colors = ['#FF69B4', '#4F46E5', '#8B5CF6', '#EC4899', '#06B6D4'];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(confettiCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2"
          initial={{
            top: '-10%',
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
          animate={{
            top: '100%',
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;