import React from 'react';

interface VideoProgressProps {
  completed: number;
  total: number;
  category: string;
}

export const VideoProgress: React.FC<VideoProgressProps> = ({ completed, total, category }) => {
  const percentage = (completed / total) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{category}</h3>
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs font-semibold inline-block text-indigo-600">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-indigo-100">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {completed} of {total} videos completed
        </div>
      </div>
    </div>
  );
};