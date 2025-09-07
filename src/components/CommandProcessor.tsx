interface CommandResult {
  output: string;
  type: 'success' | 'error' | 'info';
}

export class CommandProcessor {
  private installedPackages = new Set(['react', 'vite', 'typescript', '@supabase/supabase-js']);

  async process(command: string): Promise<CommandResult> {
    const trimmed = command.trim();
    if (!trimmed) return { output: '', type: 'info' };

    const [cmd, ...args] = trimmed.split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        return this.showHelp();
      case 'clear':
        return { output: 'CLEAR_TERMINAL', type: 'success' };
      case 'ls':
      case 'dir':
        return this.listFiles(args);
      case 'pwd':
        return { output: '/workspace/nabila-development-station', type: 'success' };
      case 'whoami':
        return { output: 'nabila-developer', type: 'success' };
      case 'date':
        return { output: new Date().toString(), type: 'success' };
      case 'neofetch':
        return this.showNeofetch();
      case 'git':
        return this.handleGit(args);
      case 'npm':
      case 'yarn':
      case 'pnpm':
        return this.handlePackageManager(cmd, args);
      case 'node':
        return this.handleNode(args);
      case 'vercel':
        return this.handleVercel(args);
      case 'supabase':
        return this.handleSupabase(args);
      case 'cat':
        return this.handleCat(args);
      case 'echo':
        return { output: args.join(' '), type: 'success' };
      case 'mkdir':
        return { output: `Directory created: ${args[0] || 'new-folder'}`, type: 'success' };
      case 'cd':
        return { output: `Changed directory to: ${args[0] || 'home'}`, type: 'success' };
      case 'touch':
        return { output: `File created: ${args[0] || 'new-file.txt'}`, type: 'success' };
      case 'docker':
        return this.handleDocker(args);
      case 'code':
        return { output: 'Opening VS Code...', type: 'success' };
      case 'exit':
        return { output: 'Goodbye! 👋', type: 'info' };
      default:
        return { 
          output: `Command not found: ${cmd}\nType 'help' for available commands.`, 
          type: 'error' 
        };
    }
  }

  private showHelp(): CommandResult {
    return {
      output: `Available Commands:

📁 File Operations:
  ls, dir         - List directory contents
  cat <file>      - Display file content
  pwd             - Show current directory
  mkdir <name>    - Create directory
  touch <file>    - Create file
  cd <dir>        - Change directory

🔧 Development Tools:
  git <command>   - Git version control
  npm <command>   - Node Package Manager
  yarn <command>  - Yarn Package Manager
  node <file>     - Run JavaScript
  code            - Open VS Code

☁️  Cloud Services:
  vercel <cmd>    - Vercel deployment
  supabase <cmd>  - Supabase backend
  docker <cmd>    - Docker containers

🖥️  System:
  help            - Show this help
  clear           - Clear terminal
  whoami          - Current user
  date            - Current date/time
  neofetch        - System information
  echo <text>     - Print text
  exit            - Exit terminal

💡 Tip: Use Tab for command completion and ↑/↓ for history`,
      type: 'info'
    };
  }

  private listFiles(args: string[]): CommandResult {
    const detailed = args.includes('-la') || args.includes('-l');
    
    const files = [
      'src/', 'public/', 'package.json', 'vite.config.ts', 
      'tailwind.config.ts', 'README.md', '.env', 'server.js'
    ];

    if (detailed) {
      const fileList = files.map(file => {
        const isDir = file.endsWith('/');
        const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = isDir ? '4096' : '1024';
        const date = new Date().toLocaleDateString();
        return `${permissions}  1 nabila nabila  ${size} ${date} ${file}`;
      }).join('\n');
      
      return { output: `total ${files.length}\n${fileList}`, type: 'success' };
    }

    return { output: files.join('  '), type: 'success' };
  }

  private showNeofetch(): CommandResult {
    return {
      output: `                   -\`                nabila@development-station
                  .o+\`               ─────────────────────────────────
                 \`ooo/               OS: Nabila Development Environment
                \`+oooo:              Host: Lovable Cloud Platform
               \`+oooooo:             Kernel: React 18.3.1
               -+oooooo+:            Uptime: Always Online
             \`/:-:++oooo+:           Packages: ${this.installedPackages.size} (npm)
            \`/++++/+++++++:          Shell: bash 5.0.0
           \`/++++++++++++++:         Resolution: Responsive
          \`/+++ooooooooooooo/\`       DE: Vite + Tailwind CSS
         ./ooosssso++osssssso+\`      WM: React Router
        .oossssso-\`\`\`\`/ossssss+\`     Theme: Modern Dark/Light
       -osssssso.      :ssssssso.    Icons: Lucide React
      :osssssss/        osssso+++.   Terminal: Nabila Terminal Emulator
     /ossssssss/        +ssssooo/-   CPU: JavaScript V8 Engine
   \`/ossssso+/:-        -:/+osssso+- GPU: CSS Animations
  \`+sso+:-\`                 \`.-/+oso: Memory: Optimized React State
 \`++:.                           \`-/+/ Disk: Cloud Storage
 .\`                                 \`/`,
      type: 'info'
    };
  }

  private handleGit(args: string[]): CommandResult {
    if (args.length === 0) {
      return { 
        output: 'usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]\n           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]\n           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]\n           [--super-prefix=<path>] [--config-env=<name>=<envvar>]\n           <command> [<args>]',
        type: 'info' 
      };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'init':
        return { output: 'Initialized empty Git repository in /workspace/nabila-development-station/.git/', type: 'success' };
      case 'status':
        return { 
          output: `On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
        modified:   src/components/Terminal.tsx
        new file:   src/components/CommandProcessor.tsx

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
        modified:   README.md`, 
          type: 'success' 
        };
      case 'add':
        const files = args.slice(1).join(' ') || '.';
        return { output: `Added ${files} to staging area`, type: 'success' };
      case 'commit':
        const message = args.includes('-m') ? 'Changes committed' : 'Enter commit message (use -m flag)';
        return { output: `[main ${Math.random().toString(36).substr(2, 7)}] ${message}`, type: 'success' };
      case 'push':
        return { output: 'Pushing to origin/main...\nEverything up-to-date', type: 'success' };
      case 'pull':
        return { output: 'Already up to date.', type: 'success' };
      case 'clone':
        const repo = args[1] || 'repository-url';
        return { output: `Cloning into '${repo.split('/').pop()}'...\nClone completed successfully`, type: 'success' };
      case 'branch':
        return { output: '* main\n  development\n  feature/new-terminal', type: 'success' };
      case 'log':
        return { 
          output: `commit a1b2c3d4e5f6 (HEAD -> main, origin/main)
Author: Nabila Ahmad <nabila@development.com>
Date:   ${new Date().toDateString()}

    Enhanced terminal with command processor

commit f6e5d4c3b2a1
Author: Nabila Ahmad <nabila@development.com>
Date:   ${new Date(Date.now() - 86400000).toDateString()}

    Initial development station setup`, 
          type: 'success' 
        };
      default:
        return { output: `git: '${subcommand}' is not a git command. See 'git --help'.`, type: 'error' };
    }
  }

  private handlePackageManager(cmd: string, args: string[]): CommandResult {
    if (args.length === 0) {
      return { 
        output: `${cmd} <command>\n\nUsage:\n  ${cmd} install [package]\n  ${cmd} run <script>\n  ${cmd} build\n  ${cmd} dev`,
        type: 'info' 
      };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'install':
      case 'add':
        const pkg = args[1];
        if (pkg) {
          this.installedPackages.add(pkg);
          return { output: `✅ Successfully installed ${pkg}`, type: 'success' };
        }
        return { output: `Installing dependencies...\n✅ All dependencies installed successfully`, type: 'success' };
      case 'run':
        const script = args[1];
        if (script === 'dev') {
          return { output: '🚀 Development server starting...\n  Local:   http://localhost:5173/', type: 'success' };
        } else if (script === 'build') {
          return { output: '📦 Building for production...\n✅ Build completed successfully', type: 'success' };
        }
        return { output: `Running script: ${script}`, type: 'success' };
      case 'dev':
        return { output: '🚀 Development server starting...\n  Local:   http://localhost:5173/', type: 'success' };
      case 'build':
        return { output: '📦 Building for production...\n✅ Build completed successfully', type: 'success' };
      case 'list':
        return { output: Array.from(this.installedPackages).join('\n'), type: 'success' };
      default:
        return { output: `Unknown command: ${subcommand}`, type: 'error' };
    }
  }

  private handleNode(args: string[]): CommandResult {
    if (args.length === 0) {
      return { output: 'Welcome to Node.js v20.10.0.\nType ".help" for more information.', type: 'success' };
    }
    
    const file = args[0];
    return { output: `Executing ${file}...\n✅ Script executed successfully`, type: 'success' };
  }

  private handleVercel(args: string[]): CommandResult {
    if (args.length === 0) {
      return { 
        output: `Vercel CLI 32.5.0
Usage: vercel [options] [command]

Commands:
  login     Login to Vercel
  deploy    Deploy project
  dev       Start development server
  build     Build project
  env       Manage environment variables`,
        type: 'info' 
      };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'login':
        return { output: '🔐 Login successful! Welcome to Vercel.', type: 'success' };
      case 'deploy':
        return { 
          output: `🔍 Inspecting project...
🚀 Deploying to production...
✅ Deployment ready: https://nabila-station-${Math.random().toString(36).substr(2, 8)}.vercel.app`,
          type: 'success' 
        };
      case 'dev':
        return { output: '🚀 Vercel dev server starting...\n  Ready on http://localhost:3000', type: 'success' };
      case 'build':
        return { output: '📦 Building for Vercel...\n✅ Build ready for deployment', type: 'success' };
      case 'env':
        return { output: 'Environment variables:\n  VITE_SUPABASE_URL=***\n  VITE_SUPABASE_ANON_KEY=***', type: 'success' };
      default:
        return { output: `vercel: command not found: ${subcommand}`, type: 'error' };
    }
  }

  private handleSupabase(args: string[]): CommandResult {
    if (args.length === 0) {
      return { 
        output: `Supabase CLI 1.123.4
Usage: supabase [command]

Commands:
  login     Login to Supabase
  start     Start local development
  stop      Stop local development
  db        Database commands
  gen       Generate types`,
        type: 'info' 
      };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'login':
        return { output: '🔑 Supabase login successful!', type: 'success' };
      case 'start':
        return { 
          output: `🚀 Starting Supabase local development...
✅ Database started
✅ API Gateway started
✅ Auth started
  Studio URL: http://localhost:54323
  API URL: http://localhost:54321`,
          type: 'success' 
        };
      case 'stop':
        return { output: '⏹️  Supabase local development stopped', type: 'success' };
      case 'db':
        if (args[1] === 'push') {
          return { output: '📤 Pushing database changes...\n✅ Database updated successfully', type: 'success' };
        } else if (args[1] === 'pull') {
          return { output: '📥 Pulling database changes...\n✅ Local database synced', type: 'success' };
        }
        return { output: 'Database commands: push, pull, reset', type: 'info' };
      case 'gen':
        if (args[1] === 'types') {
          return { output: '🔧 Generating TypeScript types...\n✅ Types generated successfully', type: 'success' };
        }
        return { output: 'Generate commands: types', type: 'info' };
      default:
        return { output: `supabase: command not found: ${subcommand}`, type: 'error' };
    }
  }

  private handleDocker(args: string[]): CommandResult {
    if (args.length === 0) {
      return { 
        output: `Docker version 24.0.6
Usage: docker [OPTIONS] COMMAND

Commands:
  build     Build an image
  run       Run a container
  ps        List containers
  images    List images
  pull      Pull an image`,
        type: 'info' 
      };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'ps':
        return { 
          output: `CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS       PORTS     NAMES
a1b2c3d4e5f6   postgres  "docker-entrypoint.s…"   2 hours ago   Up 2 hours   5432/tcp  supabase_db`,
          type: 'success' 
        };
      case 'images':
        return { 
          output: `REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
postgres     latest    a1b2c3d4e5f6   2 weeks ago   379MB
node         18        f6e5d4c3b2a1   3 weeks ago   993MB`,
          type: 'success' 
        };
      case 'build':
        return { output: '🔨 Building Docker image...\n✅ Image built successfully', type: 'success' };
      case 'run':
        const image = args[1] || 'image';
        return { output: `🏃 Running container from ${image}...\n✅ Container started`, type: 'success' };
      case 'pull':
        const pullImage = args[1] || 'image';
        return { output: `⬇️  Pulling ${pullImage}...\n✅ Pull complete`, type: 'success' };
      default:
        return { output: `docker: '${subcommand}' is not a docker command.`, type: 'error' };
    }
  }

  private handleCat(args: string[]): CommandResult {
    if (args.length === 0) {
      return { output: 'cat: missing file operand', type: 'error' };
    }

    const file = args[0];
    const mockFiles: Record<string, string> = {
      'package.json': JSON.stringify({
        name: "nabila-development-station",
        version: "1.0.0",
        scripts: {
          dev: "vite",
          build: "vite build"
        }
      }, null, 2),
      'README.md': `# Nabila Ahmad Development Station

🚀 A comprehensive development environment built by Nabila Ahmad

## Features
- Terminal Emulator
- Git Integration  
- Package Management
- Cloud Deployment
- Database Management

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\``,
      '.env': `VITE_SUPABASE_URL=https://myspriwgycyymelgyttu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
      'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`
    };

    if (mockFiles[file]) {
      return { output: mockFiles[file], type: 'success' };
    }

    return { output: `cat: ${file}: No such file or directory`, type: 'error' };
  }

  getCompletions(command: string): string[] {
    const commands = [
      'help', 'clear', 'ls', 'pwd', 'whoami', 'date', 'neofetch',
      'git', 'npm', 'yarn', 'node', 'vercel', 'supabase', 'cat',
      'echo', 'mkdir', 'cd', 'touch', 'docker', 'code', 'exit'
    ];

    return commands.filter(cmd => cmd.startsWith(command.toLowerCase()));
  }
}