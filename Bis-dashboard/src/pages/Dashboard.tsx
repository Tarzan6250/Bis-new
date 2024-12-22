import React, { useState, useEffect } from 'react';
import { Trophy, Target, Book, Calendar, LucideIcon, Medal, Crown } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config/config';
import Leaderboard from './Leaderboard';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  color: string;
}

interface AchievementProps {
  title: string;
  description: string;
  date: string;
}

interface LeaderboardUser {
  username: string;
  points: number;
  rank: number;
}

const Dashboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const dailyMissions = [
    { id: 'task1', title: 'Complete Safety Standards Quiz', points: 100, progress: 0 },
    { id: 'task2', title: 'Watch 2 Videos on Quality Control', points: 50, progress: 1 },
    { id: 'task3', title: 'Find 3 Easter Eggs', points: 75, progress: 2 },
  ];

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const handleCompleteTask = async (taskId: string, taskTitle: string, points: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      if (completedTasks.includes(taskId)) {
        return; // Task already completed
      }

      const response = await axios.post(
        `${API_URL}/api/tasks/complete`,
        { taskId, taskTitle, points },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setCompletedTasks([...completedTasks, taskId]);
        setLeaderboardData(response.data.leaderboard);
      }
    } catch (error: any) {
      console.error('Error completing task:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
      }
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get(`${API_URL}/api/leaderboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.leaderboard) {
        setLeaderboardData(response.data.leaderboard);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error fetching leaderboard:', error);
      setError(error.response?.data?.message || 'Failed to fetch leaderboard data');
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-gray-500">{rank}</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
          Welcome to BIS Arena
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Trophy}
          title="Total Points"
          value="1,250"
          trend="+150 today"
          color="from-yellow-400 to-orange-600"
        />
        <StatCard
          icon={Target}
          title="Missions Completed"
          value="8/10"
          trend="80% complete"
          color="from-primary-400 to-primary-600"
        />
        <StatCard
          icon={Book}
          title="Standards Learned"
          value="15"
          trend="3 this week"
          color="from-secondary-400 to-secondary-600"
        />
        <StatCard
          icon={Calendar}
          title="Daily Streak"
          value="5 days"
          trend="Personal best!"
          color="from-accent-400 to-accent-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
            Daily Missions
          </h2>
          <div className="space-y-4">
            {dailyMissions.map((mission, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{mission.title}</h3>
                    <p className="text-sm text-gray-500">{mission.points} points</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCompleteTask(mission.id, mission.title, mission.points)}
                  disabled={completedTasks.includes(mission.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    completedTasks.includes(mission.id)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {completedTasks.includes(mission.id) ? 'Completed' : 'Complete'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
            Recent Achievements
          </h2>
          <div className="space-y-4">
            <Achievement
              title="Standards Champion"
              description="Completed all basic safety standards modules"
              date="2 days ago"
            />
            <Achievement
              title="Quick Learner"
              description="Watched 5 videos in one day"
              date="3 days ago"
            />
            <Achievement
              title="Perfect Score"
              description="Scored 100% in Quality Control quiz"
              date="1 week ago"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Leaderboard />
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{trend}</p>
  </div>
);

const Achievement: React.FC<AchievementProps> = ({ title, description, date }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex-1">
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{date}</p>
    </div>
  </div>
);

export default Dashboard;