const { useState, useRef, useEffect } = window.React || {};

const MinimalTerminal = () => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([
    "Welcome to Nabila Ahmad Development Station! 🚀",
    "Type 'help' to see available commands.",
    ""
  ]);
  const inputRef = useRef(null);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    
    switch (trimmed) {
      case 'help':
        return `Available Commands:

📁 File Operations:
  ls              - List directory contents  
  pwd             - Show current directory
  cat package.json - Show package info

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

💡 Ready for development!`;

      case 'clear':
        return 'CLEAR';
      case 'ls':
        return 'src/  public/  package.json  README.md  .env  server.js';
      case 'pwd':
        return '/workspace/nabila-development-station';
      case 'whoami':
        return 'nabila-developer';
      case 'date':
        return new Date().toString();
      case 'git status':
        return 'On branch main\\nYour branch is up to date with \'origin/main\'.\\nnothing to commit, working tree clean';
      case 'npm install':
        return '✅ Dependencies installed successfully!';
      case 'npm run dev':
        return '🚀 Development server starting...\\n  Local:   http://localhost:5173/';
      case 'vercel deploy':
        return '🚀 Deploying to production...\\n✅ Deployment ready: https://nabila-station-abc123.vercel.app';
      case 'supabase start':
        return '🚀 Starting Supabase...\\n✅ Database started\\n  Studio URL: http://localhost:54323';
      case 'cat package.json':
        return '{\\n  "name": "nabila-development-station",\\n  "version": "1.0.0",\\n  "scripts": {\\n    "dev": "vite",\\n    "build": "vite build"\\n  }\\n}';
      case 'neofetch':
        return `                   -\`                nabila@development-station
                  .o+\`               ─────────────────────────────────
                 \`ooo/               OS: Nabila Development Environment
                \`+oooo:              Host: Lovable Cloud Platform  
               \`+oooooo:             Kernel: React 18.3.1
               -+oooooo+:            Uptime: Always Online
             \`/:-:++oooo+:           Shell: bash 5.0.0
            \`/++++/+++++++:          Terminal: Nabila Terminal Emulator
           \`/++++++++++++++:         CPU: JavaScript V8 Engine
          \`/+++ooooooooooooo/\`       Memory: Optimized React State`;
      default:
        return \`Command not found: \${trimmed}\\nType 'help' for available commands.\`;
    }
  };

  const runCommand = () => {
    if (!command.trim()) return;

    const newHistory = [...history, \`$ \${command}\`];
    const result = processCommand(command);
    
    if (result === 'CLEAR') {
      setHistory([
        "Welcome to Nabila Ahmad Development Station! 🚀",
        "Type 'help' to see available commands.",
        ""
      ]);
    } else {
      setHistory([...newHistory, result.replace(/\\\\n/g, '\\n')]);
    }

    setCommand("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand();
    }
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#00ff00',
      fontFamily: 'monospace',
      padding: '20px'
    }
  }, [
    React.createElement('div', {
      key: 'header',
      style: { textAlign: 'center', marginBottom: '30px' }
    }, [
      React.createElement('h1', {
        key: 'title',
        style: { fontSize: '2.5rem', margin: '0', color: '#00ff00' }
      }, 'Nabila Ahmad Development Station'),
      React.createElement('p', {
        key: 'subtitle',
        style: { fontSize: '1.2rem', margin: '10px 0', color: '#00cc00' }
      }, 'Terminal Emulator'),
      React.createElement('p', {
        key: 'description',
        style: { fontSize: '0.9rem', color: '#666' }
      }, 'Full-stack development environment ready for use')
    ]),
    
    React.createElement('div', {
      key: 'terminal',
      style: {
        backgroundColor: '#000',
        border: '2px solid #00ff00',
        borderRadius: '8px',
        padding: '20px',
        height: '400px',
        overflowY: 'auto',
        maxWidth: '1000px',
        margin: '0 auto'
      },
      onClick: () => inputRef.current?.focus()
    }, [
      React.createElement('div', {
        key: 'history',
        style: { marginBottom: '10px' }
      }, history.map((line, i) => 
        React.createElement('div', {
          key: i,
          style: {
            whiteSpace: 'pre-wrap',
            color: line.startsWith('$') ? '#00ccff' : '#00ff00',
            marginBottom: '2px'
          }
        }, line)
      )),
      
      React.createElement('div', {
        key: 'input-line',
        style: { display: 'flex', alignItems: 'center' }
      }, [
        React.createElement('span', {
          key: 'prompt',
          style: { color: '#00ff00', marginRight: '8px' }
        }, '$'),
        React.createElement('input', {
          key: 'input',
          ref: inputRef,
          value: command,
          onChange: (e) => setCommand(e.target.value),
          onKeyDown: handleKeyDown,
          style: {
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '1rem',
            flex: 1
          },
          autoFocus: true,
          spellCheck: false
        })
      ])
    ]),
    
    React.createElement('div', {
      key: 'footer',
      style: { 
        textAlign: 'center', 
        marginTop: '20px', 
        fontSize: '0.8rem', 
        color: '#666' 
      }
    }, 'Terminal ready! Try: help, ls, git status, npm install')
  ]);
};

// Export for use
window.MinimalTerminal = MinimalTerminal;