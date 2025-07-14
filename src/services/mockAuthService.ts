import { User, LoginCredentials } from '../types';
import { mockUsers } from './mockData';

export const mockAuthService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === credentials.email && u.role === credentials.role);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  getCurrentUser: (): User | null => {
    const storedUser = localStorage.getItem('chapaUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
};