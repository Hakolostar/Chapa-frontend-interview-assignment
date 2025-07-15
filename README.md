# Chapa Frontend Interview Assignment

A modern React application built with TypeScript, Vite, and Tailwind CSS featuring role-based authentication and dashboard management.
View Hosted App (https://chapa-frontend-interview-assignment-sand.vercel.app/)
<img width="1827" height="880" alt="Screenshot Dashboard" src="https://github.com/user-attachments/assets/7c7634e1-08ac-4c3b-b037-abf45c9df93c" />
Super Admin Dash
<img width="1807" height="875" alt="Screenshot Analytics" src="https://github.com/user-attachments/assets/3ef02302-d498-4bc6-be63-2f96b3c10a3b" />
Analytics 

## 🚀 Features

- **Role-Based Authentication**: Support for three user roles (User, Admin, Super Admin)
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Dashboard System**: Role-specific dashboards with different functionality
- **Modern Tech Stack**: React 18, TypeScript, Vite for fast development
- **Component Architecture**: Well-organized component structure with reusable components

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx           # Authentication form component
│   ├── common/
│   │   ├── Card.tsx                # Reusable card component
│   │   ├── Layout.tsx              # Main layout wrapper
│   │   ├── LoadingSpinner.tsx      # Loading indicator
│   │   └── ThemeToggle.tsx         # Dark/light theme toggle
│   ├── dashboards/
│   │   ├── AdminDashboard.tsx      # Admin role dashboard
│   │   ├── SuperAdminDashboard.tsx # Super admin role dashboard
│   │   └── UserDashboard.tsx       # User role dashboard
│   └── routes/
│       └── ProtectedRoute.tsx      # Route protection component
├── context/
│   ├── AuthContext.tsx             # Authentication state management
│   └── ThemeContext.tsx            # Theme state management
├── services/
│   ├── mockApiService.ts           # Mock API service
│   ├── mockAuthService.ts          # Mock authentication service
│   └── mockData.ts                 # Mock data for development
├── types/
│   └── index.ts                    # TypeScript type definitions
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
└── index.css                       # Global styles
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

## 🔐 Authentication

The application uses a mock authentication system with three predefined user roles:

### Test Accounts

You can use these test credentials to explore different user roles:

- **User Role**: Basic user with limited dashboard access
- **Admin Role**: Administrative user with extended permissions
- **Super Admin Role**: Full administrative access with all features

*Note: This is a mock authentication system for demonstration purposes.*

## 🎨 Theming

The application supports both dark and light themes:

- Toggle using the theme switch in the navigation
- Theme preference is preserved across sessions
- All components are designed to work seamlessly in both themes

## 🔒 Protected Routes

The application implements route protection based on authentication status:

- Unauthenticated users are redirected to the login form
- Authenticated users see role-appropriate dashboards
- Protected routes ensure secure access to sensitive areas

## 🧩 Component Architecture

### Context Providers

- **AuthContext**: Manages user authentication state and login/logout functionality
- **ThemeContext**: Handles theme switching and persistence

### Dashboard Components

- **UserDashboard**: Basic user interface with limited functionality
- **AdminDashboard**: Administrative interface with user management features
- **SuperAdminDashboard**: Full administrative panel with system-wide controls

### Common Components

- **Layout**: Provides consistent navigation and structure
- **Card**: Reusable container component
- **LoadingSpinner**: Loading state indicator
- **ThemeToggle**: Dark/light mode switcher

## 🔧 Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain component modularity

### File Organization

- Components are organized by feature/purpose
- Shared utilities in common directories
- Clear separation of concerns
- Consistent naming conventions

## 🚀 Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

The build output will be in the `dist/` directory, ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the Chapa frontend interview assignment.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
