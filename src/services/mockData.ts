import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'User user',
    email: 'user@chapa.com',
    role: 'user',
    isActive: true,
    balance: 15000,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@chapa.com',
    role: 'admin',
    isActive: true,
    balance: 0,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'Super Admin',
    email: 'superadmin@chapa.com',
    role: 'super_admin',
    isActive: true,
    balance: 0,
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '4',
    name: 'Kebede',
    email: 'jane@example.com',
    role: 'user',
    isActive: true,
    balance: 8500,
    createdAt: '2024-01-12T14:20:00Z'
  },
  {
    id: '5',
    name: 'Chala',
    email: 'bob@example.com',
    role: 'user',
    isActive: false,
    balance: 0,
    createdAt: '2024-01-08T11:30:00Z'
  }
];

// Helper functions for user management
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: string): User | undefined => {
  return mockUsers.find(u => u.id === id);
};

export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const userIndex = mockUsers.findIndex(u => u.id === id);
  if (userIndex === -1) return null;
  
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
  return mockUsers[userIndex];
};
