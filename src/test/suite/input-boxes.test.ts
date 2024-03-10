import * as assert from "assert";
import {
  commandInputBox,
  nameInputBox,
  parameterInputBox,
  pathInputBox,
  valueInputBox,
} from "../../input-boxes";

suite("input-boxes", () => {
  test("commandInputBox does not throw errors", async () => {
    assert.doesNotThrow(async () => commandInputBox());
  });

  test("nameInputBox does not throw errors", async () => {
    assert.doesNotThrow(async () => nameInputBox("Name"));
  });

  test("pathInputBox does not throw errors", async () => {
    assert.doesNotThrow(async () => pathInputBox());
  });

  test("parameterInputBox does not throw errors", async () => {
    assert.doesNotThrow(async () => parameterInputBox(1));
  });

  test("valueInputBox does not throw errors", async () => {
    assert.doesNotThrow(async () => valueInputBox("Parameter"));
  });
});
