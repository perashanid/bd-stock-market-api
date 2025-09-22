/// <reference types="node" />

declare global {
  var process: NodeJS.Process;
  var console: Console;
  var Buffer: BufferConstructor;
  var __dirname: string;
  var __filename: string;
  var global: NodeJS.Global;
}

export {};