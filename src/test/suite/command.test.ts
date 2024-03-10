import * as assert from "assert";
import { Command, cleanCommand } from "../../command";
import { DEFAULT_PATH } from "../../constants";

suite("command", () => {
  test("cleanCommand does not throw errors", () => {
    assert.doesNotThrow(async () => cleanCommand({ command: "" }));
  });

  test("cleanCommand cleans all values properly", () => {
    const command: Command = {
      command: "echo A",
      name: "echo A",
      path: DEFAULT_PATH,
      parameters: [],
    };

    const cleanedCommand = cleanCommand(command);

    assert.strictEqual(cleanedCommand.command, command.command);
    assert.strictEqual(cleanedCommand.name, undefined);
    assert.strictEqual(cleanedCommand.path, undefined);
    assert.strictEqual(cleanedCommand.parameters, undefined);
  });
});
