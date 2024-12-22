import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  Trophy,
  Star,
  Clock,
  ArrowRight,
  Activity
} from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  difficulty: string;
  playCount: number;
  rating: number;
}

const GameHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const defaultGames: Game[] = [
    {
      id: '1',
      title: 'Fruit Quality Inspector',
      description: 'Slice fruits while learning quality standards.',
      image: '/assets/images/Fruitcutter.jpeg',
      link: '/games/Fruitcutter/fruitCutterNew/index.html',
      category: 'Action',
      difficulty: 'Easy',
      playCount: 2500,
      rating: 4.8
    },
    {
      id: '2',
      title: 'BIS Quiz Challenge',
      description: 'Test your knowledge of BIS standards.',
      image: '/assets/images/Quiz.jpeg',
      link: 'http://localhost:3001',
      category: 'Quiz',
      difficulty: 'Medium',
      playCount: 3100,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Standards Puzzle',
      description: 'Arrange pieces to complete BIS procedures.',
      image: '/assets/images/puzzle.jpeg',
      link: 'http://localhost:5174',
      category: 'Puzzle',
      difficulty: 'Hard',
      playCount: 1800,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Easter Egg Hunt',
      description: 'Find hidden BIS symbols across scenarios.',
      image: '/assets/images/EGG.png',
      link: 'http://localhost:3000',
      category: 'Adventure',
      difficulty: 'Medium',
      playCount: 2200,
      rating: 4.6
    },
  ];

  const handleGameClick = (gameLink: string) => {
    if (gameLink.startsWith('http')) {
      window.open(gameLink, '_blank');
    } else {
      window.location.href = gameLink;
    }
  };

  const filteredGames = defaultGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || game.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || game.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = Array.from(new Set(defaultGames.map(game => game.category)));
  const difficulties = Array.from(new Set(defaultGames.map(game => game.difficulty)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-rose-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Gamepad2 className="w-10 h-10 text-blue-600" />
              Game Hub
            </h1>
            <p className="mt-2 text-gray-600">Challenge yourself with our interactive learning games</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleGameClick(game.link)}
            >
              <div className="relative h-48">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/default-game.png';
                  }}
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {game.rating.toFixed(1)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Trophy className="w-4 h-4" />
                    {game.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Activity className="w-4 h-4" />
                    {game.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {game.playCount} plays
                  </span>
                </div>
                
                <div className="flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <span className="text-sm text-gray-500">{game.playCount.toLocaleString()} players</span>
                  <span className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    Play Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHub;
