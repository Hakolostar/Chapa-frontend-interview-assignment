import { UserRole } from '../types';

export interface PagePermissions {
  [key: string]: UserRole[];
}

export const pagePermissions: PagePermissions = {
  dashboard: ['user', 'admin', 'super_admin'],
  profile: ['user', 'admin', 'super_admin'],
  account: ['user', 'admin', 'super_admin'],
  billing: ['user', 'admin', 'super_admin'],
  'send-money': ['user'],
  'request-money': ['user'],
  users: ['admin', 'super_admin'],
  analytics: ['admin', 'super_admin'],
  system: ['super_admin']
};

export const hasPageAccess = (userRole: UserRole | undefined, page: string): boolean => {
  if (!userRole) return false;
  
  const allowedRoles = pagePermissions[page];
  if (!allowedRoles) return false;
  
  return allowedRoles.includes(userRole);
};

export const getDefaultPageForRole = (userRole: UserRole | undefined): string => {
  switch (userRole) {
    case 'user':
    case 'admin':
    case 'super_admin':
      return 'dashboard';
    default:
      return 'dashboard';
  }
};
