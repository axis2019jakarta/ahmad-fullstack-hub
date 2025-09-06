import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Github, 
  Globe, 
  Database, 
  Settings, 
  ExternalLink, 
  Trash2,
  Edit,
  Calendar,
  Folder,
  Activity
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  description: string | null;
  repository_url: string | null;
  vercel_url: string | null;
  supabase_project_id: string | null;
  framework: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ProjectsView: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    framework: 'react',
    repository_url: '',
    vercel_url: '',
    supabase_project_id: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!user || !newProject.name.trim()) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            user_id: user.id,
            name: newProject.name.trim(),
            description: newProject.description.trim() || null,
            framework: newProject.framework,
            repository_url: newProject.repository_url.trim() || null,
            vercel_url: newProject.vercel_url.trim() || null,
            supabase_project_id: newProject.supabase_project_id.trim() || null
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => [data, ...prev]);
      setIsCreateDialogOpen(false);
      setNewProject({
        name: '',
        description: '',
        framework: 'react',
        repository_url: '',
        vercel_url: '',
        supabase_project_id: ''
      });
      toast.success('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const getFrameworkColor = (framework: string) => {
    const colors = {
      react: 'bg-blue-100 text-blue-800',
      vue: 'bg-green-100 text-green-800',
      angular: 'bg-red-100 text-red-800',
      svelte: 'bg-orange-100 text-orange-800',
      nextjs: 'bg-black text-white',
      nuxt: 'bg-emerald-100 text-emerald-800'
    };
    return colors[framework as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 lg:ml-64">
        <div className="max-w-7xl mx-auto pt-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:ml-64">
      <div className="max-w-7xl mx-auto pt-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage your development projects</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new project to your development workspace
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="my-awesome-project"
                  />
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your project"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="framework">Framework</Label>
                  <Select value={newProject.framework} onValueChange={(value) => setNewProject(prev => ({ ...prev, framework: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="repository">Repository URL</Label>
                  <Input
                    id="repository"
                    value={newProject.repository_url}
                    onChange={(e) => setNewProject(prev => ({ ...prev, repository_url: e.target.value }))}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={createProject} disabled={!newProject.name.trim()}>
                    Create Project
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Folder className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{projects.length}</p>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{projects.filter(p => p.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Github className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{projects.filter(p => p.repository_url).length}</p>
              <p className="text-sm text-muted-foreground">With Git</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{projects.filter(p => p.vercel_url).length}</p>
              <p className="text-sm text-muted-foreground">Deployed</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first project to get started with development
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      {project.description && (
                        <CardDescription className="mt-1">
                          {project.description}
                        </CardDescription>
                      )}
                    </div>
                    <Badge className={getFrameworkColor(project.framework)}>
                      {project.framework}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(project.created_at).toLocaleDateString()}</span>
                    </div>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>

                  {/* Links */}
                  <div className="space-y-2">
                    {project.repository_url && (
                      <a
                        href={project.repository_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Github className="h-4 w-4" />
                        <span>Repository</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {project.vercel_url && (
                      <a
                        href={project.vercel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Live Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {project.supabase_project_id && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Database className="h-4 w-4" />
                        <span>Supabase Connected</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};