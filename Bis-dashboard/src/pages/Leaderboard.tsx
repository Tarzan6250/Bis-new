import React from 'react';
import { Medal, Trophy, Award } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    { rank: 1, name: 'Alex Johnson', points: 2500, badges: 15 },
    { rank: 2, name: 'Sarah Chen', points: 2350, badges: 13 },
    { rank: 3, name: 'Mike Smith', points: 2200, badges: 12 },
    { rank: 4, name: 'Emma Davis', points: 2100, badges: 11 },
    { rank: 5, name: 'James Wilson', points: 2000, badges: 10 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-medium text-gray-600">
          <div>Rank</div>
          <div>Name</div>
          <div>Points</div>
          <div>Badges</div>
        </div>
        {leaders.map((leader) => (
          <div key={leader.rank} className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50">
            <div className="flex items-center gap-2">
              {leader.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
              {leader.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
              {leader.rank === 3 && <Award className="w-5 h-5 text-orange-400" />}
              {leader.rank > 3 && <span className="text-gray-600">{leader.rank}</span>}
            </div>
            <div className="text-gray-800">{leader.name}</div>
            <div className="text-blue-600 font-medium">{leader.points}</div>
            <div className="text-gray-600">{leader.badges}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;