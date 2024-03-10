import * as assert from "assert";
import { Command } from "../../command";
import { getCommands, updateConfiguration } from "../../configuration";

suite("configuration", () => {
  test("getCommands does not throw errors", async () => {
    assert.doesNotThrow(async () => getCommands());
  });

  test("updateConfiguration does not throw errors", async () => {
    const command: Command = {
      command: "echo A",
    };
    assert.doesNotThrow(async () => updateConfiguration(command));
  });
});
