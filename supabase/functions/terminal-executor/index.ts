import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { command } = await req.json();
    
    if (!command) {
      return new Response(
        JSON.stringify({ error: 'Command is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Executing command: ${command}`);

    // Execute the command using Deno
    const process = new Deno.Command("bash", {
      args: ["-c", command],
      stdout: "piped",
      stderr: "piped",
    });

    const { code, stdout, stderr } = await process.output();
    
    const decoder = new TextDecoder();
    const stdoutText = decoder.decode(stdout);
    const stderrText = decoder.decode(stderr);
    
    const output = stdoutText || stderrText || `Command exited with code: ${code}`;
    
    console.log(`Command output: ${output}`);

    return new Response(
      JSON.stringify({ 
        output: output,
        exitCode: code 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Command execution error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Command execution failed',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});