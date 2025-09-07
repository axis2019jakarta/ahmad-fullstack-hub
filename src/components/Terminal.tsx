import { useState, useRef, useEffect } from "react";
import { CommandProcessor } from "./CommandProcessor";

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<Array<{text: string, type: 'input' | 'output' | 'error'}>>([
    { text: "Welcome to Nabila Ahmad Development Station! 🚀", type: 'output' },
    { text: "Type 'help' to see available commands.", type: 'output' },
    { text: "", type: 'output' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const processor = useRef(new CommandProcessor());

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

    try {
      const result = await processor.current.process(command);
      
      if (result.output === 'CLEAR_TERMINAL') {
        setHistory([
          { text: "Welcome to Nabila Ahmad Development Station! 🚀", type: 'output' },
          { text: "Type 'help' to see available commands.", type: 'output' },
          { text: "", type: 'output' }
        ]);
      } else {
        setHistory(prev => [...prev, { 
          text: result.output, 
          type: result.type === 'error' ? 'error' : 'output' 
        }]);
      }
    } catch (err) {
      setHistory(prev => [...prev, { 
        text: "Error: Command execution failed", 
        type: 'error' 
      }]);
    }

    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completions = processor.current.getCompletions(command);
      if (completions.length === 1) {
        setCommand(completions[0]);
      } else if (completions.length > 1) {
        setHistory(prev => [...prev, { 
          text: completions.join('  '), 
          type: 'output' 
        }]);
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
