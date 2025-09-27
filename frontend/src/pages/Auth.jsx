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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [resetPhase, setResetPhase] = useState('request'); // 'request' | 'reset'
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

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
      setLoading(true);
      const { name, email, password } = formData;

      if (mode === 'signup') {
        // Create the user, then fall through to login
        try {
          await api.post('/auth/signup', { name, email, password, role });
        } catch (err) {
          // If user already exists, continue to login instead of blocking the flow
          if (err?.status === 400) {
            // no-op; proceed to login
          } else {
            throw err;
          }
        }
      }

      // Login and store token
      const res = await api.post('/auth/login', { email, password });
      const { token, role: backendRole } = res || {};
      if (!token) throw new Error('Login failed');

      try { localStorage.setItem('token', token); } catch (_) {}
      try { localStorage.setItem('role', backendRole || role); } catch (_) {}

      // Fetch user profile to confirm role and possibly store user info
      let finalRole = backendRole || role;
      try {
        const me = await api.get('/auth/me');
        if (me?.role) {
          finalRole = me.role;
          try { localStorage.setItem('role', finalRole); } catch (_) {}
        }
        if (me?.email) {
          try { localStorage.setItem('user', JSON.stringify(me)); } catch (_) {}
        }
      } catch (_) {
        // ignore profile fetch errors; proceed with role we have
      }

      if (finalRole === 'researcher') navigate('/dashboard/researcher');
      else navigate('/dashboard/user');
    } catch (err) {
      const message = typeof err?.message === 'string' && err.message.trim().length
        ? err.message
        : 'Authentication failed. Please check your details and try again.';
      alert(message);
      // Optionally log: console.error(err);
    }
    finally {
      setLoading(false);
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
              <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                <input type="checkbox" className="rounded" checked={showPassword} onChange={(e)=>setShowPassword(e.target.checked)} />
                <span>Show password</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-500" onClick={()=>{ setForgot(v=>!v); setResetPhase('request'); setResetMessage(''); }}>
                {forgot ? 'Close forgot password' : 'Forgot password?'}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}
            </button>
          </div>
        </form>

        {forgot && (
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm">
            <div className="mb-2 font-medium text-gray-900">Reset your password</div>
            {resetPhase === 'request' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e)=>setResetEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={resetLoading || !resetEmail}
                    onClick={async()=>{
                      try {
                        setResetLoading(true); setResetMessage('');
                        const resp = await api.post('/auth/request-reset', { email: resetEmail });
                        // In dev, backend returns the token to help testing
                        const token = resp?.token;
                        if (token) {
                          setResetToken(token);
                          setResetPhase('reset');
                          setResetMessage('A reset token was generated (shown here for development).');
                        } else {
                          setResetMessage('If the email exists, a reset token has been created. Check server logs or your email system.');
                        }
                      } catch (e) {
                        setResetMessage('Could not request reset. Please try again.');
                      } finally {
                        setResetLoading(false);
                      }
                    }}
                    className={`inline-flex items-center rounded-md ${resetLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} px-3 py-2 text-white`}
                  >
                    {resetLoading ? 'Please wait…' : 'Request reset'}
                  </button>
                </div>
                {resetMessage && <div className="text-gray-700">{resetMessage}</div>}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Reset token</label>
                  <input
                    type="text"
                    value={resetToken}
                    onChange={(e)=>setResetToken(e.target.value)}
                    placeholder="Paste token"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">New password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={resetLoading || !resetToken || !newPassword}
                    onClick={async()=>{
                      try {
                        setResetLoading(true); setResetMessage('');
                        await api.post('/auth/reset-password', { token: resetToken, newPassword });
                        setResetMessage('Password has been reset. You can now sign in.');
                        setMode('login');
                      } catch (e) {
                        setResetMessage('Could not reset password. Token may be invalid or expired.');
                      } finally {
                        setResetLoading(false);
                      }
                    }}
                    className={`inline-flex items-center rounded-md ${resetLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} px-3 py-2 text-white`}
                  >
                    {resetLoading ? 'Please wait…' : 'Set new password'}
                  </button>
                  <button type="button" className="text-blue-600 hover:text-blue-500" onClick={()=>setResetPhase('request')}>Back</button>
                </div>
                {resetMessage && <div className="text-gray-700">{resetMessage}</div>}
              </div>
            )}
          </div>
        )}

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
