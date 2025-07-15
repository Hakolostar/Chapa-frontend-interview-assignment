import React, { useState, useEffect } from 'react';
import { User, SystemStats } from '../../types';
import { mockApiService } from '../../services/mockApiService';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { Users, BarChart3, TrendingUp, DollarSign, Activity, UserCheck, UserX, UserPlus, Shield } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    role: 'admin' as 'admin' | 'super_admin'
  });
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [adminFormError, setAdminFormError] = useState('');
  const [adminFormSuccess, setAdminFormSuccess] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show confirmation dialog for super admin creation
    if (newAdminForm.role === 'super_admin') {
      setShowConfirmDialog(true);
      return;
    }
    
    await createAdmin();
  };

  const createAdmin = async () => {
    setAdminFormError('');
    setAdminFormSuccess('');
    setIsAddingAdmin(true);
    setShowConfirmDialog(false);

    try {
      // Validate email doesn't already exist
      const existingUser = users.find(u => u.email.toLowerCase() === newAdminForm.email.toLowerCase());
      if (existingUser) {
        setAdminFormError('A user with this email already exists.');
        setIsAddingAdmin(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newAdminForm.email)) {
        setAdminFormError('Please enter a valid email address.');
        setIsAddingAdmin(false);
        return;
      }

      // Validate name
      if (newAdminForm.name.trim().length < 2) {
        setAdminFormError('Name must be at least 2 characters long.');
        setIsAddingAdmin(false);
        return;
      }

      const newAdmin = await mockApiService.addAdmin({
        ...newAdminForm,
        name: newAdminForm.name.trim(),
        email: newAdminForm.email.toLowerCase(),
        balance: 0,
        isActive: true
      });
      
      setUsers([...users, newAdmin]);
      setNewAdminForm({ name: '', email: '', role: 'admin' });
      setAdminFormSuccess(`${newAdminForm.role === 'super_admin' ? 'Super Admin' : 'Admin'} "${newAdminForm.name}" has been created successfully. An invitation email has been sent to ${newAdminForm.email}.`);
      setShowAddAdmin(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setAdminFormSuccess(''), 5000);
    } catch (error) {
      console.error('Error adding admin:', error);
      setAdminFormError('Failed to create admin. Please try again.');
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Complete System Control
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 border border-blue-200 dark:border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-300 text-sm font-medium">Total Payments</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-100">{formatAmount(stats?.totalPayments || 0)}</p>
              <p className="text-blue-500 dark:text-blue-400 text-xs">+12% from last month</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 border border-green-200 dark:border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-300 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-100">{formatNumber(stats?.activeUsers || 0)}</p>
              <p className="text-green-500 dark:text-green-400 text-xs">+8% from last month</p>
            </div>
            <Users className="w-8 h-8 text-green-500 dark:text-green-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 border border-purple-200 dark:border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-300 text-sm font-medium">Total Transactions</p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-100">{formatNumber(stats?.totalTransactions || 0)}</p>
              <p className="text-purple-500 dark:text-purple-400 text-xs">+15% from last month</p>
            </div>
            <Activity className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 border border-orange-200 dark:border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-300 text-sm font-medium">Monthly Revenue</p>
              <p className="text-2xl font-bold text-orange-800 dark:text-orange-100">{formatAmount(stats?.monthlyRevenue || 0)}</p>
              <p className="text-orange-500 dark:text-orange-400 text-xs">+20% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500 dark:text-orange-400" />
          </div>
        </Card>
      </div>

      {/* Admin Management */}
      <Card title="Admin Management">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Administrators</h3>
          <button
            onClick={() => setShowAddAdmin(!showAddAdmin)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Admin</span>
          </button>
        </div>

        {/* Success Message */}
        {adminFormSuccess && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-700 dark:text-green-200 text-sm">{adminFormSuccess}</p>
          </div>
        )}

        {showAddAdmin && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Administrator</h4>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAdminForm.name}
                    onChange={(e) => setNewAdminForm({...newAdminForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                    required
                    disabled={isAddingAdmin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newAdminForm.email}
                    onChange={(e) => setNewAdminForm({...newAdminForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="admin@chapa.com"
                    required
                    disabled={isAddingAdmin}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Administrator Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={newAdminForm.role}
                  onChange={(e) => setNewAdminForm({...newAdminForm, role: e.target.value as 'admin' | 'super_admin'})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isAddingAdmin}
                >
                  <option value="admin">Admin - Can manage users and view analytics</option>
                  <option value="super_admin">Super Admin - Full system access</option>
                </select>
              </div>

              {adminFormError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-red-700 dark:text-red-200 text-sm">{adminFormError}</p>
                </div>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                  <strong>Note:</strong> The new administrator will receive an invitation email with setup instructions.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isAddingAdmin}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingAdmin ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create Administrator</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAdmin(false);
                    setAdminFormError('');
                    setNewAdminForm({ name: '', email: '', role: 'admin' });
                  }}
                  disabled={isAddingAdmin}
                  className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Admin</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => u.role === 'admin' || u.role === 'super_admin').map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'super_admin' 
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.isActive 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.role !== 'super_admin' && (
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                          user.isActive
                            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <UserX className="w-4 h-4" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* All Users Management */}
      <Card title="All Users Management">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Balance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user => user.role !== 'super_admin' || user.id === currentUser?.id).map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user.role === 'user' ? 'bg-gray-100 dark:bg-gray-600' : 'bg-blue-100 dark:bg-blue-900'
                      }`}>
                        {user.role === 'user' ? (
                          <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      user.role === 'user' 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        : user.role === 'admin'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    }`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{formatAmount(user.balance)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.isActive 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.role !== 'super_admin' && (
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                          user.isActive
                            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <UserX className="w-4 h-4" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Confirmation Dialog for Super Admin Creation */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Super Administrator?
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                You are about to create a Super Administrator account for:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                <p className="font-medium text-gray-900 dark:text-white">{newAdminForm.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{newAdminForm.email}</p>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                  <strong>Warning:</strong> Super Administrators have full access to all system functions, 
                  including the ability to create and manage other administrators.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={createAdmin}
                disabled={isAddingAdmin}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isAddingAdmin ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Yes, Create Super Admin</span>
                )}
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                disabled={isAddingAdmin}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;