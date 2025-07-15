import React from 'react';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import Card from '../common/Card';

interface UnauthorizedPageProps {
  onNavigateHome?: () => void;
}

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md text-center">
        <div className="flex flex-col items-center space-y-6 p-8">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Please contact your administrator if you believe this is an error.
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
          
          {/* Additional Info */}
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700 dark:text-amber-300">
                <p className="font-medium mb-1">Access Restrictions:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Users can only access their dashboard</li>
                  <li>Admins can manage users and view analytics</li>
                  <li>Super Admins have full system access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
