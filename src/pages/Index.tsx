import { Terminal } from "@/components/Terminal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Nabila Ahmad Station
          </h1>
          <p className="text-xl text-muted-foreground">
            Development Emulator
          </p>
          <p className="text-sm text-terminal-comment mt-2">
            Full-stack development environment with GitHub, Vercel & Supabase integration
          </p>
        </div>
        
        <Terminal />
        
        <div className="text-center mt-8 text-xs text-terminal-comment">
          <p>
            Terminal shortcuts: <span className="text-terminal-warning">Ctrl+L</span> (clear), 
            <span className="text-terminal-warning"> Tab</span> (autocomplete), 
            <span className="text-terminal-warning"> ↑↓</span> (history)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;