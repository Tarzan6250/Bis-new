import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPuzzlePieces, checkPuzzleComplete } from '../utils/puzzleUtils';

const PuzzleGrid = ({ level, hintImage, onSolved }) => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const rows = 4;
  const cols = 4;
  const pieceSize = 100;

  useEffect(() => {
    const shuffledPieces = createPuzzlePieces(rows, cols, pieceSize);
    shuffledPieces.forEach((piece, index) => {
      piece.currentIndex = index; // Assign initial currentIndex based on shuffle order
    });
    setPieces(shuffledPieces);
  }, [level]);

  const handleDragStart = (piece) => {
    setDraggedPiece(piece);
  };

  const handleDrop = (targetIndex) => {
    if (!draggedPiece) return;

    setPieces((prevPieces) => {
      const newPieces = prevPieces.map((piece) => {
        if (piece.id === draggedPiece.id) {
          return { ...piece, currentIndex: targetIndex };
        }
        if (piece.currentIndex === targetIndex) {
          return { ...piece, currentIndex: draggedPiece.currentIndex };
        }
        return piece;
      });

      if (checkPuzzleComplete(newPieces)) {
        setTimeout(() => onSolved(), 500);
      }

      return newPieces;
    });

    setDraggedPiece(null);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Display the hint image */}
      <div className="mb-4">
        <img
          src={hintImage}
          alt={`Hint for level ${level}`}
          className="max-w-full mx-auto rounded-md shadow-lg"
        />
      </div>

      {/* Puzzle grid */}
      <div
        className="grid grid-cols-4 gap-1 bg-gradient-to-br from-purple-100 to-pink-100 
                   p-3 rounded-xl shadow-lg"
        style={{ width: `${cols * (pieceSize + 4)}px` }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const piece = pieces.find((p) => p.currentIndex === index);

          return (
            <motion.div
              key={index}
              className="bg-white/50 rounded-lg shadow-sm"
              style={{ width: pieceSize, height: pieceSize }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              {piece && (
                <motion.div
                  draggable
                  onDragStart={() => handleDragStart(piece)}
                  className="w-full h-full bg-cover bg-center cursor-move rounded-lg"
                  style={{
                    backgroundImage: `url(/images/level-${level}.jpeg)`,
                    backgroundPosition: `-${piece.x}px -${piece.y}px`,
                    backgroundSize: `${cols * pieceSize}px ${rows * pieceSize}px`, // Ensure the image size matches the full puzzle
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{ scale: 1.1 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PuzzleGrid;
