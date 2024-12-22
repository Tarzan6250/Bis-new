import React from 'react';
import { Target } from 'lucide-react';

export const Logo: React.FC = () => (
  <div className="flex items-center gap-2 px-3 mb-8">
    <Target className="w-8 h-8 text-white" />
    <h1 className="text-xl font-bold text-white">BIS Arena</h1>
  </div>
);