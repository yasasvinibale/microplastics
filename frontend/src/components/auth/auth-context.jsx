import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock user database for demo purposes
const mockUsers = {
  'monitor@sih.gov.in': {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'monitor@sih.gov.in',
    password: 'demo123',
    role: 'monitor',
    department: 'Field Operations',
    location: 'Ganga Research Station, Kanpur'
  },
  'researcher@sih.gov.in': {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    email: 'researcher@sih.gov.in',
    password: 'demo123',
    role: 'researcher',
    department: 'Environmental Research',
    location: 'TERI, New Delhi'
  },
  'admin@sih.gov.in': {
    id: '3',
    name: 'Dr. Meera Nair',
    email: 'admin@sih.gov.in',
    password: 'demo123',
    role: 'admin',
    department: 'System Administration',
    location: 'Ministry of Earth Sciences, New Delhi'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('microplastics_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('microplastics_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = mockUsers[email.toLowerCase()];
      if (!mockUser) {
        setError('Invalid email address');
        setLoading(false);
        return false;
      }
      if (mockUser.password !== password) {
        setError('Invalid password');
        setLoading(false);
        return false;
      }
      if (mockUser.role !== role) {
        setError('Invalid role selection for this account');
        setLoading(false);
        return false;
      }

      const { password: _ignored, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('microplastics_user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    } catch (error) {
      setError('Login failed. Please try again.');
      setLoading(false);
      return false;
    }
  };

  const signup = async (email, password, name, role) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (mockUsers[email.toLowerCase()]) {
        setError('An account with this email already exists');
        setLoading(false);
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
        role,
        department: getDepartmentForRole(role),
        location: 'To be assigned'
      };

      setUser(newUser);
      localStorage.setItem('microplastics_user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    } catch (error) {
      setError('Signup failed. Please try again.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('microplastics_user');
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const getDepartmentForRole = (role) => {
    switch (role) {
      case 'monitor':
        return 'Field Operations';
      case 'researcher':
        return 'Environmental Research';
      case 'admin':
        return 'System Administration';
      default:
        return 'General';
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
