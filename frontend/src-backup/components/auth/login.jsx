import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Droplets } from 'lucide-react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@sih.gov.in');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const ok = await onLogin(email, password, role);
      if (!ok) {
        setError('Login failed. Check your credentials and role.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription className="mt-2">
            Enter your credentials to continue
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select id="role" className="w-full border rounded-md h-10 px-3 bg-background" value={role} onChange={e => setRole(e.target.value)}>
              <option value="monitor">Monitor</option>
              <option value="researcher">Researcher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
