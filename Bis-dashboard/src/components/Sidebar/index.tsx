import React from 'react';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { navItems } from './navigation';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-primary-600 to-primary-700 text-white px-3 py-4">
      <Logo />
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </nav>
    </div>
  );
};