#!/usr/bin/env ts-node
import fs from "fs";
import { runConnect4, welcome } from "./connect4.js";
import { asciiArtIntro } from "./layout/cliLayout.js";

export async function main() {
  try {
    const data = null;
    if (process.argv[2]) {
      JSON.parse(fs.readFileSync(process.argv[2], "utf-8"));
    }
    asciiArtIntro();
    await welcome(data);
  } catch (e) {
    console.error(e);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
