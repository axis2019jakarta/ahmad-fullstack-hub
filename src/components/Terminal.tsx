import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<Array<{text: string, type: 'input' | 'output' | 'error'}>>([
    { text: "Welcome to Nabila Ahmad Development Station! 🚀", type: 'output' },
    { text: "Real Linux Terminal - Execute any command you want!", type: 'output' },
    { text: "", type: 'output' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new content is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = async () => {
    if (!command.trim()) return;

    // Add command to history
    setHistory(prev => [...prev, { text: `$ ${command}`, type: 'input' }]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Handle clear command locally
    if (command.trim() === 'clear') {
      setHistory([
        { text: "Welcome to Nabila Ahmad Development Station! 🚀", type: 'output' },
        { text: "Type any Linux/Unix command to execute it.", type: 'output' },
        { text: "", type: 'output' }
      ]);
      setCommand("");
      return;
    }

    try {
      // Execute command on real server
      const { data, error } = await supabase.functions.invoke('terminal-executor', {
        body: { command: command.trim() }
      });

      if (error) {
        setHistory(prev => [...prev, { 
          text: `Error: ${error.message}`, 
          type: 'error' 
        }]);
      } else {
        const output = data?.output || 'Command executed successfully';
        setHistory(prev => [...prev, { 
          text: output, 
          type: 'output' 
        }]);
      }
    } catch (err) {
      setHistory(prev => [...prev, { 
        text: `Error: Failed to execute command - ${err}`, 
        type: 'error' 
      }]);
    }

    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="bg-terminal-bg text-terminal-text font-mono p-4 rounded-lg w-full h-96 overflow-y-auto border border-terminal-border"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {history.map((entry, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap ${
              entry.type === 'input' 
                ? 'text-terminal-command' 
                : entry.type === 'error' 
                ? 'text-terminal-error' 
                : 'text-terminal-text'
            }`}
          >
            {entry.text}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <span className="text-terminal-prompt mr-2">$</span>
        <input
          ref={inputRef}
          className="bg-transparent text-terminal-text flex-1 outline-none font-mono"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
