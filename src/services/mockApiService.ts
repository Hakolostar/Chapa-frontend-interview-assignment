import { Transaction, User, SystemStats } from '../types';
import { mockUsers, addUser } from './mockData';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    amount: 2500,
    type: 'credit',
    description: 'Payment received from client',
    status: 'completed',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    amount: 1200,
    type: 'debit',
    description: 'Transfer to bank account',
    status: 'completed',
    createdAt: '2024-01-19T09:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    amount: 800,
    type: 'credit',
    description: 'Refund processed',
    status: 'pending',
    createdAt: '2024-01-18T16:45:00Z'
  }
];

export const mockApiService = {
  getTransactions: async (userId: string): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTransactions.filter(t => t.userId === userId));
      }, 800);
    });
  },

  createTransaction: async (transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        mockTransactions.push(newTransaction);
        resolve(newTransaction);
      }, 1200);
    });
  },

  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]); // Return a copy to prevent direct mutations
      }, 600);
    });
  },

  toggleUserStatus: async (userId: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          user.isActive = !user.isActive;
          resolve(user);
        }
      }, 500);
    });
  },

  getSystemStats: async (): Promise<SystemStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Calculate real stats from mockUsers
        const activeUsers = mockUsers.filter(u => u.isActive && u.role === 'user').length;
        const totalPayments = mockUsers.reduce((sum, user) => sum + user.balance, 0);
        const totalTransactions = mockUsers.length * 25; // Average 25 transactions per user
        const monthlyRevenue = totalPayments * 0.025; // 2.5% of total balance as monthly revenue
        
        resolve({
          totalPayments,
          activeUsers,
          totalTransactions,
          monthlyRevenue
        });
      }, 900);
    });
  },

  addAdmin: async (adminData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAdmin = addUser(adminData);
        resolve(newAdmin);
      }, 800);
    });
  },

  createMoneyRequest: async (requestData: {
    requesterId: string;
    requesterEmail: string;
    amount: number;
    description: string;
    dueDate?: string;
    isUrgent: boolean;
  }): Promise<{ id: string; url: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestId = Math.random().toString(36).substr(2, 9);
        const requestUrl = `https://chapa.app/request/${requestId}`;
        
        // In a real app, you'd save the request data here
        console.log('Creating money request:', requestData);
        
        resolve({
          id: requestId,
          url: requestUrl
        });
      }, 1000);
    });
  }
};