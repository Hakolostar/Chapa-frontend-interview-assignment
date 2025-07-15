import React, { useState, useEffect } from 'react';
import { User, SystemStats } from '../../types';
import { mockApiService } from '../../services/mockApiService';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { Users, BarChart3, TrendingUp, DollarSign, Activity, UserCheck, UserX } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, statsData] = await Promise.all([
        mockApiService.getUsers(),
        mockApiService.getSystemStats()
      ]);
      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      await mockApiService.toggleUserStatus(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      ));
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          System Overview
        </div>
      </div>

      {/* Stats Cards - Mobile responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 border border-green-200 dark:border-green-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-green-600 dark:text-green-300 text-sm font-medium">Total Payments</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-100 truncate">{formatAmount(stats?.totalPayments || 0)}</p>
            </div>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 dark:text-green-400 flex-shrink-0 ml-3" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 border border-blue-200 dark:border-blue-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-blue-600 dark:text-blue-300 text-sm font-medium">Active Users</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-100 truncate">{formatNumber(stats?.activeUsers || 0)}</p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400 flex-shrink-0 ml-3" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 border border-purple-200 dark:border-purple-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-purple-600 dark:text-purple-300 text-sm font-medium">Total Transactions</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-100 truncate">{formatNumber(stats?.totalTransactions || 0)}</p>
            </div>
            <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 dark:text-purple-400 flex-shrink-0 ml-3" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 border border-orange-200 dark:border-orange-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-orange-600 dark:text-orange-300 text-sm font-medium">Monthly Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-800 dark:text-orange-100 truncate">{formatAmount(stats?.monthlyRevenue || 0)}</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 dark:text-orange-400 flex-shrink-0 ml-3" />
          </div>
        </Card>
      </div>

      {/* Users Management - Mobile responsive table */}
      <Card title="User Management">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">User</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm hidden md:table-cell">Email</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Balance</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm hidden lg:table-cell">Total Payments</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm hidden sm:table-cell">Status</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.role === 'user').map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base hidden md:table-cell">{user.email}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{formatAmount(user.balance)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm sm:text-base">{formatAmount((user.balance * 1.5) + Math.random() * 10000)}</span>
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 10} transactions</span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
                          user.isActive
                            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <UserX className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Activate</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
