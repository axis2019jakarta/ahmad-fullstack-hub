import React, { useState } from 'react';
import { Menu, X, Home, Terminal, User, BookOpen, Settings, LogIn, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

interface MobileNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const menuItems = [
    { id: 'terminal', label: 'Terminal', icon: Terminal, description: 'Development Terminal' },
    { id: 'projects', label: 'Projects', icon: Plus, description: 'Manage Projects' },
    { id: 'guides', label: 'Guides', icon: BookOpen, description: 'Learn Development' },
    { id: 'about', label: 'About Developer', icon: User, description: 'Nabila Ahmad' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences' }
  ];

  const handleItemClick = (itemId: string) => {
    onViewChange(itemId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="bg-gradient-to-b from-primary/10 to-background h-full">
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-primary">Nabila Station</h2>
                      <p className="text-sm text-muted-foreground">Development Hub</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* User Section */}
                <div className="p-4 border-b border-border">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {user.email}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          Developer
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={signOut}
                        className="text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleItemClick('auth')}
                      className="w-full"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  )}
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        currentView === item.id
                          ? 'bg-primary/20 text-primary border-l-4 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-muted-foreground text-center">
                    <p>Nabila Ahmad Station v1.0</p>
                    <p>Full-Stack Development Platform</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div>
            <h1 className="text-lg font-bold text-primary">Nabila Station</h1>
            <p className="text-xs text-muted-foreground">Dev Emulator</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {user && (
            <Badge variant="outline" className="text-xs">
              Online
            </Badge>
          )}
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-sidebar-background border-r border-sidebar-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-sidebar-foreground">Nabila Station</h2>
            <p className="text-sm text-sidebar-foreground/70">Development Emulator</p>
          </div>

          {/* User Section */}
          <div className="p-4 border-b border-sidebar-border">
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    Developer
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => onViewChange('auth')}
                className="w-full"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login / Sign Up
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentView === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs opacity-75">{item.description}</p>
                </div>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="text-xs text-sidebar-foreground/60 text-center">
              <p>© 2024 Nabila Ahmad</p>
              <p>Full-Stack Development Platform</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};