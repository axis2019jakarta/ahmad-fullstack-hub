import React, { useState, useEffect, useRef } from 'react';
import { CommandProcessor } from './CommandProcessor';

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info';
  content: string;
  timestamp: Date;
}

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'success',
      content: 'Welcome to Nabila Ahmad Station Development Emulator v1.0.0',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'info',
      content: 'Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-91-generic x86_64)',
      timestamp: new Date()
    },
    {
      id: 3,
      type: 'info',
      content: 'Type "help" for available commands.',
      timestamp: new Date()
    }
  ]);
  
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const commandProcessor = new CommandProcessor();

  const currentUser = 'nabila';
  const currentHost = 'station';
  const currentPath = '~';

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now() + Math.random(),
      type,
      content,
      timestamp: new Date()
    };
    setLines(prev => [...prev, newLine]);
  };

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Add command line to display
    addLine('command', `${currentUser}@${currentHost}:${currentPath}$ ${command}`);
    
    setIsProcessing(true);
    
    try {
      const result = await commandProcessor.process(command);
      
      if (result.type === 'multiline') {
        const outputs = result.output as Array<{ type: string; content: string }>;
        outputs.forEach(line => {
          addLine(line.type as TerminalLine['type'], line.content);
        });
      } else {
        addLine(result.type as TerminalLine['type'], result.output as string);
      }
    } catch (error) {
      addLine('error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    setIsProcessing(false);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for common commands
      const completions = commandProcessor.getCompletions(currentCommand);
      if (completions.length === 1) {
        setCurrentCommand(completions[0]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const getLineClassName = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'terminal-command';
      case 'error':
        return 'terminal-error';
      case 'success':
        return 'terminal-success';
      case 'warning':
        return 'terminal-warning';
      case 'info':
        return 'text-terminal-text';
      default:
        return 'terminal-output';
    }
  };

  return (
    <div className="terminal-window max-w-6xl mx-auto my-8">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-control close"></div>
          <div className="terminal-control minimize"></div>
          <div className="terminal-control maximize"></div>
        </div>
        <div className="text-terminal-text font-bold text-sm">
          Nabila Ahmad Station Development Emulator
        </div>
        <div className="text-terminal-comment text-xs">
          {new Date().toLocaleString()}
        </div>
      </div>
      
      <div ref={terminalBodyRef} className="terminal-body">
        {lines.map((line) => (
          <div key={line.id} className="terminal-line">
            <div className={`terminal-output ${getLineClassName(line.type)}`}>
              {line.content}
            </div>
          </div>
        ))}
        
        {/* Current input line */}
        <div className="terminal-line">
          <span className="terminal-prompt">
            {currentUser}@{currentHost}:{currentPath}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            disabled={isProcessing}
            autoComplete="off"
            spellCheck={false}
          />
          {!isProcessing && <span className="cursor-blink"></span>}
          {isProcessing && <span className="text-terminal-warning">Processing...</span>}
        </div>
      </div>
    </div>
  );
};