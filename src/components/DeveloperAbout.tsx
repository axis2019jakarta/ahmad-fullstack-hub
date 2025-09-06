import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Mail, 
  Globe, 
  Code, 
  Database, 
  Server, 
  Smartphone,
  Users,
  Award,
  Calendar,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const DeveloperAbout: React.FC = () => {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 95, category: 'Frontend' },
    { name: 'React/Next.js', level: 90, category: 'Frontend' },
    { name: 'Node.js/Express', level: 88, category: 'Backend' },
    { name: 'Python/Django', level: 85, category: 'Backend' },
    { name: 'PostgreSQL/MySQL', level: 82, category: 'Database' },
    { name: 'MongoDB', level: 80, category: 'Database' },
    { name: 'Docker/Kubernetes', level: 78, category: 'DevOps' },
    { name: 'AWS/GCP', level: 75, category: 'Cloud' },
    { name: 'React Native/Flutter', level: 88, category: 'Mobile' },
    { name: 'GraphQL/REST APIs', level: 90, category: 'API' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      status: 'Live',
      users: '10K+ users'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management with Socket.io',
      tech: ['Next.js', 'Socket.io', 'MongoDB', 'Redis'],
      status: 'Live',
      users: '5K+ users'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Business intelligence dashboard with data visualization',
      tech: ['React', 'D3.js', 'Python', 'FastAPI'],
      status: 'Development',
      users: 'Enterprise'
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric auth',
      tech: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
      status: 'Live',
      users: '25K+ users'
    }
  ];

  const experiences = [
    {
      role: 'Senior Full-Stack Developer',
      company: 'Tech Innovators Inc.',
      period: '2022 - Present',
      description: 'Leading development teams and architecting scalable web applications'
    },
    {
      role: 'Full-Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern technologies'
    },
    {
      role: 'Frontend Developer',
      company: 'StartUp Ventures',
      period: '2019 - 2020',
      description: 'Built responsive web applications and user interfaces'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white">NA</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Nabila Ahmad</h1>
            <p className="text-xl text-muted-foreground mb-4">Senior Full-Stack Developer</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>5+ Years Experience</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
          </div>
        </div>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>About Me</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Passionate full-stack developer with 5+ years of experience building scalable web and mobile applications. 
              Specialized in modern JavaScript frameworks, cloud technologies, and database design. I enjoy creating 
              development tools and platforms that help other developers be more productive.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This Development Station is one of my projects - a comprehensive emulator that provides a Linux-like 
              development environment with integrated GitHub, Vercel, and Supabase workflows. Perfect for learning, 
              prototyping, and teaching modern full-stack development practices.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">50+ Projects</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">100K+ Users</p>
                <p className="text-xs text-muted-foreground">Served</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">15+ Languages</p>
                <p className="text-xs text-muted-foreground">Proficient</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Server className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Cloud Expert</p>
                <p className="text-xs text-muted-foreground">AWS Certified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-primary" />
              <span>Technical Skills</span>
            </CardTitle>
            <CardDescription>
              Proficiency levels based on years of experience and project complexity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <span>Featured Projects</span>
            </CardTitle>
            <CardDescription>
              Some of my notable projects and their impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge 
                        variant={project.status === 'Live' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{project.users}</span>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <span>Professional Experience</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <Badge variant="outline" className="text-xs">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-primary mb-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">Let's Build Something Amazing</h2>
            <p className="text-muted-foreground mb-6">
              Interested in collaborating or need help with your project? I'm always open to discussing new opportunities.
            </p>
            <div className="space-x-4">
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Get In Touch
              </Button>
              <Button variant="outline">
                <Github className="h-4 w-4 mr-2" />
                View My Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};