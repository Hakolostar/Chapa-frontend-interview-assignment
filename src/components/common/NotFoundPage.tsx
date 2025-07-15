import React from 'react';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Card from '../common/Card';

interface NotFoundPageProps {
  onNavigateHome?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md text-center">
        <div className="flex flex-col items-center space-y-6 p-8">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-gray-600 dark:text-gray-400" />
          </div>
          
          {/* Error Code */}
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">
              404
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={onNavigateHome}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
          
          {/* Helpful Links */}
          <div className="mt-4 w-full">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Popular pages:
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => onNavigateHome?.()}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigateHome?.()}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={() => onNavigateHome?.()}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
