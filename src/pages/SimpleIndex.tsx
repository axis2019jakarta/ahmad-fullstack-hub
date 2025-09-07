import { useState, useRef, useEffect } from 'react';

interface HistoryEntry {
  text: string;
  type: 'input' | 'output' | 'error';
}

const SimpleTerminal = () => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { text: "Welcome to Nabila Ahmad Development Station! 🚀", type: 'output' },
    { text: "Type 'help' to see available commands.", type: 'output' },
    { text: "", type: 'output' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string): HistoryEntry => {
    const trimmed = cmd.trim().toLowerCase();
    
    switch (trimmed) {
      case 'help':
        return {
          text: `Available Commands:

📁 File Operations:
  ls              - List directory contents
  pwd             - Show current directory
  cat <file>      - Display file content

🔧 Development:
  git status      - Check git status
  npm install     - Install dependencies
  npm run dev     - Start development server
  vercel deploy   - Deploy to Vercel
  supabase start  - Start Supabase

🖥️  System:
  help            - Show this help
  clear           - Clear terminal
  whoami          - Current user
  date            - Current date/time
  neofetch        - System info

💡 Ready for development!`,
          type: 'output'
        };
      case 'clear':
        return { text: 'CLEAR', type: 'output' };
      case 'ls':
        return { text: 'src/  public/  package.json  README.md  .env', type: 'output' };
      case 'pwd':
        return { text: '/workspace/nabila-development-station', type: 'output' };
      case 'whoami':
        return { text: 'nabila-developer', type: 'output' };
      case 'date':
        return { text: new Date().toString(), type: 'output' };
      case 'git status':
        return { text: 'On branch main\nYour branch is up to date with \'origin/main\'.\nnothing to commit, working tree clean', type: 'output' };
      case 'npm install':
        return { text: '✅ Dependencies installed successfully!', type: 'output' };
      case 'npm run dev':
        return { text: '🚀 Development server starting...\n  Local:   http://localhost:5173/', type: 'output' };
      case 'vercel deploy':
        return { text: '🚀 Deploying to production...\n✅ Deployment ready: https://nabila-station-abc123.vercel.app', type: 'output' };
      case 'supabase start':
        return { text: '🚀 Starting Supabase...\n✅ Database started\n  Studio URL: http://localhost:54323', type: 'output' };
      case 'neofetch':
        return {
          text: `                   -\`                nabila@development-station
                  .o+\`               ─────────────────────────────────
                 \`ooo/               OS: Nabila Development Environment
                \`+oooo:              Host: Lovable Cloud Platform
               \`+oooooo:             Kernel: React 18.3.1
               -+oooooo+:            Uptime: Always Online
             \`/:-:++oooo+:           Shell: bash 5.0.0
            \`/++++/+++++++:          Terminal: Nabila Terminal Emulator
           \`/++++++++++++++:         CPU: JavaScript V8 Engine
          \`/+++ooooooooooooo/\`       Memory: Optimized React State`,
          type: 'output'
        };
      default:
        if (trimmed.startsWith('cat ')) {
          const file = trimmed.split(' ')[1];
          if (file === 'package.json') {
            return { text: '{\n  "name": "nabila-development-station",\n  "version": "1.0.0"\n}', type: 'output' };
          }
          return { text: `cat: ${file}: No such file or directory`, type: 'error' };
        }
        return { text: `Command not found: ${trimmed}\nType 'help' for available commands.`, type: 'error' };
    }
  };

  const runCommand = () => {
    if (!command.trim()) return;

    setHistory(prev => [...prev, { text: `$ ${command}`, type: 'input' }]);

    const result = processCommand(command);
    
    if (result.text === 'CLEAR') {
      setHistory([
        { text: "Welcome to Nabila Ahmad Development Station! 🚀", type: 'output' },
        { text: "Type 'help' to see available commands.", type: 'output' },
        { text: "", type: 'output' }
      ]);
    } else {
      setHistory(prev => [...prev, result]);
    }

    setCommand("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-500 mb-2">
            Nabila Ahmad Development Station
          </h1>
          <p className="text-xl text-green-300">
            Terminal Emulator
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Full-stack development environment ready for use
          </p>
        </div>
        
        <div 
          ref={terminalRef}
          className="bg-black border border-green-800 rounded-lg p-4 h-96 overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="space-y-1">
            {history.map((entry, i) => (
              <div 
                key={i} 
                className={`whitespace-pre-wrap ${
                  entry.type === 'input' 
                    ? 'text-green-300' 
                    : entry.type === 'error' 
                    ? 'text-red-400' 
                    : 'text-green-400'
                }`}
              >
                {entry.text}
              </div>
            ))}
          </div>
          
          <div className="flex items-center mt-2">
            <span className="text-green-500 mr-2">$</span>
            <input
              ref={inputRef}
              className="bg-transparent text-green-400 flex-1 outline-none font-mono"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runCommand()}
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Terminal ready! Try commands like: help, ls, git status, npm install</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleTerminal;