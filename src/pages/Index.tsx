import React, { useState, useEffect } from 'react';
import Terminal from "@/components/Terminal";
import { MobileNav } from "@/components/MobileNav";
import { AuthView } from "@/components/AuthView";
import { DeveloperAbout } from "@/components/DeveloperAbout";
import { GuidesView } from "@/components/GuidesView";
import { ProjectsView } from "@/components/ProjectsView";
import { SettingsView } from "@/components/SettingsView";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [currentView, setCurrentView] = useState('terminal');
  const { user, loading } = useAuth();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user && currentView !== 'auth') {
      setCurrentView('auth');
    }
  }, [user, loading, currentView]);

  // If loading, show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading Nabila Station...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show auth view
  if (!user && currentView !== 'about' && currentView !== 'guides') {
    return <AuthView />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthView />;
      case 'terminal':
        return (
          <div className="min-h-screen bg-background p-4 lg:ml-64">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 pt-8 lg:hidden">
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Nabila Ahmad Station
                </h1>
                <p className="text-xl text-muted-foreground">
                  Development Emulator
                </p>
                <p className="text-sm text-terminal-comment mt-2">
                  Full-stack development environment with GitHub, Vercel & Supabase integration
                </p>
              </div>
              
              <Terminal />
              
              <div className="text-center mt-8 text-xs text-terminal-comment">
                <p>
                  Terminal shortcuts: <span className="text-terminal-warning">Ctrl+L</span> (clear), 
                  <span className="text-terminal-warning"> Tab</span> (autocomplete), 
                  <span className="text-terminal-warning"> ↑↓</span> (history)
                </p>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="lg:ml-64">
            <ProjectsView />
          </div>
        );
      case 'about':
        return (
          <div className={user ? "lg:ml-64" : ""}>
            <DeveloperAbout />
          </div>
        );
      case 'guides':
        return (
          <div className={user ? "lg:ml-64" : ""}>
            <GuidesView />
          </div>
        );
      case 'settings':
        return (
          <div className="lg:ml-64">
            <SettingsView />
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-background p-4 lg:ml-64">
            <Terminal />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileNav currentView={currentView} onViewChange={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default Index;