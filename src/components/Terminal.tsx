import { useState } from "react";

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const runCommand = async () => {
    if (!command.trim()) return;

    setHistory((prev) => [...prev, `> ${command}`]);

    try {
      const res = await fetch("http://localhost:5000/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      setHistory((prev) => [...prev, data.output]);
    } catch (err) {
      setHistory((prev) => [...prev, "Error: Cannot connect to server"]);
    }

    setCommand("");
  };

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-lg w-full h-96 overflow-y-auto">
      <div>
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="flex">
        <span className="mr-2">$</span>
        <input
          className="bg-black text-green-400 flex-1 outline-none"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runCommand()}
          autoFocus
        />
      </div>
    </div>
  );
}
