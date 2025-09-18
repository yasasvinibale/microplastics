import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Home, 
  TestTube, 
  BarChart, 
  Settings, 
  AlertTriangle,
  Droplets,
  Microscope,
  LayoutDashboard,
  LogOut,
  User,
  FileText,
  Users,
  Shield,
  Database,
  LineChart,
  Bell,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

const defaultNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'samples', label: 'Samples', icon: 'TestTube' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
  { id: 'reports', label: 'Reports', icon: 'FileText' },
  { id: 'alerts', label: 'Alerts', icon: 'AlertTriangle', badge: '3' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

const iconComponents = {
  Home,
  TestTube,
  BarChart,
  Settings,
  AlertTriangle,
  Droplets,
  Microscope,
  LayoutDashboard,
  FileText,
  Users,
  Shield,
  Database,
  LineChart,
  Bell,
  HelpCircle,
  Menu,
  X,
  User,
  LogOut
};

function Navigation({ 
  activeSection, 
  onSectionChange, 
  user, 
  onLogout,
  navigationItems = defaultNavigationItems 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const renderIcon = (iconName) => {
    const IconComponent = iconComponents[iconName] || Home;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Droplets className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Microplastics
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {item.icon && (
                      <span className="mr-2">
                        {renderIcon(item.icon)}
                      </span>
                    )}
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-2" variant="secondary">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            
            <div className="ml-3 relative">
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role || 'User'}
                  </p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {onLogout && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium ${
                  activeSection === item.id
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  {item.icon && (
                    <span className="mr-2">
                      {renderIcon(item.icon)}
                    </span>
                  )}
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-2" variant="secondary">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
            
            {onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign out
                </div>
              </button>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">
                  {user?.name || 'User'}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {user?.email || ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export { Navigation };
