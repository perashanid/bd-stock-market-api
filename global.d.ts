// Global Node.js type declarations
declare global {
  var process: {
    env: { [key: string]: string | undefined };
    exit(code?: number): never;
    uptime(): number;
    on(event: string, listener: (...args: any[]) => void): any;
  };
  
  var console: {
    log(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
  };
  
  var Buffer: {
    from(data: any): any;
    alloc(size: number): any;
  };
  
  var __dirname: string;
  var __filename: string;
  var global: any;
  
  class URLSearchParams {
    constructor(init?: string | string[][] | Record<string, string>);
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    set(name: string, value: string): void;
    toString(): string;
  }
}

export {};