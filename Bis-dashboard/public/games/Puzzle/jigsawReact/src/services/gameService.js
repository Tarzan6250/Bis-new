import axios from 'axios';

export const saveGameTime = async (timeTaken) => {
  const response = await axios.post('http://localhost:5000/api/save-time', {
    user: 'Player 1',
    timeTaken,
  });
  return response.data;
};
