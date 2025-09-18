import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, useAuth } from './components/auth/auth-context';
import { Login } from './components/auth/login';
import { Navigation } from './components/navigation';

// Dashboard Components
import { UserDashboard } from './components/dashboards/user-dashboard';
import { AnalystDashboard } from './components/dashboards/analyst-dashboard';
import { AdminDashboard } from './components/dashboards/admin-dashboard';

// Feature Components
import { SampleTesting } from './components/features/sample-testing';
import { Analytics } from './components/features/analytics';
import { Reports } from './components/features/reports';
import { Alerts } from './components/alerts';
import { Settings } from './components/settings';

// Common Components
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/toaster';

function AppContent() {
  const { user, login, logout } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Microplastics Detection
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Please sign in to continue
            </p>
          </div>
          <Login onLogin={login} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation user={user} onLogout={logout} />
      <main className="p-4 md:p-8">
        {user.role === 'user' && <UserDashboard />}
        {user.role === 'analyst' && <AnalystDashboard />}
        {user.role === 'admin' && <AdminDashboard />}
      </main>
      <Toaster />
    </div>
  );
}

function AuthenticatedApp({ user, onLogout }) {
  const [activeFeature, setActiveFeature] = React.useState('sample-testing');
  
  const renderFeature = () => {
    switch (activeFeature) {
      case 'sample-testing':
        return <SampleTesting />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <Settings />;
      default:
        return <SampleTesting />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-center h-16 px-4 bg-indigo-600 dark:bg-indigo-700">
              <h1 className="text-xl font-bold text-white">Microplastics Detection</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              <button
                onClick={() => setActiveFeature('sample-testing')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  activeFeature === 'sample-testing'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span>Sample Testing</span>
              </button>
              <button
                onClick={() => setActiveFeature('analytics')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  activeFeature === 'analytics'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setActiveFeature('reports')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  activeFeature === 'reports'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span>Reports</span>
              </button>
              <button
                onClick={() => setActiveFeature('alerts')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  activeFeature === 'alerts'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span>Alerts</span>
              </button>
              <button
                onClick={() => setActiveFeature('settings')}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  activeFeature === 'settings'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span>Settings</span>
              </button>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {user.role || 'User'}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  className="ml-auto text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto focus:outline-none p-4 md:p-8">
            {renderFeature()}
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="microplastics-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
