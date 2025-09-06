import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  User, 
  Terminal, 
  Palette, 
  Save,
  RefreshCw,
  Shield,
  Bell,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserSettings {
  theme: string;
  terminal_font_size: number;
  auto_save_commands: boolean;
  show_welcome_message: boolean;
  preferred_package_manager: string;
}

export const SettingsView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    avatar_url: ''
  });
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'dark',
    terminal_font_size: 14,
    auto_save_commands: true,
    show_welcome_message: true,
    preferred_package_manager: 'npm'
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setProfile({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          avatar_url: profileData.avatar_url || ''
        });
      }

      // Fetch settings
      const { data: settingsData } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (settingsData) {
        setSettings({
          theme: settingsData.theme || 'dark',
          terminal_font_size: settingsData.terminal_font_size || 14,
          auto_save_commands: settingsData.auto_save_commands ?? true,
          show_welcome_message: settingsData.show_welcome_message ?? true,
          preferred_package_manager: settingsData.preferred_package_manager || 'npm'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await updateProfile({
        full_name: profile.full_name,
        avatar_url: profile.avatar_url
      });

      if (!error) {
        // Update phone separately as it's not in the updateProfile function
        await supabase
          .from('profiles')
          .update({ phone: profile.phone })
          .eq('user_id', user?.id);

        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user?.id,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const exportData = async () => {
    try {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id);

      const { data: commandsData } = await supabase
        .from('commands_history')
        .select('*')
        .eq('user_id', user?.id);

      const exportData = {
        profile,
        settings,
        projects: projectsData || [],
        commands: commandsData || [],
        exported_at: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nabila-station-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 lg:ml-64">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:ml-64">
      <div className="max-w-4xl mx-auto pt-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
            <Settings className="h-8 w-8 text-primary" />
            <span>Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email (Read-only)</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={profile.avatar_url}
                  onChange={(e) => setProfile(prev => ({ ...prev, avatar_url: e.target.value }))}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
            <Button onClick={saveProfile} disabled={saving}>
              {saving ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Terminal Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-primary" />
              <span>Terminal Preferences</span>
            </CardTitle>
            <CardDescription>
              Customize your development terminal experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark Theme</SelectItem>
                    <SelectItem value="light">Light Theme</SelectItem>
                    <SelectItem value="matrix">Matrix Theme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="font_size">Font Size</Label>
                <Select 
                  value={settings.terminal_font_size.toString()} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, terminal_font_size: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10px</SelectItem>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="20">20px</SelectItem>
                    <SelectItem value="24">24px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="package_manager">Preferred Package Manager</Label>
                <Select 
                  value={settings.preferred_package_manager} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, preferred_package_manager: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="npm">npm</SelectItem>
                    <SelectItem value="yarn">Yarn</SelectItem>
                    <SelectItem value="pnpm">pnpm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto_save">Auto-save Commands</Label>
                  <p className="text-sm text-muted-foreground">Automatically save your command history</p>
                </div>
                <Switch
                  id="auto_save"
                  checked={settings.auto_save_commands}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, auto_save_commands: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="welcome_message">Show Welcome Message</Label>
                  <p className="text-sm text-muted-foreground">Display welcome message on terminal start</p>
                </div>
                <Switch
                  id="welcome_message"
                  checked={settings.show_welcome_message}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, show_welcome_message: checked }))}
                />
              </div>
            </div>

            <Button onClick={saveSettings} disabled={saving}>
              {saving ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Security & Privacy</span>
            </CardTitle>
            <CardDescription>
              Manage your account security and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notification Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-primary" />
              <span>Data Management</span>
            </CardTitle>
            <CardDescription>
              Export your data or manage your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export My Data
              </Button>
              <Button variant="outline" disabled>
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Danger Zone - These actions cannot be undone
              </p>
              <Button variant="destructive" disabled>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};