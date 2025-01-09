import { expect, test, vi } from "vitest";
import { main } from "./index";

test("main function", () => {
  const consoleSpy = vi.spyOn(console, "log");
  main();
  expect(consoleSpy).toHaveBeenCalledWith("Hello, world");
  consoleSpy.mockRestore();
});
