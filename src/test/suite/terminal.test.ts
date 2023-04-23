import * as assert from "assert";
import { Command } from "../../command";
import { executeCommand } from "../../terminal";

suite("terminal", () => {
  test("executeCommand does not throw errors", async () => {
    const command: Command = {
      command: "echo A",
    };

    assert.doesNotThrow(async () => await executeCommand(command));
  });
});
