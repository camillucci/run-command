import * as assert from "assert";
import { showCommandPicker } from "../../picker";

suite("picker", () => {
  test("showCommandPicker does not throw errors", () => {
    assert.doesNotThrow(async () => await showCommandPicker([]));
  });
});
