import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Terminal, Github, Globe, Database } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { signIn, signUp, loading } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;

    await signIn(loginForm.email, loginForm.password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.email || !signupForm.password || !signupForm.fullName) return;
    
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    await signUp(signupForm.email, signupForm.password, signupForm.fullName);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Branding */}
        <div className="flex flex-col justify-center space-y-6 p-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Nabila Ahmad Station
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Full-Stack Development Emulator
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Terminal className="h-4 w-4 text-primary" />
                <span>Linux Terminal</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Github className="h-4 w-4 text-primary" />
                <span>GitHub Integration</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Globe className="h-4 w-4 text-primary" />
                <span>Vercel Deploy</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Database className="h-4 w-4 text-primary" />
                <span>Supabase Backend</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-terminal-bg rounded-lg p-4 font-mono text-sm">
              <div className="text-primary mb-2">nabila@station:~$</div>
              <div className="text-terminal-comment"># Welcome to Nabila Ahmad Station</div>
              <div className="text-terminal-success"># Full-stack development environment</div>
              <div className="text-terminal-warning"># Ready for GitHub + Vercel + Supabase</div>
              <div className="text-primary mt-2">nabila@station:~$ npm run dev</div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Developer</CardTitle>
              <CardDescription>
                Sign in to access your development environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="developer@nabila.dev"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Your secure password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading || !loginForm.email || !loginForm.password}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Terminal className="h-4 w-4 mr-2" />
                      )}
                      Access Terminal
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your developer name"
                        value={signupForm.fullName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="developer@nabila.dev"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create secure password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading || !signupForm.email || !signupForm.password || !signupForm.fullName}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Terminal className="h-4 w-4 mr-2" />
                      )}
                      Create Developer Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>By signing up, you get access to:</p>
                <div className="mt-2 space-y-1">
                  <p>✅ Full Linux terminal simulation</p>
                  <p>✅ GitHub integration & deployment</p>
                  <p>✅ Project management & history</p>
                  <p>✅ Comprehensive development guides</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};