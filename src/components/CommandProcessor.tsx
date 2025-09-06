interface CommandResult {
  type: 'output' | 'error' | 'success' | 'warning' | 'info' | 'multiline';
  output: string | Array<{ type: string; content: string }>;
}

export class CommandProcessor {
  private installedPackages = new Set([
    // System tools
    'curl', 'wget', 'git', 'nano', 'vim', 'neovim', 'htop', 'screen', 'tmux', 'tree', 
    'grep', 'sed', 'awk', 'unzip', 'tar', 'zip', 'jq', 'sqlite3',
    
    // Development tools
    'node', 'npm', 'yarn', 'pnpm', 'pip', 'pip3', 'python3', 'ruby', 'gem', 'cargo',
    'go', 'rustc', 'java', 'javac', 'php', 'perl', 'lua', 'deno', 'bun',
    
    // Cloud & deployment
    'gh', 'vercel', 'firebase', 'netlify', 'supabase', 'docker',
    
    // Global packages
    'typescript', 'ts-node', 'nodemon', 'concurrently', 'http-server', 'serve', 'prisma',
    
    // Fun utilities
    'neofetch', 'cmatrix', 'cowsay', 'lolcat', 'figlet', 'fortune'
  ]);

  async process(command: string): Promise<CommandResult> {
    const [cmd, ...args] = command.trim().split(/\s+/);
    
    switch (cmd.toLowerCase()) {
      case 'help':
        return this.showHelp();
      
      case 'ls':
        return this.listFiles(args);
      
      case 'pwd':
        return { type: 'output', output: '/home/nabila' };
      
      case 'whoami':
        return { type: 'output', output: 'nabila' };
      
      case 'date':
        return { type: 'output', output: new Date().toString() };
      
      case 'clear':
        return { type: 'info', output: '[Terminal cleared]' };
      
      case 'neofetch':
        return this.showNeofetch();
      
      case 'git':
        return this.handleGit(args);
      
      case 'gh':
        return this.handleGitHub(args);
      
      case 'npm':
      case 'yarn':
      case 'pnpm':
        return this.handlePackageManager(cmd, args);
      
      case 'node':
        return this.handleNode(args);
      
      case 'python3':
      case 'python':
        return this.handlePython(args);
      
      case 'vercel':
        return this.handleVercel(args);
      
      case 'supabase':
        return this.handleSupabase(args);
      
      case 'nano':
      case 'vim':
      case 'neovim':
        return this.handleEditor(cmd, args);
      
      case 'code':
        return this.handleVSCode(args);
      
      case 'apt':
      case 'pkg':
        return this.handlePackageInstall(args);
      
      case 'docker':
        return this.handleDocker(args);
      
      case 'cowsay':
        return this.handleCowsay(args);
      
      case 'figlet':
        return this.handleFiglet(args);
      
      case 'fortune':
        return this.handleFortune();
      
      case 'cmatrix':
        return { type: 'success', output: 'Matrix animation started... (Press Ctrl+C to stop)' };
      
      case 'htop':
        return this.showHtop();
      
      case 'ps':
        return this.showProcesses();
      
      case 'uname':
        return this.handleUname(args);
      
      case 'cat':
        return this.handleCat(args);
      
      case 'mkdir':
        return this.handleMkdir(args);
      
      case 'touch':
        return this.handleTouch(args);
      
      case 'echo':
        return { type: 'output', output: args.join(' ') };
      
      default:
        if (this.installedPackages.has(cmd)) {
          return { type: 'success', output: `${cmd}: command executed successfully` };
        }
        return { type: 'error', output: `bash: ${cmd}: command not found` };
    }
  }

  private showHelp(): CommandResult {
    return {
      type: 'multiline',
      output: [
        { type: 'success', content: '=== Nabila Ahmad Station Development Emulator ===' },
        { type: 'info', content: '' },
        { type: 'info', content: 'Available Commands:' },
        { type: 'output', content: '  System: ls, pwd, whoami, date, uname, ps, htop, clear' },
        { type: 'output', content: '  Files: cat, nano, vim, code, mkdir, touch, tree' },
        { type: 'output', content: '  Git: git init/add/commit/push, gh auth/repo' },
        { type: 'output', content: '  Node.js: npm/yarn/pnpm install/run, node, nodemon' },
        { type: 'output', content: '  Python: python3, pip, pip3' },
        { type: 'output', content: '  Cloud: vercel login/deploy, supabase start, firebase' },
        { type: 'output', content: '  Docker: docker build/run/ps' },
        { type: 'output', content: '  Fun: neofetch, cowsay, figlet, fortune, cmatrix' },
        { type: 'info', content: '' },
        { type: 'warning', content: 'Shortcuts: Ctrl+L (clear), Tab (autocomplete), ↑↓ (history)' }
      ]
    };
  }

  private listFiles(args: string[]): CommandResult {
    const files = [
      'package.json', 'tsconfig.json', 'tailwind.config.ts', 'vite.config.ts',
      'src/', 'public/', 'node_modules/', '.git/', 'README.md', '.gitignore'
    ];
    
    if (args.includes('-la') || args.includes('-al')) {
      return {
        type: 'multiline',
        output: [
          { type: 'output', content: 'total 42' },
          { type: 'output', content: 'drwxr-xr-x  8 nabila nabila  4096 Dec  6 10:30 .' },
          { type: 'output', content: 'drwxr-xr-x  3 nabila nabila  4096 Dec  6 09:15 ..' },
          { type: 'output', content: 'drwxr-xr-x  8 nabila nabila  4096 Dec  6 10:25 .git' },
          { type: 'output', content: '-rw-r--r--  1 nabila nabila   157 Dec  6 09:15 .gitignore' },
          { type: 'output', content: 'drwxr-xr-x  2 nabila nabila  4096 Dec  6 10:30 node_modules' },
          { type: 'output', content: '-rw-r--r--  1 nabila nabila  1234 Dec  6 10:15 package.json' },
          { type: 'output', content: 'drwxr-xr-x  2 nabila nabila  4096 Dec  6 10:20 public' },
          { type: 'output', content: '-rw-r--r--  1 nabila nabila   512 Dec  6 09:30 README.md' },
          { type: 'output', content: 'drwxr-xr-x  4 nabila nabila  4096 Dec  6 10:25 src' },
          { type: 'output', content: '-rw-r--r--  1 nabila nabila   789 Dec  6 09:45 tailwind.config.ts' },
          { type: 'output', content: '-rw-r--r--  1 nabila nabila   456 Dec  6 09:45 tsconfig.json' },
          { type: 'output', content: '-rw-r--r--  1 nabila nabila   234 Dec  6 09:45 vite.config.ts' }
        ]
      };
    }
    
    return { type: 'output', output: files.join('  ') };
  }

  private showNeofetch(): CommandResult {
    return {
      type: 'multiline',
      output: [
        { type: 'success', content: '         _,met$$$$$gg.          nabila@station' },
        { type: 'success', content: '      ,g$$$$$$$$$$$$$$$P.       ----------------' },
        { type: 'success', content: '    ,g$$P"     """Y$$.".        OS: Ubuntu 22.04.3 LTS x86_64' },
        { type: 'success', content: '   ,$$P\'              `$$$.     Host: Nabila Station Dev' },
        { type: 'success', content: '  \',$$P       ,ggs.     `$$b:   Kernel: 5.15.0-91-generic' },
        { type: 'success', content: '  `d$$\'     ,$P"\'   .    $$$    Uptime: 2 hours, 34 mins' },
        { type: 'success', content: '   $$P      d$\'     ,    $$P    Packages: 2847 (dpkg), 42 (npm)' },
        { type: 'success', content: '   $$:      $$.   -    ,d$$\'    Shell: bash 5.1.16' },
        { type: 'success', content: '   $$;      Y$b._   _,d$P\'      Resolution: 1920x1080' },
        { type: 'success', content: '   Y$$.    `.`"Y$$$$P"\'         Terminal: Nabila Station Terminal' },
        { type: 'success', content: '   `$$b      "-.__              CPU: Intel Core i7-12700K (16) @ 3.6GHz' },
        { type: 'success', content: '    `Y$$                        GPU: NVIDIA GeForce RTX 4070' },
        { type: 'success', content: '     `Y$$.                      Memory: 4829MiB / 32768MiB' }
      ]
    };
  }

  private handleGit(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]\n           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]\n           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]\n           <command> [<args>]' };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'init':
        return { type: 'success', output: 'Initialized empty Git repository in /home/nabila/.git/' };
      case 'status':
        return { type: 'info', output: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean' };
      case 'add':
        return { type: 'success', output: `Added ${args.slice(1).join(' ') || 'files'} to staging area` };
      case 'commit':
        const message = args.includes('-m') ? args.slice(args.indexOf('-m') + 1).join(' ') : 'Initial commit';
        return { type: 'success', output: `[main ${Math.random().toString(36).substr(2, 7)}] ${message}\n 1 file changed, 1 insertion(+)` };
      case 'push':
        return { type: 'success', output: 'Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 242 bytes | 242.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo github.com:nabila/project.git\n * [new branch]      main -> main' };
      case 'clone':
        return { type: 'success', output: `Cloning into '${args[1] || 'repository'}'...\nremote: Enumerating objects: 100, done.\nremote: Total 100 (delta 0), reused 0 (delta 0), pack-reused 100\nReceiving objects: 100% (100/100), done.` };
      default:
        return { type: 'output', output: `git ${subcommand}: command executed` };
    }
  }

  private handleGitHub(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'Work seamlessly with GitHub from the command line.\n\nUSAGE\n  gh <command> <subcommand> [flags]\n\nCORE COMMANDS\n  auth:        Authenticate gh and git with GitHub\n  repo:        Manage repositories' };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'auth':
        if (args[1] === 'login') {
          return { type: 'success', output: '✓ Logged in as nabila-ahmad' };
        }
        return { type: 'info', output: 'Manage authentication state' };
      case 'repo':
        if (args[1] === 'create') {
          const repoName = args[2] || 'new-project';
          return { type: 'success', output: `✓ Created repository nabila-ahmad/${repoName} on GitHub\n✓ Added remote origin` };
        }
        return { type: 'info', output: 'Manage repositories' };
      default:
        return { type: 'output', output: `gh ${subcommand}: executed` };
    }
  }

  private handlePackageManager(cmd: string, args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: `${cmd.toUpperCase()}\nUsage: ${cmd} <command>\n\nwhere <command> is one of:\n    install, run, dev, build, test` };
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'install':
        const packages = args.slice(1);
        if (packages.length > 0) {
          return { type: 'success', output: `${cmd}: Installing ${packages.join(', ')}...\n✓ Packages installed successfully` };
        }
        return { type: 'success', output: `${cmd}: Installing dependencies...\n✓ Dependencies installed successfully` };
      case 'run':
        const script = args[1] || 'dev';
        return { type: 'success', output: `> ${script}\n\n  Local:   http://localhost:5173/\n  Network: http://192.168.1.100:5173/\n\n  ready in 1.2s` };
      case 'dev':
        return { type: 'success', output: '  VITE v5.0.0  ready in 1.2s\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.100:5173/' };
      case 'build':
        return { type: 'success', output: 'vite build\n✓ built in 2.34s\ndist/index.html                  0.46 kB │ gzip:  0.30 kB\ndist/assets/index-a1b2c3d4.js  143.21 kB │ gzip: 46.12 kB\n✓ Build completed' };
      default:
        return { type: 'output', output: `${cmd} ${subcommand}: executed` };
    }
  }

  private handleNode(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'Welcome to Node.js v20.10.0.\nType ".help" for more information.' };
    }
    if (args[0] === '--version' || args[0] === '-v') {
      return { type: 'output', output: 'v20.10.0' };
    }
    return { type: 'success', output: `Node.js script executed: ${args.join(' ')}` };
  }

  private handlePython(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'Python 3.11.6 (main, Oct  8 2023, 05:06:43) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\n>>> ' };
    }
    if (args[0] === '--version') {
      return { type: 'output', output: 'Python 3.11.6' };
    }
    return { type: 'success', output: `Python script executed: ${args.join(' ')}` };
  }

  private handleVercel(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'Vercel CLI 32.7.2\nUsage: vercel <command>\n\nCommands:\n  login    Login to Vercel\n  deploy   Deploy project\n  dev      Start development server' };
    }

    switch (args[0]) {
      case 'login':
        return { type: 'success', output: '> Success! Logged in as nabila@example.com' };
      case 'deploy':
        return { type: 'success', output: '🔗  Preview: https://project-abc123.vercel.app\n✅  Production: https://project.vercel.app' };
      case 'dev':
        return { type: 'success', output: 'Vercel CLI 32.7.2 dev\n> Ready! Available at http://localhost:3000' };
      default:
        return { type: 'output', output: `vercel ${args[0]}: executed` };
    }
  }

  private handleSupabase(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'Supabase CLI 1.123.4\n\nUSAGE\n  supabase [command]\n\nAVAILABLE COMMANDS\n  login       Login to Supabase\n  start       Start containers\n  db          Manage databases' };
    }

    switch (args[0]) {
      case 'login':
        return { type: 'success', output: '✓ Logged in to Supabase.' };
      case 'start':
        return { type: 'success', output: 'Starting supabase local development setup...\n✓ Started supabase local development setup.\n\nAPI URL: http://localhost:54321\nDB URL: postgresql://postgres:postgres@localhost:54322/postgres\nStudio URL: http://localhost:54323' };
      case 'db':
        if (args[1] === 'reset') {
          return { type: 'success', output: 'Resetting the local database...\n✓ Finished supabase db reset.' };
        }
        return { type: 'info', output: 'Manage your Supabase database' };
      default:
        return { type: 'output', output: `supabase ${args[0]}: executed` };
    }
  }

  private handleEditor(cmd: string, args: string[]): CommandResult {
    const file = args[0] || 'untitled';
    return { type: 'success', output: `Opening ${file} in ${cmd}...\n[Editor simulation - file would open here]` };
  }

  private handleVSCode(args: string[]): CommandResult {
    const target = args[0] || '.';
    return { type: 'success', output: `Opening ${target} in Visual Studio Code...\n[VSCode would launch here]` };
  }

  private handlePackageInstall(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'apt - package manager\nUsage: apt install <package>' };
    }
    
    if (args[0] === 'update') {
      return { type: 'success', output: 'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nReading package lists... Done' };
    }
    
    if (args[0] === 'install') {
      const packages = args.slice(1);
      return { type: 'success', output: `Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  ${packages.join(' ')}\n0 upgraded, ${packages.length} newly installed, 0 to remove and 0 not upgraded.\n✓ Packages installed successfully` };
    }
    
    return { type: 'output', output: `apt ${args.join(' ')}: executed` };
  }

  private handleDocker(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'info', output: 'Docker version 24.0.7, build afdd53b\n\nUsage:  docker [OPTIONS] COMMAND\n\nA self-sufficient runtime for containers' };
    }

    switch (args[0]) {
      case 'ps':
        return { type: 'output', output: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES' };
      case 'build':
        return { type: 'success', output: 'Building Docker image...\n✓ Successfully built docker-image:latest' };
      case 'run':
        return { type: 'success', output: `Running container: ${args.slice(1).join(' ')}` };
      default:
        return { type: 'output', output: `docker ${args[0]}: executed` };
    }
  }

  private handleCowsay(args: string[]): CommandResult {
    const message = args.join(' ') || 'Hello from Nabila Station!';
    return {
      type: 'multiline',
      output: [
        { type: 'output', content: ` ${'-'.repeat(message.length + 2)}` },
        { type: 'output', content: `< ${message} >` },
        { type: 'output', content: ` ${'-'.repeat(message.length + 2)}` },
        { type: 'output', content: '        \\   ^__^' },
        { type: 'output', content: '         \\  (oo)\\_______' },
        { type: 'output', content: '            (__)\\       )\\/\\' },
        { type: 'output', content: '                ||----w |' },
        { type: 'output', content: '                ||     ||' }
      ]
    };
  }

  private handleFiglet(args: string[]): CommandResult {
    const text = args.join(' ') || 'NABILA';
    return { type: 'success', output: `\n ███▄    █  ▄▄▄       ▄▄▄▄    ██▓ ██▓    ▄▄▄      \n ██ ▀█   █ ▒████▄    ▓█████▄ ▓██▒▓██▒   ▒████▄    \n▓██  ▀█ ██▒▒██  ▀█▄  ▒██▒ ▄██▒██▒▒██░   ▒██  ▀█▄  \n▓██▒  ▐▌██▒░██▄▄▄▄██ ▒██░█▀  ░██░▒██░   ░██▄▄▄▄██ \n▒██░   ▓██░ ▓█   ▓██▒░▓█  ▀█▓░██░░██████▒▓█   ▓██▒\n░ ▒░   ▒ ▒  ▒▒   ▓▒█░░▒▓███▀▒░▓  ░ ▒░▓  ░▒▒   ▓▒█░\n░ ░░   ░ ▒░  ▒   ▒▒ ░▒░▒   ░  ▒ ░░ ░ ▒  ░ ▒   ▒▒ ░\n   ░   ░ ░   ░   ▒    ░    ░  ▒ ░  ░ ░    ░   ▒   \n         ░       ░  ░ ░       ░      ░  ░     ░  ░\n                           ░                      ` };
  }

  private handleFortune(): CommandResult {
    const fortunes = [
      "The best way to predict the future is to implement it. - Alan Kay",
      "Code is like humor. When you have to explain it, it's bad. - Cory House",
      "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
      "The most important property of a program is whether it accomplishes the intention of its user. - C.A.R. Hoare",
      "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan"
    ];
    return { type: 'info', output: fortunes[Math.floor(Math.random() * fortunes.length)] };
  }

  private showHtop(): CommandResult {
    return {
      type: 'multiline',
      output: [
        { type: 'success', content: '  1  [████████████████████████████████ 45.2%]   Tasks: 234, 1024 thr; 2 running' },
        { type: 'success', content: '  2  [██████████████████████████       31.8%]   Load average: 1.24 0.89 0.73' },
        { type: 'success', content: '  3  [████████████████████████████████ 52.1%]   Uptime: 02:34:21' },
        { type: 'success', content: '  4  [██████████████████████           28.9%]   ' },
        { type: 'info', content: '  Mem[████████████████████████████████ 15.2G/32.0G]' },
        { type: 'info', content: '  Swp[                                  0K/2.00G]' },
        { type: 'output', content: '' },
        { type: 'output', content: '  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command' },
        { type: 'output', content: '12345 nabila     20   0  1.2G  256M   64M S  2.0  0.8  0:15.23 code' },
        { type: 'output', content: '12346 nabila     20   0  512M  128M   32M S  1.5  0.4  0:08.45 node' },
        { type: 'output', content: '12347 nabila     20   0  256M   64M   16M S  0.5  0.2  0:03.12 git' }
      ]
    };
  }

  private showProcesses(): CommandResult {
    return {
      type: 'multiline',
      output: [
        { type: 'output', content: '  PID TTY          TIME CMD' },
        { type: 'output', content: '12345 pts/0    00:00:15 bash' },
        { type: 'output', content: '12346 pts/0    00:00:08 node' },
        { type: 'output', content: '12347 pts/0    00:00:03 git' },
        { type: 'output', content: '12348 pts/0    00:00:01 npm' }
      ]
    };
  }

  private handleUname(args: string[]): CommandResult {
    if (args.includes('-a')) {
      return { type: 'output', output: 'Linux station 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux' };
    }
    return { type: 'output', output: 'Linux' };
  }

  private handleCat(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'error', output: 'cat: missing file operand' };
    }
    
    const file = args[0];
    const sampleFiles: Record<string, string> = {
      'package.json': '{\n  "name": "nabila-station",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}',
      'README.md': '# Nabila Ahmad Station\n\nA modern development environment.\n\n## Getting Started\n\n```bash\nnpm run dev\n```',
      '.gitignore': 'node_modules/\ndist/\n.env\n*.log'
    };
    
    return { type: 'output', output: sampleFiles[file] || `cat: ${file}: No such file or directory` };
  }

  private handleMkdir(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'error', output: 'mkdir: missing operand' };
    }
    return { type: 'success', output: `Directory '${args[0]}' created` };
  }

  private handleTouch(args: string[]): CommandResult {
    if (args.length === 0) {
      return { type: 'error', output: 'touch: missing file operand' };
    }
    return { type: 'success', output: `File '${args[0]}' created` };
  }

  getCompletions(command: string): string[] {
    const commands = [
      'help', 'ls', 'pwd', 'whoami', 'date', 'clear', 'neofetch', 'git', 'gh', 'npm', 'yarn', 'pnpm',
      'node', 'python3', 'vercel', 'supabase', 'nano', 'vim', 'code', 'apt', 'docker', 'cowsay',
      'figlet', 'fortune', 'cmatrix', 'htop', 'ps', 'uname', 'cat', 'mkdir', 'touch', 'echo'
    ];
    
    return commands.filter(cmd => cmd.startsWith(command.toLowerCase()));
  }
}