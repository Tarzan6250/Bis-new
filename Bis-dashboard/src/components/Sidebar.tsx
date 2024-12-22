import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Gamepad2, BookOpen, Settings, Home, LogOut } from 'lucide-react';

interface ProfileData {
  username: string;
  profilePic: string | null;
}

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  const [profileData, setProfileData] = useState<ProfileData>({
    username: localStorage.getItem('username') || '',
    profilePic: null
  });

  useEffect(() => {
    const handleProfileUpdate = (event: CustomEvent<ProfileData>) => {
      setProfileData({
        username: event.detail.username,
        profilePic: event.detail.profilePic
      });
      localStorage.setItem('username', event.detail.username);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate as EventListener);
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate as EventListener);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500
                 border-r border-white/20 backdrop-blur-lg shadow-2xl`}
    >
      {/* Profile Section */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-300 ring-offset-2 ring-offset-purple-600">
            {profileData.profilePic ? (
              <img
                src={profileData.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-500/20 flex items-center justify-center">
                <User className="w-6 h-6 text-white/50" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white truncate">
              {profileData.username || 'User'}
            </h2>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/dashboard'
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/game-hub"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/game-hub'
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Game Hub</span>
        </Link>

        <Link
          to="/learning-hub"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/learning-hub'
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Learning Hub</span>
        </Link>

        <Link
          to="/profile"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/profile'
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Profile</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-200 
                   hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
