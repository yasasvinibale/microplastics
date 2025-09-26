import React, { useMemo, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialRole = useMemo(() => searchParams.get('role') || 'user', [searchParams]);
  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;

      if (mode === 'signup') {
        // Create the user, then fall through to login
        await api.post('/auth/signup', { email, password, role });
      }

      // Login and store token
      const res = await api.post('/auth/login', { email, password });
      const { token, role: backendRole } = res || {};
      if (!token) throw new Error('Login failed');

      try { localStorage.setItem('token', token); } catch (_) {}
      try { localStorage.setItem('role', backendRole || role); } catch (_) {}

      const finalRole = backendRole || role;
      if (finalRole === 'researcher') {
        navigate('/dashboard/researcher');
      } else {
        navigate('/dashboard/user');
      }
    } catch (err) {
      alert('Authentication failed. Please check your details and try again.');
      // Optionally log: console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-md rounded-xl border border-blue-100 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Sign in' : 'Create an account'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {mode === 'login' 
              ? 'Choose a role and sign in to continue'
              : `Create a new ${role} account`}
          </p>
        </div>

        {/* Role selector */}
        <div className="mt-6 grid grid-cols-2 rounded-lg border border-blue-100 p-1 text-sm bg-blue-50">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`rounded-md px-3 py-2 font-medium ${role === 'user' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-white'}`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('researcher')}
            className={`rounded-md px-3 py-2 font-medium ${role === 'researcher' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-white'}`}
          >
            Researcher
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Your name"
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
