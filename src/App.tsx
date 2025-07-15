import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginForm from './components/auth/LoginForm';
import Layout from './components/common/Layout';
import UserDashboard from './components/dashboards/UserDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import SuperAdminDashboard from './components/dashboards/SuperAdminDashboard';
import ProfileSettings from './components/profile/ProfileSettings';
import AccountSettings from './components/profile/AccountSettings';
import BillingUsage from './components/profile/BillingUsage';
import UsersPage from './components/pages/UsersPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import SendMoneyPage from './components/pages/SendMoneyPage';
import RequestMoneyPage from './components/pages/RequestMoneyPage';
import SystemSettingsPage from './components/pages/SystemSettingsPage';
import UnauthorizedPage from './components/common/UnauthorizedPage';
import NotFoundPage from './components/common/NotFoundPage';
import ProtectedRoute from './components/routes/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import { hasPageAccess, getDefaultPageForRole } from './utils/permissions';

const AppContent: React.FC = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigation = (page: string) => {
    // Check if user has access to the requested page
    if (!hasPageAccess(user?.role, page)) {
      setCurrentPage('unauthorized');
      return;
    }
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    // Check if current page is accessible to the user
    if (currentPage !== 'unauthorized' && currentPage !== 'notfound' && !hasPageAccess(user?.role, currentPage)) {
      return <UnauthorizedPage onNavigateHome={() => setCurrentPage(getDefaultPageForRole(user?.role))} />;
    }

    switch (currentPage) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'billing':
        return <BillingUsage />;
      case 'users':
        return <UsersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'send-money':
        return <SendMoneyPage />;
      case 'request-money':
        return <RequestMoneyPage onNavigate={handleNavigation} />;
      case 'system':
        return <SystemSettingsPage />;
      case 'unauthorized':
        return <UnauthorizedPage onNavigateHome={() => setCurrentPage(getDefaultPageForRole(user?.role))} />;
      case 'notfound':
        return <NotFoundPage onNavigateHome={() => setCurrentPage(getDefaultPageForRole(user?.role))} />;
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    switch (user?.role) {
      case 'user':
        return <UserDashboard onNavigate={handleNavigation} />;
      case 'admin':
        return <AdminDashboard />;
      case 'super_admin':
        return <SuperAdminDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigation}>
      <ProtectedRoute>
        {renderContent()}
      </ProtectedRoute>
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;