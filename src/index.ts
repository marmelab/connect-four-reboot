#!/usr/bin/env ts-node
import fs from "fs";
import { runConnect4 } from "./connect4.js";

export async function main() {
  try {
    const data = fs.readFileSync(process.argv[2], "utf-8");
    await runConnect4(JSON.parse(data));
  } catch (e) {
    console.error(e);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
