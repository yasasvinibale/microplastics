import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

// TypeScript interface removed

export function Signup({ onSignup, onSwitchToLogin, error }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name) {
      setFormError('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await onSignup(email, password, name, role);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription className="mt-2">
              Join our platform to detect and monitor microplastics in water
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {(error || formError) && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || formError}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={setRole} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Regular User</SelectItem>
                  <SelectItem value="analyst">Water Quality Analyst</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:underline font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

