import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Settings, Home, Users, BarChart3, Menu, X, Search, Bell, Plus, MessageCircle, User, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'dashboard', onNavigate }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Update document title based on current page and user role
  useEffect(() => {
    const getPageTitle = () => {
      const baseTitle = 'Chapa Financial Dashboard';
      const roleTitle = user?.role ? ` - ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}` : '';
      
      const pageTitles: { [key: string]: string } = {
        dashboard: 'Dashboard',
        users: 'User Management',
        analytics: 'Analytics',
        'send-money': 'Send Money',
        'request-money': 'Request Money',
        settings: 'System Settings',
        profile: 'Profile Settings'
      };
      
      const pageTitle = pageTitles[currentPage] || 'Dashboard';
      return `${pageTitle}${roleTitle} | ${baseTitle}`;
    };

    document.title = getPageTitle();
  }, [currentPage, user?.role]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (page: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
      setProfileDropdownOpen(false);
    }
  };

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'New Payment Received', message: 'You received $250 from John Doe', time: '2 min ago', unread: true },
    { id: 2, title: 'Transaction Complete', message: 'Your transfer to Jane Smith was successful', time: '1 hour ago', unread: true },
    { id: 3, title: 'Account Update', message: 'Your account settings have been updated', time: '2 hours ago', unread: false },
    { id: 4, title: 'Security Alert', message: 'New login detected from Chrome', time: '1 day ago', unread: true },
    { id: 5, title: 'Monthly Report', message: 'Your monthly summary is ready', time: '2 days ago', unread: false },
  ];

  // Mock chat messages data
  const chatMessages = [
    { id: 1, sender: 'Support Team', message: 'Hello! How can we help you today?', time: '10:30 AM', isSupport: true },
    { id: 2, sender: 'You', message: 'I have a question about my recent transaction', time: '10:32 AM', isSupport: false },
    { id: 3, sender: 'Support Team', message: 'I\'d be happy to help! Can you provide the transaction ID?', time: '10:33 AM', isSupport: true },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
    };

    // Handle scroll behavior - prevent main content scroll when sidebar is hovered
    const handleWheel = (event: WheelEvent) => {
      if (sidebarRef.current && sidebarRef.current.contains(event.target as Node)) {
        // Allow sidebar to scroll naturally
        return;
      }
      
      // If scrolling outside sidebar, ensure main content scrolls
      if (mainContentRef.current && !sidebarHovered) {
        // Let the main content handle the scroll naturally
        return;
      }
    };

    const handleSidebarMouseEnter = () => {
      setSidebarHovered(true);
      // Disable main content scroll when hovering sidebar
      if (mainContentRef.current) {
        mainContentRef.current.style.overflowY = 'hidden';
      }
    };

    const handleSidebarMouseLeave = () => {
      setSidebarHovered(false);
      // Re-enable main content scroll when leaving sidebar
      if (mainContentRef.current) {
        mainContentRef.current.style.overflowY = 'auto';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('wheel', handleWheel, { passive: true });

    // Add event listeners to sidebar
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener('mouseenter', handleSidebarMouseEnter);
      sidebar.addEventListener('mouseleave', handleSidebarMouseLeave);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('wheel', handleWheel);
      if (sidebar) {
        sidebar.removeEventListener('mouseenter', handleSidebarMouseEnter);
        sidebar.removeEventListener('mouseleave', handleSidebarMouseLeave);
      }
    };
  }, [sidebarHovered]);

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', page: 'dashboard' }
    ];

    if (user?.role === 'admin' || user?.role === 'super_admin') {
      baseItems.push(
        { icon: Users, label: 'Users', page: 'users' },
        { icon: BarChart3, label: 'Analytics', page: 'analytics' }
      );
    }

    return baseItems;
  };

  const getSystemSettings = () => {
    if (user?.role === 'super_admin') {
      return [
        { icon: Settings, label: 'System', page: 'system' }
      ];
    }
    return [];
  };

  const getQuickActions = () => {
    if (user?.role === 'user') {
      return [
        { icon: Plus, label: 'Send Money', action: () => console.log('Send Money') },
      ];
    }
    if (user?.role === 'admin' || user?.role === 'super_admin') {
      return [
        { icon: Plus, label: 'Add User', action: () => console.log('Add User') },
      ];
    }
    return [];
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Logo width={100} height={32} className="hover:scale-105 transition-transform duration-200" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 sidebar-scroll">
          <div className="space-y-2">
            {getNavigationItems().map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                className={`sidebar-nav-item w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          {getQuickActions().length > 0 && (
            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {getQuickActions().map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="sidebar-nav-item w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <action.icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* System Settings - Fixed at bottom */}
        {getSystemSettings().length > 0 && (
          <div className="px-4 py-4 border-t dark:border-gray-700 flex-shrink-0">
            <div className="space-y-2">
              {getSystemSettings().map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`sidebar-nav-item w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header Bar - Sticky */}
        <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 z-40">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Left side - Mobile menu button, Logo, and Search */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Mobile Logo - shown only on small screens when sidebar is hidden */}
              <div className="lg:hidden mr-4">
                <Logo width={80} height={24} />
              </div>
              
              {/* Search Bar */}
              <div className="relative w-64 md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - (notification, chat), (dark mode), (profile), (logout) */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className="relative p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
                    <div className="p-4 border-b dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{unreadNotifications} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t dark:border-gray-700">
                      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Button */}
              <button 
                onClick={() => setChatOpen(!chatOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
                    <div className="p-4 border-b dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-lg">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={(e) => handleNavigation('profile', e)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      <button
                        onClick={(e) => handleNavigation('account', e)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                      <button
                        onClick={(e) => handleNavigation('billing', e)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Billing & Usage</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Chat Window */}
        {chatOpen && (
          <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support Chat</h3>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isSupport ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isSupport 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.isSupport ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main 
          ref={mainContentRef}
          className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all duration-200"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;