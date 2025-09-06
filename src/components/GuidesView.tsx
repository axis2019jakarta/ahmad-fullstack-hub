import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  BookOpen,
  Terminal,
  Github,
  Cloud,
  Database,
  Code,
  Smartphone,
  Globe,
  Settings,
  Play,
  ChevronRight,
  Star,
  Clock,
  User
} from 'lucide-react';

export const GuidesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides', icon: BookOpen },
    { id: 'basics', name: 'Terminal Basics', icon: Terminal },
    { id: 'git', name: 'Git & GitHub', icon: Github },
    { id: 'deployment', name: 'Deployment', icon: Cloud },
    { id: 'database', name: 'Databases', icon: Database },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'web', name: 'Web Development', icon: Globe }
  ];

  const guides = [
    {
      id: 1,
      title: 'Getting Started with Terminal',
      description: 'Learn the essential Linux terminal commands for development',
      category: 'basics',
      difficulty: 'Beginner',
      duration: '15 min',
      rating: 4.9,
      chapters: [
        'Understanding the Terminal Interface',
        'Basic Navigation Commands (ls, cd, pwd)',
        'File Operations (cp, mv, rm, mkdir)',
        'Text Editing with Nano',
        'Process Management (ps, htop, kill)'
      ]
    },
    {
      id: 2,
      title: 'Package Managers Guide',
      description: 'Master npm, yarn, pnpm and system package managers',
      category: 'basics',
      difficulty: 'Beginner',
      duration: '20 min',
      rating: 4.8,
      chapters: [
        'Understanding Package Managers',
        'NPM Fundamentals',
        'Yarn vs NPM vs PNPM',
        'Managing Dependencies',
        'Scripts and Automation'
      ]
    },
    {
      id: 3,
      title: 'Git Version Control',
      description: 'Complete guide to Git from basics to advanced workflows',
      category: 'git',
      difficulty: 'Intermediate',
      duration: '45 min',
      rating: 4.9,
      chapters: [
        'Git Basics and Repository Setup',
        'Staging, Committing, and Branching',
        'Remote Repositories and GitHub',
        'Merge Conflicts Resolution',
        'Advanced Git Workflows'
      ]
    },
    {
      id: 4,
      title: 'GitHub Integration',
      description: 'Learn GitHub CLI and repository management',
      category: 'git',
      difficulty: 'Intermediate',
      duration: '30 min',
      rating: 4.7,
      chapters: [
        'GitHub CLI Installation',
        'Repository Management',
        'Pull Requests and Issues',
        'GitHub Actions Basics',
        'Collaboration Workflows'
      ]
    },
    {
      id: 5,
      title: 'Vercel Deployment',
      description: 'Deploy your applications with Vercel for production',
      category: 'deployment',
      difficulty: 'Intermediate',
      duration: '25 min',
      rating: 4.8,
      chapters: [
        'Vercel CLI Setup',
        'Project Configuration',
        'Environment Variables',
        'Domain Management',
        'Performance Optimization'
      ]
    },
    {
      id: 6,
      title: 'Supabase Backend',
      description: 'Build scalable backends with Supabase',
      category: 'database',
      difficulty: 'Advanced',
      duration: '60 min',
      rating: 4.9,
      chapters: [
        'Supabase Project Setup',
        'Database Design and Tables',
        'Authentication Integration',
        'Row Level Security (RLS)',
        'Edge Functions Development',
        'Real-time Features'
      ]
    },
    {
      id: 7,
      title: 'React Development',
      description: 'Modern React development with hooks and best practices',
      category: 'development',
      difficulty: 'Intermediate',
      duration: '90 min',
      rating: 4.8,
      chapters: [
        'Project Setup with Vite',
        'Component Architecture',
        'State Management with Hooks',
        'API Integration',
        'Performance Optimization',
        'Testing Strategies'
      ]
    },
    {
      id: 8,
      title: 'Full-Stack Project Workflow',
      description: 'Complete workflow from development to production',
      category: 'web',
      difficulty: 'Advanced',
      duration: '120 min',
      rating: 4.9,
      chapters: [
        'Project Planning and Architecture',
        'Frontend Development',
        'Backend API Development',
        'Database Integration',
        'Testing and Quality Assurance',
        'Deployment and Monitoring',
        'Performance Optimization'
      ]
    },
    {
      id: 9,
      title: 'Mobile App Development',
      description: 'Create cross-platform mobile apps with React Native',
      category: 'mobile',
      difficulty: 'Advanced',
      duration: '150 min',
      rating: 4.7,
      chapters: [
        'React Native Setup',
        'Navigation and Routing',
        'Native Components',
        'Device APIs Integration',
        'State Management',
        'Publishing to App Stores'
      ]
    },
    {
      id: 10,
      title: 'Docker Containerization',
      description: 'Containerize your applications with Docker',
      category: 'deployment',
      difficulty: 'Advanced',
      duration: '80 min',
      rating: 4.6,
      chapters: [
        'Docker Fundamentals',
        'Creating Dockerfiles',
        'Multi-stage Builds',
        'Docker Compose',
        'Container Orchestration'
      ]
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Development Guides
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Complete tutorials for modern full-stack development
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{guides.length}</p>
              <p className="text-sm text-muted-foreground">Total Guides</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">12h</p>
              <p className="text-sm text-muted-foreground">Total Content</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">2.5K</p>
              <p className="text-sm text-muted-foreground">Learners</p>
            </CardContent>
          </Card>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">
                    {guide.title}
                  </CardTitle>
                  <Badge 
                    className={`text-xs ${getDifficultyColor(guide.difficulty)}`}
                  >
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{guide.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{guide.rating}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {guide.chapters.length} chapters
                  </Badge>
                </div>

                {/* Chapters Preview */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">What you'll learn:</h4>
                  <div className="space-y-1">
                    {guide.chapters.slice(0, 3).map((chapter, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-3 w-3 text-primary" />
                        <span>{chapter}</span>
                      </div>
                    ))}
                    {guide.chapters.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        + {guide.chapters.length - 3} more chapters...
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No guides found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or selecting a different category.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Learning Path CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-6">
              Follow our structured learning paths to become a full-stack developer
            </p>
            <Button size="lg">
              <Play className="h-4 w-4 mr-2" />
              Start with Terminal Basics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};