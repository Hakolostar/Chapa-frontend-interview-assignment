import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, ShieldCheck } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import Logo from '../common/Logo';

const LoginForm: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | 'super_admin'>('user');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const roleOptions = [
    { 
      value: 'user', 
      label: 'User', 
      icon: User, 
      email: 'user@chapa.com',
      description: 'Access wallet and transactions'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      icon: Shield, 
      email: 'admin@chapa.com',
      description: 'Manage users and view analytics'
    },
    { 
      value: 'super_admin', 
      label: 'Super Admin', 
      icon: ShieldCheck, 
      email: 'superadmin@chapa.com',
      description: 'Full system access'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const selectedOption = roleOptions.find(option => option.value === selectedRole);
    if (!selectedOption) return;

    try {
      await login({
        email: selectedOption.email,
        role: selectedRole
      });
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Logo width={140} height={45} className="mb-2" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">Select your role to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {roleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === option.value
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedRole(option.value as any)}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={selectedRole === option.value}
                    onChange={() => setSelectedRole(option.value as any)}
                    className="sr-only"
                  />
                  <option.icon className={`w-5 h-5 mr-3 ${
                    selectedRole === option.value ? 'text-blue-600' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{option.email}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;