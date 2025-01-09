#!/usr/bin/env ts-node

export function main() {
  console.log("Hello, world");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
