export const createPuzzlePieces = (rows, cols, pieceSize) => {
  const pieces = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pieces.push({
        id: row * cols + col,
        x: col * pieceSize,
        y: row * pieceSize,
        correctIndex: row * cols + col,
        currentIndex: null,
      });
    }
  }
  return shufflePieces(pieces);
};

export const shufflePieces = (pieces) => {
  return [...pieces].sort(() => Math.random() - 0.5);
};

export const checkPuzzleComplete = (pieces) => {
  return pieces.every((piece) => piece.currentIndex === piece.correctIndex);
};
