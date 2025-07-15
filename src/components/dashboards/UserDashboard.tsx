import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Transaction } from '../../types';
import { mockApiService } from '../../services/mockApiService';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { Wallet, TrendingUp, TrendingDown, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

interface UserDashboardProps {
  onNavigate?: (page: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await mockApiService.getTransactions(user!.id);
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMoneyClick = () => {
    if (onNavigate) {
      onNavigate('send-money');
    }
  };

  const handleRequestMoneyClick = () => {
    if (onNavigate) {
      onNavigate('request-money');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name}
        </div>
      </div>

      {/* Wallet Balance */}
      <Card className="bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-700 border border-primary-200 dark:border-primary-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-600 dark:text-primary-300 text-sm font-medium">Wallet Balance</p>
            <p className="text-3xl font-bold text-primary-800 dark:text-primary-100">{formatAmount(user?.balance || 0)}</p>
          </div>
          <Wallet className="w-12 h-12 text-primary-500 dark:text-primary-400" />
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleSendMoneyClick}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-700 text-primary-800 dark:text-primary-100 border border-primary-200 dark:border-primary-600 rounded-lg hover:from-primary-200 hover:to-primary-300 dark:hover:from-primary-700 dark:hover:to-primary-600 transition-all duration-200 transform hover:scale-105"
          >
            <Send className="w-6 h-6" />
            <span className="font-semibold">Send Money</span>
          </button>
          
          <button 
            onClick={handleRequestMoneyClick}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 text-green-800 dark:text-green-100 border border-green-200 dark:border-green-600 rounded-lg hover:from-green-200 hover:to-green-300 dark:hover:from-green-700 dark:hover:to-green-600 transition-all duration-200 transform hover:scale-105">
            <Wallet className="w-6 h-6" />
            <span className="font-semibold">Request Money</span>
          </button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card title="Recent Transactions">
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {transaction.type === 'credit' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                  </span>
                  {getStatusIcon(transaction.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserDashboard;
