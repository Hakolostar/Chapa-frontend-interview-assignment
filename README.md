# Chapa Frontend Interview Assignment

A comprehensive React application built with TypeScript, Vite, and Tailwind CSS featuring role-based authentication, financial management tools, and advanced dashboard functionality.

### 🔗 [Live App on Vercel](https://chapa-frontend-interview-assignment-sand.vercel.app/)

### 📸 Super Admin Dashboard

![Super Admin Dashboard](https://github.com/user-attachments/assets/7c7634e1-08ac-4c3b-b037-abf45c9df93c)

---

### 📊 Analytics Dashboard

![Analytics Dashboard](https://github.com/user-attachments/assets/3ef02302-d498-4bc6-be63-2f96b3c10a3b)

## 🚀 Features

### Core Features
- **Role-Based Authentication**: Support for three user roles (User, Admin, Super Admin)
- **Dark/Light Theme**: Toggle between dark and light themes with system preference detection
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Protected Routes**: Secure navigation with role-based access control
- **Modern Tech Stack**: React 18, TypeScript, Vite for fast development

### Financial Management
- **Send Money**: Secure money transfer functionality with recipient management
- **Request Money**: Request payments from other users with tracking
- **Transaction Analytics**: Comprehensive financial analytics and reporting
- **User Management**: Admin tools for managing user accounts and permissions

### Dashboard System
- **User Dashboard**: Personal financial overview with recent transactions
- **Admin Dashboard**: User management and system monitoring tools
- **Super Admin Dashboard**: Complete system administration and analytics
- **Analytics Page**: Advanced data visualization and reporting tools

### Additional Features
- **System Settings**: Comprehensive application configuration
- **Profile Management**: User profile and account settings
- **Notification System**: Real-time alerts and updates
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1
- **Charts**: Recharts (for analytics visualization)
- **State Management**: React Context API
- **Routing**: React Router DOM

## 📁 Enhanced Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx           # Authentication form component
│   ├── common/
│   │   ├── Card.tsx                # Reusable card component
│   │   ├── Layout.tsx              # Main layout with navigation
│   │   ├── LoadingSpinner.tsx      # Loading indicator
│   │   ├── ThemeToggle.tsx         # Dark/light theme toggle
│   │   ├── UnauthorizedPage.tsx    # Access denied page
│   │   └── NotFoundPage.tsx        # 404 error page
│   ├── dashboards/
│   │   ├── AdminDashboard.tsx      # Admin role dashboard
│   │   ├── SuperAdminDashboard.tsx # Super admin dashboard
│   │   └── UserDashboard.tsx       # User role dashboard
│   ├── pages/
│   │   ├── AnalyticsPage.tsx       # Financial analytics and charts
│   │   ├── SendMoneyPage.tsx       # Money transfer functionality
│   │   ├── RequestMoneyPage.tsx    # Payment request system
│   │   ├── SystemSettingsPage.tsx  # Application configuration
│   │   └── UsersPage.tsx           # User management interface
│   ├── profile/
│   │   ├── ProfileSettings.tsx     # User profile management
│   │   ├── AccountSettings.tsx     # Account configuration
│   │   └── BillingUsage.tsx        # Billing information
│   └── routes/
│       └── ProtectedRoute.tsx      # Route protection component
├── context/
│   ├── AuthContext.tsx             # Authentication state management
│   └── ThemeContext.tsx            # Theme state management
├── services/
│   ├── mockApiService.ts           # Enhanced mock API service
│   ├── mockAuthService.ts          # Mock authentication service
│   └── mockData.ts                 # Comprehensive mock data
├── types/
│   └── index.ts                    # TypeScript type definitions
├── utils/
│   └── permissions.ts              # Role-based permission utilities
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
└── index.css                       # Global styles and utilities
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## 🔐 Authentication & User Roles

The application uses a mock authentication system with three predefined user roles:

### Test Accounts

You can use these test credentials to explore different user roles:

#### User Role (email: user@example.com, password: password)
- **Dashboard Access**: Personal financial overview
- **Features**: View transactions, send money, request money
- **Permissions**: Read-only access to personal data

#### Admin Role (email: admin@example.com, password: password)
- **Dashboard Access**: Administrative interface
- **Features**: User management, analytics, transaction monitoring
- **Permissions**: Read/write access to user management

#### Super Admin Role (email: superadmin@example.com, password: password)
- **Dashboard Access**: Complete system administration
- **Features**: Full analytics, system settings, all user management
- **Permissions**: Full system access and configuration

*Note: This is a mock authentication system for demonstration purposes.*

## 💰 Financial Features

### Send Money
- **Recipient Management**: Add and manage payment recipients
- **Transfer Types**: Instant transfers and scheduled payments
- **Security**: Transaction verification and confirmation
- **History**: Complete transaction tracking and history

### Request Money
- **Payment Requests**: Send payment requests to other users
- **Request Management**: Track pending, approved, and rejected requests
- **Notifications**: Real-time status updates
- **Categories**: Organized request categorization

### Analytics Dashboard
- **Transaction Analytics**: Visual charts and graphs
- **Financial Insights**: Spending patterns and trends
- **Performance Metrics**: KPIs and financial health indicators
- **Export Options**: Data export and reporting tools

## 👥 User Management (Admin/Super Admin)

### User Administration
- **User Profiles**: Complete user account management
- **Role Management**: Assign and modify user roles
- **Account Status**: Enable/disable user accounts
- **Activity Monitoring**: Track user activity and transactions

### System Analytics
- **User Statistics**: Registration and activity metrics
- **Transaction Volume**: System-wide transaction analysis
- **Performance Monitoring**: System health and performance
- **Revenue Analytics**: Financial performance tracking

## 🔒 Security & Access Control

### Protected Routes
- **Authentication Required**: All dashboard routes require authentication
- **Role-Based Access**: Features restricted based on user roles
- **Permission System**: Granular permissions for different actions
- **Secure Navigation**: Automatic redirects for unauthorized access

### Route Protection
- Unauthenticated users are redirected to the login form
- Users can only access features appropriate for their role level
- Protected API endpoints with role validation
- Session management and automatic logout

## 🎨 Enhanced Theming

### Theme System
- **Dark/Light Mode**: Complete dark and light theme support
- **System Integration**: Automatic detection of system preferences
- **Persistent Settings**: Theme preference saved across sessions
- **Smooth Transitions**: Animated theme switching
- **Component Consistency**: All components support both themes

### Design System
- **Color Palette**: Carefully crafted color schemes for both themes
- **Typography**: Consistent font sizing and spacing
- **Accessibility**: WCAG compliant contrast ratios
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 🧩 Enhanced Component Architecture

### Context Providers
- **AuthContext**: Comprehensive authentication state management
- **ThemeContext**: Advanced theme handling with system integration
- **Error Boundaries**: Application-wide error handling and recovery

### Page Components
- **AnalyticsPage**: Financial data visualization with interactive charts
- **SendMoneyPage**: Complete money transfer interface with form validation
- **RequestMoneyPage**: Payment request system with status tracking
- **SystemSettingsPage**: Administrative configuration panel
- **UsersPage**: User management interface with search and filtering

### Dashboard Components
- **UserDashboard**: Enhanced personal financial overview
- **AdminDashboard**: Administrative interface with user management
- **SuperAdminDashboard**: Complete system administration panel
- **Role-Based Features**: Dynamic content based on user permissions

### Common Components
- **Layout**: Comprehensive navigation with role-based menu items
- **Card**: Enhanced reusable container with multiple variants
- **LoadingSpinner**: Improved loading states with animations
- **ThemeToggle**: Advanced theme switcher with system detection
- **UnauthorizedPage**: Professional access denied interface
- **NotFoundPage**: User-friendly 404 error handling

### Utility Components
- **ProtectedRoute**: Advanced route protection with role validation
- **Permission System**: Granular access control utilities
- **Form Components**: Reusable form elements with validation

## 🔧 Development Guidelines

### Code Quality
- **TypeScript**: Strict type checking with comprehensive type definitions
- **ESLint**: Advanced linting rules for code quality
- **Component Patterns**: Functional components with React hooks
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized rendering and state management

### Architecture Principles
- **Separation of Concerns**: Clear separation between UI, logic, and data
- **Reusability**: Modular components with consistent interfaces
- **Scalability**: Structure designed for easy feature additions
- **Maintainability**: Clean code with comprehensive documentation

### File Organization
- **Feature-Based Structure**: Components organized by functionality
- **Shared Utilities**: Common components and utilities in dedicated directories
- **Type Safety**: Comprehensive TypeScript definitions
- **Consistent Naming**: Clear and consistent naming conventions

## 📊 Testing & Quality Assurance

### Code Quality Metrics
- **TypeScript Coverage**: 100% TypeScript implementation
- **Linting**: ESLint with strict rules and automatic fixing
- **Build Validation**: Comprehensive build testing
- **Component Testing**: Individual component validation

### Performance Optimization
- **Bundle Size**: Optimized build output with code splitting
- **Loading Performance**: Lazy loading and component optimization
- **Memory Management**: Efficient state management and cleanup
- **User Experience**: Smooth animations and transitions

## 🚀 Building for Production

### Development Build
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Run linting**
   ```bash
   npm run lint
   ```

### Production Build
1. **Create optimized build**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Type checking**
   ```bash
   npx tsc --noEmit
   ```

The build output will be in the `dist/` directory, optimized for deployment.

### Deployment Features
- **Static Site Generation**: Optimized for static hosting
- **Code Splitting**: Automatic bundle optimization
- **Asset Optimization**: Compressed assets and images
- **Modern Browser Support**: ES2020+ with fallbacks

## 🌟 Key Improvements & Enhancements

### Recent Updates
- ✅ **Complete Financial System**: Send money, request money, and analytics
- ✅ **Enhanced User Management**: Advanced admin tools and user controls
- ✅ **System Administration**: Comprehensive system settings and configuration
- ✅ **Advanced Analytics**: Interactive charts and financial insights
- ✅ **Improved Navigation**: Role-based navigation with breadcrumbs
- ✅ **Error Handling**: Professional error pages and user feedback
- ✅ **Performance Optimization**: Faster loading and better user experience
- ✅ **Accessibility**: WCAG compliant design and navigation
- ✅ **Mobile Responsiveness**: Enhanced mobile experience
- ✅ **Theme System**: Advanced dark/light mode with system integration

### Technical Achievements
- **100% TypeScript**: Complete type safety throughout the application
- **Zero ESLint Errors**: Clean, maintainable code with strict linting
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Role-Based Security**: Comprehensive access control and permissions
- **Modern Development**: Latest React patterns and best practices

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following the development guidelines
4. **Run quality checks**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards
- Follow TypeScript best practices
- Maintain existing code style and patterns
- Add appropriate error handling
- Update documentation for new features
- Ensure mobile responsiveness

## 📚 Documentation

### API Documentation
- **Mock Services**: Comprehensive mock API for all features
- **Type Definitions**: Complete TypeScript interfaces
- **Component Props**: Documented component interfaces
- **Context APIs**: Authentication and theme context documentation

### User Guide
- **Authentication**: How to use different user roles
- **Financial Features**: Guide to money transfers and requests
- **Analytics**: Understanding the dashboard analytics
- **Administration**: Admin and super admin feature guides

## 🔮 Future Enhancements

### Planned Features
- **Real API Integration**: Replace mock services with actual backend
- **Advanced Analytics**: More detailed financial insights and reports
- **Notification System**: Real-time notifications and alerts
- **Multi-Language Support**: Internationalization and localization
- **Advanced Search**: Enhanced filtering and search capabilities
- **Export Features**: PDF and CSV export functionality

### Technical Roadmap
- **Unit Testing**: Comprehensive test suite with Jest and React Testing Library
- **E2E Testing**: Automated testing with Playwright or Cypress
- **Performance Monitoring**: Analytics and performance tracking
- **PWA Features**: Progressive Web App capabilities
- **Advanced Security**: Enhanced authentication and encryption

## 📝 License

This project is part of the Chapa frontend interview assignment.

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS**

*A comprehensive financial dashboard application showcasing modern React development practices, role-based authentication, and advanced UI/UX design.*
