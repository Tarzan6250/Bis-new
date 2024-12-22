import React from 'react';
import { Trophy, Star, Clock, Target } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      title: 'Standards Master',
      description: 'Complete all basic standards courses',
      icon: Trophy,
      progress: 80,
      points: 500,
    },
    {
      title: 'Quiz Champion',
      description: 'Score 100% in 5 different quizzes',
      icon: Star,
      progress: 60,
      points: 300,
    },
    {
      title: 'Dedicated Learner',
      description: 'Maintain a 7-day learning streak',
      icon: Clock,
      progress: 40,
      points: 200,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <achievement.icon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">{achievement.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{achievement.description}</p>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">{achievement.progress}% completed</p>
            <p className="text-sm text-yellow-600 mt-2">{achievement.points} points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
