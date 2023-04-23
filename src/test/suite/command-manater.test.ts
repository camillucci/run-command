import * as assert from "assert";
import { addNewCommand } from "../../command-manger";

suite("command-manger", () => {
  test("addNewCommand does not throw errors", () => {
    assert.doesNotThrow(async () => await addNewCommand());
  });
});
