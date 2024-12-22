import React, { useState } from 'react';
import { Play, BookOpen, Shield, Factory, Award, FlaskConical, FileCheck, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Video {
  title: string;
  duration: string;
  standards: string[];
  thumbnail: string;
}

interface Category {
  title: string;
  icon: React.FC<any>;
  description: string;
  videos: Video[];
}

const LearningHub = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      title: 'Safety Standards',
      icon: Shield,
      description: 'Learn about essential safety protocols and standards',
      videos: [
        { title: 'Introduction to Safety Standards', duration: '5:30', standards: ['IS 12345', 'IS 67890'], thumbnail: '/assets/images/safety1.jpg' },
        { title: 'Workplace Safety Guidelines', duration: '8:45', standards: ['IS 45678'], thumbnail: '/assets/images/safety2.jpg' },
        { title: 'Emergency Response Protocols', duration: '6:20', standards: ['IS 98765'], thumbnail: '/assets/images/safety3.jpg' },
      ]
    },
    {
      title: 'Quality Control',
      icon: Factory,
      description: 'Master quality management and control techniques',
      videos: [
        { title: 'Quality Management Basics', duration: '6:15', standards: ['IS 98765'], thumbnail: '/assets/images/quality1.jpg' },
        { title: 'Inspection Techniques', duration: '7:20', standards: ['IS 34567'], thumbnail: '/assets/images/quality2.jpg' },
        { title: 'Documentation and Reporting', duration: '4:55', standards: ['IS 23456'], thumbnail: '/assets/images/quality3.jpg' },
      ]
    },
    {
      title: 'Certification Process',
      icon: Award,
      description: 'Understanding certification requirements and procedures',
      videos: [
        { title: 'Certification Overview', duration: '7:30', standards: ['IS 87654'], thumbnail: '/assets/images/cert1.jpg' },
        { title: 'Application Process', duration: '5:45', standards: ['IS 65432'], thumbnail: '/assets/images/cert2.jpg' },
      ]
    },
    {
      title: 'Testing Methods',
      icon: FlaskConical,
      description: 'Learn various testing and validation methods',
      videos: [
        { title: 'Material Testing Basics', duration: '8:15', standards: ['IS 54321'], thumbnail: '/assets/images/test1.jpg' },
        { title: 'Advanced Testing Procedures', duration: '9:30', standards: ['IS 12345'], thumbnail: '/assets/images/test2.jpg' },
      ]
    }
  ];

  const handleVideoClick = (videoTitle: string) => {
    // For now, just show an alert. In a real app, this would play the video
    alert(`Playing video: ${videoTitle}`);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    videos: category.videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.standards.some(standard => standard.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.videos.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-rose-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-blue-600" />
              Learning Hub
            </h1>
            <p className="mt-2 text-gray-600">Enhance your knowledge with our comprehensive learning resources</p>
          </div>
          <Link 
            to="/learning/all"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            View More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos or standards..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Show only the first video */}
                  {category.videos.length > 0 && (
                    <div
                      className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
                      onClick={() => handleVideoClick(category.videos[0].title)}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        <img
                          src={category.videos[0].thumbnail || '/default-video.jpg'}
                          alt={category.videos[0].title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/default-video.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                          {category.videos[0].title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{category.videos[0].duration}</span>
                          <div className="flex items-center gap-1">
                            <FileCheck className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-500">
                              {category.videos[0].standards.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
