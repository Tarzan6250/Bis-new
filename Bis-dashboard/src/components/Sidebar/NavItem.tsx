import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  path: string;
  icon: LucideIcon;
  label: string;
}

export const NavItem: React.FC<NavItemProps> = ({ path, icon: Icon, label }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-white/20 text-white shadow-lg'
          : 'text-white/80 hover:bg-white/10 hover:text-white'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </NavLink>
);