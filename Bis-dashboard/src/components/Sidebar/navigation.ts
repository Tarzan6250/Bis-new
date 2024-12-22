import { 
  LayoutDashboard, 
  Gamepad2, 
  GraduationCap, 
  Trophy, 
  Medal 
} from 'lucide-react';

export const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/games', icon: Gamepad2, label: 'Game Hub' },
  { path: '/learning', icon: GraduationCap, label: 'Learning Hub' },
  { path: '/achievements', icon: Trophy, label: 'Achievements' },
  { path: '/leaderboard', icon: Medal, label: 'Leaderboard' },
];