import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

// API untuk eksekusi perintah
app.post("/exec", (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: "Command is required" });
  }

  exec(command, { shell: "/bin/bash" }, (error, stdout, stderr) => {
    if (error) {
      return res.json({ output: stderr || error.message });
    }
    res.json({ output: stdout || stderr });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Executor API running on http://localhost:${PORT}`);
});
