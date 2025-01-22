#!/usr/bin/env ts-node
import fs from "fs";
import { asciiArtIntro } from "./layout/cliLayout.ts";
import { readForStart, closePrompt } from "./prompt.ts";
import { runConnect4 } from "./Connect4Cli.ts";

export async function main() {
  try {
    asciiArtIntro();
    const answer = await readForStart();
    const file = process.argv[2];
    if (answer) {
      if (file) {
        runConnect4(JSON.parse(fs.readFileSync(file, "utf-8")));
      } else {
        runConnect4();
      }
    } else {
      closePrompt();
    }
  } catch (e) {
    console.error(e);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
